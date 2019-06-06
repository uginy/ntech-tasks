import { currentTypeData } from './../assets/config';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    path: 'posts',
    loadChildren: () =>
      import('./pages/posts/posts.module').then(mod => mod.PostsModule)
  },
  {
    path: 'albums',
    loadChildren: () =>
      import('./pages/albums/albums.module').then(mod => mod.AlbumsModule)
  },
  {
    path: 'photos',
    loadChildren: () =>
      import('./pages/photos/photos.module').then(mod => mod.PhotosModule)
  },
  {
    path: 'comments',
    loadChildren: () =>
      import('./pages/comments/comments.module').then(mod => mod.CommentsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
