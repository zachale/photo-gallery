import { Injectable } from '@angular/core';

/**
 * The auth token service is responsible for handling the current sessions auth token
 * This includes:
 * -> Setting and getting the current token from local storage
 * -> Checking whether there is a valid session currently stored
*/
@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor() { }

  saveToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  //checks whether there is a current session saved
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
