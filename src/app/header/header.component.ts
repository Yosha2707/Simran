import { Component, OnInit } from '@angular/core';
import { HostListener, Inject } from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  myImage : string = "http://localhost:4200/assets/img/slider/slide-1.jpg";
  scroll:boolean=false;
  b = [];
  constructor() { }

  ngOnInit() {
    this.b = JSON.parse(localStorage.getItem('session'));
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 50) {
      return this.scroll=true;
    }
    else{
      return this.scroll=false;
    }

  }

}
