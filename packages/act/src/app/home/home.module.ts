import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        ApolloModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: ' https://localhost:5001/graphql'
          }),
        };
      },
      deps: [HttpLink],
    },
  ],

})
export class HomeModule { }
