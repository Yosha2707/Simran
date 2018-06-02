import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(public http: Http) { }

  private headers = new Headers({ 'Content-Type': 'application/json' });
  public LoadData()
  {
      const url = 'https://api.simranfresh.com/api/product';
  	const response = this.http.get(url).map(res => res.json());
  	return response;
  }

}
