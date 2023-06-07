import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PasswordChangeGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router) {
  }
  canActivate(): Observable<boolean> {
    return this.auth.getIsPasswordChanged().pipe(
      catchError((error)=> {
        console.log("caught error");
        return of(false)
      }),
      map((result:any) => {
        if(typeof result !== 'boolean'){
          this.auth.logout()
          this.router.navigateByUrl("/")
          return false;
        }
        else{
          if (!result) {
            this.router.navigate(['/change-password']);
          }
          return result;
        }
      })
    );
    //  || this.router.navigateByUrl('/change-password')
  }
  
}
