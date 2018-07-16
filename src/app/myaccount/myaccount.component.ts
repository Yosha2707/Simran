import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  currentuser;
  cartCoount;
  constructor() {
    this.cartCoount = localStorage.getItem('cartcount');
   }

  ngOnInit() {
    this.currentuser = localStorage.getItem('currentUser')
  }

}
