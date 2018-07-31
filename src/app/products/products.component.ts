import {
  Directive,
  ElementRef,
  Input,
  Component,
  OnInit,
  HostListener
} from '@angular/core';
import {
  DataService
} from '../services/data.service';
declare var $: any;
import {
  HttpModule
} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import {
  Http,
  Headers,
  Response
} from '@angular/http';
import {
  Observable
} from 'rxjs';
import {
  RequestOptions,
  Request,
  RequestMethod
} from '@angular/http';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  ActivatedRoute,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import {
  ToastrService
} from 'ngx-toastr';
import * as Inputmask from 'inputmask'
import {
  debounceTime,
  distinctUntilChanged,
  map
} from 'rxjs/operators';
import { resetFakeAsyncZone } from '@angular/core/testing';
import {IOption} from 'ng-select';
import * as AOS from 'aos';
import { DawaAutocompleteItem } from 'ngx-dawa-autocomplete';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [DataService]
})
export class ProductsComponent implements OnInit {
  public loading = false;
  notfound=true;
  name;
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
  DataArray: any = [];
  myOptions: Array<IOption>;
  array: any[];
  idd;
  arrayWishlist: any = [];
  arraywish = [];
  fruitObj: any;
  updatedArray: any = [];
  beforeLogin: any = [];
  public cartCoount;
  veg: any = [];
  wish: any = [];
  pageCount = null;
  count = 1;
  Price;
  prodcat;
  prodObj;
  prodCategory
  public cartloadData;
  repeatCart = false;
  repeatWish = false;
  list: any = [];
  z = [];
  x = [];
  p = [];
  q = [];
  length;
  read = false;
  imgPreview: any;
  pagecontent;
  searchword: any = [];
  searchKey: any;
  public model: any;
  prevfinalprice;
  showModal = false;
  addCartValid = false;
  noproduct=false;
  Minimum;
  t = null;
  l;

  // public items: DawaAutocompleteItem[] = [];
  //   public highlightedIndex: number = 0;
  //   public selectedItem: DawaAutocompleteItem;

  //   public onItems(items) {
  //       this.items = items;
  //   }

  //   public onItemHighlighted(index) {
  //       this.highlightedIndex = index;
  //   }

  //   public onItemSelected(item) {
  //       this.items = [];
  //       this.highlightedIndex = 0;
  //       this.selectedItem = item;
  //   }
  constructor(private toastr: ToastrService, public route: ActivatedRoute, public userService: DataService, private http: Http, private router: Router) {
    this.cartCoount = localStorage.getItem('cartcount');
    this.cartloadData = localStorage.getItem('session');
    $('.numbersOnly').on('keyup blur', function () {
      this.value = this.value.replace(/[^0-9]/g, '');
    });
  }
  

  ngOnInit() {
    AOS.init({

    });
    this.route.params.subscribe(params => {
      this.pagecontent = +params['id'];
      // alert(this.pagecontent);
     // if (this.pagecontent == 4) {
     //   this.router.navigate(['/Combos'])
     // } else {
        this.search(null, this.pagecontent);
        this.searchProductCat();
   //   }

    });

  }


  readmore(){
   
this.read = true;
this.length = 0;  
}
readless(){
  this.read = false;
  this.length = 35;
}

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
   func(){
  $(".show-more a").on("click", function() {
    var $this = $(this); 
    var $content = $this.parent().prev("p.content");
    var linkText = $this.text().toUpperCase();    
    
    if(linkText === "SHOW MORE"){
        linkText = "Show less";
        $content.addclass("showContent", 100).removeClass("hideContent");
    } else {
        linkText = "Show more";
        $content.addclass("hideContent", 100).removeClass("showContent");
    };

    $this.text(linkText);
});
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
  }


