import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {GraphqlService} from "../../../services/graphql.service";
import {AddNewInteractionEntityGQL} from "../../../../../graphql/generated";

@Component({
  selector: 'app-act-new-entity',
  templateUrl: './act-new-entity.component.html',
  styleUrls: ['./act-new-entity.component.scss']
})
export class ActNewEntityComponent implements OnInit {

  form = new FormGroup({
    label: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  })

  constructor(
    private fb: FormBuilder,
    private graphqlService: GraphqlService
  ) {
  }

  ngOnInit(): void {
  }


  onSubmit(value: ɵTypedOrUntyped<{ label: FormControl<string | null> }, ɵFormGroupValue<{ label: FormControl<string | null> }>, any>) {
    console.log(value);
    if (value.label) {
      this.graphqlService.addInteraction(value.label);
    }
    this.form.reset();
  }
}
