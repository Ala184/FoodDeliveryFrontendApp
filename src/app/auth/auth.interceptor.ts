import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators'

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    constructor(private router:Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (sessionStorage.getItem('token')!= null){
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
            });
            return next.handle(clonedReq).pipe(
                tap(
                    succ => {},
                    err => {
                        if (err.status == 401){
                            sessionStorage.removeItem('token');
                            this.router.navigateByUrl('/users/login');
                        }
                    }
                )
            )
        }
        else
            return next.handle(req.clone());
    }
}