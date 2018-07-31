import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cartCoount;
  public loading = false;
  constructor() {
    this.cartCoount = localStorage.getItem('cartcount');
   }


  ngOnInit() {
  
  }

  

}
