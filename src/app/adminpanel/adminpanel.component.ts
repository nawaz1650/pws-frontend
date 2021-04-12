import { HttpServiceService } from './../http-service.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '../Order.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ExportAdmin } from '../model/ExportAdmin.model';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit,AfterViewInit {
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  orders=new MatTableDataSource<ExportAdmin>();



  displayedColumns=['user_id','mobile','order_id','qty',
  'address','order_date','created_date'];
  constructor(private http:HttpServiceService) { }

  ngOnInit(): void {
    this.orders.data=this.http.ordersAdmin;
  }
  ngAfterViewInit(){
    this.orders.sort=this.sort;
    this.orders.paginator = this.paginator;
  }
  export(){
    this.http.exportAdmin();
  }
  doFilter(filterValue:string){
    this.orders.filter=filterValue.trim().toLowerCase();
  }
}
