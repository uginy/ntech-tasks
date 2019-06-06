import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PhotosComponent
  },
  {
    path: ':id',
    component: PhotosComponent
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), NgxPaginationModule],
  declarations: [PhotosComponent]
})
export class PhotosModule {}
