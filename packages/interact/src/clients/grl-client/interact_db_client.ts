import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Long: any;
  UUID: any;
};

export enum AddInteractionIdentity {
  Act = 'ACT',
  Entity = 'ENTITY',
  Source = 'SOURCE'
}

export type ComparableGuidOperationFilterInput = {
  eq?: InputMaybe<Scalars['UUID']>;
  gt?: InputMaybe<Scalars['UUID']>;
  gte?: InputMaybe<Scalars['UUID']>;
  in?: InputMaybe<Array<Scalars['UUID']>>;
  lt?: InputMaybe<Scalars['UUID']>;
  lte?: InputMaybe<Scalars['UUID']>;
  neq?: InputMaybe<Scalars['UUID']>;
  ngt?: InputMaybe<Scalars['UUID']>;
  ngte?: InputMaybe<Scalars['UUID']>;
  nin?: InputMaybe<Array<Scalars['UUID']>>;
  nlt?: InputMaybe<Scalars['UUID']>;
  nlte?: InputMaybe<Scalars['UUID']>;
};

export type ComparableInt32OperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
  ngt?: InputMaybe<Scalars['Int']>;
  ngte?: InputMaybe<Scalars['Int']>;
  nin?: InputMaybe<Array<Scalars['Int']>>;
  nlt?: InputMaybe<Scalars['Int']>;
  nlte?: InputMaybe<Scalars['Int']>;
};

export type ComparableNullableOfDateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  neq?: InputMaybe<Scalars['DateTime']>;
  ngt?: InputMaybe<Scalars['DateTime']>;
  ngte?: InputMaybe<Scalars['DateTime']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  nlt?: InputMaybe<Scalars['DateTime']>;
  nlte?: InputMaybe<Scalars['DateTime']>;
};

export type ComparableNullableOfGuidOperationFilterInput = {
  eq?: InputMaybe<Scalars['UUID']>;
  gt?: InputMaybe<Scalars['UUID']>;
  gte?: InputMaybe<Scalars['UUID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UUID']>>>;
  lt?: InputMaybe<Scalars['UUID']>;
  lte?: InputMaybe<Scalars['UUID']>;
  neq?: InputMaybe<Scalars['UUID']>;
  ngt?: InputMaybe<Scalars['UUID']>;
  ngte?: InputMaybe<Scalars['UUID']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['UUID']>>>;
  nlt?: InputMaybe<Scalars['UUID']>;
  nlte?: InputMaybe<Scalars['UUID']>;
};

export type ComparableNullableOfInt32OperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
  ngt?: InputMaybe<Scalars['Int']>;
  ngte?: InputMaybe<Scalars['Int']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  nlt?: InputMaybe<Scalars['Int']>;
  nlte?: InputMaybe<Scalars['Int']>;
};

export type ContextRelation = {
  __typename?: 'ContextRelation';
  content?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  hostInteraction?: Maybe<Interaction>;
  hostInteractionId: Scalars['Int'];
  label?: Maybe<Scalars['String']>;
  linkedInteraction?: Maybe<Interaction>;
  linkedInteractionId: Scalars['Int'];
  type: RelationTypes;
  uuid?: Maybe<Scalars['UUID']>;
  weight: RelationWeight;
};

export type ContextRelationFilterInput = {
  and?: InputMaybe<Array<ContextRelationFilterInput>>;
  content?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  hostInteraction?: InputMaybe<InteractionFilterInput>;
  hostInteractionId?: InputMaybe<ComparableInt32OperationFilterInput>;
  label?: InputMaybe<StringOperationFilterInput>;
  linkedInteraction?: InputMaybe<InteractionFilterInput>;
  linkedInteractionId?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<ContextRelationFilterInput>>;
  type?: InputMaybe<RelationTypesOperationFilterInput>;
  uuid?: InputMaybe<ComparableNullableOfGuidOperationFilterInput>;
  weight?: InputMaybe<RelationWeightOperationFilterInput>;
};

export type CreateOrUpdateInteractionRequestDtoInput = {
  content: Scalars['String'];
  contextIds: Array<CreateOrUpdateRelationDtoInput>;
  description: Scalars['String'];
  end: Scalars['Long'];
  firstActId: Scalars['Int'];
  id?: InputMaybe<Scalars['Int']>;
  identity?: InputMaybe<AddInteractionIdentity>;
  indirectObjectIds: Array<CreateOrUpdateRelationDtoInput>;
  label: Scalars['String'];
  objectIds: Array<CreateOrUpdateRelationDtoInput>;
  parallelIds: Array<CreateOrUpdateRelationDtoInput>;
  propertyIds?: InputMaybe<Array<Scalars['Int']>>;
  purposeIds: Array<CreateOrUpdateRelationDtoInput>;
  referenceIds: Array<CreateOrUpdateRelationDtoInput>;
  secondActId: Scalars['Int'];
  settingIds: Array<CreateOrUpdateRelationDtoInput>;
  start: Scalars['Long'];
  subjectIds: Array<CreateOrUpdateRelationDtoInput>;
  uuid?: InputMaybe<Scalars['UUID']>;
};

export type CreateOrUpdateRelationDtoInput = {
  content?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  hostInteractionId: Scalars['Int'];
  id?: InputMaybe<Scalars['Int']>;
  label?: InputMaybe<Scalars['String']>;
  linkedInteractionId: Scalars['Int'];
  relationType: RelationTypes;
  uuid?: InputMaybe<Scalars['UUID']>;
  weight: RelationWeight;
};

export type EdgeOfRelation = {
  __typename?: 'EdgeOfRelation';
  content?: Maybe<Scalars['String']>;
  data?: Maybe<Relation>;
  description?: Maybe<Scalars['String']>;
  displayId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  sourceId: Scalars['Int'];
  targetId: Scalars['Int'];
  uuid?: Maybe<Scalars['UUID']>;
  weight: Scalars['Int'];
};

export type FirstAct = {
  __typename?: 'FirstAct';
  content?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  guid: Scalars['UUID'];
  id: Scalars['Int'];
  interactions?: Maybe<Array<Maybe<Interaction>>>;
  label?: Maybe<Scalars['String']>;
};

export type FirstActFilterInput = {
  and?: InputMaybe<Array<FirstActFilterInput>>;
  content?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  guid?: InputMaybe<ComparableGuidOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  interactions?: InputMaybe<ListFilterInputTypeOfInteractionFilterInput>;
  label?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<FirstActFilterInput>>;
};

export type FirstActSortInput = {
  content?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  guid?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  label?: InputMaybe<SortEnumType>;
};

export type GraphOfRelationAndInteraction = {
  __typename?: 'GraphOfRelationAndInteraction';
  edges?: Maybe<Array<Maybe<EdgeOfRelation>>>;
  nodes?: Maybe<Array<Maybe<NodeOfInteraction>>>;
  uuid: Scalars['UUID'];
};

export type GraphQlMutation = {
  __typename?: 'GraphQLMutation';
  addNewEntityInteraction?: Maybe<Interaction>;
  createOrUpdateInteraction?: Maybe<Interaction>;
  createOrUpdateRelation: Relation;
  deleteInteraction: Scalars['Int'];
  deleteRelation: Scalars['Int'];
};


export type GraphQlMutationAddNewEntityInteractionArgs = {
  label: Scalars['String'];
};


export type GraphQlMutationCreateOrUpdateInteractionArgs = {
  requestDto: CreateOrUpdateInteractionRequestDtoInput;
};


export type GraphQlMutationCreateOrUpdateRelationArgs = {
  requestDto: CreateOrUpdateRelationDtoInput;
};


export type GraphQlMutationDeleteInteractionArgs = {
  id: Scalars['Int'];
};


export type GraphQlMutationDeleteRelationArgs = {
  hostInteractionId: Scalars['Int'];
  linkedInteractionId: Scalars['Int'];
  relationId: Scalars['UUID'];
  type: RelationTypes;
};

export type GraphQlQuery = {
  __typename?: 'GraphQLQuery';
  fullInteractionWithAllRelations: InteractionResult;
  interactionFull: InteractionResult;
  interactions?: Maybe<InteractionsConnection>;
};


export type GraphQlQueryFullInteractionWithAllRelationsArgs = {
  id: Scalars['Int'];
};


