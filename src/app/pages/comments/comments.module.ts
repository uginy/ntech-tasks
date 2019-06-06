import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CommentsComponent
  },
  {
    path: ':id',
    component: CommentsComponent
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), NgxPaginationModule],
  declarations: [CommentsComponent]
})
export class CommentsModule {}
