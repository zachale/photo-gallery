import { Injectable } from '@angular/core';
import { AuthTokenService } from './auth-token.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * The auth interceptor service is responsible adding the auth token to every request made to the back end server
*/
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private tokenHandler: AuthTokenService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.tokenHandler.getToken();

      //adding the token to the Authorization header
      const authRequest = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token), 
      });
      return next.handle(authRequest);
  }
}
