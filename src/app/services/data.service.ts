import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response, Jsonp } from '@angular/http';
import {User} from './user.model';
import { Subject } from 'rxjs/Subject';
import {AuthGuard} from '../auth/auth.guard';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import { VegetablesComponent } from '../vegetables/vegetables.component';
import { HeaderComponent } from '../header/header.component';
import { ViewChild } from '@angular/core'
import { ToastrService } from 'ngx-toastr';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Injectable()
export class DataService {
  readonly rootUrl = 'https://api.simranfresh.com/api/account';
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;
updatedArray:any = [];
public cartCoount;
public cartloadData;
q:any = [];
z:any = [];
x:any = [];
p:any = [];
userid;
dat:any = [];
tom;
toom;
jerry:any = [];
jerryy:any = [];
currentUrl;
previousUrl;
noddy:any = [];
bob:any = [];
  constructor(private http: Http, public AuthGuard: AuthGuard,private toastr: ToastrService, public router : Router) {
    this.cartCoount = localStorage.getItem('cartcount');
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {        
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
   }

   

  private headers = new Headers({ 'Content-Type': 'application/json' });

  registerUser(userData): Observable<any> {
    return this.http.post('http://api.simranfresh.com/api/signup/', userData);

  } 


  public getPreviousUrl(){
    return this.previousUrl;
  } 

  userAuthentication(username: string, password: string) {
    let headers = new Headers({ "content-type": "application/json", });
    let options = new RequestOptions({ headers: headers });
    this.http.post(this.rootUrl,
       { UserName: username, UserPassword: password, IsRememberMe:null, Lastlogin:null }, options)
       .map(res => res.json())
    .subscribe((res:Response) => {
   return res;
    });
  }
  
  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
  }


