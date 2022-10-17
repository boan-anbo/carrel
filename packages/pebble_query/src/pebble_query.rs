use std::collections::HashMap;
use std::iter::Iterator;
use std::string::ToString;

use carrel_commons::generic::api::query::v1::{
    Operator, SortCondition, SortDirection, StandardQuery,
};
use convert_case::{Case, Casing};
use sea_orm::Condition;
use sea_orm::DatabaseConnection;
use sea_orm::DbErr;
use sea_orm::EntityTrait;
use sea_orm::QueryFilter;
use sea_orm::QueryOrder;
use sea_orm::QuerySelect;
use sea_orm::Select;
use sea_orm::{ColumnTrait, FromQueryResult, PaginatorTrait};

use crate::errors::PebbleQueryError;
use crate::errors::PebbleQueryError::{InvalidOperator, MissingValue};
use crate::filter_conditions::SeaOrmFilterConditions;
use crate::pebble_query_result::PebbleQueryResult;

pub struct PebbleQuery {}

impl PebbleQuery {
    pub fn get_sea_orm_filters<E, M>(
        query: StandardQuery,
        field_column_map: &HashMap<String, E::Column>,
    ) -> SeaOrmFilterConditions
    where
        E: EntityTrait<Model = M>,
        M: FromQueryResult + Sized + Send + Sync,
    {
        let mut must_conditions = Condition::all();

        let mut any_conditions = Condition::any();

        if let Some(filter_set) = query.filter {
            for filter in filter_set.must {
                // if the filter name is filename and has value
                must_conditions = Self::extract_query_conditions::<E, M>(
                    must_conditions,
                    filter,
                    field_column_map,
                )
                .unwrap();
            }

            for filter in filter_set.any {
                any_conditions = Self::extract_query_conditions::<E, M>(
                    any_conditions,
                    filter,
                    field_column_map,
                )
                .unwrap();
            }
        };

        SeaOrmFilterConditions {
            must_conditions,
            any_conditions,
        }
    }

    /// Find SeaOrm entity by StandardQuery
    ///
    ///
    /// # Example
    /// ```
    ///
    ///     use carrel_commons::generic::api::query::v1::{Condition, FilterSet, Operator, StandardQuery};
    ///     use carrel_db::query::sea_orm_helper::find_file_by_query;
    ///
    ///     #[tokio::main]
    ///     async fn main() {
    ///
    ///     let must_conditions: Vec<Condition> = vec![
    ///     Condition {
    ///        field: "file_name".to_string(),
    ///        value: Some("1".to_string()),
    ///         operator: Operator::Contains as i32,
    ///     value_list: vec![],value_to: None}
    ///     ];
    ///
    ///     let filter_set = FilterSet {
    ///     must: must_conditions,
    ///     any: vec![]
    ///     };
    ///
    ///     let query = StandardQuery {
    ///     sort: None,
    ///     offset: 0,
    ///     length: 0,
    ///     page: 0,
    ///     filter: Some(filter_set),
    ///
    ///     };
    ///
    ///     let find_ends_with_1_by_query = find_file_by_query(&sqlite_memory_db, query, &&get_file_map_to_column_map()).await.unwrap();
    ///
    ///     assert_eq!(find_ends_with_1_by_query.len(), 2);
    ///
    ///     }
    /// ```
    pub async fn query_sea_orm_entity<E, M>(
        db: &DatabaseConnection,
        query: StandardQuery,
        field_to_column_map: &HashMap<String, E::Column>,
    ) -> Result<PebbleQueryResult<E>, DbErr>
    where
        E: EntityTrait<Model = M>,
        M: FromQueryResult + Sized + Send + Sync,
    {
        let query = Self::normalize_query(query);

        let (current_must_condition, current_any_condition) =
            Self::extract_sea_orm_conditions_from_query::<E, M>(&query, field_to_column_map);

        let mut select_with_conditions = E::find()
            .filter(current_must_condition) // add the must condition
            .filter(current_any_condition) // add the any condition
            ;

        let filter = query.filter.clone();

        if filter.is_some() {
            let filter_unwrapped = filter.unwrap();
            let global_filter_value = filter_unwrapped.global_filter.unwrap_or("".to_string());
            if !global_filter_value.is_empty() {
                let mut global_conditions = Condition::any();
                for column in field_to_column_map.values() {
                    global_conditions = Self::add_condition::<E, M>(
                        global_conditions,
                        Operator::Contains as i32,
                        column,
                        global_filter_value.as_str(),
                        vec![],
                        None,
                    )
                    .unwrap();
                }
            }
        }

        // check if offset and length are set
        if query.length > 0 {
            select_with_conditions = select_with_conditions.limit(query.length as u64)
        }

        if query.offset > 0 {
            select_with_conditions = select_with_conditions.offset(query.offset as u64)
        }

        let query_sort = query.sort.clone();
        if query_sort.is_some() {
            select_with_conditions = Self::add_sort_to_select(
                select_with_conditions,
                query_sort.unwrap(),
                field_to_column_map,
            );
        };

        let query_result: Vec<<E as EntityTrait>::Model>;

        if query.find_one {
            let result = select_with_conditions.one(db).await?;
            // if exists return the result in Vec, else return empty Vec
            if result.is_some() {
                let result = result.unwrap();
                query_result = vec![result]
            } else {
                query_result = vec![]
            }
        } else {
            let result = select_with_conditions.all(db).await?;
            query_result = result
        }

        let total_items_and_pages_number = E::find()
            .paginate(db, query.length as usize)
            .num_items_and_pages()
            .await?;

        // initial results, waiting for a second query to get the total count before returning the result
        let pebble_query_result =
            PebbleQueryResult::new(query_result, query, total_items_and_pages_number);

        Ok(pebble_query_result)
    }

