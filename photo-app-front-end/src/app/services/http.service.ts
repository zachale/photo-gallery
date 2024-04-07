import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { User } from '../interfaces/user';
import { Photo } from '../interfaces/photo';
import  sizeof from 'object-sizeof';


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
      `${site}/photos/upload?user=${user}`,
    );
  }
}
