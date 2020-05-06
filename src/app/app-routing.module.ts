import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageComponent } from './image/image.component';
import { HomeComponent } from './home/home.component';
import { VideoComponent } from './video/video.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'img', component: ImageComponent },
  { path: 'video', component: VideoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