    fn extract_sea_orm_conditions_from_query<E, M>(
        query: &StandardQuery,
        field_to_column_map: &HashMap<String, <E>::Column>,
    ) -> (Condition, Condition)
    where
        E: EntityTrait<Model = M>,
        M: FromQueryResult + Sized + Send + Sync,
    {
        let mut current_must_condition = Condition::all();
        let mut current_any_condition = Condition::any();

        let query_filter = query.filter.clone();
        if let Some(filter_set) = query_filter {
            for filter in filter_set.must {
                // if the filter name is filename and has value
                current_must_condition = Self::extract_query_conditions::<E, M>(
                    current_must_condition,
                    filter,
                    field_to_column_map,
                )
                .unwrap();
            }

            for filter in filter_set.any {
                current_any_condition = Self::extract_query_conditions::<E, M>(
                    current_any_condition,
                    filter,
                    field_to_column_map,
                )
                .unwrap();
            }
        };
        (current_must_condition, current_any_condition)
    }

    // generic type with trait bound
    pub fn add_sort_to_select<T: ColumnTrait, Entity: EntityTrait>(
        select_entity: Select<Entity>,
        sort_condition: SortCondition,
        field_to_column_map: &HashMap<String, T>,
    ) -> Select<Entity> {
        let mut select_with_sort = select_entity;

        let column: T;

        column = field_to_column_map
            .into_iter()
            .find(|(field_name, _column)| (field_name == &sort_condition.field.as_str()))
            .unwrap_or_else(|| {
                panic!(
                    "Column {} not provided in file_to_column_map",
                    sort_condition.field.as_str()
                )
            })
            .1
            .clone();

        match SortDirection::from_i32(sort_condition.order).unwrap() {
            SortDirection::Unspecified => {
                select_with_sort = select_with_sort.order_by_asc(column);
            }
            SortDirection::Asc => {
                select_with_sort = select_with_sort.order_by_asc(column);
            }
            SortDirection::Desc => {
                select_with_sort = select_with_sort.order_by_desc(column);
            }
        }

        select_with_sort
    }

