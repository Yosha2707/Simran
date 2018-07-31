import { Component, OnInit, HostListener } from '@angular/core';
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
import Swal from 'sweetalert2'
import * as AOS from 'aos';
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
  length;
  totalpra;
  autodate;
  public now: Date = new Date();
  orderItem:any = [];
  ordersuccess=false;
  UserId;
  CustomerCategoryId;
  CustomerId;
  tom;
  veg: any = [];
  showModal = false;
  imgPreview: any;
  read=false;
  jerry:any = [];
p = [];
checkout = false;
repeatWish = false;
list: any = [];
z = [];
x = [];
q = [];
Minimum;
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
prevfinalprice;
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



        productPreview(data) {
          this.showModal = true;
          this.userService.productPrev(data).subscribe(
            (res:Response) => {
           this.veg = res;
           this.preview = this.veg.Response;
           this.Minimum = this.preview.MinQuantity;
           this.imgPreview = this.preview.objAttachmentsViewModel.AbsoluteURL;
           if(this.preview.Description!=null){
            this.length = this.preview.Description.replace(/\s/g, "").length;
           }
          });
         
         }

  refresh(): void {
    window.location.reload();
  }

  readmore(){
   
    this.read = true;
    
    }
    readless(){
      this.read = false;
    }

    afterremove(){

    }

  remove(id, index) {

    Swal({
      title: 'Sure to remove item from cart?',
      text: "Product will be removed from cart.",
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.value) {
      
        this.loading = true
        var user = JSON.parse(localStorage.getItem('currentUser'));
        if(user!=null){
          if(user.Status==true){
            this.userService.deleteUser(id).then(
              res => { // Success
                localStorage.removeItem('cartloaditem');
                this.http.get('http://api.simranfresh.com/api/wishcart/'+user.Response.Id+'?type=' + "cart").subscribe((res:Response)=>{
                  this.tom = res.json();
                  this.jerry = this.tom.Response;
                  this.productCartArray = this.jerry; 
                  
                  this.productCartArray.sort((a, b) => {
                    if (a.ProductName < b.ProductName) return -1;
                    else if (a.ProductName > b.ProductName) return 1;
                    else return 0;
                  });
                  if(this.productCartArray!=null){
                    console.log(this.productCartArray);
                    this.productCartArray.forEach((item, productIndex) => {
                      this.Price = item.Price;
                     this.productQuantity = this.productCartArray[productIndex].Quantity;
                     var ss= this.productQuantity * this.Price;
                       this.productCartArray[productIndex].finalPrice = ss.toFixed(3);
                   });
                   var a = 0;
                   this.productCartArray.forEach(element => {
                     a = (+a) + (+element.finalPrice);
                   });
                  var totalpr = a;
                  this.totalpra = Number(totalpr).toFixed(3);
                   this.total = a + this.shipping;
                   var tot = Number(this.total).toFixed(3);
                   this.total = tot;
                  }
                  this.loading = false;


                  localStorage.setItem('cartloaditem', JSON.stringify(this.jerry));
                  var c = this.productCartArray.length;
                  localStorage.setItem('cartcount', JSON.stringify(c));
                  this.cartCoount = c;
                                
              })
            }
            );
          
          }
        }else{
         var out = JSON.parse(localStorage.getItem('cartsession'));
         out.splice(index,1);
         localStorage.setItem('cartsession', JSON.stringify(out));
         var v = out.length
         localStorage.setItem('cartcount', JSON.stringify(v));
          this.cartCoount = v;
        }

        
            
         //   this.afterremove();
            Swal(
              'Deleted!',
              'Product deleted successfully.',
              'success'
            )
            
       this.loading =false;
      }});
  }

  calculateProductPricePrev(quant, price, index) {
  //var a = quant.toString().length
if(quant!=null){
  var t = +quant.toString().replace(/^[^\.]+/,'0');
}
var r = +quant - (+t);
var tt = t.toString().length - 1;
var rr  = r.toString().length;
    if(this.Minimum!=null){
        if(quant< this.Minimum){
          this.preview.MinQuantity = 0;
        }else if(rr>2){
          this.preview.MinQuantity = 0;
        }else if(tt>4){
          this.preview.MinQuantity = 0;
        }
        var final = (+this.preview.MinQuantity) * price || 0;
      this.prevfinalprice = final;
    }else if(this.Minimum==null){
        if(quant<1){
          this.preview.MinQuantity = 0;
        }else if(rr>2){
          this.preview.MinQuantity = 0;
        }else if(tt>4){
          this.preview.MinQuantity = 0;
        }
        var final = (+this.preview.MinQuantity) * price || 0;
      this.prevfinalprice = final;
    }

  }

  cartdata(data, dataQty) {
    this.reset();
    localStorage.setItem('repeat', JSON.parse("false"))
    this.userService.cartData(data, dataQty);
    this.second();

  }

  second() {
    var user = JSON.parse(localStorage.getItem('currentUser'));
    if (user != null) {
      if (user.Status == true) {
        var c = JSON.parse(localStorage.getItem('cartloaditem'));
        if (c != null) {
          var r = JSON.parse(localStorage.getItem('repeat'));
          if (r == false) {
            localStorage.setItem('cartcount', c.length);
            var x = c.length;
            this.cartCoount = x + 1;
          }
        }
      }
    } else {
      var c = JSON.parse(localStorage.getItem('cartsession'));
      if (c != null) {
        localStorage.setItem('cartcount', c.length);
        var x = c.length;
        this.cartCoount = x;
      }
    }
    this.refresh();
  }

  reset(){
    this.prevfinalprice = 0
    this.showModal = false;
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
        
        let promise = new Promise((resolve, reject) => {
          this.http.get('http://api.simranfresh.com/api/wishcart/'+user.Response.Id+'?type=' + "cart").toPromise().then((res:Response)=>{
            this.tom = res.json();
            this.jerry = this.tom.Response;
            localStorage.setItem('cartloaditem', JSON.stringify(this.jerry));
          resolve();
        })
        
        })
        this.productCartArray = JSON.parse(localStorage.getItem('cartloaditem'));
        this.productCartArray.sort();
      //  console.log(this.productCartArray)
      
      }
    }else{
      this.productCartArray = JSON.parse(localStorage.getItem('cartsession'));
     // console.log(this.productCartArray);
    }
    
    this.productCartArray.sort((a, b) => {
      if (a.ProductName < b.ProductName) return -1;
      else if (a.ProductName > b.ProductName) return 1;
      else return 0;
    });
    if(this.productCartArray!=null){
      console.log(this.productCartArray);
      this.productCartArray.forEach((item, productIndex) => {
        this.Price = item.Price;
       this.productQuantity = this.productCartArray[productIndex].Quantity;
       var ss= this.productQuantity * this.Price;
         this.productCartArray[productIndex].finalPrice = ss.toFixed(3);
     });
     var a = 0;
     this.productCartArray.forEach(element => {
       this.totalprice = (+this.totalprice) + (+element.finalPrice);
     });
    var totalpr = this.totalprice;
    this.totalpra = Number(totalpr).toFixed(3);
     this.total = this.totalprice + this.shipping;
     var tot = Number(this.total).toFixed(3);
     this.total = tot;
    }
    this.loading = false;
    
    
  }

  

  sortByLetter(string1: string, string2: string) {
    if (string1 > string2) return 1
    else if (string1 === string2) return 0
    else return -1;
}

