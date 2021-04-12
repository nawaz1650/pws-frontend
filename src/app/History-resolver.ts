import { HttpServiceService } from './http-service.service';
import { Order } from './Order.model';
import { Resolve } from "@angular/router";
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HistoryResolver implements Resolve<Order[]>{
    constructor(private httpser:HttpServiceService){}
    resolve(){
        return this.httpser.getOrders();
    }
    
}