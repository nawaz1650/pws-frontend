import { HttpServiceService } from './../http-service.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '../Order.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ExportAdmin } from '../model/ExportAdmin.model';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit,AfterViewInit {
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  orders=new MatTableDataSource<ExportAdmin>();
  readonly VAPID_PUBLIC_KEY = "BAOqfzYOe5SB8XuKBidsv45Jnsizc6tZAc-vlYVBHxiTrPQfjpNkeVn9U3JV253CLs8NcJpHPFRLi4AnhU2qA8k";


  displayedColumns=['user_id','mobile','order_id','qty',
  'address','order_date','created_date'];
  constructor(private http:HttpServiceService,private swPush: SwPush,private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.orders.data=this.http.ordersAdmin;
  }
  ngAfterViewInit(){
    this.orders.sort=this.sort;
    this.orders.paginator = this.paginator;


    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
  })
  .then(sub => {console.log(sub);
    if(!localStorage.getItem("subscribed"))
  this.httpClient.post<any>('https://notification-node.herokuapp.com/subs',{subs:JSON.stringify( sub)}).subscribe(res=>{
    console.log(res);
    if(res.ok){
      localStorage.setItem("subscribed","true");
    }
    
  });
  })
  .catch(err => console.error("Could not subscribe to notifications", err));
  }
  export(){
    this.http.exportAdmin();
  }
  doFilter(filterValue:string){
    this.orders.filter=filterValue.trim().toLowerCase();
  }
}