calculateProductPrice(productQty,price , array, index){
  if(productQty!=null){
  var t = +productQty.toString().replace(/^[^\.]+/,'0');
}
var r = +productQty - (+t);
var tt = t.toString().length - 1;
var rr  = r.toString().length;
if(array.MinQuantity==null){
  if(productQty < 1){
    array.Quantity = 0;
  }else if(rr>2){
    array.Quantity = 0;
  }else if(tt > 4){
    array.Quantity = 0;
  }
        
     var s = (+array.Quantity) * price || 0;
     array.finalPrice = s.toFixed(3)
    var a = 0;
     this.productCartArray.forEach(element => {
       a = a + element.finalPrice || 0;
     });

    this.totalprice = a;
    this.totalpra = Number(this.totalprice).toFixed(3);
   // this.taxes = this.totalprice;
    this.total = this.totalprice + this.shipping;
    var tot = this.total.toFixed(3);
    this.total = tot;
  localStorage.setItem('cartquantupdate', JSON.stringify(this.productCartArray));
    this.userService.syncCart();
}else if(array.MinQuantity!=null){
  if(productQty < array.MinQuantity){
    array.Quantity = 0;
  }else if(rr>2){
    array.Quantity = 0;
  }else if(tt > 4){
    array.Quantity = 0;
  }
        
     var s = (+array.Quantity) * price || 0;
     array.finalPrice = s.toFixed(3)
    var a = 0;
     this.productCartArray.forEach(element => {
       a = a + element.finalPrice || 0;
     });

    this.totalprice = a;
    this.totalpra = this.totalprice.toFixed(3);
   // this.taxes = this.totalprice;
    this.total = this.totalprice + this.shipping;
    var tot = this.total.toFixed(3);
    this.total = tot;
  localStorage.setItem('cartquantupdate', JSON.stringify(this.productCartArray));
    this.userService.syncCart();
}
}


 