export type GraphQlQueryInteractionFullArgs = {
  id: Scalars['Int'];
};


export type GraphQlQueryInteractionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<InteractionSortInput>>;
  where?: InputMaybe<InteractionFilterInput>;
};

export type IndirectObjectRelation = {
  __typename?: 'IndirectObjectRelation';
  content?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  hostInteraction?: Maybe<Interaction>;
  hostInteractionId: Scalars['Int'];
  label?: Maybe<Scalars['String']>;
  linkedInteraction?: Maybe<Interaction>;
  linkedInteractionId: Scalars['Int'];
  type: RelationTypes;
  uuid?: Maybe<Scalars['UUID']>;
  weight: RelationWeight;
};

export type IndirectObjectRelationFilterInput = {
  and?: InputMaybe<Array<IndirectObjectRelationFilterInput>>;
  content?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  hostInteraction?: InputMaybe<InteractionFilterInput>;
  hostInteractionId?: InputMaybe<ComparableInt32OperationFilterInput>;
  label?: InputMaybe<StringOperationFilterInput>;
  linkedInteraction?: InputMaybe<InteractionFilterInput>;
  linkedInteractionId?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<IndirectObjectRelationFilterInput>>;
  type?: InputMaybe<RelationTypesOperationFilterInput>;
  uuid?: InputMaybe<ComparableNullableOfGuidOperationFilterInput>;
  weight?: InputMaybe<RelationWeightOperationFilterInput>;
};

export type Interaction = {
  __typename?: 'Interaction';
  asContexts?: Maybe<Array<Maybe<ContextRelation>>>;
  asIndirectObjects?: Maybe<Array<Maybe<IndirectObjectRelation>>>;
  asObjects?: Maybe<Array<Maybe<ObjectRelation>>>;
  asParallels?: Maybe<Array<Maybe<ParallelRelation>>>;
  asPurposes?: Maybe<Array<Maybe<PurposeRelation>>>;
  asReferences?: Maybe<Array<Maybe<ReferenceRelation>>>;
  asSettings?: Maybe<Array<Maybe<SettingRelation>>>;
  asSubjects?: Maybe<Array<Maybe<SubjectRelation>>>;
  content?: Maybe<Scalars['String']>;
  contexts?: Maybe<Array<Maybe<ContextRelation>>>;
  description?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['DateTime']>;
  firstAct: FirstAct;
  firstActId: Scalars['Int'];
  id: Scalars['Int'];
  identity: InteractionIdentity;
  indirectObjects?: Maybe<Array<Maybe<IndirectObjectRelation>>>;
  label: Scalars['String'];
  objects?: Maybe<Array<Maybe<ObjectRelation>>>;
  parallels?: Maybe<Array<Maybe<ParallelRelation>>>;
  properties?: Maybe<Array<Maybe<Property>>>;
  purposes?: Maybe<Array<Maybe<PurposeRelation>>>;
  references?: Maybe<Array<Maybe<ReferenceRelation>>>;
  secondAct?: Maybe<SecondAct>;
  secondActId?: Maybe<Scalars['Int']>;
  settings?: Maybe<Array<Maybe<SettingRelation>>>;
  start?: Maybe<Scalars['DateTime']>;
  subjects?: Maybe<Array<Maybe<SubjectRelation>>>;
  uuid: Scalars['UUID'];
};

export type InteractionFilterInput = {
  and?: InputMaybe<Array<InteractionFilterInput>>;
  asContexts?: InputMaybe<ListFilterInputTypeOfContextRelationFilterInput>;
  asIndirectObjects?: InputMaybe<ListFilterInputTypeOfIndirectObjectRelationFilterInput>;
  asObjects?: InputMaybe<ListFilterInputTypeOfObjectRelationFilterInput>;
  asParallels?: InputMaybe<ListFilterInputTypeOfParallelRelationFilterInput>;
  asPurposes?: InputMaybe<ListFilterInputTypeOfPurposeRelationFilterInput>;
  asReferences?: InputMaybe<ListFilterInputTypeOfReferenceRelationFilterInput>;
  asSettings?: InputMaybe<ListFilterInputTypeOfSettingRelationFilterInput>;
  asSubjects?: InputMaybe<ListFilterInputTypeOfSubjectRelationFilterInput>;
  content?: InputMaybe<StringOperationFilterInput>;
  contexts?: InputMaybe<ListFilterInputTypeOfContextRelationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  end?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  firstAct?: InputMaybe<FirstActFilterInput>;
  firstActId?: InputMaybe<ComparableInt32OperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  identity?: InputMaybe<InteractionIdentityOperationFilterInput>;
  indirectObjects?: InputMaybe<ListFilterInputTypeOfIndirectObjectRelationFilterInput>;
  label?: InputMaybe<StringOperationFilterInput>;
  objects?: InputMaybe<ListFilterInputTypeOfObjectRelationFilterInput>;
  or?: InputMaybe<Array<InteractionFilterInput>>;
  parallels?: InputMaybe<ListFilterInputTypeOfParallelRelationFilterInput>;
  properties?: InputMaybe<ListFilterInputTypeOfPropertyFilterInput>;
  purposes?: InputMaybe<ListFilterInputTypeOfPurposeRelationFilterInput>;
  references?: InputMaybe<ListFilterInputTypeOfReferenceRelationFilterInput>;
  secondAct?: InputMaybe<SecondActFilterInput>;
  secondActId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  settings?: InputMaybe<ListFilterInputTypeOfSettingRelationFilterInput>;
  start?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  subjects?: InputMaybe<ListFilterInputTypeOfSubjectRelationFilterInput>;
  uuid?: InputMaybe<ComparableGuidOperationFilterInput>;
};

export enum InteractionIdentity {
  Entity = 'ENTITY',
  Interaction = 'INTERACTION',
  Source = 'SOURCE'
}

export type InteractionIdentityOperationFilterInput = {
  eq?: InputMaybe<InteractionIdentity>;
  in?: InputMaybe<Array<InteractionIdentity>>;
  neq?: InputMaybe<InteractionIdentity>;
  nin?: InputMaybe<Array<InteractionIdentity>>;
};

export type InteractionResult = {
  __typename?: 'InteractionResult';
  graph?: Maybe<GraphOfRelationAndInteraction>;
  interaction?: Maybe<Interaction>;
  resultType: InteractionResultType;
};

export enum InteractionResultType {
  /** With owned relations, i.e. relations that are actively linked to it. */
  FullInteraction = 'FULL_INTERACTION',
  /** With owned relations and all reverse relations that are linked to it. */
  FullInteractionWithAllRelations = 'FULL_INTERACTION_WITH_ALL_RELATIONS',
  /** Only the essential interaction properties are returned. */
  ScalarInteraction = 'SCALAR_INTERACTION'
}

