import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataService} from '../services/data.service'
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('form') form: ElementRef;

  encRequest: String;
  accessCode: String;

  constructor( public requestService : DataService) { }
 

  ngOnInit() {
    
    this.requestService.getEncRequest().subscribe(
      data => {
        console.log(data);
        this.encRequest = data.encRequest; 
        this.accessCode = data.AccessCode; 
       
      }, error => {
        console.log(error)
      }
    );
  }

  pay() {
    console.log(this.form);
    this.form.nativeElement.submit();
   
  }

}
