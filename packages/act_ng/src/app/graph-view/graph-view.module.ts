import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphViewComponent } from './graph-view.component';
import {NgxEchartsModule} from "ngx-echarts";
import {GraphModule} from "@swimlane/ngx-graph";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    GraphViewComponent
  ],
  imports: [
    CommonModule,
    NgxEchartsModule,
    GraphModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class GraphViewModule { }