  deleteUser(id: number) { 
   
  let promise = new Promise((resolve, reject) => {
    let url = "http://api.simranfresh.com/api/wishcart/";  
 this.http.delete(url +"/"+ id)
 .toPromise().then(
  res =>{
    resolve();
  })
  })
    return promise;
  }



productPrev(data)  {
  return this.http.get('http://api.simranfresh.com/api/product/' + data + '/1')
  .map(response => response.json());
 
}

getEncRequest(){
  let headers = new Headers({ "content-type": "application/json", });
  let options = new RequestOptions({ headers: headers });
  return this.http.get('http://api.simranfresh.com/api/testccAvenue/',options)
  .map(res => res.json());
  }

cartData(data, dataQty){
  //alert(dataQty)
  var repeat=false;
  let array = [];
  var beforeadd = JSON.parse(localStorage.getItem('cartsession'));
  var user = JSON.parse(localStorage.getItem('currentUser'));
  if(user==null){
     this.userid = 0;
   if(beforeadd!=null){
    beforeadd.forEach((element, index) => {
      if(element.ProductId==data.Id){
        // this.toastr.info("Product Already in cart!");
        var yo = element.Quantity;
        var po = dataQty;
        var to = +yo + +po;
        if(to>99){
          dataQty = po;
        }else{
          dataQty = to;
        }
        
        beforeadd.splice(index,1);
       // console.log(beforeadd);
        localStorage.setItem('cartsession', JSON.stringify(beforeadd));
        // localStorage.setItem('repeat', JSON.parse("true"))
        localStorage.setItem('repeat', JSON.parse("false"))
        repeat=false;
      }
    });
   }
  

   if(beforeadd==null){
     
     this.toastr.info("You need to login to place order!")
   }
  }else{
    this.userid = user.Response.Id;
//     this.http.get('http://api.simranfresh.com/api/wishcart/'+this.userid+'?type=' + "cart").subscribe((res:Response)=>{
//       this.bob = res.json();
//       this.noddy = this.bob.Response;
//       localStorage.setItem('cartloaditem', JSON.stringify(this.noddy));
//     })
//     var latest = JSON.parse(localStorage.getItem('cartloaditem'))
//     console.log("!!!!!!!!!!!!")
//     console.log(latest)
//  if(latest!=null){
//   latest.forEach((element, index) => {
//     if(element.ProductId==data.Id){
//       var yoo = element.Quantity;
//       var poo = dataQty;
//       var too = +yoo + +poo;
//       dataQty = too;
//       console.log(latest);
//       latest.splice(index,1)
//      console.log(latest);
//       localStorage.setItem('cartsession', JSON.stringify(latest));
//       // localStorage.setItem('repeat', JSON.parse("true"))
//       localStorage.setItem('repeat', JSON.parse("false"))
//       repeat=false;
//     }
//   });
//  }
  }
  if(repeat==false){
    
    var dat = {
      "Id":0,
      "UserId":this.userid,
      "WishCartType": "cart",
      "ProductId":data.ProductId || data.Id,
      "Quantity": parseFloat(dataQty) || dataQty,
      "CreatedDate":data.CreatedDate  ,
      "ProductName": data.Name,
      "Description": data.Description,
      "HSNCode": data.HSNCode,
      "MinQuantity": null,
      "Price": data.Price,
      "UnitName": data.UoMName,
      "objAttachmentsViewModel":data.objAttachmentsViewModel,
      "incart":true
    }
 // alert(JSON.stringify(dat))
    if(beforeadd==null){
      let setArray = [];
      console.log("131313");
      console.log(setArray);
      setArray.push(dat);
      localStorage.setItem('cartsession', JSON.stringify(setArray));
    }
    else{
      array.push(dat);
      Array.prototype.push.apply(array,beforeadd);
      console.log("14141414");
      console.log(array);
      localStorage.setItem('cartsession', JSON.stringify(array));
      var localcart = JSON.parse(localStorage.getItem('cartsession'));
    }
    this.toastr.success("Added to Cart Successfully!")
    this.syncCart();
    
  }
}

syncCart(){
  let promise = new Promise((resolve, reject) => {
    var user = JSON.parse(localStorage.getItem('currentUser'));
    var results = JSON.parse(localStorage.getItem('cartsession'));
  
    if(user!=null){
      if(user.Status==true){
        if(results!=null){
          results.forEach(element => {
            element.UserId = user.Response.Id;
          });
        }
        this.http.get('http://api.simranfresh.com/api/wishcart/'+user.Response.Id+'?type=' + "cart").subscribe(
          (res: Response) => {
            var j = res.json();
            this.updatedArray = j["Response"]
          if(results!=null && this.updatedArray!=null){
            this.updatedArray.forEach(element => {
              results.forEach((item, index) => {
                if(element.ProductId==item.ProductId){
                  var n = element.Quantity;
                  var m = item.Quantity;
                  var nm = +n + +m;
                 // alert(m);
                  if(nm > 99){
                    element.Quantity = n;
                  }else{
                    element.Quantity = nm;
                  }
                  results.splice(index,1)
                }
              });
            });
          }
          if(results!=null && this.updatedArray!=null){
            Array.prototype.push.apply(this.updatedArray,results);
          }else{
            this.updatedArray = results;
          }
          const url = `${"http://api.simranfresh.com/api/wishcart"}`;
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
           var f = JSON.parse(localStorage.getItem('cartquantupdate'));
           if(f==null){
            this.http.put(url, this.updatedArray , {headers:headers}).map(res => res.json()) .subscribe(
              data => {
                this.http.get('http://api.simranfresh.com/api/wishcart/'+user.Response.Id+'?type=' + "cart")
                .toPromise().then(
                  res =>{
                   
                    this.tom = res.json();
                    this.jerry = this.tom.Response;
                    localStorage.setItem('cartloaditem', JSON.stringify(this.jerry));
                    var x = localStorage.getItem('cartloaditem');
                    console.log(".!.!.!.!.!")
                    console.log(JSON.parse(x))
                    localStorage.removeItem('cartsession');
                    resolve();
                  }
                )
               
          });
           }else{
            this.http.put(url, f , {headers:headers}).map(res => res.json()) .subscribe(
              data => {
                this.http.get('http://api.simranfresh.com/api/wishcart/'+user.Response.Id+'?type=' + "cart").subscribe((res:Response)=>{
                  this.toom = res.json();
                  this.jerryy = this.toom.Response;
                  localStorage.setItem('cartloaditem', JSON.stringify(this.jerryy));
                  var x = localStorage.getItem('cartloaditem');
                  localStorage.removeItem('cartsession');
                  localStorage.removeItem('cartquantupdate');
                })
              
          });
           }
       });
  }
  }
  })
 return promise;
}

ordersuccess(){
  var t = JSON.parse(localStorage.getItem('cartloaditem'));
  let empty=[];
  empty.push(t);
  const url = `${"http://api.simranfresh.com/api/wishcart"}`;
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  this.http.put(url, empty , {headers:headers}).map(res => res.json()) .subscribe(
    data => {
    
});
}

}
