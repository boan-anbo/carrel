import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home/home/home.component";
import {HomeModule} from "./home/home.module";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HomeModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
