import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PasswordChangeGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router,private toastr:ToastrService) {
  }
  canActivate(): Observable<boolean> {
    return this.auth.getIsPasswordChanged().pipe(
      catchError((error)=> {
        console.log(error);
        if(error.error.message==='User not found')
        return of("User not found")
        return of("Unknown")
      }),
      map((result:any) => {
        console.log(result);
        if(typeof result !== 'boolean'){
          if(result==='User not found'){
            console.log("User not found");
            this.auth.logout()
            this.router.navigateByUrl("/")
            this.toastr.warning("Veuillez se connecter")
          }
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