  whishlist(event, data, index,qty) {
  
    this.loading = true;
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
              this.array.forEach((element,dex) => {
                if(element.Id==data.Id){
                  this.array[dex].repeatWish = true;
                }
              });
            }
          });
        
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
              this.ngOnInit();
              this.loading  =false
              this.toastr.success("Added to wishlist successfully!")
              localStorage.removeItem('wishonetime');
            }
          },

          error => {
            this.userService.error(error);
            console.log(error);
          });
          
        });

    } else {
      this.loading = false;
      this.toastr.info("Please login to add in wishlist!")
    }

  }


  refresh(): void {
    window.location.reload();
  }



	search(data, o) {
     this.l = JSON.parse(localStorage.getItem('currentUser'));
    if (this.l != null) {
      this.t = this.l.Response.Id;
    }
    let op=[];
   // alert(o)
		this.searchKey = data;
	
		// alert(this.pageCount);
		if (data != null) {
			this.pageCount = null;
			this.count = 1;
		}
		this.fruitObj = {
			"Id": null,
			"ProductCategoryId": o,
			"UoMId": null,
			"Name": data,
			"ImageUpload": null,
			"HSNCode": null,
			"MinQuantity": null,
			"Description": null,
			"IsActive": true,
			"TopSearch": null,
			"ProductCategoryName": null,
			"UoMName": null,
			"Price": null,
			"PageCount": this.pageCount,
			"PageSize": null
		}

		let headers = new Headers({
			"content-type": "application/json",
		});
		let options = new RequestOptions({
			headers: headers
    });
    this.loading = true;
		this.http.post("http://api.simranfresh.com/api/productprices", this.fruitObj, options)
		.map(res => res.json())
		.subscribe((res: Response) => {
    console.log(res);
    
      this.DataArray = res;
      if(this.DataArray.Status==true){
        this.loading = false;
      }else{
        this.loading = false;
        this.toastr.error(this.DataArray.objErrorInfo.ErrorMessage)
      }
      this.array = this.DataArray.Response
if(this.l!==null){
    this.loading =false;
  this.http.get('http://api.simranfresh.com/api/wishcart/' + this.t + '?type=' + "wish").subscribe((res:Response)=>{
    let l = res.json();
    let x = l["Response"]

if(data==null){
this.array.forEach((element, index) => {
var ook = element.Name;
var obj = {label:ook, value:''}
//  console.log(ook)
x.forEach(item => {
  if(element.Id==item.ProductId){
    this.array[index].repeatWish = true;
   }
});
op.push(obj);
});
Promise.all(op)
.then(() => {
this.myOptions = op;
// this.myOptions = [{label:'belgium', value:''}];
   var localcart = JSON.parse(localStorage.getItem('cartsession'));
   if(this.array.length>0){
     this.noproduct = false;
   }else{
       if(o==4){
         this.noproduct=true;
       var obj={
         "ProductCategoryName":"Combos"
       }
       this.array.push(obj)
       }else{
         this.search(null, this.pagecontent)
       }
   }

})
this.loading = false;
}
    

        this.array.forEach((item, productIndex) => {
          var fi = item.MinQuantity * item.Price
          this.array[productIndex].finalPrice = fi;
          var product = item.Name;
          this.searchword.push(product);
         
        });
        
  })
}
    
    })
   
  }
  
  

  next() {
    this.count = this.count + 1;
    this.pageCount = this.count;
    //alert(this.pageCount);
    this.search(null, null);
  }


  Prev() {
    this.count = this.count - 1;
    this.pageCount = this.count;
    this.search(null, null);
  }

  faminus() {
    if (this.preview.MinQuantity > 1) {
      this.preview.MinQuantity = this.preview.MinQuantity - 1;
    }

  }

  faplus() {
    this.preview.MinQuantity = this.preview.MinQuantity + 1;
  }

  calculateProductPrice(quant, price, index) {
    if(this.preview.MinQuantity!=null){
      if(quant< this.preview.MinQuantity){
        this.preview.MinQuantity = '';
      }
    }else if(this.preview.MinQuantity==null){
    if(quant<1){
      this.preview.MinQuantity = 1;
    }
    }else if(quant.toString().length>3){
      this.preview.MinQuantity='';
    }
    // if (quant > 99) {
    //   this.array[index].MinQuantity = 0;
    //   this.toastr.error("Maximum Quantity 99!")
    // } 
    else {
      var final = (+quant) * price || 0;
      this.prevfinalprice = final;
      this.array[index].finalPrice = final;
    
    }

  }


  calculateProductPricePrev(quant, price, index) {
//var a = quant.toString().length
if(quant!=null){
  var t = +quant.toString().replace(/^[^\.]+/,'0');
}
var r = +quant - (+t);
var tt = t.toString().length - 1;
var rr  = r.toString().length;
// alert(t)
// alert(tt)
// alert(r)
// alert(rr);
    if(this.Minimum!=null){
        if(quant< this.Minimum){
          this.preview.MinQuantity = 0;
        }else if(rr>2){
          this.preview.MinQuantity = 0;
        }else if(tt>4){
          this.preview.MinQuantity = 0;
        }
        var f = (+this.preview.MinQuantity) * price || 0;
        var final = Number(f).toFixed(3);
      this.prevfinalprice = final;
    }else if(this.Minimum==null){
        if(quant<1){
          this.preview.MinQuantity = 0;
        }else if(rr>2){
          this.preview.MinQuantity = 0;
        }else if(tt>4){
          this.preview.MinQuantity = 0;
        }
        var f = (+this.preview.MinQuantity) * price || 0;
        var final = Number(f).toFixed(3);
      this.prevfinalprice = final;
    }

  }
  reset(){
    this.prevfinalprice = 0
    this.showModal = false;
  }

  searchProductCat(){
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
      

    }); 
  }
}


