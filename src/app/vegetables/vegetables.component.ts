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
  selector: 'app-vegetables',
  templateUrl: './vegetables.component.html',
  styleUrls: ['./vegetables.component.css'],
  providers: [DataService]
})
export class VegetablesComponent implements OnInit {
  DataArray: any = [];
  array:any [];
  arrayWishlist: any = [];
  arraywish = [];
  fruitObj: any;
  updatedArray:any = [];
  public cartCoount;
veg: any = [];
wish: any = [];
  pageCount = null;
  count = 1;
Price;
public cartloadData;
repeatCart = false;
repeatWish = false;
list:any = [];
z = [];
x = [];
p = [];
q = [];
preview: any = [{
  "Id": 0,
  "ProductCategoryId": 0,
  "UoMId": 0,
  "Name": "",
  "ImageUpload": "",
  "HSNCode": "",
  "MinQuantity": 0,
  "IsActive": false,
  "Description": "",
  "ProductCategoryName": null,
  "UoMName": null,
  "Price": null,
  "objProdCatTaxesVM": [],
  "objAttachmentsViewModel": {
    "Id": 0,
    "EntityType": 0,
    "EntityId": 0,
    "Title": "",
    "AttachmentUniqueId": "",
    "Description": null,
    "Tag": null,
    "FileName": "",
    "FileExt": "",
    "MediaType": "",
    "MediaString": null,
    "IsTempAttachment": false,
    "AbsoluteURL": "",
    "SubCategoryName": null,
    "CreatedDate": "",
    "CreatedBy": 0,
    "ModifiedDate": "",
    "ModifiedBy": 5
  },
  "CreatedDate": "",
  "CreatedBy": 0,
  "ModifiedDate": "",
  "ModifiedBy": 0
}];
imgPreview: any;
  constructor(private toastr: ToastrService, public userService: DataService, private http: Http, private router : Router) {
   this.cartCoount = localStorage.getItem('cartcount');
    this.cartloadData = localStorage.getItem('session');
   
    var l = JSON.parse(localStorage.getItem('currentUser'));
    if(l!=null){
      var t = l.Response.Id;
    }
    this.http.get('http://api.simranfresh.com/api/wishcart/'+t+'?type=' + "wish").subscribe(
      (res: Response) => {
     this.z = res.json();
    this.x = this.z["Response"]
      });
    this.http.get('http://api.simranfresh.com/api/wishcart/'+t+'?type=' + "cart").subscribe(
      (res: Response) => {
     this.p = res.json();
    this.q = this.p["Response"]
        });
        this.search(null);
  }

  ngOnInit() { }

  cartdata(data, dataQty) {
    this.q.forEach((item, productIndex) => {
        if(item.ProductId==data.Id){
          this.repeatCart = true;
          this.toastr.info("Product Already In Cart...!")
        }
   });
   if(this.repeatCart==false){
    let a = [];
    let z =[];
    var l = JSON.parse(localStorage.getItem('currentUser'));
    var t = l.Response.Id;
    var dat = {
      "Id":0,
      "UserId":l.Response.Id,
      "WishCartType": "cart",
      "ProductId": data.Id,
      "Quantity": dataQty,
      "CreatedDate":data.CreatedDate,
      "ProductName": data.Name,
      "Description": data.Description,
      "HSNCode": data.HSNCode,
      "MinQuantity": data.MinQuantity,
      "Price": data.Price,
      "UnitName": data.UoMName
    }
   
    if(this.q==null){
      z.push(dat)
      localStorage.setItem('session', JSON.stringify(z));
    }
    else{
      this.q.push(dat);
      localStorage.setItem('session', JSON.stringify(this.q));
    }
    
    this.updatedArray = JSON.parse(localStorage.getItem('session'));
    localStorage.setItem('cartcount', JSON.stringify(this.updatedArray.length));
    this.cartCoount = this.updatedArray.length;

   const url = `${"http://api.simranfresh.com/api/wishcart"}`;
   let headers = new Headers();
   headers.append('Content-Type', 'application/json');
  this.http.put(url, this.updatedArray , {headers:headers})
  .map(res => res.json()) 
   .subscribe(
    data => {
      this.q = this.updatedArray;
      console.log(data);
      this.toastr.success("Added to cart successfully..!")
},

error => {
this.userService.error(error);
console.log(error);
});

this.http.get('http://api.simranfresh.com/api/wishcart/'+t+'?type=' + "cart").subscribe(
  (res: Response) => {
 var j = res.json();
var y = j["Response"]
localStorage.setItem('session', JSON.stringify(y));
var aaa = JSON.parse(localStorage.getItem('session'));
   this.cartloadData = aaa;
   console.log(this.cartloadData)
    });
   }
  }

  productPreview(data) {
    this.http.get('http://api.simranfresh.com/api/product/' + data).subscribe(
      (res: Response) => {
        this.veg = res.json();
        this.preview = this.veg.Response;
        this.imgPreview = this.preview.objAttachmentsViewModel.AbsoluteURL;
      });
  }

 

  whishlist(data){
    this.x.forEach((item, productIndex) => {
      if(item.ProductId==data.Id){
        this.repeatWish = true;
        this.toastr.info("Product Already In Wishlist...!")
      }
 });
 if(this.repeatWish==false){
  var l = JSON.parse(localStorage.getItem('currentUser'));
  var t = l.Response.Id;
  var a = [];
  this.list = {
    "Id":0,
    "UserId":l.Response.Id,
    "WishCartType": "wish",
    "ProductId": data.Id,
    "Quantity": 1,
    "CreatedDate":data.CreatedDate  ,
    "ProductName": data.Name,
    "Description": data.Description,
    "HSNCode": data.HSNCode,
    "MinQuantity": data.MinQuantity,
    "Price": data.Price,
    "UnitName": data.UoMName,
  }
  this.x.push(this.list)
//  console.log(this.x);
const url = `${"http://api.simranfresh.com/api/wishcart"}`;
 let headers = new Headers();
 headers.append('Content-Type', 'application/json');
this.http.put(url, this.x , {headers:headers})
.map(res => res.json()) 
 .subscribe(
  data => {
  //  console.log(data);
    this.toastr.success("Added to WishList Successfully...!")
 //   this.refresh();
   
    
},

error => {
this.userService.error(error);
console.log(error);
});
 }
  }
  

  refresh(): void {
    window.location.reload();
 }

search(data){
 // alert(this.pageCount);
  if(data!=null){
    this.pageCount = null;
    this.count = 1;
  }
  this.fruitObj = {
    "Id":null,
    "ChildId":null,
    "Name":data,
    "Description":null,
    "MinDesired":null,
    "MaxDesired":null,
    "IsActive":true,
    "PageCount":this.pageCount,
    "PageSize":12,
    "TopSearch":null,
    "ChildName":null,
    "UoMName":null,
    "ProdCat":"Vegetables",
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
  this.http.post("http://api.simranfresh.com/api/productprices", this.fruitObj, options)
  .map(res => res.json())
  .subscribe((res:Response) => {
  this.DataArray = res;
  this.array = this.DataArray.Response
console.log(this.array);
 // console.log(this.DataArray);
  }); 
}
  
next(){
  this.count = this.count + 1;
this.pageCount = this.count;
//alert(this.pageCount);
this.search(null);
}


Prev(){
  this.count = this.count - 1;
this.pageCount = this.count;
this.search(null);
}

faminus(){
  if(this.preview.MinQuantity>1){
    this.preview.MinQuantity = this.preview.MinQuantity - 1;
  }

}

faplus(){
  this.preview.MinQuantity = this.preview.MinQuantity + 1;
}

}
