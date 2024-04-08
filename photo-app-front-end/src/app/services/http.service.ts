import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { User } from '../interfaces/user';
import { Photo } from '../interfaces/photo';
import { response } from 'express';


const site = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  httpOptions ={
    observe: "observe",
    headers: new Headers(), 
    withCredentials: true 
  }
  

  validateUser(data: User){
    const response = this.http.post(
      `${site}/users/login`,
      data,
      {
        observe: "response"
      }
    )

    response.subscribe({next:
      (response: any) => {
        const cookieHeader = response.headers.get("set-cookie");
        console.log(cookieHeader)
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
    const request = this.http.post(
      `${site}/photos/upload`,
      data
    );
    
    return request;
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
