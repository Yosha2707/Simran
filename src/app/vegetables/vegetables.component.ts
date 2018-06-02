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

@Component({
  selector: 'app-vegetables',
  templateUrl: './vegetables.component.html',
  styleUrls: ['./vegetables.component.css'],
  providers: [DataService]
})
export class VegetablesComponent implements OnInit {

  DataArray: any = [];
  array:any [];
  productObj: any
  constructor(public data: DataService, private http: Http, private router : Router) { 
    this.productObj = {
      "Id":null,
      "ChildId":null,
      "Name":null,
      "Description":null,
      "MinDesired":null,
      "MaxDesired":null,
      "IsActive":true,
      "PageCount":null,
      "PageSize":null,
      "TopSearch":null,
      "ChildName":null,
      "UoMName":null,
      "ProdCat":null,
      "From":null,
      "To":null,
      "FirmName":null,
      "ContactPerson":null,
      "Address":null,
      "MobileNo":null,
      "Landline":null,
      "Email":null,
      "GSTNo":null,
      "CustomerCategoryId":null,
      "ZoneId":null,
      "CustomerCategoryName":null,
      "ZoneName":null
  }
  let headers = new Headers({ "content-type": "application/json", });
  let options = new RequestOptions({ headers: headers });
  this.http.post("http://api.simranfresh.com/api/product", this.productObj, options)
  .map(res => res.json())
  .subscribe((res:Response) => {
  console.log(res)  
  this.DataArray = res;
  this.array = this.DataArray.Response

  }); 
   
}

cartdata(data)
{
    let a = [];
    let z =[];
    a = JSON.parse(localStorage.getItem('session'));
    if(a==null){
      z.push(data)
      localStorage.setItem('session', JSON.stringify(z));
    }else{
      a.push(data);
      localStorage.setItem('session', JSON.stringify(a));
    }
    
    alert("Added To cart")
}


onSubmit (product: any) {
 
}

  ngOnInit() {
    
  }

  LoadTableData(){
    this.data.LoadData().subscribe(data => {
        this.DataArray = data;
        console.log(data);
    });
}

}
