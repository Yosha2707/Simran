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
import * as Inputmask from 'inputmask'

@Component({
  selector: 'app-orderinfo',
  templateUrl: './orderinfo.component.html',
  styleUrls: ['./orderinfo.component.css']
})
export class OrderinfoComponent implements OnInit {
info;
orderid;
  constructor(private toastr: ToastrService,public route:ActivatedRoute, public userService: DataService, private http: Http, private router : Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.orderid = +params['id'];
      this.details(this.orderid);
    })
  }
  details(id){
    this.http.get('http://api.simranfresh.com/api/order/'+ id ).subscribe(
      (res: Response) => {
        var o = res.json();
        if(o.Status==true){
          this.info = o.Response.objOrderDetailsViewModel;
          console.log(this.info);
        }
      },
      error => {
        this.toastr.error('Something Wrong Happened..!!'); 
      });
  }

}
