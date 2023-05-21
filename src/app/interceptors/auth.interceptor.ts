import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

// This interceptor will observe all http requests, it's configured to treat them only when an error occurs
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router,private service:AuthService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    //Intercept http requests that generate error HttpErrorResponse
    return next.handle(req).pipe(catchError((err:HttpErrorResponse)=>{

      // If unauthorized
      if(err && err.status === 401 ){

        // If the response says that the token is expired
        if(err.error['error']==='Token expired'){
          console.log("token expired, generating a new one");
          //Method to refresh token and resend the request with new token if found
          return this.handleRefreshToken(req,next)
        }

        //If the response says Agent not found (usually when authenticating)
        if(err.error['error']==='Agent not found'){
          console.log("Agent not found")
          this.service.logout()
          return throwError(err)
        }
        
        this.service.logout();
        return throwError(err)
      }
      return throwError(err);
    }));
  }


  private handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
    //send request to refresh token
    return this.service.refreshLogin().pipe(

      switchMap((data: any) => {
        console.log("token found and affected");
        this.service.setToken(data.token)
        //resend the request with the new token
        return next.handle(this.addTokenToRequest(request))
      }),
      catchError(errodata=>{
        // Error when refreshing token, means that the refresh token failed, which means that the user has to login again :(
        this.service.logout()
        console.log(errodata);
        return throwError(errodata)
      })
    );
  }
  private addTokenToRequest(request: HttpRequest<any>): HttpRequest<any> {
    
    const token = this.service.getToken()

    // Clone the request and add the authorization header
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
