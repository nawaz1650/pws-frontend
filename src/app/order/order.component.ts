import { HttpServiceService } from './../http-service.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit,OnDestroy {
  count=1;
  @ViewChild('form') orderForm:NgForm;
  ordersubs:Subscription;
  constructor(private httpser:HttpServiceService,private _snackBar: MatSnackBar) {
    this.minDate=new Date();
    this.maxDate=new Date();
   }
  minDate: Date;
  maxDate: Date;

  ngOnInit(): void {
  }
  add(){
    this.count++;
  }
  remove(){
    if(this.count!==1)
  this.count--;
  }
  submit(){
    console.log(this.orderForm.value);
    console.log(this.orderForm.value.date.getDate());
    console.log(this.orderForm.value.date.valueOf());
    this.ordersubs=
    this.httpser.placeOrder(+this.orderForm.value.qty,this.orderForm.value.date.valueOf(),this.orderForm.value.address).subscribe(res=>{
      console.log(res);
      this.orderForm.resetForm();
      this.ordersubs.unsubscribe();
      this.openSnackBar("HI order is successfully placed.Thanks for using our app!!",null);
    })
    
  }
  ngOnDestroy(){
    if(this.ordersubs){
      this.ordersubs.unsubscribe();
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message,null, {
      duration: 4000,
      panelClass:['white-snackbar']
    });
  }
}
