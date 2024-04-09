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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenServiceService } from './services/auth-token-service.service';

/**
 * The app component oversees the rest of the sites funcionality.
 * It also has some responsibilities for itself.
 * -> Checking if a user's session is in progress
 * -> Ending a user's session
 * -> Sourcing a user's photos on succsessful log in
*/
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PhotosComponent, LoginComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private httpService: HttpService, private currentUserService: CurrentUserService, private tokenHandler: AuthTokenServiceService) {}

  title = 'Gallery';

  user?: User;

  //This boolean controls when users photos are displayed
  showPhotos: boolean = false;

  photos: Photo [] = [];

  // Simple check to see if a user session is already stored
  ngOnInit() {
    if(this.tokenHandler.isLoggedIn()){
      this.getPhotos();
    } else{
      this.showPhotos = false;
    }
  }


  logOut(){
    this.tokenHandler.logOut();
    this.showPhotos = false;
  }

  // This method processes a given log in event from the login component
  onLogin(event: boolean){
    if(event){
      this.user = this.currentUserService.getCurrentUser();
      if(this.user.name){
        this.getPhotos();
      } 
    }else{
      this.showPhotos = false;
    }
  }

  // This method sources a users photos based on the given user name and JWT
  getPhotos(){
    const request = this.httpService.getPhotos(this.currentUserService.getCurrentUser().name as string).subscribe({
      next: (response)=> {
        this.photos = (response as photosResponse).photos;
        this.showPhotos = true;
      },
      error: (err) => {console.error(err)}
    }
  )
  }
  
}
