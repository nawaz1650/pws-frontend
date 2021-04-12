import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
@Injectable({providedIn:'root'})
export class RouteGuard implements CanActivate{
    constructor(private router:Router){}
    canActivate(){
        if(localStorage.getItem('token'))
        return true;
        else
        return this.router.createUrlTree(['/']);
    }
}