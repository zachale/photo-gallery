import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

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
