import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor() { }

  currentUser?: User;

  setCurrentUser(user: User){
    this.currentUser = user;
  }

  getCurrentUser(): User{
    return this.currentUser as User;
  }
}
