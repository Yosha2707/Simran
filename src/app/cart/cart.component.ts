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
import { FormGroup, Validators, FormControl } from "@angular/forms";
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],


})
export class CartComponent implements OnInit {
  public loading = false;
  datePickerConfig: Partial<BsDatepickerConfig>;
  formGroup: FormGroup;
  productCartArray = [];
  c = [];
  price = [];
  final_price;
  Price;
  totalprice = 0;
  sum = 0;
  variable;
  productQuantity = 1;
  taxes;
  shipping = 0;
  total;
  cartCoount;
  calarray = [];
  res: Float64Array;
  Name;
  MobileNo;
  Email;
  GST;
  Cities;
  City;
  Branches;
  Branch;
  Zones;
  Zone;
  ZoneId;
  BranchId;
  CityId;
  Address;
  DateC;
  minDate: Date;
  datee;
  autodate;
  public now: Date = new Date();
  orderItem:any = [];
  ordersuccess=false;
  UserId;
  CustomerCategoryId;
  CustomerId;
  tom;
  jerry:any = [];
p = [];
checkout = false;
  constructor(private toastr: ToastrService, public userService: DataService, private http: Http, private router : Router) {
    this.cartCoount = localStorage.getItem('cartcount');
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
     
        
          this.formGroup = new FormGroup({
            Name: new FormControl('', [
              Validators.required,
            ]),
            MobileNo: new FormControl('', [
              Validators.required,
              Validators.maxLength(10)
            ]),
            Email: new FormControl('', [
              Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            ]),
            GST: new FormControl('', [
            ]),
            Z: new FormControl('', [
              Validators.required,
            ]),
            B: new FormControl('', [
              Validators.required,
            ]),
            C: new FormControl('', [
              Validators.required,
            ]),
            DateC: new FormControl('', [
              Validators.required,
            ]),
            Address: new FormControl('', [
              Validators.required,
            ]),
            Date: new FormControl('', [
              Validators.required,
            ]),
      
          });
          this.minDate = new Date();
          this.datee = new Date();
          var d = new Date(this.datee);
          var e = d.getHours();
          var t = d.toDateString();
        
          if(e<12){
          this.autodate = t;
             this.minDate.setDate(this.minDate.getDate());
          }
          else{
            var p =  this.minDate.setDate(this.minDate.getDate()+1);
           
            var r = new Date(p);
            this.autodate = r.toDateString();
           
             this.minDate.setDate(this.minDate.getDate()+1);
          }
      

          
        }//constructor close


  refresh(): void {
    window.location.reload();
  }

  remove(id, index) {
    var user = JSON.parse(localStorage.getItem('currentUser'));
    if(user!=null){
      if(user.Status==true){
        this.userService.deleteUser(id).then(
          res => { // Success
            localStorage.removeItem('cartloaditem');
            this.http.get('http://api.simranfresh.com/api/wishcart/'+user.Response.Id+'?type=' + "cart").subscribe((res:Response)=>{
              this.tom = res.json();
              this.jerry = this.tom.Response;
              localStorage.setItem('cartloaditem', JSON.stringify(this.jerry));
              this.productCartArray = JSON.parse(localStorage.getItem('cartloaditem'));
              this.refresh();
          })
        }
        );
      
      }
    }else{
     var out = JSON.parse(localStorage.getItem('cartsession'));
     out.splice(index,1);
     localStorage.setItem('cartsession', JSON.stringify(out));
     this.refresh();
    }
    
        var b = JSON.parse(localStorage.getItem('cartcount'));
        var c = b - 1;
        localStorage.setItem('cartcount', JSON.stringify(c));
       
   this.loading =false;
  }



  ngOnInit() {
    this.loading = true;
   
    var user = JSON.parse(localStorage.getItem('currentUser'));
    if(user!=null){
      if(user.Status==true){
        this.Name = user.Response.UserName;
        this.MobileNo = user.Response.MobileNo;
        this.Email = user.Response.Email;
        this.GST = user.Response.GSTNumber;
        this.BranchId = user.Response.BranchId;
        this.CityId = user.Response.CityId;
        this.Address = user.Response.Address;
        this.UserId = user.Response.Id;
        this.ZoneId = user.Response.ZoneId;
        if (user.Response.objCustomerViewModel != null && user.Response.objCustomerViewModel != undefined){
          this.CustomerCategoryId= user.Response.objCustomerViewModel.CustomerCategoryId;
          this.CustomerId = user.Response.objCustomerViewModel.Id;
        } else {
          this.CustomerCategoryId= 0;
          this.CustomerId = 0;
        }
        
       
        this.http.get('http://api.simranfresh.com/api/wishcart/'+user.Response.Id+'?type=' + "cart").subscribe((res:Response)=>{
          this.tom = res.json();
          this.jerry = this.tom.Response;
          localStorage.setItem('cartloaditem', JSON.stringify(this.jerry));
        })
        this.productCartArray = JSON.parse(localStorage.getItem('cartloaditem'));
        console.log(this.productCartArray);
      }
    }else{
      this.productCartArray = JSON.parse(localStorage.getItem('cartsession'));
    
    }
    
  
    if(this.productCartArray!=null){
      this.productCartArray.forEach((item, productIndex) => {
        this.Price = item.Price;
       this.productQuantity = this.productCartArray[productIndex].Quantity;
         this.productCartArray[productIndex].finalPrice = this.productQuantity * this.Price;
     });
     var a = 0;
     this.productCartArray.forEach(element => {
       this.totalprice += element.finalPrice || 0;
     });
    // this.taxes = this.totalprice;
     this.total = this.totalprice + this.shipping;
    }
   
    this.loading = false;
  }

