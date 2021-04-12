import { HttpServiceService } from './http-service.service';
import { Order } from './Order.model';
import { Resolve } from "@angular/router";
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrdersAdminResolver implements Resolve<Order[]>{
    constructor(private httpser:HttpServiceService){}
    resolve(){
        console.log("resolver of admin is running");
        return this.httpser.getOrdersAdmin();
    }
    
}