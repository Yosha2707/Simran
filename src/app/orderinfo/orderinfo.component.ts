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
personal;
cusName;
cusEmail;
cusMobile;
cusAddress;
netAmount;
orderDate;
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
          this.personal = o.Response;
          console.log(this.personal)
          this.cusName = this.personal.cusName;
          this.cusEmail = this.personal.cusEmail;
          this.cusMobile = this.personal.cusMobile;
          this.cusAddress = this.personal.cusAddress;
          this.netAmount = this.personal.NetAmount;
          this.orderDate = this.personal.OrderDate;
          this.info = o.Response.objOrderDetailsViewModel;
          this.orderDate = this.personal.OrderDate
          console.log(this.info);
        }
      },
      error => {
        this.toastr.error('Something Wrong Happened..!!'); 
      });
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <style>
        
    
        
        th{
            text-align: center;
        }
        
        td{
            text-align: right;
        }
        
        .table-bordered>tbody>tr>td{
            border-bottom :1px solid black;
            margin-bottom:2px;
        }
        
        .table-bordered>thead>tr>th{
            margin-bottom:2px;
            border-bottom:1px solid black;
        }
      
        .receipt-main p {
            color: black;
          
            line-height: 1.42857;
        }
        .receipt-footer h1 {
            font-size: 15px;
            font-weight: 400 !important;
            margin: 0 !important;
        }
        
        .img-responsive{
            width: 71px; border-radius: 43px;
        }
        .receipt-main::after {
            background: #e0e4a8 none repeat scroll 0 0;
            content: "";
            height: 5px;
            left: 0;
            position: absolute;
            right: 0;
            top: -13px;
        }
        .receipt-main thead {
            background: #e0e4a8 none repeat scroll 0 0;
        }
        .receipt-main thead th {
            color:black;
        }
        .receipt-right h5 {
            font-size: 20px;
            font-weight: bold;
            margin: 0 0 7px 0;
        }
        .receipt-right p {
            font-size: 12px;
            margin: 0px;
        }
        .receipt-right img{
            text-align: center;
        }
        
        h1 {
            font-size: 26px;
        }
        .receipt-right p i {
            text-align: center;
            width: 18px;
        }
        .receipt-main td {
            padding: 9px 20px !important;
        }
        .receipt-main th {
            padding: 13px 20px !important;
        }
        .receipt-main td {
            font-size: 13px;
            font-weight: initial !important;
        }
        .receipt-main td p:last-child {
            margin: 0;
            padding: 0;
        }	
        .receipt-main td h2 {
            font-size: 20px;
            font-weight: 900;
            margin: 0;
            text-transform: uppercase;
        }
        .receipt-header-mid .receipt-left h1 {
            
            margin: 34px 0 0;
            text-align: right;
            text-transform: uppercase;
        }
        .receipt-header-mid {
            margin: 24px 0;
            overflow: hidden;
        }
        
  
        h1{
            font-size: 18px;
        }
        
        #container {
            background-color: #dcdcdc;
        }
        
        .foot{
            font-size: 9px;
            text-align: center;
        }
        
        hr {
            margin-top: -10px;
          margin-bottom: -10px; 
            border: 0;
            border-top: 1px solid black;
            /* border-top: 1px solid #eee; */
        }
        
      
        
        .bot{
             padding: 5px; 
            width: 80px;
              border-radius: 7px;
        }
        
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}

}