  calculateProductPrice(productQty,price , array, index) {
    if(productQty>99){
      console.log(array)
      array.Quantity = 0;
      this.toastr.error("Maximum Quantity 99..!")
    }
  else{
    array.Quantity = productQty;
    array.finalPrice = (+productQty) * price || 0;
    var a = 0;
    this.productCartArray.forEach(element => {
      a = a + element.finalPrice || 0;
    });
    this.totalprice = a;
   // this.taxes = this.totalprice;
    this.total = this.totalprice + this.shipping;
  localStorage.setItem('cartquantupdate', JSON.stringify(this.productCartArray));
    this.userService.syncCart();
  }
  }

 

check(){
  document.body.scrollTop = 0;
  if(this.checkout==true){
    this.placeorder();
  }
  else{
    var cartclr = true;
    this.productCartArray.forEach(element => {
      if(element.Quantity==0){
        cartclr=false;
        this.toastr.error("Item Quantity can not be zero..!")
      }
      });
  if(cartclr==true){
    var user = JSON.parse(localStorage.getItem('currentUser'));
    if(user!=null){
      if(user.Status==true){
        this.checkout = true;
      }
    }else{
      this.router.navigate(['/login']);
      
    }
  }
  }


}



back(){
  this.checkout = false;
}

// faminus(dataQ, price, arrayplus){
//   var a = 0;
//   if(dataQ>1){
//     var dat = (+dataQ) - (+0.5);
//     arrayplus.Quantity = dat;
//     arrayplus.finalPrice = dat*price
//     this.productCartArray.forEach(element => {
//       a = a + element.finalPrice || 0;
//     });
//     this.totalprice = a;
//   //  this.taxes = this.totalprice;
//     this.total = this.totalprice +  this.shipping; 
 
//   }

// }

// faplus(dataQ, price, arrayplus){
//   var a = 0;
//    var dat = (+dataQ) + (+0.5);
//    arrayplus.Quantity = dat;
//    arrayplus.finalPrice =dat*price;
//    this.productCartArray.forEach(element => {
//      a = a + element.finalPrice || 0;
//    });
//    this.totalprice = a;
//   // this.taxes = this.totalprice;
//    this.total = this.totalprice +  this.shipping; 

//  }

 placeorder(){
   this.loading = true;
  this.productCartArray.forEach(element => {
   var t = {
    "Id":0,
    "OrderId":0,
    "ProductId":element.ProductId,
    "ProductName":element.ProductName,
    "Quantity":element.Quantity,
    "Price":element.Price,
    "Amount":element.finalPrice,
    "DiscountApplicable":null,
    "TaxApplicable":null,
    "OtherChargesApplicable":null,
    "UnitName":element.UnitName
   }
  
   this.orderItem.push(t);
  
  });

  var len = this.orderItem.length;
   var order = {"Id":0,
   "OrderDate":this.datee,
   "DileveryDate":this.autodate,
   "CustomerCategoryId":this.CustomerCategoryId,
   "CustomerId":this.CustomerId,
   "BranchId":this.BranchId,
   "ZoneId":this.ZoneId,
   "NetAmount":this.total,
   "TotalItems":len,
   "RedeemWallet":false,
   "cusName":this.Name,
   "cusMobile":this.MobileNo,
   "cusEmail":this.Email,
   "cusGSTNumber":this.GST,
   "cusAddress":this.Address,
   "OrderStatus":0,
   "PaymentStatus":0,
   "InvoiceStatus":0,
   "IsActive":true,
   "CustomerCategoryName":"General (Public)",
   "CustomerName":this.Name,
   "BranchName":null,
   "ZoneName":null,
   "objOrderDetailsViewModel":this.orderItem,
   "CreatedDate":this.datee,
   "CreatedBy":null,
   "ModifiedDate":this.datee,
   "ModifiedBy":this.UserId,
   "isFrontend":true
   }
console.log(JSON.stringify(order));
  const url = `${"http://api.simranfresh.com/api/order/"}`;
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  this.http.put(url, order , {headers:headers}).map(res => res.json()).subscribe(
    data => {
     if(data.Status==true){
       localStorage.removeItem('cartloaditem');
       this.refresh();
    this.router.navigate(['/success']);
    this.loading = false;
      
     }
      
},

  error => {
    this.loading = false;
    this.userService.error(error);
});
}
 }
   






