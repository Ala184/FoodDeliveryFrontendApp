import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate{

    constructor(private router: Router){

    }
    
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean{
            if(sessionStorage.getItem('token') != null)
                return true;
            else{
                this.router.navigate(['/users/login'])
                return false;
            }
    }
    
}