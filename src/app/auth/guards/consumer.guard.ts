import { ToastrService } from 'ngx-toastr';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class ConsumerGuard implements CanActivate{

    
    private roleField: string = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    private token: string = "";

    constructor(private router: Router, private toaster: ToastrService){

    }
    
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean{
            var any = sessionStorage.getItem('token');
            if(any != null){
                var token2 = any;
                if(token2 != null){
                    const dataToken = JSON.parse(atob(token2.split('.')[1]));
                    if (dataToken[this.roleField] == 'potrosac')
                        return true;
                    else{
                        this.toaster.error("Nemate prava za pristup ovoj stranici");
                        this.router.navigate(['/productListing'])
                        return false;
                    }
            }
            else{
                this.toaster.error("Nemate prava za pristup ovoj stranici");
                this.router.navigate(['/productListing'])
                return false;
            }
        }
        this.toaster.error("Nemate prava za pristup ovoj stranici");
        this.router.navigate(['/productListing'])
        return false;
    }
    
}