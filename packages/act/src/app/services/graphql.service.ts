import {ChangeDetectorRef, EventEmitter, Injectable} from '@angular/core';
import {gql, Apollo, QueryRef, MutationResult} from "apollo-angular";
import {map, Observable, Subscription} from "rxjs";
import {
  AddNewInteractionEntityGQL,
  AddNewInteractionEntityMutation,
  DeleteInteractionGQL,
  FilterInteractionsByLabelGQL,
  FilterInteractionsByLabelQuery,
  GetFullInteractionGQL, GetFullInteractionQuery,
  GetInteractionsGQL,
  GetInteractionsQuery,
  GetInteractionsQueryVariables,
  Interaction,
  InteractionFilterInput, InteractionResult,
  InteractionsConnection
} from "../../../graphql/generated";
import {ApolloQueryResult} from "@apollo/client/core";


@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  // @ts-ignore
  interactions: Observable<GetInteractionsQuery['interactions']['nodes']>

  // this is the query reference object returned by Apollo-angular's client's watch query method.
  // This reference has several uses: it allows subscription (which is one-time-thing), and refetching.
  queryRef: QueryRef<GetInteractionsQuery, GetInteractionsQueryVariables>;
  // Mark the need to detect change for hte component
  dataChanged = new EventEmitter<void>();

  constructor(
    private getInteractionGQL: GetInteractionsGQL,
    private getFullInteractionGQL: GetFullInteractionGQL,
    private addInteractGql: AddNewInteractionEntityGQL,
    private deleteInteractionGQL: DeleteInteractionGQL,
    private filterInteractionGQL: FilterInteractionsByLabelGQL,
  ) {


    this.queryRef = getInteractionGQL.watch(
      undefined,
      {
        fetchPolicy: "cache-and-network",
        // pollInterval: 2000, // there are two ways to keep the local data updated with the backend. One is using this pollInterval function which refetch after an interval. The other is using the refetch function which refetch manually by calling the refectch method on {@link QueryRef}.
      }
    );

    this.interactions = this.queryRef.valueChanges
      .pipe(
        map(result => {
          console.log("Received new updates", result)
          return result.data.interactions?.nodes;
        })
      )
  }

  addInteraction(label: string) {
    this.addInteractGql.mutate(
      {
        label
      }
    ).subscribe(async (data) => {
      console.log(data);
      this.dataChanged.next();
      await this.queryRef.refetch();
    });
  }

  deleteInteraction(id: number) {
    this.deleteInteractionGQL.mutate(
      {
        id
      }
    ).subscribe(async (data) => {
        console.log(data);
        await this.queryRef.refetch();
      }
    )
  }

  getFullInteraction(number: number):  Observable<ApolloQueryResult<GetFullInteractionQuery>> {
    return this.getFullInteractionGQL.fetch(
      {
        id: number
      }
    )
  }
}
