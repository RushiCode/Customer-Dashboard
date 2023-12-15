import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpClient: HttpClient,) { }
  readonly rootUrl = `${environment.api_url}`;

  customerList() {
    return this.httpClient.get<any>(`${this.rootUrl}api/customer/Customer`);
  }
 
  addCustomer(param:any): Observable<any> {
    return this.httpClient.post<any>(`${this.rootUrl}api/customer/Customer`, param);
  }
  updatecustomer(param: any) {
    return this.httpClient.put<any>(`${this.rootUrl}api/customer/Customer`, param);
  }
  getCustomerById(id:any) {
    return this.httpClient.get<any>(`${this.rootUrl}api/customer/Customer/${id}`);
  }

}
