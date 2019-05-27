import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContentComponent} from "./content/content.component";
import {DetailsComponent} from "./content/details/details.component";

const routes: Routes =<Routes> [
  {path: '' , component: ContentComponent },
  {path: ':details/:id' , component: DetailsComponent },
  {path: '**' , redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
