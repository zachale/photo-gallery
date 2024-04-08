import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { User } from '../interfaces/user';
import { Photo } from '../interfaces/photo';


const site = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  validateUser(data: User){
    return this.http.post(
      `${site}/users/login`,
      data
    )
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
    );
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
