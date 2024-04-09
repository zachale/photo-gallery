import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient } from  '@angular/common/http';
import { User } from '../interfaces/user';
import { Photo } from '../interfaces/photo';
import { response } from 'express';
import { AuthTokenServiceService } from './auth-token-service.service';
import { AuthInterceptorService } from './auth-interceptor.service';


const site = "http://localhost:3000";


/**
 * The http service is responsible for handling all http requests made by the app
 * This includes:
 * -> Creating, Updating, and Deleting photos
 * -> logging in or signing up a user
*/
@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(private http: HttpClient, private tokenHandler: AuthTokenServiceService) { }
  
  
  //This validates a user trying to log in
  validateUser(data: User){

    const response = this.http.post(
      `${site}/users/login`,
      data
    )
    
    //save the token that's returned
    response.subscribe({next:
      (response: any) => {
        const token = response.token;
        this.tokenHandler.saveToken(token);
      }
    })

    return response; 
  }


  signupUser(data: User){
    return this.http.post(
      `${site}/users/signup`,
      data
    )
  }

  uploadPhoto(data: Photo){
    return this.http.post(
      `${site}/photos/upload`,
      data
    );;
  }

  getPhotos(user: string){
    return this.http.get(
      `${site}/photos/get?user=${user}`,
    );
  }

  deletePhoto(photo: Photo){
    return this.http.post(
      `${site}/photos/delete`,
      photo
    );
  }

  updatePhoto(photo: Photo){
    return this.http.post(
      `${site}/photos/update`,
      photo
    );
  }
}
