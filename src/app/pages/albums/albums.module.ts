import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsRoutingModule } from './albums-routing.module';
import { AlbumsComponent } from './albums.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [CommonModule, AlbumsRoutingModule, NgxPaginationModule],
  declarations: [AlbumsComponent]
})
export class AlbumsModule {}
