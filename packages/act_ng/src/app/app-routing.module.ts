import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EditorComponent} from "./editor/editor.component";
import {GraphViewComponent} from "./graph-view/graph-view.component";

const routes: Routes = [
  {
    path: '', component: GraphViewComponent
  }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
