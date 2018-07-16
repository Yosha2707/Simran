import { Component, OnInit } from '@angular/core';
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
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  readonly rootUrl = 'http://api.simranfresh.com/api/changepassword';
code;
valid:any = false;
value;
UserName;
UserPassword;
ConfirmPassword;
Url;
IsVerified;
resetInfo;
Id;
  constructor(private activatedRoute: ActivatedRoute, private toastr: ToastrService, private http: Http, private userService: DataService, private router:Router, public AuthGuard: AuthGuard) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.code = params['code'];
  });

      this.http.get('http://api.simranfresh.com/api/changepassword?code='+ this.code).subscribe(
        (res: Response) => {
          this.value = res.json()
          console.log(this.value)
          this.UserName = this.value.Response.UserName;
          this.UserName = this.value.Response.UserName;
          this.Id = this.value.Response.Id;
          this.Url = this.value.Response.Url;
         if(res.ok==true){
           this.valid=true;
         }
        },
        error => {
          this.toastr.error('Something Wrong Happened!'); 
        });
    }

  reset(UserPassword, ConfirmPassword){
    console.log(this.UserName);
    console.log(this.Url);
    console.log(UserPassword);
    console.log(ConfirmPassword);
    console.log(this.Id);
this.resetInfo = {
  "UserName":this.UserName,
  "UserPassword":UserPassword,
  "ConfirmPassword":ConfirmPassword,
  "Url":this.Url,
  "IsVerified": true,
  "Id": this.Id
}
let headers = new Headers({ "content-type": "application/json", });
let options = new RequestOptions({ headers: headers });
this.http.post(this.rootUrl,this.resetInfo, options)
   .map(res => res.json())
   .subscribe(
             data => {
              this.toastr.success('Password Reset Successfully!');
               this.router.navigate(['/login'])
},

error => {
  this.userService.error(error);
});
  }

  ngOnInit() {}

  }
