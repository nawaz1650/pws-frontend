import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { ExportAdmin } from './model/ExportAdmin.model';
import { Order } from './Order.model';


@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
orders:Order[];
ordersAdmin:ExportAdmin[];
  constructor(private http:HttpClient,private router:Router) { }
  autoLogin(){
    if(localStorage.getItem('token')){
      this.router.navigate(['/order']);
    }
  }
  generateOtp(mobile:string){
    console.log(mobile);
    return this.http.post<any>
    ('http://localhost:8080/generateOtp',{"mobile":mobile})
    .pipe(map(
      (res)=>{
        console.log("response from http serv success ",res);
      }
    ),catchError(error=>{
      console.log(error);
      return of(1);
    }));
  }


  generateAdminOtp(mobile:string){
    console.log(mobile);
    return this.http.post<any>
    ('http://localhost:8080/adminlogin',{"mobile":mobile})
    .pipe(map(
      (res)=>{
        console.log("response from http serv success ",res);
        
      }
    )
    // ,catchError(error=>{
    //   console.log(error);
    //   return of(error.error.message);
    // })
    );
  }
  verifyOtp(mobile:string,otp:string){
    return this.http.post<any>('http://localhost:8080/verifyOtp',{
      mobile:mobile,otp:otp
    }).pipe(
      map((res)=>{
        console.log("from verify otp success ",res);
        if(res.token){
          localStorage.setItem('token',res.token);
        }
        return res;
      })
      // catchError(e=>{
      //   console.log(e);
      //   return of(e);
      // })
    )
  }
  placeOrder(qty:number,timestamp:string,address:string){
    return this.http.post<any>('http://localhost:8080/createOrder',{
      qty:qty,timestamp:timestamp,address:address
    }).pipe(
      map((res)=>{
        console.log("from verify otp success ",res);
        if(res.token){
          localStorage.setItem('token',res.token);
        }
        return res;
      }),
      catchError(e=>{
        console.log(e);
        return of(e);
      })
    )
  }
  getOrders(){
    return this.http.get<Order[]>('http://localhost:8080/orders').pipe(
      map((res)=>{
        console.log("from orders  success ",res);
          this.orders=res;
        return res;
      }),
      catchError(e=>{
        console.log(e);
        return of(e);
      })
    )

  }

  getOrdersAdmin(){
    return this.http.get<ExportAdmin[]>('http://localhost:8080/ordersforadmin').pipe(
      map((res)=>{
        console.log("from orders  success ",res);
          this.ordersAdmin=res;
        return res;
      }),
      catchError(e=>{
        console.log(e);
        return of(e);
      })
    )

  }


  export(){
    this.http.get('http://localhost:8080/export',{responseType:"blob",}).pipe(
      map(
      (res)=>{
          const blob=new Blob([res],{type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url= window.URL.createObjectURL(blob);
    var a =document.createElement('a');
    document.body.appendChild(a);
    a.style.display='none';
    a.href=url;
    a.download="Orders.xlsx";
    a.click();
          }),catchError(error=>{
            console.log(error);
            return of(error);
          })).subscribe();
      }





      




      exportAdmin(){
        this.http.get('http://localhost:8080/exportAdmin',{responseType:"blob",}).pipe(
          map(
          (res)=>{
              const blob=new Blob([res],{type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
              const url= window.URL.createObjectURL(blob);
        var a =document.createElement('a');
        document.body.appendChild(a);
        a.style.display='none';
        a.href=url;
        a.download="Orders.xlsx";
        a.click();
              }),catchError(error=>{
                console.log(error);
                return of(error);
              })).subscribe();
          }
    
    
    
  }

