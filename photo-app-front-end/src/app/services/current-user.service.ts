import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';


/**
 * The current user service is responsible for giving components access to the current user
 * This includes:
 * -> Setting and getting the current user's Name from local storage
 * -> This service does not save the user's password, instead, it completely ignores it
*/
@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor() { }

  setCurrentUser(user: User){
    localStorage.setItem('user', user.name as string);
  }

  getCurrentUser(): User{
    const name = localStorage.getItem('user');
    return {name: name, password: ''} as User;
  }
}
