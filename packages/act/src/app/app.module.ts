import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home/home/home.component";
import {HomeModule} from "./home/home.module";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import { AppRoutingModule } from './app-routing.module';
import {EditorModule} from "./editor/editor.module";
import {TextSelectDirective} from "./directives/text-edit-event";
import {NgxEchartsModule} from "ngx-echarts";
import {GraphViewModule} from "./graph-view/graph-view.module";
import {NgxGraphModule} from "@swimlane/ngx-graph";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HomeModule,
    EditorModule,
    AppRoutingModule,
    GraphViewModule,
    NgxGraphModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
