import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home/home/home.component";
import {HomeModule} from "./home/home.module";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import { AppRoutingModule } from './app-routing.module';
import {EditorModule} from "./editor/editor.module";
import {TextSelectDirective} from "./directives/text-edit-event";



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HomeModule,
    EditorModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