export type InteractionSortInput = {
  content?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  end?: InputMaybe<SortEnumType>;
  firstAct?: InputMaybe<FirstActSortInput>;
  firstActId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  identity?: InputMaybe<SortEnumType>;
  label?: InputMaybe<SortEnumType>;
  secondAct?: InputMaybe<SecondActSortInput>;
  secondActId?: InputMaybe<SortEnumType>;
  start?: InputMaybe<SortEnumType>;
  uuid?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type InteractionsConnection = {
  __typename?: 'InteractionsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<InteractionsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Maybe<Interaction>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type InteractionsEdge = {
  __typename?: 'InteractionsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Interaction>;
};

export type ListFilterInputTypeOfContextRelationFilterInput = {
  all?: InputMaybe<ContextRelationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ContextRelationFilterInput>;
  some?: InputMaybe<ContextRelationFilterInput>;
};

export type ListFilterInputTypeOfIndirectObjectRelationFilterInput = {
  all?: InputMaybe<IndirectObjectRelationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<IndirectObjectRelationFilterInput>;
  some?: InputMaybe<IndirectObjectRelationFilterInput>;
};

export type ListFilterInputTypeOfInteractionFilterInput = {
  all?: InputMaybe<InteractionFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<InteractionFilterInput>;
  some?: InputMaybe<InteractionFilterInput>;
};

export type ListFilterInputTypeOfObjectRelationFilterInput = {
  all?: InputMaybe<ObjectRelationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ObjectRelationFilterInput>;
  some?: InputMaybe<ObjectRelationFilterInput>;
};

export type ListFilterInputTypeOfParallelRelationFilterInput = {
  all?: InputMaybe<ParallelRelationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ParallelRelationFilterInput>;
  some?: InputMaybe<ParallelRelationFilterInput>;
};

export type ListFilterInputTypeOfPropertyFilterInput = {
  all?: InputMaybe<PropertyFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<PropertyFilterInput>;
  some?: InputMaybe<PropertyFilterInput>;
};

export type ListFilterInputTypeOfPurposeRelationFilterInput = {
  all?: InputMaybe<PurposeRelationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<PurposeRelationFilterInput>;
  some?: InputMaybe<PurposeRelationFilterInput>;
};

export type ListFilterInputTypeOfReferenceRelationFilterInput = {
  all?: InputMaybe<ReferenceRelationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ReferenceRelationFilterInput>;
  some?: InputMaybe<ReferenceRelationFilterInput>;
};

export type ListFilterInputTypeOfSettingRelationFilterInput = {
  all?: InputMaybe<SettingRelationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<SettingRelationFilterInput>;
  some?: InputMaybe<SettingRelationFilterInput>;
};

export type ListFilterInputTypeOfSubjectRelationFilterInput = {
  all?: InputMaybe<SubjectRelationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<SubjectRelationFilterInput>;
  some?: InputMaybe<SubjectRelationFilterInput>;
};

export type NodeOfInteraction = {
  __typename?: 'NodeOfInteraction';
  content?: Maybe<Scalars['String']>;
  data?: Maybe<Interaction>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  label?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

export type ObjectRelation = {
  __typename?: 'ObjectRelation';
  content?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  hostInteraction?: Maybe<Interaction>;
  hostInteractionId: Scalars['Int'];
  label?: Maybe<Scalars['String']>;
  linkedInteraction?: Maybe<Interaction>;
  linkedInteractionId: Scalars['Int'];
  type: RelationTypes;
  uuid?: Maybe<Scalars['UUID']>;
  weight: RelationWeight;
};

export type ObjectRelationFilterInput = {
  and?: InputMaybe<Array<ObjectRelationFilterInput>>;
  content?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  hostInteraction?: InputMaybe<InteractionFilterInput>;
  hostInteractionId?: InputMaybe<ComparableInt32OperationFilterInput>;
  label?: InputMaybe<StringOperationFilterInput>;
  linkedInteraction?: InputMaybe<InteractionFilterInput>;
  linkedInteractionId?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<ObjectRelationFilterInput>>;
  type?: InputMaybe<RelationTypesOperationFilterInput>;
  uuid?: InputMaybe<ComparableNullableOfGuidOperationFilterInput>;
  weight?: InputMaybe<RelationWeightOperationFilterInput>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type ParallelRelation = {
  __typename?: 'ParallelRelation';
  content?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  hostInteraction?: Maybe<Interaction>;
  hostInteractionId: Scalars['Int'];
  label?: Maybe<Scalars['String']>;
  linkedInteraction?: Maybe<Interaction>;
  linkedInteractionId: Scalars['Int'];
  type: RelationTypes;
  uuid?: Maybe<Scalars['UUID']>;
  weight: RelationWeight;
};

export type ParallelRelationFilterInput = {
  and?: InputMaybe<Array<ParallelRelationFilterInput>>;
  content?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  hostInteraction?: InputMaybe<InteractionFilterInput>;
  hostInteractionId?: InputMaybe<ComparableInt32OperationFilterInput>;
  label?: InputMaybe<StringOperationFilterInput>;
  linkedInteraction?: InputMaybe<InteractionFilterInput>;
  linkedInteractionId?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<ParallelRelationFilterInput>>;
  type?: InputMaybe<RelationTypesOperationFilterInput>;
  uuid?: InputMaybe<ComparableNullableOfGuidOperationFilterInput>;
  weight?: InputMaybe<RelationWeightOperationFilterInput>;
};

export type Property = {
  __typename?: 'Property';
  description?: Maybe<Scalars['String']>;
  guid: Scalars['UUID'];
  id: Scalars['Int'];
  interaction?: Maybe<Interaction>;
  interactionId: Scalars['Int'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type PropertyFilterInput = {
  and?: InputMaybe<Array<PropertyFilterInput>>;
  description?: InputMaybe<StringOperationFilterInput>;
  guid?: InputMaybe<ComparableGuidOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  interaction?: InputMaybe<InteractionFilterInput>;
  interactionId?: InputMaybe<ComparableInt32OperationFilterInput>;
  key?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<PropertyFilterInput>>;
  value?: InputMaybe<StringOperationFilterInput>;
};

export type PurposeRelation = {
  __typename?: 'PurposeRelation';
  content?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  hostInteraction?: Maybe<Interaction>;
  hostInteractionId: Scalars['Int'];
  label?: Maybe<Scalars['String']>;
  linkedInteraction?: Maybe<Interaction>;
  linkedInteractionId: Scalars['Int'];
  type: RelationTypes;
  uuid?: Maybe<Scalars['UUID']>;
  weight: RelationWeight;
};

export type PurposeRelationFilterInput = {
  and?: InputMaybe<Array<PurposeRelationFilterInput>>;
  content?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  hostInteraction?: InputMaybe<InteractionFilterInput>;
  hostInteractionId?: InputMaybe<ComparableInt32OperationFilterInput>;
  label?: InputMaybe<StringOperationFilterInput>;
  linkedInteraction?: InputMaybe<InteractionFilterInput>;
  linkedInteractionId?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<PurposeRelationFilterInput>>;
  type?: InputMaybe<RelationTypesOperationFilterInput>;
  uuid?: InputMaybe<ComparableNullableOfGuidOperationFilterInput>;
  weight?: InputMaybe<RelationWeightOperationFilterInput>;
};

export type ReferenceRelation = {
  __typename?: 'ReferenceRelation';
  content?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  hostInteraction?: Maybe<Interaction>;
  hostInteractionId: Scalars['Int'];
  label?: Maybe<Scalars['String']>;
  linkedInteraction?: Maybe<Interaction>;
  linkedInteractionId: Scalars['Int'];
  type: RelationTypes;
  uuid?: Maybe<Scalars['UUID']>;
  weight: RelationWeight;
};

export type ReferenceRelationFilterInput = {
  and?: InputMaybe<Array<ReferenceRelationFilterInput>>;
  content?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  hostInteraction?: InputMaybe<InteractionFilterInput>;
  hostInteractionId?: InputMaybe<ComparableInt32OperationFilterInput>;
  label?: InputMaybe<StringOperationFilterInput>;
  linkedInteraction?: InputMaybe<InteractionFilterInput>;
  linkedInteractionId?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<ReferenceRelationFilterInput>>;
  type?: InputMaybe<RelationTypesOperationFilterInput>;
  uuid?: InputMaybe<ComparableNullableOfGuidOperationFilterInput>;
  weight?: InputMaybe<RelationWeightOperationFilterInput>;
};

export type Relation = {
  __typename?: 'Relation';
  content?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  hostInteraction?: Maybe<Interaction>;
  hostInteractionId: Scalars['Int'];
  label?: Maybe<Scalars['String']>;
  linkedInteraction?: Maybe<Interaction>;
  linkedInteractionId: Scalars['Int'];
  type: RelationTypes;
  uuid?: Maybe<Scalars['UUID']>;
  weight: RelationWeight;
};

export enum RelationTypes {
  ContextRelation = 'CONTEXT_RELATION',
  IndirectObjectRelation = 'INDIRECT_OBJECT_RELATION',
  ObjectRelation = 'OBJECT_RELATION',
  ParallelRelation = 'PARALLEL_RELATION',
  PurposeRelation = 'PURPOSE_RELATION',
  ReferenceRelation = 'REFERENCE_RELATION',
  SettingRelation = 'SETTING_RELATION',
  SubjectRelation = 'SUBJECT_RELATION'
}

export type RelationTypesOperationFilterInput = {
  eq?: InputMaybe<RelationTypes>;
  in?: InputMaybe<Array<RelationTypes>>;
  neq?: InputMaybe<RelationTypes>;
  nin?: InputMaybe<Array<RelationTypes>>;
};

export enum RelationWeight {
  Important = 'IMPORTANT',
  MostImportant = 'MOST_IMPORTANT',
  Must = 'MUST',
  Never = 'NEVER',
  NotImportant = 'NOT_IMPORTANT',
  SomewhatImportant = 'SOMEWHAT_IMPORTANT',
  VeryImportant = 'VERY_IMPORTANT'
}

export type RelationWeightOperationFilterInput = {
  eq?: InputMaybe<RelationWeight>;
  in?: InputMaybe<Array<RelationWeight>>;
  neq?: InputMaybe<RelationWeight>;
  nin?: InputMaybe<Array<RelationWeight>>;
};

export type SecondAct = {
  __typename?: 'SecondAct';
  content?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  guid: Scalars['UUID'];
  id: Scalars['Int'];
  interactions?: Maybe<Array<Maybe<Interaction>>>;
  label?: Maybe<Scalars['String']>;
};

export type SecondActFilterInput = {
  and?: InputMaybe<Array<SecondActFilterInput>>;
  content?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  guid?: InputMaybe<ComparableGuidOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  interactions?: InputMaybe<ListFilterInputTypeOfInteractionFilterInput>;
  label?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<SecondActFilterInput>>;
};

export type SecondActSortInput = {
  content?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  guid?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  label?: InputMaybe<SortEnumType>;
};

export type SettingRelation = {
  __typename?: 'SettingRelation';
  content?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  hostInteraction?: Maybe<Interaction>;
  hostInteractionId: Scalars['Int'];
  label?: Maybe<Scalars['String']>;
  linkedInteraction?: Maybe<Interaction>;
  linkedInteractionId: Scalars['Int'];
  type: RelationTypes;
  uuid?: Maybe<Scalars['UUID']>;
  weight: RelationWeight;
};

export type SettingRelationFilterInput = {
  and?: InputMaybe<Array<SettingRelationFilterInput>>;
  content?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  hostInteraction?: InputMaybe<InteractionFilterInput>;
  hostInteractionId?: InputMaybe<ComparableInt32OperationFilterInput>;
  label?: InputMaybe<StringOperationFilterInput>;
  linkedInteraction?: InputMaybe<InteractionFilterInput>;
  linkedInteractionId?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<SettingRelationFilterInput>>;
  type?: InputMaybe<RelationTypesOperationFilterInput>;
  uuid?: InputMaybe<ComparableNullableOfGuidOperationFilterInput>;
  weight?: InputMaybe<RelationWeightOperationFilterInput>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ncontains?: InputMaybe<Scalars['String']>;
  nendsWith?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  nstartsWith?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type SubjectRelation = {
  __typename?: 'SubjectRelation';
  content?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  hostInteraction?: Maybe<Interaction>;
  hostInteractionId: Scalars['Int'];
  label?: Maybe<Scalars['String']>;
  linkedInteraction?: Maybe<Interaction>;
  linkedInteractionId: Scalars['Int'];
  type: RelationTypes;
  uuid?: Maybe<Scalars['UUID']>;
  weight: RelationWeight;
};

export type SubjectRelationFilterInput = {
  and?: InputMaybe<Array<SubjectRelationFilterInput>>;
  content?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  hostInteraction?: InputMaybe<InteractionFilterInput>;
  hostInteractionId?: InputMaybe<ComparableInt32OperationFilterInput>;
  label?: InputMaybe<StringOperationFilterInput>;
  linkedInteraction?: InputMaybe<InteractionFilterInput>;
  linkedInteractionId?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<SubjectRelationFilterInput>>;
  type?: InputMaybe<RelationTypesOperationFilterInput>;
  uuid?: InputMaybe<ComparableNullableOfGuidOperationFilterInput>;
  weight?: InputMaybe<RelationWeightOperationFilterInput>;
};

export type GetInteractionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInteractionsQuery = { __typename?: 'GraphQLQuery', interactions?: { __typename?: 'InteractionsConnection', totalCount: number, edges?: Array<{ __typename?: 'InteractionsEdge', cursor: string, node?: { __typename?: 'Interaction', id: number, label: string, uuid: any } | null }> | null, nodes?: Array<{ __typename?: 'Interaction', id: number, uuid: any, label: string, identity: InteractionIdentity, subjects?: Array<{ __typename?: 'SubjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, objects?: Array<{ __typename?: 'ObjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, parallels?: Array<{ __typename?: 'ParallelRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, settings?: Array<{ __typename?: 'SettingRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, indirectObjects?: Array<{ __typename?: 'IndirectObjectRelation', type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, hostInteractionId: number, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, references?: Array<{ __typename?: 'ReferenceRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, contexts?: Array<{ __typename?: 'ContextRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, purposes?: Array<{ __typename?: 'PurposeRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, firstAct: { __typename?: 'FirstAct', id: number, guid: any, label?: string | null, description?: string | null }, secondAct?: { __typename?: 'SecondAct', id: number, guid: any, label?: string | null, description?: string | null } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } | null };

export type GetInteractionFullWithAllRelationsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetInteractionFullWithAllRelationsQuery = { __typename?: 'GraphQLQuery', fullInteractionWithAllRelations: { __typename?: 'InteractionResult', interaction?: { __typename?: 'Interaction', id: number, uuid: any, label: string, identity: InteractionIdentity, subjects?: Array<{ __typename?: 'SubjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, objects?: Array<{ __typename?: 'ObjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, parallels?: Array<{ __typename?: 'ParallelRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, settings?: Array<{ __typename?: 'SettingRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, indirectObjects?: Array<{ __typename?: 'IndirectObjectRelation', type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, hostInteractionId: number, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, references?: Array<{ __typename?: 'ReferenceRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, contexts?: Array<{ __typename?: 'ContextRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, purposes?: Array<{ __typename?: 'PurposeRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, firstAct: { __typename?: 'FirstAct', id: number, guid: any, label?: string | null, description?: string | null }, secondAct?: { __typename?: 'SecondAct', id: number, guid: any, label?: string | null, description?: string | null } | null } | null, graph?: { __typename?: 'GraphOfRelationAndInteraction', uuid: any, nodes?: Array<{ __typename?: 'NodeOfInteraction', id: number, uuid: any, label?: string | null, description?: string | null, content?: string | null, data?: { __typename?: 'Interaction', id: number, uuid: any, label: string, identity: InteractionIdentity, subjects?: Array<{ __typename?: 'SubjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, objects?: Array<{ __typename?: 'ObjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, parallels?: Array<{ __typename?: 'ParallelRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, settings?: Array<{ __typename?: 'SettingRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, indirectObjects?: Array<{ __typename?: 'IndirectObjectRelation', type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, hostInteractionId: number, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, references?: Array<{ __typename?: 'ReferenceRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, contexts?: Array<{ __typename?: 'ContextRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, purposes?: Array<{ __typename?: 'PurposeRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, firstAct: { __typename?: 'FirstAct', id: number, guid: any, label?: string | null, description?: string | null }, secondAct?: { __typename?: 'SecondAct', id: number, guid: any, label?: string | null, description?: string | null } | null } | null } | null> | null, edges?: Array<{ __typename?: 'EdgeOfRelation', id?: string | null, uuid?: any | null, displayId?: string | null, label?: string | null, description?: string | null, content?: string | null, weight: number, sourceId: number, targetId: number, data?: { __typename?: 'Relation', linkedInteractionId: number, uuid?: any | null, label?: string | null, description?: string | null, content?: string | null, type: RelationTypes, weight: RelationWeight, hostInteractionId: number } | null } | null> | null } | null } };

export type FilterInteractionsByLabelQueryVariables = Exact<{
  labelFilter: Scalars['String'];
}>;


export type FilterInteractionsByLabelQuery = { __typename?: 'GraphQLQuery', interactions?: { __typename?: 'InteractionsConnection', nodes?: Array<{ __typename?: 'Interaction', id: number, uuid: any, label: string, identity: InteractionIdentity, subjects?: Array<{ __typename?: 'SubjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, objects?: Array<{ __typename?: 'ObjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, parallels?: Array<{ __typename?: 'ParallelRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, settings?: Array<{ __typename?: 'SettingRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, indirectObjects?: Array<{ __typename?: 'IndirectObjectRelation', type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, hostInteractionId: number, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, references?: Array<{ __typename?: 'ReferenceRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, contexts?: Array<{ __typename?: 'ContextRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, purposes?: Array<{ __typename?: 'PurposeRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, firstAct: { __typename?: 'FirstAct', id: number, guid: any, label?: string | null, description?: string | null }, secondAct?: { __typename?: 'SecondAct', id: number, guid: any, label?: string | null, description?: string | null } | null } | null> | null } | null };

export type GetInteractionFullQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetInteractionFullQuery = { __typename?: 'GraphQLQuery', interactionFull: { __typename?: 'InteractionResult', interaction?: { __typename?: 'Interaction', id: number, uuid: any, label: string, identity: InteractionIdentity, subjects?: Array<{ __typename?: 'SubjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, objects?: Array<{ __typename?: 'ObjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, parallels?: Array<{ __typename?: 'ParallelRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, settings?: Array<{ __typename?: 'SettingRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, indirectObjects?: Array<{ __typename?: 'IndirectObjectRelation', type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, hostInteractionId: number, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, references?: Array<{ __typename?: 'ReferenceRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, contexts?: Array<{ __typename?: 'ContextRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, purposes?: Array<{ __typename?: 'PurposeRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, firstAct: { __typename?: 'FirstAct', id: number, guid: any, label?: string | null, description?: string | null }, secondAct?: { __typename?: 'SecondAct', id: number, guid: any, label?: string | null, description?: string | null } | null } | null, graph?: { __typename?: 'GraphOfRelationAndInteraction', uuid: any, nodes?: Array<{ __typename?: 'NodeOfInteraction', id: number, uuid: any, label?: string | null, description?: string | null, content?: string | null, data?: { __typename?: 'Interaction', id: number, uuid: any, label: string, identity: InteractionIdentity, subjects?: Array<{ __typename?: 'SubjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, objects?: Array<{ __typename?: 'ObjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, parallels?: Array<{ __typename?: 'ParallelRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, settings?: Array<{ __typename?: 'SettingRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, indirectObjects?: Array<{ __typename?: 'IndirectObjectRelation', type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, hostInteractionId: number, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, references?: Array<{ __typename?: 'ReferenceRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, contexts?: Array<{ __typename?: 'ContextRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, purposes?: Array<{ __typename?: 'PurposeRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, firstAct: { __typename?: 'FirstAct', id: number, guid: any, label?: string | null, description?: string | null }, secondAct?: { __typename?: 'SecondAct', id: number, guid: any, label?: string | null, description?: string | null } | null } | null } | null> | null, edges?: Array<{ __typename?: 'EdgeOfRelation', id?: string | null, uuid?: any | null, displayId?: string | null, label?: string | null, description?: string | null, content?: string | null, weight: number, sourceId: number, targetId: number, data?: { __typename?: 'Relation', linkedInteractionId: number, uuid?: any | null, label?: string | null, description?: string | null, content?: string | null, type: RelationTypes, weight: RelationWeight, hostInteractionId: number } | null } | null> | null } | null } };

export type DeleteInteractionMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteInteractionMutation = { __typename?: 'GraphQLMutation', deleteInteraction: number };

export type AddNewInteractionEntityMutationVariables = Exact<{
  label: Scalars['String'];
}>;


export type AddNewInteractionEntityMutation = { __typename?: 'GraphQLMutation', addNewEntityInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string, identity: InteractionIdentity, subjects?: Array<{ __typename?: 'SubjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, objects?: Array<{ __typename?: 'ObjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, parallels?: Array<{ __typename?: 'ParallelRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, settings?: Array<{ __typename?: 'SettingRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, indirectObjects?: Array<{ __typename?: 'IndirectObjectRelation', type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, hostInteractionId: number, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, references?: Array<{ __typename?: 'ReferenceRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, contexts?: Array<{ __typename?: 'ContextRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, purposes?: Array<{ __typename?: 'PurposeRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, firstAct: { __typename?: 'FirstAct', id: number, guid: any, label?: string | null, description?: string | null }, secondAct?: { __typename?: 'SecondAct', id: number, guid: any, label?: string | null, description?: string | null } | null } | null };

export type AddInteractionMutationVariables = Exact<{
  request: CreateOrUpdateInteractionRequestDtoInput;
}>;


export type AddInteractionMutation = { __typename?: 'GraphQLMutation', createOrUpdateInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string, identity: InteractionIdentity, subjects?: Array<{ __typename?: 'SubjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, objects?: Array<{ __typename?: 'ObjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, parallels?: Array<{ __typename?: 'ParallelRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, settings?: Array<{ __typename?: 'SettingRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, indirectObjects?: Array<{ __typename?: 'IndirectObjectRelation', type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, hostInteractionId: number, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, references?: Array<{ __typename?: 'ReferenceRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, contexts?: Array<{ __typename?: 'ContextRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, purposes?: Array<{ __typename?: 'PurposeRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, firstAct: { __typename?: 'FirstAct', id: number, guid: any, label?: string | null, description?: string | null }, secondAct?: { __typename?: 'SecondAct', id: number, guid: any, label?: string | null, description?: string | null } | null } | null };

export type InteractionFragmentFragment = { __typename?: 'Interaction', id: number, uuid: any, label: string, identity: InteractionIdentity, subjects?: Array<{ __typename?: 'SubjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, objects?: Array<{ __typename?: 'ObjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, parallels?: Array<{ __typename?: 'ParallelRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, settings?: Array<{ __typename?: 'SettingRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, indirectObjects?: Array<{ __typename?: 'IndirectObjectRelation', type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, hostInteractionId: number, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, references?: Array<{ __typename?: 'ReferenceRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, contexts?: Array<{ __typename?: 'ContextRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, purposes?: Array<{ __typename?: 'PurposeRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, firstAct: { __typename?: 'FirstAct', id: number, guid: any, label?: string | null, description?: string | null }, secondAct?: { __typename?: 'SecondAct', id: number, guid: any, label?: string | null, description?: string | null } | null };

export type SubjectFragmentFragment = { __typename?: 'SubjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null };

export type ObjectFragmentFragment = { __typename?: 'ObjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null };

export type ParallelFragmentFragment = { __typename?: 'ParallelRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null };

export type SettingFragmentFragment = { __typename?: 'SettingRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null };

export type ContextFragmentFragment = { __typename?: 'ContextRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null };

export type PurposeFragmentFragment = { __typename?: 'PurposeRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null };

export type ReferenceFragmentFragment = { __typename?: 'ReferenceRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null };

export type IndirectObjectFragmentFragment = { __typename?: 'IndirectObjectRelation', type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, hostInteractionId: number, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null };

export type MinimalInteractionFragmentFragment = { __typename?: 'Interaction', id: number, uuid: any, label: string };

export type ActsFragmentFragment = { __typename?: 'Interaction', firstAct: { __typename?: 'FirstAct', id: number, guid: any, label?: string | null, description?: string | null }, secondAct?: { __typename?: 'SecondAct', id: number, guid: any, label?: string | null, description?: string | null } | null };

export type FirstActFragmentFragment = { __typename?: 'FirstAct', id: number, guid: any, label?: string | null, description?: string | null };

export type SecondActFragmentFragment = { __typename?: 'SecondAct', id: number, guid: any, label?: string | null, description?: string | null };

export type PageInforFragmentFragment = { __typename?: 'InteractionsConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } };

export type InteractionResultFragmentFragment = { __typename?: 'InteractionResult', interaction?: { __typename?: 'Interaction', id: number, uuid: any, label: string, identity: InteractionIdentity, subjects?: Array<{ __typename?: 'SubjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, objects?: Array<{ __typename?: 'ObjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, parallels?: Array<{ __typename?: 'ParallelRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, settings?: Array<{ __typename?: 'SettingRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, indirectObjects?: Array<{ __typename?: 'IndirectObjectRelation', type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, hostInteractionId: number, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, references?: Array<{ __typename?: 'ReferenceRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, contexts?: Array<{ __typename?: 'ContextRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, purposes?: Array<{ __typename?: 'PurposeRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, firstAct: { __typename?: 'FirstAct', id: number, guid: any, label?: string | null, description?: string | null }, secondAct?: { __typename?: 'SecondAct', id: number, guid: any, label?: string | null, description?: string | null } | null } | null, graph?: { __typename?: 'GraphOfRelationAndInteraction', uuid: any, nodes?: Array<{ __typename?: 'NodeOfInteraction', id: number, uuid: any, label?: string | null, description?: string | null, content?: string | null, data?: { __typename?: 'Interaction', id: number, uuid: any, label: string, identity: InteractionIdentity, subjects?: Array<{ __typename?: 'SubjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, objects?: Array<{ __typename?: 'ObjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, parallels?: Array<{ __typename?: 'ParallelRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, settings?: Array<{ __typename?: 'SettingRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, indirectObjects?: Array<{ __typename?: 'IndirectObjectRelation', type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, hostInteractionId: number, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, references?: Array<{ __typename?: 'ReferenceRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, contexts?: Array<{ __typename?: 'ContextRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, purposes?: Array<{ __typename?: 'PurposeRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, firstAct: { __typename?: 'FirstAct', id: number, guid: any, label?: string | null, description?: string | null }, secondAct?: { __typename?: 'SecondAct', id: number, guid: any, label?: string | null, description?: string | null } | null } | null } | null> | null, edges?: Array<{ __typename?: 'EdgeOfRelation', id?: string | null, uuid?: any | null, displayId?: string | null, label?: string | null, description?: string | null, content?: string | null, weight: number, sourceId: number, targetId: number, data?: { __typename?: 'Relation', linkedInteractionId: number, uuid?: any | null, label?: string | null, description?: string | null, content?: string | null, type: RelationTypes, weight: RelationWeight, hostInteractionId: number } | null } | null> | null } | null };

export type GraphFragmentFragment = { __typename?: 'GraphOfRelationAndInteraction', uuid: any, nodes?: Array<{ __typename?: 'NodeOfInteraction', id: number, uuid: any, label?: string | null, description?: string | null, content?: string | null, data?: { __typename?: 'Interaction', id: number, uuid: any, label: string, identity: InteractionIdentity, subjects?: Array<{ __typename?: 'SubjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, objects?: Array<{ __typename?: 'ObjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, parallels?: Array<{ __typename?: 'ParallelRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, settings?: Array<{ __typename?: 'SettingRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, indirectObjects?: Array<{ __typename?: 'IndirectObjectRelation', type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, hostInteractionId: number, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, references?: Array<{ __typename?: 'ReferenceRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, contexts?: Array<{ __typename?: 'ContextRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, purposes?: Array<{ __typename?: 'PurposeRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, firstAct: { __typename?: 'FirstAct', id: number, guid: any, label?: string | null, description?: string | null }, secondAct?: { __typename?: 'SecondAct', id: number, guid: any, label?: string | null, description?: string | null } | null } | null } | null> | null, edges?: Array<{ __typename?: 'EdgeOfRelation', id?: string | null, uuid?: any | null, displayId?: string | null, label?: string | null, description?: string | null, content?: string | null, weight: number, sourceId: number, targetId: number, data?: { __typename?: 'Relation', linkedInteractionId: number, uuid?: any | null, label?: string | null, description?: string | null, content?: string | null, type: RelationTypes, weight: RelationWeight, hostInteractionId: number } | null } | null> | null };

export type NodeFragmentFragment = { __typename?: 'NodeOfInteraction', id: number, uuid: any, label?: string | null, description?: string | null, content?: string | null, data?: { __typename?: 'Interaction', id: number, uuid: any, label: string, identity: InteractionIdentity, subjects?: Array<{ __typename?: 'SubjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, objects?: Array<{ __typename?: 'ObjectRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, parallels?: Array<{ __typename?: 'ParallelRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, settings?: Array<{ __typename?: 'SettingRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, indirectObjects?: Array<{ __typename?: 'IndirectObjectRelation', type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, hostInteractionId: number, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, references?: Array<{ __typename?: 'ReferenceRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, contexts?: Array<{ __typename?: 'ContextRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, purposes?: Array<{ __typename?: 'PurposeRelation', hostInteractionId: number, type: RelationTypes, uuid?: any | null, description?: string | null, label?: string | null, weight: RelationWeight, linkedInteractionId: number, linkedInteraction?: { __typename?: 'Interaction', id: number, uuid: any, label: string } | null } | null> | null, firstAct: { __typename?: 'FirstAct', id: number, guid: any, label?: string | null, description?: string | null }, secondAct?: { __typename?: 'SecondAct', id: number, guid: any, label?: string | null, description?: string | null } | null } | null };

export type EdgeFragmentFragment = { __typename?: 'EdgeOfRelation', id?: string | null, uuid?: any | null, displayId?: string | null, label?: string | null, description?: string | null, content?: string | null, weight: number, sourceId: number, targetId: number, data?: { __typename?: 'Relation', linkedInteractionId: number, uuid?: any | null, label?: string | null, description?: string | null, content?: string | null, type: RelationTypes, weight: RelationWeight, hostInteractionId: number } | null };

export type CreateOrUpdateRelationMutationVariables = Exact<{
  input: CreateOrUpdateRelationDtoInput;
}>;


export type CreateOrUpdateRelationMutation = { __typename?: 'GraphQLMutation', createOrUpdateRelation: { __typename?: 'Relation', linkedInteractionId: number, uuid?: any | null, label?: string | null, description?: string | null, content?: string | null, type: RelationTypes, weight: RelationWeight, hostInteractionId: number } };

export type DeleteRelationMutationVariables = Exact<{
  relationId: Scalars['UUID'];
  hostInteractionId: Scalars['Int'];
  linkedInteractionId: Scalars['Int'];
  relationTypes: RelationTypes;
}>;


export type DeleteRelationMutation = { __typename?: 'GraphQLMutation', deleteRelation: number };

export type RelationFragmentFragment = { __typename?: 'Relation', linkedInteractionId: number, uuid?: any | null, label?: string | null, description?: string | null, content?: string | null, type: RelationTypes, weight: RelationWeight, hostInteractionId: number };

export const PageInforFragmentFragmentDoc = gql`
    fragment pageInforFragment on InteractionsConnection {
  pageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
}
    `;
export const FirstActFragmentFragmentDoc = gql`
    fragment firstActFragment on FirstAct {
  id
  guid
  label
  description
}
    `;
export const SecondActFragmentFragmentDoc = gql`
    fragment secondActFragment on SecondAct {
  id
  guid
  label
  description
}
    `;
export const ActsFragmentFragmentDoc = gql`
    fragment actsFragment on Interaction {
  firstAct {
    ...firstActFragment
  }
  secondAct {
    ...secondActFragment
  }
}
    ${FirstActFragmentFragmentDoc}
${SecondActFragmentFragmentDoc}`;
export const MinimalInteractionFragmentFragmentDoc = gql`
    fragment MinimalInteractionFragment on Interaction {
  id
  uuid
  label
}
    `;
export const SubjectFragmentFragmentDoc = gql`
    fragment subjectFragment on SubjectRelation {
  hostInteractionId
  type
  uuid
  description
  label
  weight
  linkedInteraction {
    ...MinimalInteractionFragment
  }
  linkedInteractionId
}
    ${MinimalInteractionFragmentFragmentDoc}`;
export const ObjectFragmentFragmentDoc = gql`
    fragment objectFragment on ObjectRelation {
  hostInteractionId
  type
  uuid
  description
  label
  weight
  linkedInteraction {
    ...MinimalInteractionFragment
  }
  linkedInteractionId
}
    ${MinimalInteractionFragmentFragmentDoc}`;
export const ParallelFragmentFragmentDoc = gql`
    fragment parallelFragment on ParallelRelation {
  hostInteractionId
  type
  uuid
  description
  label
  weight
  linkedInteraction {
    ...MinimalInteractionFragment
  }
  linkedInteractionId
}
    ${MinimalInteractionFragmentFragmentDoc}`;
export const SettingFragmentFragmentDoc = gql`
    fragment settingFragment on SettingRelation {
  hostInteractionId
  type
  uuid
  description
  label
  weight
  linkedInteraction {
    ...MinimalInteractionFragment
  }
  linkedInteractionId
}
    ${MinimalInteractionFragmentFragmentDoc}`;
export const IndirectObjectFragmentFragmentDoc = gql`
    fragment indirectObjectFragment on IndirectObjectRelation {
  type
  uuid
  description
  label
  weight
  hostInteractionId
  linkedInteraction {
    ...MinimalInteractionFragment
  }
  linkedInteractionId
}
    ${MinimalInteractionFragmentFragmentDoc}`;
export const ReferenceFragmentFragmentDoc = gql`
    fragment referenceFragment on ReferenceRelation {
  hostInteractionId
  type
  uuid
  description
  label
  weight
  linkedInteraction {
    ...MinimalInteractionFragment
  }
  linkedInteractionId
}
    ${MinimalInteractionFragmentFragmentDoc}`;
export const ContextFragmentFragmentDoc = gql`
    fragment contextFragment on ContextRelation {
  hostInteractionId
  type
  uuid
  description
  label
  weight
  linkedInteraction {
    ...MinimalInteractionFragment
  }
  linkedInteractionId
}
    ${MinimalInteractionFragmentFragmentDoc}`;
export const PurposeFragmentFragmentDoc = gql`
    fragment purposeFragment on PurposeRelation {
  hostInteractionId
  type
  uuid
  description
  label
  weight
  linkedInteraction {
    ...MinimalInteractionFragment
  }
  linkedInteractionId
}
    ${MinimalInteractionFragmentFragmentDoc}`;
export const InteractionFragmentFragmentDoc = gql`
    fragment interactionFragment on Interaction {
  id
  uuid
  label
  ...actsFragment
  identity
  subjects {
    ...subjectFragment
  }
  objects {
    ...objectFragment
  }
  parallels {
    ...parallelFragment
  }
  settings {
    ...settingFragment
  }
  indirectObjects {
    ...indirectObjectFragment
  }
  references {
    ...referenceFragment
  }
  contexts {
    ...contextFragment
  }
  purposes {
    ...purposeFragment
  }
}
    ${ActsFragmentFragmentDoc}
${SubjectFragmentFragmentDoc}
${ObjectFragmentFragmentDoc}
${ParallelFragmentFragmentDoc}
${SettingFragmentFragmentDoc}
${IndirectObjectFragmentFragmentDoc}
${ReferenceFragmentFragmentDoc}
${ContextFragmentFragmentDoc}
${PurposeFragmentFragmentDoc}`;
export const NodeFragmentFragmentDoc = gql`
    fragment nodeFragment on NodeOfInteraction {
  id
  uuid
  label
  description
  content
  data {
    ...interactionFragment
  }
}
    ${InteractionFragmentFragmentDoc}`;
export const RelationFragmentFragmentDoc = gql`
    fragment relationFragment on Relation {
  linkedInteractionId
  uuid
  label
  description
  content
  type
  weight
  hostInteractionId
}
    `;
export const EdgeFragmentFragmentDoc = gql`
    fragment edgeFragment on EdgeOfRelation {
  id
  uuid
  displayId
  label
  description
  content
  weight
  data {
    ...relationFragment
  }
  sourceId
  targetId
}
    ${RelationFragmentFragmentDoc}`;
export const GraphFragmentFragmentDoc = gql`
    fragment graphFragment on GraphOfRelationAndInteraction {
  uuid
  nodes {
    ...nodeFragment
  }
  edges {
    ...edgeFragment
  }
}
    ${NodeFragmentFragmentDoc}
${EdgeFragmentFragmentDoc}`;
export const InteractionResultFragmentFragmentDoc = gql`
    fragment interactionResultFragment on InteractionResult {
  interaction {
    ...interactionFragment
  }
  graph {
    ...graphFragment
  }
}
    ${InteractionFragmentFragmentDoc}
${GraphFragmentFragmentDoc}`;
export const GetInteractionsDocument = gql`
    query GetInteractions {
  interactions {
    edges {
      cursor
      node {
        id
        label
        uuid
      }
    }
    nodes {
      ...interactionFragment
    }
    totalCount
    ...pageInforFragment
  }
}
    ${InteractionFragmentFragmentDoc}
${PageInforFragmentFragmentDoc}`;

/**
 * __useGetInteractionsQuery__
 *
 * To run a query within a React component, call `useGetInteractionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInteractionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInteractionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInteractionsQuery(baseOptions?: Apollo.QueryHookOptions<GetInteractionsQuery, GetInteractionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInteractionsQuery, GetInteractionsQueryVariables>(GetInteractionsDocument, options);
      }
export function useGetInteractionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInteractionsQuery, GetInteractionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInteractionsQuery, GetInteractionsQueryVariables>(GetInteractionsDocument, options);
        }
export type GetInteractionsQueryHookResult = ReturnType<typeof useGetInteractionsQuery>;
export type GetInteractionsLazyQueryHookResult = ReturnType<typeof useGetInteractionsLazyQuery>;
export type GetInteractionsQueryResult = Apollo.QueryResult<GetInteractionsQuery, GetInteractionsQueryVariables>;
export function refetchGetInteractionsQuery(variables?: GetInteractionsQueryVariables) {
      return { query: GetInteractionsDocument, variables: variables }
    }
export const GetInteractionFullWithAllRelationsDocument = gql`
    query GetInteractionFullWithAllRelations($id: Int!) {
  fullInteractionWithAllRelations(id: $id) {
    ...interactionResultFragment
  }
}
    ${InteractionResultFragmentFragmentDoc}`;

/**
 * __useGetInteractionFullWithAllRelationsQuery__
 *
 * To run a query within a React component, call `useGetInteractionFullWithAllRelationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInteractionFullWithAllRelationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInteractionFullWithAllRelationsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetInteractionFullWithAllRelationsQuery(baseOptions: Apollo.QueryHookOptions<GetInteractionFullWithAllRelationsQuery, GetInteractionFullWithAllRelationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInteractionFullWithAllRelationsQuery, GetInteractionFullWithAllRelationsQueryVariables>(GetInteractionFullWithAllRelationsDocument, options);
      }
export function useGetInteractionFullWithAllRelationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInteractionFullWithAllRelationsQuery, GetInteractionFullWithAllRelationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInteractionFullWithAllRelationsQuery, GetInteractionFullWithAllRelationsQueryVariables>(GetInteractionFullWithAllRelationsDocument, options);
        }
export type GetInteractionFullWithAllRelationsQueryHookResult = ReturnType<typeof useGetInteractionFullWithAllRelationsQuery>;
export type GetInteractionFullWithAllRelationsLazyQueryHookResult = ReturnType<typeof useGetInteractionFullWithAllRelationsLazyQuery>;
export type GetInteractionFullWithAllRelationsQueryResult = Apollo.QueryResult<GetInteractionFullWithAllRelationsQuery, GetInteractionFullWithAllRelationsQueryVariables>;
export function refetchGetInteractionFullWithAllRelationsQuery(variables: GetInteractionFullWithAllRelationsQueryVariables) {
      return { query: GetInteractionFullWithAllRelationsDocument, variables: variables }
    }
export const FilterInteractionsByLabelDocument = gql`
    query FilterInteractionsByLabel($labelFilter: String!) {
  interactions(where: {label: {contains: $labelFilter}}) {
    nodes {
      ...interactionFragment
    }
  }
}
    ${InteractionFragmentFragmentDoc}`;

/**
 * __useFilterInteractionsByLabelQuery__
 *
 * To run a query within a React component, call `useFilterInteractionsByLabelQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilterInteractionsByLabelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilterInteractionsByLabelQuery({
 *   variables: {
 *      labelFilter: // value for 'labelFilter'
 *   },
 * });
 */
export function useFilterInteractionsByLabelQuery(baseOptions: Apollo.QueryHookOptions<FilterInteractionsByLabelQuery, FilterInteractionsByLabelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilterInteractionsByLabelQuery, FilterInteractionsByLabelQueryVariables>(FilterInteractionsByLabelDocument, options);
      }
export function useFilterInteractionsByLabelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilterInteractionsByLabelQuery, FilterInteractionsByLabelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilterInteractionsByLabelQuery, FilterInteractionsByLabelQueryVariables>(FilterInteractionsByLabelDocument, options);
        }
export type FilterInteractionsByLabelQueryHookResult = ReturnType<typeof useFilterInteractionsByLabelQuery>;
export type FilterInteractionsByLabelLazyQueryHookResult = ReturnType<typeof useFilterInteractionsByLabelLazyQuery>;
export type FilterInteractionsByLabelQueryResult = Apollo.QueryResult<FilterInteractionsByLabelQuery, FilterInteractionsByLabelQueryVariables>;
export function refetchFilterInteractionsByLabelQuery(variables: FilterInteractionsByLabelQueryVariables) {
      return { query: FilterInteractionsByLabelDocument, variables: variables }
    }
export const GetInteractionFullDocument = gql`
    query GetInteractionFull($id: Int!) {
  interactionFull(id: $id) {
    ...interactionResultFragment
  }
}
    ${InteractionResultFragmentFragmentDoc}`;

/**
 * __useGetInteractionFullQuery__
 *
 * To run a query within a React component, call `useGetInteractionFullQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInteractionFullQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInteractionFullQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetInteractionFullQuery(baseOptions: Apollo.QueryHookOptions<GetInteractionFullQuery, GetInteractionFullQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInteractionFullQuery, GetInteractionFullQueryVariables>(GetInteractionFullDocument, options);
      }
export function useGetInteractionFullLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInteractionFullQuery, GetInteractionFullQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInteractionFullQuery, GetInteractionFullQueryVariables>(GetInteractionFullDocument, options);
        }
export type GetInteractionFullQueryHookResult = ReturnType<typeof useGetInteractionFullQuery>;
export type GetInteractionFullLazyQueryHookResult = ReturnType<typeof useGetInteractionFullLazyQuery>;
export type GetInteractionFullQueryResult = Apollo.QueryResult<GetInteractionFullQuery, GetInteractionFullQueryVariables>;
export function refetchGetInteractionFullQuery(variables: GetInteractionFullQueryVariables) {
      return { query: GetInteractionFullDocument, variables: variables }
    }
export const DeleteInteractionDocument = gql`
    mutation DeleteInteraction($id: Int!) {
  deleteInteraction(id: $id)
}
    `;
export type DeleteInteractionMutationFn = Apollo.MutationFunction<DeleteInteractionMutation, DeleteInteractionMutationVariables>;

/**
 * __useDeleteInteractionMutation__
 *
 * To run a mutation, you first call `useDeleteInteractionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInteractionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInteractionMutation, { data, loading, error }] = useDeleteInteractionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteInteractionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteInteractionMutation, DeleteInteractionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteInteractionMutation, DeleteInteractionMutationVariables>(DeleteInteractionDocument, options);
      }
export type DeleteInteractionMutationHookResult = ReturnType<typeof useDeleteInteractionMutation>;
export type DeleteInteractionMutationResult = Apollo.MutationResult<DeleteInteractionMutation>;
export type DeleteInteractionMutationOptions = Apollo.BaseMutationOptions<DeleteInteractionMutation, DeleteInteractionMutationVariables>;
export const AddNewInteractionEntityDocument = gql`
    mutation AddNewInteractionEntity($label: String!) {
  addNewEntityInteraction(label: $label) {
    ...interactionFragment
  }
}
    ${InteractionFragmentFragmentDoc}`;
export type AddNewInteractionEntityMutationFn = Apollo.MutationFunction<AddNewInteractionEntityMutation, AddNewInteractionEntityMutationVariables>;

/**
 * __useAddNewInteractionEntityMutation__
 *
 * To run a mutation, you first call `useAddNewInteractionEntityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewInteractionEntityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewInteractionEntityMutation, { data, loading, error }] = useAddNewInteractionEntityMutation({
 *   variables: {
 *      label: // value for 'label'
 *   },
 * });
 */
export function useAddNewInteractionEntityMutation(baseOptions?: Apollo.MutationHookOptions<AddNewInteractionEntityMutation, AddNewInteractionEntityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddNewInteractionEntityMutation, AddNewInteractionEntityMutationVariables>(AddNewInteractionEntityDocument, options);
      }
export type AddNewInteractionEntityMutationHookResult = ReturnType<typeof useAddNewInteractionEntityMutation>;
export type AddNewInteractionEntityMutationResult = Apollo.MutationResult<AddNewInteractionEntityMutation>;
export type AddNewInteractionEntityMutationOptions = Apollo.BaseMutationOptions<AddNewInteractionEntityMutation, AddNewInteractionEntityMutationVariables>;
export const AddInteractionDocument = gql`
    mutation AddInteraction($request: CreateOrUpdateInteractionRequestDtoInput!) {
  createOrUpdateInteraction(requestDto: $request) {
    ...interactionFragment
  }
}
    ${InteractionFragmentFragmentDoc}`;
export type AddInteractionMutationFn = Apollo.MutationFunction<AddInteractionMutation, AddInteractionMutationVariables>;

/**
 * __useAddInteractionMutation__
 *
 * To run a mutation, you first call `useAddInteractionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddInteractionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addInteractionMutation, { data, loading, error }] = useAddInteractionMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useAddInteractionMutation(baseOptions?: Apollo.MutationHookOptions<AddInteractionMutation, AddInteractionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddInteractionMutation, AddInteractionMutationVariables>(AddInteractionDocument, options);
      }
export type AddInteractionMutationHookResult = ReturnType<typeof useAddInteractionMutation>;
export type AddInteractionMutationResult = Apollo.MutationResult<AddInteractionMutation>;
export type AddInteractionMutationOptions = Apollo.BaseMutationOptions<AddInteractionMutation, AddInteractionMutationVariables>;
export const CreateOrUpdateRelationDocument = gql`
    mutation CreateOrUpdateRelation($input: CreateOrUpdateRelationDtoInput!) {
  createOrUpdateRelation(requestDto: $input) {
    ...relationFragment
  }
}
    ${RelationFragmentFragmentDoc}`;
export type CreateOrUpdateRelationMutationFn = Apollo.MutationFunction<CreateOrUpdateRelationMutation, CreateOrUpdateRelationMutationVariables>;

/**
 * __useCreateOrUpdateRelationMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateRelationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateRelationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateRelationMutation, { data, loading, error }] = useCreateOrUpdateRelationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrUpdateRelationMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrUpdateRelationMutation, CreateOrUpdateRelationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrUpdateRelationMutation, CreateOrUpdateRelationMutationVariables>(CreateOrUpdateRelationDocument, options);
      }
export type CreateOrUpdateRelationMutationHookResult = ReturnType<typeof useCreateOrUpdateRelationMutation>;
export type CreateOrUpdateRelationMutationResult = Apollo.MutationResult<CreateOrUpdateRelationMutation>;
export type CreateOrUpdateRelationMutationOptions = Apollo.BaseMutationOptions<CreateOrUpdateRelationMutation, CreateOrUpdateRelationMutationVariables>;
export const DeleteRelationDocument = gql`
    mutation DeleteRelation($relationId: UUID!, $hostInteractionId: Int!, $linkedInteractionId: Int!, $relationTypes: RelationTypes!) {
  deleteRelation(
    relationId: $relationId
    hostInteractionId: $hostInteractionId
    linkedInteractionId: $linkedInteractionId
    type: $relationTypes
  )
}
    `;
export type DeleteRelationMutationFn = Apollo.MutationFunction<DeleteRelationMutation, DeleteRelationMutationVariables>;

/**
 * __useDeleteRelationMutation__
 *
 * To run a mutation, you first call `useDeleteRelationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRelationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRelationMutation, { data, loading, error }] = useDeleteRelationMutation({
 *   variables: {
 *      relationId: // value for 'relationId'
 *      hostInteractionId: // value for 'hostInteractionId'
 *      linkedInteractionId: // value for 'linkedInteractionId'
 *      relationTypes: // value for 'relationTypes'
 *   },
 * });
 */
export function useDeleteRelationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRelationMutation, DeleteRelationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRelationMutation, DeleteRelationMutationVariables>(DeleteRelationDocument, options);
      }
export type DeleteRelationMutationHookResult = ReturnType<typeof useDeleteRelationMutation>;
export type DeleteRelationMutationResult = Apollo.MutationResult<DeleteRelationMutation>;
export type DeleteRelationMutationOptions = Apollo.BaseMutationOptions<DeleteRelationMutation, DeleteRelationMutationVariables>;