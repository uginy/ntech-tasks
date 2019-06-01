import { currentTypeData } from './../assets/config';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { PostsComponent } from './pages/posts/posts.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { CommentsComponent } from './pages/comments/comments.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: currentTypeData,
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'users/:id',
    component: UsersComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'posts/:id',
    component: PostsComponent
  },
  {
    path: 'albums',
    component: AlbumsComponent
  },
  {
    path: 'albums/:id',
    component: AlbumsComponent
  },
  {
    path: 'photos',
    component: PhotosComponent
  },
  {
    path: 'photos/:id',
    component: PhotosComponent
  },
  {
    path: 'comments',
    component: CommentsComponent
  },
  {
    path: 'comments/:id',
    component: CommentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
