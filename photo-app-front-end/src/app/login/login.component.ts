import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpService } from '../services/http.service';
import { User } from '../interfaces/user';
import { LoginResponse } from '../interfaces/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private httpService: HttpService) {}

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

    this.httpService.validateUser(user).subscribe({
        next: (response) => {this.response = response as LoginResponse},
        error: (error) => { console.error(error);}
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
