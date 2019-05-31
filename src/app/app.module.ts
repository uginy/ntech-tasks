import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { SimpledataService } from './services/simpledata.service';

import { AppComponent } from './app.component';

import { PostsComponent } from './pages/posts/posts.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { PagerService } from './services/pager.service';
import { UsersComponent } from './pages/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    AlbumsComponent,
    PhotosComponent,
    CommentsComponent,
    UsersComponent
  ],
  imports: [HttpClientModule, BrowserModule, AppRoutingModule],
  providers: [ApiService, SimpledataService, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
