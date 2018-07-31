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
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css']
})
export class WhishlistComponent implements OnInit {
  public loading=false;
list: any = [];
wishlist = [];
images = [];
imgarray;
case;
pageCount = null;
count = 1;
veg:any = [];
p:any =  [];
q:any = [];
public cartCoount;
updatedArray:any = [];
cartloadData:any = [];
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
repeatCart = false;
array:any = [];
length;
prevfinalprice;
read = false;
  constructor(private toastr: ToastrService, public userService: DataService, private http: Http, private router : Router) { 
    this.cartCoount = localStorage.getItem('cartcount');
  }

  ngOnInit() {
    this.loading = true;
    var l = JSON.parse(localStorage.getItem('currentUser'));
    var t = l.Response.Id;
    this.http.get('http://api.simranfresh.com/api/wishcart/'+t+'?type=' + "wish").subscribe(
      (res: Response) => {
     this.list = res.json();
     this.wishlist = this.list.Response;
     
     this.loading=false;
      });
  }

  cartdata(data, dataQty){
    
    this.loading = true;
    this.userService.cartData(data,dataQty);
    var user = JSON.parse(localStorage.getItem('currentUser'));
  if(user!=null){
    if(user.Status==true){
      var c = JSON.parse(localStorage.getItem('cartloaditem'));
      if(c!=null){
        var r = JSON.parse(localStorage.getItem('repeat'));
  if(r==false){
    localStorage.setItem('cartcount', c.length);
    var x = c.length;
  this.cartCoount = x+1;
  }
      }
    }
  }else{
    var c = JSON.parse(localStorage.getItem('cartsession'));
    if(c!=null){
      localStorage.setItem('cartcount', c.length);
      var x = c.length;
    this.cartCoount = x;
    }
  }
  this.loading = false;
  }

  calculateProductPricePrev(quant, price, index) {
    if (quant > 99) {
      this.toastr.error("Maximum Quantity 99 Kg!")
    } else {
      var final = (+quant) * price || 0;
      this.prevfinalprice = final;
    }

  }
  reset(){
    this.prevfinalprice = 0
   // this.showModal = false;
  }




  productPreview(data) {
   // this.showModal = true;
    this.userService.productPrev(data).subscribe(
      (res:Response) => {
     this.veg = res;
     this.preview = this.veg.Response;
     console.log("*****")
     console.log(this.preview)
     this.imgPreview = this.preview.objAttachmentsViewModel.AbsoluteURL;
     if(this.preview.Description!=null){
      this.length = this.preview.Description.replace(/\s/g, "").length;
     }
    
    });
   
   }
   readmore(){
   
    this.read = true;
    this.length = 0;  
    }
    readless(){
      this.read = false;
    }

  refresh(): void {
    window.location.reload();
  }

  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
      }

  remove(id, index) {
this.loading = true;
    this.userService.deleteUser(id).then(
      res => { // Success
        this.ngOnInit(); 
        this.loading = false;
      }
    );
  }

  next(){
    this.count = this.count + 1;
  this.pageCount = this.count;
  //alert(this.pageCount);
 // this.search(null);
  }
  
  
  Prev(){
    this.count = this.count - 1;
  this.pageCount = this.count;
 // this.search(null);
  }
  
  faminus(){
    if(this.preview.MinQuantity>1){
      this.preview.MinQuantity = this.preview.MinQuantity - 1;
    }
  
  }
  
  faplus(){
    this.preview.MinQuantity = this.preview.MinQuantity + 1;
  }

  home() {
    this.router.navigate(['']);
    this.refresh();
  }

  calculateProductPrice(quant, price, index){
    if(quant>99){
      this.wishlist[index].Quantity = 0;
      this.toastr.error("Maximum Quantity 99 Kg!")
    }else{
      var final = quant*price;
      this.wishlist[index].finalPrice = final;
    }
 
  
  }
}