    /// Extract conditions from StandardQuery's FilterSet and returns SeaOrm Condition ready to be used in Find filters.
    ///
    /// # Arguments
    ///
    /// * `base_sea_or_condition`: Extract all conditions from StandardQuery Condtions and convert them to SeaOrm Condition chain with the help of `field_column_map`.
    ///
    /// The base condition is used to chain the conditions with `and` or `or` operator.
    ///
    /// ## Example:
    ///
    /// ```
    ///     use sea_orm::Condition;
    ///     use sea_orm::tests_cfg::cake::Entity;
    ///
    ///     let base_condition = Condition::all(); // create a base condition whose chain operator is `and`
    ///
    ///     let any_number: i32 = 0;
    ///
    ///     let first_addition = Entity::Column::Id.eq(any_number); // create a condition
    ///
    ///     let chained_condition = base_condition.add(first_additional);
    ///
    ///     let second_addition = Entity::Column::Name.eq("value_for_name_column");
    ///
    ///     // ... and so on then,
    ///     // the final condition will require all the conditions to be true for the base condition to be true.
    ///
    /// ```
    ///
    /// * `sq_filter`: a StandardQuery Filter, e.g.
    ///
    /// ## Example:
    ///
    /// ```
    /// use carrel_commons::generic::api::query::v1::{Condition, Operator};
    ///
    ///     fn main() {
    ///
    ///      let sample_sq_filter_is_1 = carrel_commons::generic::api::query::v1::Condition {
    ///           field: "id".to_string(),
    ///           operator: Operator::Eq,
    ///           value: Some("1".to_string()),
    ///           value_list: vec![], // for operators like `in` or `not in`
    ///           value_to: None, // for operators like `between` or `not between`
    ///      }; // this translate to `id = 1`
    ///
    ///     let sample_sq_filter_is_in_1_2_3 = carrel_commons::generic::api::query::v1::Condition {
    ///           field: "id".to_string(),
    ///           operator: i32::from(Operator::In),
    ///           value: None,
    ///           value_list: vec!["1".to_string(), "2".to_string(), "3".to_string()],
    ///           value_to: None,
    ///      }; // this translate to `id in (1, 2, 3)`
    ///
    ///     let sample_sq_filter_is_between_1_to_10 = carrel_commons::generic::api::query::v1::Condition {
    ///           field: "id".to_string(),
    ///           operator: i32::from(Operator::Between),
    ///           value: Some("1".to_string()),
    ///           value_list: vec![],
    ///           value_to: Some("10".to_string()),
    ///
    ///     }; // this translate to `id between 1 and 10`
    ///
    ///     }
    ///
    ///
    ///
    /// ```
    /// * `field_column_map`: User-provided map of string field name to SeaOrm Column. This is used to convert the field name in the `sq_filter` to SeaOrm Column.
    ///
    /// ## Example:
    ///
    /// ```
    /// use sea_orm::tests_cfg::cake;
    ///
    ///     let map = std::collections::HashMap::from([
    ///    ("id".to_string(), cake::Column::Id),
    ///    ("name".to_string(), cake::Column::Name),
    ///    ("price".to_string(), cake::Column::Price),
    ///    // ... and so on.
    ///
    ///     ]);
    ///
    /// ```
    pub fn extract_query_conditions<E, M>(
        base_sea_or_condition: Condition,
        sq_filter: carrel_commons::generic::api::query::v1::Condition,
        field_column_map: &HashMap<String, E::Column>,
    ) -> Result<Condition, DbErr>
    where
        E: EntityTrait<Model = M>,
        M: FromQueryResult + Sized + Send + Sync,
    {
        let result: E::Column = field_column_map
            .into_iter()
            .find(|(field_name, _column)| (field_name == &sq_filter.field.as_str()))
            .expect(
                format!(
                    "Column \"{}\" not provided in field_to_column_map",
                    sq_filter.field.as_str() // throw if
                )
                .as_str(),
            )
            .1
            .clone();

        let result = Self::add_query_condition_to_sea_orm_condition::<E, M>(
            base_sea_or_condition,
            &sq_filter,
            result,
        )
        .unwrap();
        Ok(result)
    }

