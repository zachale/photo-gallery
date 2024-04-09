import { Injectable } from '@angular/core';
import { AuthTokenServiceService } from './auth-token-service.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private tokenHandler: AuthTokenServiceService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.tokenHandler.getToken();
      console.log("adding auth")
      const authRequest = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token), 
      });
      return next.handle(authRequest);
  }
}
