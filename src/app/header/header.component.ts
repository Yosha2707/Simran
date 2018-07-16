import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  HostListener,
  Inject
} from "@angular/core";
import {
  Http,
  Headers,
  Response,
  RequestOptions,
  Request,
  RequestMethod,
  HttpModule
} from '@angular/http';
import {
  DataService
} from '../services/data.service';
import 'rxjs/add/operator/toPromise';
import {
  Observable
} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  Location
} from '@angular/common';
declare var gapi: any;
declare var $:any;
import * as AOS from 'aos';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public loading = false;
  myImage: string = "http://localhost:4200/assets/img/slider/slide-1.jpg";
  scroll: boolean = false;
 // productCartArray = [];
  taxes;
  isCollapsed = false;
  total;
  productQuantity = 1;
  Price;
  shipping = 100;
  totalprice = 0;
  // i;
  cartCount;
  currentuser;
  demo: any = [];
  p = [];
  q = [];
  prodcat;
  prodObj;
  prodCategory: any = [];
  hello;
  yes = false;
  api = false;
  innerWidth;
  @Input()
  parentCount: number;

  productCartArray: any = [];

  @Input()
  CartDD:any = [];

  dropdown = document.getElementsByClassName("dropdown-btn");

  constructor(private router: Router,private http: Http, private userService:DataService) {

    this.search();
  }

  drop(){
    for (var i = 0; i < this.dropdown.length; i++) {
      this.dropdown[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
      });
    }
  }

   openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
 closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

  ngOnInit() {
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
   AOS.init({

   });
    var user = JSON.parse(localStorage.getItem('currentUser'));

    if(user!=null){
      if(user.Status==true){
        this.hello = user.Response.UserName;
        this.yes = true;
        var car = JSON.parse(localStorage.getItem('cartloaditem'));
        this.productCartArray = car;
      }
    }else{
      var car = JSON.parse(localStorage.getItem('cartsession'));
      this.productCartArray = car;
    }
    if(car!=null){
      this.parentCount = car.length;
    }
    
    if(this.productCartArray!=null){
        this.productCartArray.forEach((item, productIndex) => {
        this.Price = item.Price
        this.productCartArray[productIndex].Quantity = this.productQuantity;
        this.productCartArray[productIndex].finalPrice = this.productQuantity * this.Price;
        });
        this.productCartArray.forEach((element, index) => {
        this.totalprice = this.totalprice + element.finalPrice;
        });
        this.total = this.totalprice;
     }
    this.cartCount = localStorage.getItem('cartcount');
    this.currentuser = localStorage.getItem('currentUser');
  
  }


  @HostListener("window:scroll", [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 50) {
      return this.scroll = true;
    } else {
      return this.scroll = false;
    }

  }
  // remove(id, index) {
  //   this.userService.deleteUser(id).subscribe(() => console.log("user deleted"));
  //       var b = JSON.parse(localStorage.getItem('cartcount'));
  //       var c = b - 1;
  //       localStorage.setItem('cartcount', JSON.stringify(c));
  //       this.refresh(); 
   
  // }


  refresh(): void {
    window.location.reload();
  }


  home() {
    this.router.navigate(['']);
    this.refresh();
  }

  account() {
    var user = localStorage.getItem('currentUser');
    if (user) {
      this.router.navigate(['/myaccount'])
    } else {
      this.router.navigate(['/login'])
    }
  }

  search(){
     this.prodcat = {
      "Id":null,
      "Name":null,
      "ImageUpload":null,
      "HSNCode":null,
      "DisplaySequence":null,
      "IsActive":"true",
      "Description":null,
      "PageCount":null,
      "PageSize":null,
      "TopSearch":null
     }
     let headers = new Headers({ "content-type": "application/json", });
     let options = new RequestOptions({ headers: headers });
     this.http.post("http://api.simranfresh.com/api/productcategory", this.prodcat, options)
     .map(res => res.json())
     .subscribe((res:Response) => {
       this.prodObj = res;
       this.prodCategory = this.prodObj.Response;
        this.api = true;
 
     }); 
   }
   Logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('session');
    localStorage.removeItem('cartcount');
    localStorage.removeItem('wishlist');
    localStorage.removeItem('cartsession');
    localStorage.removeItem('cartloaditem');
    localStorage.removeItem('cartquantupdate');
    this.router.navigate(['/login']);
  }
  

}

