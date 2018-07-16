import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
declare var $:any;
import { HttpErrorResponse } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { Http, Headers,Response } from '@angular/http';
import {Observable} from 'rxjs';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormControl, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {
userData;
Email;
FullName;
Mobile;
Profile= true;
Cpassword = false;
Cities;
City;
Branches;
public loading =false;
Branch;
Zones;
Zone;
ZoneId;
BranchId;
CityId;
oldPassword;
newPassword;
confirmPassword;
resetPasswordData;
UserId;
updateProfileData;
fullName;
Address;
GST;
authform: FormGroup;
  constructor(private toastr: ToastrService,private Formbuilder:FormBuilder, private userService: DataService, private http: Http, private router : Router) { }

  ngOnInit() {
// var userInfo = localStorage.getItem('currentUser');
// alert(userInfo)
// var t = JSON.parse(userInfo);
// var z = t.Response;
// var f = JSON.stringify(z);
// var x = JSON.parse(f);
// this.fullName = x.UserName;
// this.Address = x.Address;
// this.GST = x.GST;
// this.Email = x.Email;
// this.CityId = x.CityId;
// this.BranchId = x.BranchId;
// this.ZoneId = x.ZoneId;
// this.Mobile = x.MobileNo;

    this.authform = this.Formbuilder.group({
      MobileNo: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]],
      Email:['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]],
      Name: ['', [
        Validators.required,
      ]],
      C: ['', [
        Validators.required,
      ]],
      Address:['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      GS:['', [
        Validators.maxLength(20),
      ]],
    });
  

    this.userData = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.userData.Response)
    this.Email = this.userData.Response.Email;
    this.Mobile = this.userData.Response.MobileNo;
    this.fullName = this.userData.Response.UserName;
    this.ZoneId = this.userData.Response.ZoneId;
    this.BranchId= this.userData.Response.BranchId;
    this.CityId = this.userData.Response.CityId;
    this.Address = this.userData.Response.Address;
    this.UserId = this.userData.Response.Id;
    this.http.get('http://api.simranfresh.com/api/City').subscribe(
      (res: Response) => {
     this.Cities = res.json();
     this.City = this.Cities.Response
      });

      this.http.get('http://api.simranfresh.com/api/branchmaster/0').subscribe(
        (res: Response) => {
       this.Branches = res.json();
       this.Branch = this.Branches.Response
      // console.log(this.Branch)
        });

        this.http.get('http://api.simranfresh.com/api/zonesmaster/0').subscribe(
          (res: Response) => {
         this.Zones = res.json();
         this.Zone = this.Zones.Response
        // console.log(this.Zone)
          });

//console.log(this.Id);
//console.log(this.BranchId);
//console.log(this.ZoneId);
  }

  profile(){
this.Profile = true;
this.Cpassword = false;
  }

  cpassword(){
this.Cpassword = true;
this.Profile = false;
  }

  changePassword(){
    this.loading = true;
    this.resetPasswordData = {
      "UserName": this.Email,
      "userId": this.UserId,
      "OldPassword": this.oldPassword,
      "NewPassword": this.newPassword,
      "ConfirmPassword": this.confirmPassword
    }
    let headers = new Headers({ "content-type": "application/json", });
    let options = new RequestOptions({ headers: headers });
    this.http.post("http://api.simranfresh.com/api/myprofile", this.resetPasswordData, options)
    .map(res => res.json())
    .subscribe(
      data => {
       if(data.Status==true){
         this.loading = false;
        this.toastr.success("Password Changed Successfully!")

       }
       if(data.Status==false){
         this.loading = false;
         this.toastr.error(data.objErrorInfo.ErrorMessage)
       }
   
},

error => {
//  console.log(error._body["objErrorInfo"])
this.loading = false;
this.toastr.error("Provide correct old password or check confirm password")
this.userService.error(error);
});
  }

  updateProfile(){

    if(this.Mobile==''){
      this.toastr.error("Mobile Number is required!")
    }
    if(this.fullName==''){
      this.toastr.error("Full Name is required!")
    }
    if(this.Address==null){
      this.toastr.error("Address is required!")
    }
    if(this.CityId==undefined){
      this.toastr.error("City Name is required!")
    }
  
else{
  this.loading = true;
  this.updateProfileData = {
    "UserId": this.UserId,
    "FullName": this.fullName,
    "Email": this.Email,
    "MobileNo": this.Mobile,
    "Address":this.Address,
    "GSTNumber": this.GST,
    "ZoneId": this.ZoneId,
    "BranchId":this.BranchId,
    "CityId":this.CityId

  }
    const url = `${"http://api.simranfresh.com/api/updatemyprofile"}`;
   // console.log(this.Id)
     let headers = new Headers();
     headers.append('Content-Type', 'application/json');
    this.http.put(url, this.updateProfileData, {headers:headers})
    .map(res => res.json())
    .subscribe((res:Response) => {
      console.log(res);
   var t = JSON.stringify(res);
   var y = JSON.parse(t);
   if(y.Status==true){
     this.loading  =false;
    this.toastr.success('Profile Updated successfully!');
   }else{
     this.loading = false;
     var tq = y.objErrorInfo.ErrorMessage;
     this.toastr.error(tq);
   }
    });
}  
 }
  
  }


