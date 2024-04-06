import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { User } from '../interfaces/user';

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

  signupUser(data:User){
    return this.http.post(
      `${site}/users/signup`,
      data
    )
  }
}
