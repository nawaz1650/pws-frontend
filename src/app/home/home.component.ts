import { HttpServiceService } from './../http-service.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
@ViewChild('form') otpForm:NgForm;
@ViewChild('otpref') otpref:ElementRef;
@ViewChild('mobref') mobref:ElementRef;
mobilemode=true;
otpmode=false;
generatesubs:Subscription;
verifysubs:Subscription;
  constructor(private _snackBar: MatSnackBar,private httpSer:HttpServiceService,private router:Router) { }

  ngOnInit(): void {
    // navigator.geolocation.getCurrentPosition(position=>{
    //   console.log(position.coords.latitude,position.coords.longitude);
    // })
    this.httpSer.autoLogin();
  }
submit(){
console.log(this.otpForm.value);
if(this.mobilemode){
this.generatesubs=this.httpSer.generateOtp(this.otpForm.value.mobile).subscribe(res=>{
  console.log(res);
  this.mobilemode=false;
  this.otpmode=true;
  this.generatesubs.unsubscribe();
  this.openSnackBar("One time password has been sent to your mobile via SMS ,please input that OTP!!",null);
});
}else if(this.otpmode){
  this.verifysubs=
  this.httpSer.verifyOtp(this.otpForm.value.mobile,
    this.otpForm.value.otp).subscribe(res=>{
      console.log("from verify otp subscription");      
      this.verifysubs.unsubscribe();
      this.router.navigate(['/order'])
  },err=>{
    console.log("from error observer of verify otp");
    this.openSnackBar("Wrong OTP,plz try again..",null);

  })
}
}
ngOnDestroy(){
  if(this.generatesubs){
    this.generatesubs.unsubscribe();
  }
  if(this.verifysubs){
    this.verifysubs.unsubscribe();
  }
}
openSnackBar(message: string, action: string) {
  this._snackBar.open(message,null, {
    duration: 4000,
    panelClass:['white-snackbar']
  });
}

}
