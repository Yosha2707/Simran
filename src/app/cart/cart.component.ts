import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  
  
})
export class CartComponent implements OnInit {
b =[];
c = [];
  constructor() {
    
   }
   refresh(): void {
    window.location.reload();
}


remove(data, index){
 // localStorage.clear();
  var a = JSON.parse(localStorage.getItem('session'));
  console.log(a)
  a.splice(index, 1);
  localStorage.setItem('session', JSON.stringify(a));
this.refresh();
  
}

  ngOnInit() {
    
    this.b = JSON.parse(localStorage.getItem('session'));
    console.log(this.b)
    
  
  }

  

}

