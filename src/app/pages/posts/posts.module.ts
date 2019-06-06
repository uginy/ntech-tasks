import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent
  },
  {
    path: ':id',
    component: PostsComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), NgxPaginationModule],
  declarations: [PostsComponent]
})
export class PostsModule {}
