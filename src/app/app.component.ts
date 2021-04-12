
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Patel Water Sup...';
  @ViewChild('sidenav') sidenav:ElementRef;
  
  ngOnInit(){
    
  }
  
}
