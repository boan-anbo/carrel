import {Component, OnDestroy, OnInit} from '@angular/core';
import {GraphqlService} from "../../services/graphql.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FilterInteractionsByLabelGQL, GetInteractionsQuery, Interaction} from "../../../../graphql/generated";
import {debounce, debounceTime, Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-interaction-filter-input',
  templateUrl: './interaction-filter-input.component.html',
  styleUrls: ['./interaction-filter-input.component.scss']
})
export class InteractionFilterInputComponent implements OnInit, OnDestroy {
  public filterResult: Interaction[] = [];
  // @ts-ignore
  private valueChanged: Subscription;

  constructor(
    private graphQl: GraphqlService,
    private filterInteractionGQL: FilterInteractionsByLabelGQL,
  ) {
  }

  ngOnDestroy(): void {
    this.valueChanged?.unsubscribe();
  }

  // a form with a search box to filter interactions, using Angular reactive form
  form = new FormGroup({
    search: new FormControl<string>('', [Validators.minLength(1)])
  });

  ngOnInit(): void {
    this.valueChanged = this.form.valueChanges.pipe(debounceTime(100)).subscribe(val => {
      if (val.search) {
        this.filter(val.search);
      }
    });
  }

  onSearch($event: any) {
    this.filter($event.target.value);
  }

  // this is the function that is called when the search button is clicked
  filter(label: string) {
    // call the filterInteractionGQL to filter the interactions by the search value
    this.filterInteractionGQL.fetch(
      {labelFilter: label},
    ).subscribe((data) => {
      // the data is the result of the filter interaction query
      console.log(data);

      this.filterResult = data.data?.interactions?.nodes as unknown as Interaction[];
    });
  }
}
