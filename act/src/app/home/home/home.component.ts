import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GraphqlService} from "../../services/graphql.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public graphql: GraphqlService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.graphql.dataChanged.subscribe(() => {
      this.cd.detectChanges();
      console.log("marked for change");
    })
  }
  newInteractionForm = new FormGroup({
    label: new FormControl(''),
  });

  onSubmit() {
    const {label} = this.newInteractionForm.value;
    if (label) {
      this.graphql.addInteraction(label);
      this.newInteractionForm.reset();
    }
  }

  delete(id: number) {
    this.graphql.deleteInteraction(id);
  }
}
