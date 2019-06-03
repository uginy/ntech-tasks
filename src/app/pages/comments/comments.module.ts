import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsComponent } from './comments.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [CommonModule, CommentsRoutingModule, NgxPaginationModule],
  declarations: [CommentsComponent]
})
export class CommentsModule {}
