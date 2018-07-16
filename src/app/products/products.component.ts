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

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [DataService]
})
export class ProductsComponent implements OnInit {
  public loading = false;
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
  array: any[];
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
  public cartloadData;
  repeatCart = false;
  repeatWish = false;
  list: any = [];
  z = [];
  x = [];
  p = [];
  q = [];
  imgPreview: any;
  pagecontent;
  searchword: any = [];
  searchKey: any;
  public model: any;
  prevfinalprice;
//   searchh = (text$: Observable < string > ) =>
//     text$.pipe(
//       debounceTime(200),
//       distinctUntilChanged(),
//       map(term => term.length < 2 ? [] :
//         this.searchword.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
//     );
  constructor(private toastr: ToastrService, public route: ActivatedRoute, public userService: DataService, private http: Http, private router: Router) {
    this.cartCoount = localStorage.getItem('cartcount');
    this.cartloadData = localStorage.getItem('session');
    $('.numbersOnly').on('keyup blur', function () {
      this.value = this.value.replace(/[^0-9]/g, '');
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pagecontent = +params['id'];
      // alert(this.pagecontent);
      if (this.pagecontent == 4) {
        this.router.navigate(['/Combos'])
      } else {
        this.search(null, this.pagecontent);
      }

    });

  }


  productPreview(data) {
    this.userService.productPrev(data).subscribe(
      (res:Response) => {
     this.veg = res;
     this.preview = this.veg.Response;
     this.imgPreview = this.preview.objAttachmentsViewModel.AbsoluteURL;
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
                  console.log(error);
                });
          }
        });

    } else {
      this.toastr.info("Please login to add in wishlist!")
    }

  }


  refresh(): void {
    window.location.reload();
  }

	search(data, o) {
		this.searchKey = data;
		this.loading = true;
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
		this.http.post("http://api.simranfresh.com/api/productprices", this.fruitObj, options)
		.map(res => res.json())
		.subscribe((res: Response) => {
			this.loading = false;
			this.DataArray = res;
			this.array = this.DataArray.Response
      var localcart = JSON.parse(localStorage.getItem('cartsession'));
      console.log(this.array);
      console.log(localcart);
      // localcart.forEach(element => {
        
      // });
			this.array.forEach((item, productIndex) => {
				var fi = item.MinQuantity * item.Price
				this.array[productIndex].finalPrice = fi;
				var product = item.Name;
				this.searchword.push(product);
			});
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
    if (quant > 99) {
      this.array[index].MinQuantity = 0;
      this.toastr.error("Maximum Quantity 99!")
    } else {
      var final = (+quant) * price || 0;
      this.prevfinalprice = final;
      this.array[index].finalPrice = final;
    
    }

  }


  calculateProductPricePrev(quant, price, index) {
    if (quant > 99) {
   //   this.array[index].MinQuantity = 0;
      this.toastr.error("Maximum Quantity 99 Kg!")
    } else {
      var final = (+quant) * price || 0;
      this.prevfinalprice = final;
    //  this.array[index].finalPrice = final;
    
    }

  }
}
