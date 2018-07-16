import {Directive, ElementRef, Input,Component, OnInit, HostListener  } from '@angular/core';
import {DataService} from '../services/data.service';
declare var $:any;
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { Http, Headers,Response } from '@angular/http';
import {Observable} from 'rxjs';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import { CanActivate, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  DataArray: any = [];
  array:any [];
  UserId;
  info;
  constructor(private toastr: ToastrService,public route:ActivatedRoute, public userService: DataService, private http: Http, private router : Router) {
    this.list();
   }

  ngOnInit() {

  }

list(){
  var user = JSON.parse(localStorage.getItem('currentUser'));
  this.UserId = user.Response.objCustomerViewModel.Id;
  var obj={
    "CustomerId": this.UserId
  }

  let headers = new Headers({ "content-type": "application/json", });
  let options = new RequestOptions({ headers: headers });
  this.http.post("http://api.simranfresh.com/api/order/", obj, options)
  .map(res => res.json())
  .subscribe((res:Response) => {
  this.DataArray = res;
  this.array = this.DataArray.Response
console.log(this.array)
  }); 
}

details(orderid){

}


}
