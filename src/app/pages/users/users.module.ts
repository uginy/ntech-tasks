import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: ':id',
    component: UsersComponent
  }
];
@NgModule({
  imports: [CommonModule, NgxPaginationModule, RouterModule.forChild(routes)],
  declarations: [UsersComponent]
})
export class UsersModule {}
