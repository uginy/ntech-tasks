import { currentTypeData } from './../assets/config';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
    loadChildren: () =>
      import('./pages/users/users.module').then(mod => mod.UsersModule)
  },
  {
    path: 'users/:id',
    loadChildren: () =>
      import('./pages/users/users.module').then(mod => mod.UsersModule)
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./pages/posts/posts.module').then(mod => mod.PostsModule)
  },
  {
    path: 'posts/:id',
    loadChildren: () =>
      import('./pages/posts/posts.module').then(mod => mod.PostsModule)
  },
  {
    path: 'albums',
    loadChildren: () =>
      import('./pages/albums/albums.module').then(mod => mod.AlbumsModule)
  },
  {
    path: 'albums/:id',
    loadChildren: () =>
      import('./pages/albums/albums.module').then(mod => mod.AlbumsModule)
  },
  {
    path: 'photos',
    loadChildren: () =>
      import('./pages/photos/photos.module').then(mod => mod.PhotosModule)
  },
  {
    path: 'photos/:id',
    loadChildren: () =>
      import('./pages/photos/photos.module').then(mod => mod.PhotosModule)
  },
  {
    path: 'comments',
    loadChildren: () =>
      import('./pages/comments/comments.module').then(mod => mod.CommentsModule)
  },
  {
    path: 'comments/:id',
    loadChildren: () =>
      import('./pages/comments/comments.module').then(mod => mod.CommentsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
