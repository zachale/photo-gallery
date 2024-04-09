import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenServiceService {

  constructor() { }



  saveToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(){
    const token = localStorage.getItem('token');
    console.log(token);
    if(token === ''){
      return false;
    } else {
      return true;
    }
  }

  logOut(){
    localStorage.setItem('token', '');
  }


}