    // Add final condition
    pub fn add_query_condition_to_sea_orm_condition<E, M>(
        input_current_condition: Condition,
        filter: &carrel_commons::generic::api::query::v1::Condition,
        column: E::Column,
    ) -> Result<Condition, PebbleQueryError>
    where
        E: EntityTrait<Model = M>,
        M: FromQueryResult + Sized + Send + Sync,
    {
        let value = filter.value.clone().unwrap_or_else(|| "".to_string());
        let value_list = filter.value_list.clone();
        let value_to = filter.value_to.clone();
        let result = Self::add_condition::<E, M>(
            input_current_condition,
            filter.operator,
            &column,
            value.as_str(),
            value_list,
            value_to,
        )?;

        Ok(result)
    }

    // add condition to the input_condition
    fn add_condition<E, M>(
        input_condition: Condition,
        operator: i32,
        column: &E::Column,
        value: &str,
        value_list: Vec<String>,
        value_to: Option<String>,
    ) -> Result<Condition, PebbleQueryError>
    where
        E: EntityTrait<Model = M>,
        M: FromQueryResult + Sized + Send + Sync,
    {
        let condition = match Operator::from_i32(operator).unwrap_or(Operator::Unspecified) {
            Operator::Contains => {
                let value = value.as_ref();
                input_condition.add(column.contains(value))
            }
            Operator::Equals => input_condition.add(column.eq(value)),
            Operator::GreaterThan => input_condition.add(column.gt(value)),
            Operator::GreaterThanOrEquals => input_condition.add(column.gte(value)),
            Operator::Like => input_condition.add(column.like(value)),
            Operator::LessThan => input_condition.add(column.lt(value)),
            Operator::LessThanOrEquals => input_condition.add(column.lte(value)),
            Operator::NotEquals => input_condition.add(column.ne(value)),
            Operator::In => input_condition.add(column.is_in(value_list)),
            Operator::NotIn => input_condition.add(column.is_not_in(value_list)),
            Operator::IsNull => input_condition.add(column.is_null()),
            Operator::IsNotNull => input_condition.add(column.is_not_null()),
            Operator::StartsWith => input_condition.add(column.starts_with(value)),
            Operator::EndsWith => input_condition.add(column.ends_with(value)),
            Operator::Between => {
                if !value.is_empty() {
                    if let Some(value_to) = value_to {
                        input_condition.add(column.between(value, value_to.as_str()))
                    } else {
                        return Err(MissingValue("value_to is required for between".to_string()));
                    }
                } else {
                    return Err(MissingValue("value is required for between".to_string()));
                }
            }
            Operator::NotBetween => {
                if !value.is_empty() {
                    if let Some(value_to) = value_to {
                        input_condition.add(column.not_between(value, value_to.as_str()))
                    } else {
                        return Err(MissingValue(
                            "value_to is required for not between".to_string(),
                        ));
                    }
                } else {
                    return Err(MissingValue(
                        "value is required for not between".to_string(),
                    ));
                }
            }
            _ => {
                return Err(InvalidOperator(format!("Invalid operator: {}", operator)));
            }
        };
        Ok(condition)
    }

    fn normalize_query(input_query: StandardQuery) -> StandardQuery {
        let mut query = input_query;
        if query.filter.is_some() {
            query.filter = query.filter.clone().map(|mut filter| {
                filter.must = filter
                    .must
                    .into_iter()
                    .map(|mut condition| {
                        condition.field = condition.field.to_case(Case::Snake);
                        condition
                    })
                    .collect();
                filter.any = filter
                    .any
                    .into_iter()
                    .map(|mut condition| {
                        condition.field = condition.field.to_case(Case::Snake);
                        condition
                    })
                    .collect();
                filter
            });
        }

        if query.sort.is_some() {
            query.sort = query.sort.clone().map(|mut sort| {
                sort.field = sort.field.to_case(Case::Snake);
                sort
            });
        }
        query
    }
}
