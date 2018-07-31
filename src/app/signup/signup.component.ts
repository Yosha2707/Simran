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
import { FormGroup, Validators, FormControl, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[DataService]
})
export class SignupComponent implements OnInit {
  public loading = false;
  authform: FormGroup;
  Cities;
  City;
  Branches;
  Branch;
  Zones;
  Zone;
 
  register;
  emailPattern:"^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}$";
  constructor(private toastr: ToastrService,private formbuilder:FormBuilder, private userService: DataService, private http: Http, private router : Router) {
  
   }
  ngOnInit() {

    this.register = {
          UserName : '',
          UserPassword: '',
          ConfirmPassword: '',
          FullName:'',
          MobileNo:'',
          GoogleId:null,
          FacebookId:null,
          Address:'',
          ZoneId:0,
          BranchId:0,
          CityId:0       
         };
        
    this.authform = this.formbuilder.group({
      Email: ['', [
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]],
        Password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16)
        ]],
      ConfirmPassword: ['', [
        Validators.required,
      ]],
      MobileNo:['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]],
      FullName:['', [
        Validators.required,
      ]],
      Address:['', [
        Validators.required,
      ]],
   
      C: ['', [
        Validators.required,
      ]],
    });

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
  }




  // ngOnInit() {
  //   this.register = {
  //     UserName : '',
  //     UserPassword: '',
  //     ConfirmPassword: '',
  //     FullName:'',
  //     MobileNo:'',
  //     GoogleId:null,
  //     FacebookId:null
  //   };
  // }



  registerUser(){
    
    if(this.register.UserName==''){
      this.register.UserName = null;
    }
  
    if(this.register.UserPassword==''){
      this.toastr.error("Password is mandatory")
    }
    if(this.register.ConfirmPassword==''){
      this.toastr.error("Please Confirm your passsword")
    }
    if(this.register.FullName==''){
      this.toastr.error("Please provide your full name")
    }
    if(this.register.MobileNo==''){
      this.toastr.error("Mobile number is mandatory")
    }
    // if(this.register.ZoneName==''){
    //   this.toastr.error("Zone Name is mandatory")
    // }
    // if(this.register.BranchName==''){
    //   this.toastr.error("Branch Name is mandatory")
    // }
    // if(this.register.CityName==''){
    //   this.toastr.error("City Name is mandatory")
    // }
    if(this.register.Address==''){
      this.toastr.error("Addrress is mandatory")
    }
    if(this.register.MobileNo.length!=10){
      this.toastr.error("Please enter valid mobile number")
    }
    else{
      this.loading = true;
      this.userService.registerUser(this.register).subscribe(
        response =>{
          console.log(response)
          var obj = JSON.parse(response._body);
          if(obj.Status==false){
            this.loading = false;
           this.toastr.error(obj.objErrorInfo.ErrorMessage)
         }
          if(obj.Status==true){
            this.loading = false;
           this.toastr.success('User '+ this.register.FullName +  ' has been created')
           this.router.navigate(['/login']);
          }
        },
          error => {
            this.toastr.error('error');
          });
    }

}

login(){
  this.router.navigate(['/login']);
}



}
