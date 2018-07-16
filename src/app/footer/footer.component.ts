import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import {AuthGuard} from '../auth/auth.guard';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs';
import {Location} from '@angular/common';
declare var window: any;
declare var FB: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  loading = false;
  Google;
  passToken;
  Signin = true;
  googleuser;
  currentuser;
  prodcat;
  prodObj;
  prodCategory: any = [];
  
  private headers = new Headers({ 'Content-Type': 'application/json' });
 
constructor(private http: Http,private userService: DataService, private router:Router, public AuthGuard: AuthGuard,ngZone: NgZone) { 
  this.search();
  
    

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v3.0&appId=2194837707198944&autoLogAppEvents=1';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }

  // onSignIn(googleUser) {
  //   var profile = googleUser.getBasicProfile();
  //   this.googleuser = {
  //     "username": profile.getName(),
  //     "email":profile.getEmail(),
  //     "password":"xxxxxxx",
  //     "user_type_id":profile.getId(),
  //     "user_type":"Google"
  // }
  
  // this.http.post("http://127.0.0.1:8000/au/sregis", this.googleuser).subscribe((res: Response) => {
  //   localStorage.setItem('currentUser', JSON.stringify(this.googleuser.email));
  //   this.Google = res;
  
  //   console.log(this.Google._body)
  //   var str = this.Google._body.replace(/^"(.*)"$/, '$1');
  //   console.log(str)
  //   console.log("Goin To Enter")
  //   // if (str=="CompletelyNew"){
  //   //   console.log("Did i enter")
  //   //   this.router.navigateByData({
  //   //     url: ["/home"],
  //   //     data: str,
  //   // });
  //   // }
  //   localStorage.setItem('currentUser', JSON.stringify(this.googleuser.username));
  //   this.router.navigate(['/homeauth'])
    
  // },
  // error => {
  //   this.userService.error(error);
  // });
  // }
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
       

    }); 
  }


  ngOnInit() {
    this.currentuser = localStorage.getItem('currentUser')
  }
  Logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('session');
    localStorage.removeItem('cartcount');
    localStorage.removeItem('wishlist');
    localStorage.removeItem('cartsession')
    localStorage.removeItem('cartloaditem');
    localStorage.removeItem('cartquantupdate');
    this.router.navigate(['/login']);
  }
  

}
