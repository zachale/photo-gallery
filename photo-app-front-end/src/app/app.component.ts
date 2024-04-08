import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhotosComponent } from './photos/photos.component';
import { LoginComponent } from './login/login.component';
import { CurrencyPipe, NgIf } from '@angular/common';
import { User } from './interfaces/user';
import { HttpService } from './services/http.service';
import { Photo } from './interfaces/photo';
import { photosResponse } from './interfaces/photosResponse';
import { CurrentUserService } from './services/current-user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PhotosComponent, LoginComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private httpService: HttpService, private currentUserService: CurrentUserService) {}

  title = 'Gallery';

  user?: User;
  showPhotos: boolean = false;

  photos: Photo [] = [];


  onLogin(event: boolean){
    if(event){
      this.user = this.currentUserService.getCurrentUser();
      if(this.user.name){
        this.httpService.getPhotos(this.user.name).subscribe({
            next: (response)=> {
              this.photos = (response as photosResponse).photos;
              console.log(this.photos);
            }
          }
        )
        this.showPhotos = true;
      } 
    }else{
      this.showPhotos = false;
    }
  }

  
}
