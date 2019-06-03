import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosComponent } from './photos.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [CommonModule, PhotosRoutingModule, NgxPaginationModule],
  declarations: [PhotosComponent]
})
export class PhotosModule {}
