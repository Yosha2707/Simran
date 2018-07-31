import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthGuard} from '../auth/auth.guard';
import { HttpModule } from '@angular/http';
import { Http, Headers, Response } from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import * as AOS from 'aos';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public loading = false;
  readonly rootUrl = 'http://api.simranfresh.com/api/signin';
 
isLoggedIn: boolean = false;
canActivate = false;
logininfo;
Google;
passToken;
Signin = true;
google;
forgotPemail;
email;
gapi: any;
UserName;
Password;
constructor(ngZone: NgZone, private toastr: ToastrService, private http: Http, private userService: DataService, private router:Router, public AuthGuard: AuthGuard) {
//  window['onSignIn'] = (user) => ngZone.run(() => this.onSignIn(user));
 }


  ngOnInit() {
    // AOS.init();
    //   gapi.signin2.render('my-signin2', {
    //     'scope': 'profile email',
    //     'width': 300,
    //     'height': 35,
    //     'longtitle': true,
    //     'theme': '',
       
    //   });
    var u = JSON.parse(localStorage.getItem('remember'));
    this.UserName = u.UserName;
    this.Password = u.Password;

  
  }
  

  // onSignIn(googleUser) {
  //   alert("Google signin");
  //   var profile = googleUser.getBasicProfile();
  //   console.log(profile);
  //   this.googleuser = {
  //     "UserName": profile.getName(),
  //     "Email":profile.getEmail(),
  //     "GoogleId":profile.getId()
    
  // }
  // console.log(this.googleuser);
  // this.http.post("http://api.simranfresh.com/api/signup", this.googleuser).subscribe((res: Response) => {
  // console.log(res)  
  // localStorage.setItem('currentUser', JSON.stringify(this.googleuser));
  // this.router.navigate(['/myaccount']);
    
  // },
  // error => {
  //   this.toastr.error('Something Wrong happened..!!');
  //   this.userService.error(error);
  // });
  // }
//   public auth2: any;
//   public googleInit() {
//     gapi.load('auth2', () => {
//       this.auth2 = gapi.auth2.init({
//         client_id: '992060000918-ad5colb4v8vahau66202dv9rubnb6jt7.apps.googleusercontent.com',
//         scope: 'profile email'
//       });
//       this.attachSignin(document.getElementById('googleBtn'));
//     });
//   }
//   public attachSignin(element) {
//     this.auth2.attachClickHandler(element, {},
//       (googleUser) => {

//         let profile = googleUser.getBasicProfile();
//         console.log('Token || ' + googleUser.getAuthResponse().id_token);
//         console.log('ID: ' + profile.getId());
//         console.log('Name: ' + profile.getName());
//         console.log('Image URL: ' + profile.getImageUrl());
//         console.log('Email: ' + profile.getEmail());
//         //YOUR CODE HERE
//         this.google = {
//           "UserName":profile.getEmail(),
//           "UserPassword":null,
//           "ConfirmPassword":null,
//           "FullName": profile.getName(),
//           "MobileNo":null,
//    "GoogleId":profile.getId(),
//    "FacebookId":null
//          }


//          this.http.post("http://api.simranfresh.com/api/signup", this.google).subscribe((res: Response) => {
//           console.log(res)  
//           localStorage.setItem('currentUser', JSON.stringify(this.google));
//          this.router.navigate(['/myaccount']);
       
       
//              }, (error) => {
//                console.log(error);
//                this.toastr.error(JSON.stringify(error, undefined, 2));
//              });
//       });
//   }

// ngAfterViewInit(){
//       this.googleInit();
// }


toggleEditable(event) {
  if ( event.target.checked ) {
      var obj = {
        "UserName":this.UserName,
        "Password":this.Password
      }
      localStorage.setItem('remember', JSON.stringify(obj));
 }
}


   
  OnLogin() {
   this.loading = true;
    if(this.UserName==''){
      this.loading = false;
      this.toastr.error("Email is mandatory")
    }
    if(this.Password==''){
      this.loading = false;
      this.toastr.error("Password is mandatory")
    }
  
   else{
    var date = new Date();
    this.logininfo = {
      "UserName": this.UserName,
      "UserPassword":this.Password,
      "IsRemberMe":"false"
    }
    
    let headers = new Headers({ "content-type": "application/json", });
    let options = new RequestOptions({ headers: headers });
    this.http.post(this.rootUrl,this.logininfo, options)
       .map(res => res.json())
       .subscribe(
                 data => {
                   
                   
                   if(data.Status==true){
                    this.loading = false;
                    localStorage.setItem('currentUser', JSON.stringify(data));
                    this.userService.syncCart().then(
                      res => { // Success
                        
                      
                        var use = data.Response.UserName
                        console.log("PPPPPPP")
                        console.log(data)
                       this.toastr.success("Welcome, " + use+" !")
                       let previous = this.userService.getPreviousUrl();
                       
                       if(previous=="/"){
                        this.home();
                       }
                       else if(previous==="/signup"){
                        this.home();
                       }
                       else if(previous=="/login"){
                        this.home();
                       }
                       else if(previous=="/success"){
                        this.home();
                       }else{
                         this.router.navigate([previous]);
                       }
                         
                
                      }
                    );
                   
                  }
                  
                   if(data.Status==false){
                    this.loading = false;
                    this.toastr.error(data.objErrorInfo.ErrorMessage);
                   }
    },
  
    error => {
      this.loading = false;
      this.userService.error(error);
      this.toastr.error('Wrong Id or Password!');
    });
   }

          
  }
  signup(){
    this.router.navigate(['/signup']);
  }

  refresh(): void {
    window.location.reload();
  }


  home() {
    this.router.navigate(['/myaccount']);
   // this.refresh();
    //this.loading = true;
  }

  forgotPassword(data){
    this.loading = true;
    this.forgotPemail = {
      "UserName":data
    }
    
    let headers = new Headers({ "content-type": "application/json", });
    let options = new RequestOptions({ headers: headers });
    this.http.post("http://api.simranfresh.com/api/forgetpassword", this.forgotPemail, options)
    .map(res => res.json())
    .subscribe((res) => {
      if(res.Status==false){
        this.loading = false;
        var x = res.objErrorInfo;
        console.log(x.ErrorMessage)
        this.toastr.error(x.ErrorMessage)
        
      }
      if(res.Status==true){
        this.loading = false;
        this.toastr.success('Email Sent successfully!');
      }
     
    },
    error => {
      this.loading = false;
      this.toastr.error('Please Enter Registered Email!'); 
     
    });
 
  }

}
