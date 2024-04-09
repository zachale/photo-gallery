import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpService } from '../services/http.service';
import { User } from '../interfaces/user';
import { LoginResponse } from '../interfaces/login';
import { CurrentUserService } from '../services/current-user.service';

/**
 * The login component is responsible for logging or signing in a user
 * This includes:
 * -> Taking user input and validating it with the back end server
 * -> Emiting whether a log in was successful or not
*/
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @Output() successfulLogin = new EventEmitter<boolean>;

  constructor(private httpService: HttpService, private currentUserService: CurrentUserService) {}

  //form controls to get input from user
  username = new FormControl('');
  password = new FormControl('');

  response?: LoginResponse;

  isLoggingIn?: Boolean = true;

  toggleSignup(){
    this.isLoggingIn = false;
  }

  toggleLogin(){
    this.isLoggingIn = true;
  }

  async login(){
    const user: User = {"name":this.username.value, "password":this.password.value}

    //requests a log in and acts upon a valid log in
    this.httpService.validateUser(user).subscribe({
        next: (response) => {
            if(response){
              this.response = response as LoginResponse
              this.currentUserService.setCurrentUser(user);
              this.successfulLogin.emit(true);
            }
          },
        error: (error) => { 
          console.error(error);
          this.successfulLogin.emit(false);
        }
      }
    );

  }

  signup(){

    const user: User = {"name":this.username.value, "password":this.password.value}

    this.httpService.signupUser(user).subscribe({
        next: (response) => {this.response = response as LoginResponse},
        error: (error) => { console.error(error);}
      }
    );

    this.toggleLogin();

  }

}
