import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataService} from '../services/data.service'

@Component({
  selector: 'app-cc-aven',
  templateUrl: './cc-aven.component.html',
  styleUrls: ['./cc-aven.component.css']
})
export class CcAvenComponent implements OnInit {

  @ViewChild('form') form: ElementRef;

  encRequest: String;
  accessCode: String;
  checkoutUrl: String;

  constructor( public requestService : DataService) { }
 

  ngOnInit() {
    
    this.requestService.getEncRequest().subscribe(
      data => {
        console.log(data);
        this.encRequest = data.encRequest; 
        this.accessCode = data.AccessCode;
        this.checkoutUrl = data.checkoutUrl; 
        console.log(this.checkoutUrl);
       
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