check(){
    var cartclr = true;
    this.productCartArray.forEach(element => {
      if(element.Quantity==0){
        cartclr=false;
        this.toastr.error("Item Quantity can not be zero!")
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
 // }


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
  
  if(this.Name == ''){
    this.toastr.error("Please provide your name")
  }
  else if(this.MobileNo == ''){
    this.toastr.error("MobileNo is required")
  }
  else if(this.Address == ''){
    this.toastr.error("Address is required")
  }
  else if(this.City == ''){
    this.toastr.error("City is required")
  }

 else{
  Swal({
    title: 'Place Order',
    text: "Payment mode is cash on delivery.Please confirm to place order.",
    type: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Place Order'
  }).then((result) => {
    if (result.value) {
      Swal(
        'Placed!',
        'Your order has been placed successfully.',
        'success'
      )
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
       "NetAmount":Math.round(this.total),
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
    //console.log(JSON.stringify(order));
      const url = `${"http://api.simranfresh.com/api/order/"}`;
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.put(url, order , {headers:headers}).map(res => res.json()).subscribe(
        data => {
         if(data.Status==true){
         //  console.log(data);
           localStorage.removeItem('cartloaditem');
        //   this.refresh();
        this.router.navigate(['/Orders']);
        this.loading = false;
          
         }
          
    },
    
      error => {
        this.loading = false;
        this.userService.error(error);
    });
    }
  })
 }



 
}

whishlist(data, qty) {
  var l = JSON.parse(localStorage.getItem('currentUser'));
  if (l != null) {
    var t = l.Response.Id;
    this.list = {
      "Id": 0,
      "UserId": t,
      "WishCartType": "wish",
      "ProductId": data.Id,
      "Quantity": qty,
      "CreatedDate": data.CreatedDate,
      "ProductName": data.Name,
      "Description": data.Description,
      "HSNCode": data.HSNCode,
      "MinQuantity": data.MinQuantity,
      "Price": data.Price,
      "UnitName": data.UoMName,
    }
    localStorage.setItem('wishonetime', JSON.stringify(this.list));
    this.http.get('http://api.simranfresh.com/api/wishcart/' + t + '?type=' + "wish").subscribe(
      (res: Response) => {
        this.z = res.json();
        this.x = this.z["Response"]

        this.x.forEach((item, productIndex) => {
          if (item.ProductId == data.Id) {
            this.repeatWish = true;
            this.toastr.info("Product Already In Wishlist!")
          }
        });
        if (this.repeatWish == false) {
          let obj = [];
          var o = JSON.parse(localStorage.getItem('wishonetime'));
          obj.push(o);
          Array.prototype.push.apply(this.x, obj);
          const url = `${"http://api.simranfresh.com/api/wishcart"}`;
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          this.http.put(url, this.x, {
              headers: headers
            })
            .map(res => res.json())
            .subscribe(
              data => {
                if (data.Status == true) {
                  this.toastr.success("Added to wishlist successfully!")
                  localStorage.removeItem('wishonetime');
                }
              },

              error => {
                this.userService.error(error);
             //   console.log(error);
              });
        }
      });

  } else {
    this.toastr.info("Please login to add in wishlist!")
  }

}
 }
   






