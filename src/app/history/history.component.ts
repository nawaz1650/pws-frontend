import { HttpServiceService } from './../http-service.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '../Order.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit,AfterViewInit {
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  orders=new MatTableDataSource<Order>();
  displayedColumns=['order_id','qty',
  'address',
  'created_date',
  'order_date'];
  constructor(private http:HttpServiceService) { }

  ngOnInit(): void {
    this.orders.data=this.http.orders;
  }
  ngAfterViewInit(){
    this.orders.sort=this.sort;
    this.orders.paginator = this.paginator;
  }
  export(){
    this.http.export();
  }

}
