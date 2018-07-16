import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
declare var $:any;
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { Http, Headers,Response } from '@angular/http';
import {Observable} from 'rxjs';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
UserName;
Name;
Subject;
Description;
  constructor(private toastr: ToastrService, public userService: DataService, private http: Http, private router : Router) { }

  ngOnInit() {
  }

feedback(){
  if(this.UserName==null){
    this.toastr.error("Email is mandatory")
  }
  if(this.Name==null){
    this.toastr.error("Name is mandatory")
  }

else{
  var obj= {
    "Email":this.UserName,
    "Name":this.Name,
    "Subject":this.Subject,
    "Description":this.Description
  }
  
    let headers = new Headers({ "content-type": "application/json", });
    let options = new RequestOptions({ headers: headers });
    this.http.post("http://api.simranfresh.com/api/contactus", obj, options)
    .map(res => res.json())
    .subscribe(
      data => {
        if(data.status==true){
          this.toastr.success(data.Response)
        }
        else{
          this.toastr.error(data.objErrorInfo.ErrorMessage)
        }
       
  },
  
  error => {
  console.log(error);
  this.userService.error(error);
  });
}

} 
}


