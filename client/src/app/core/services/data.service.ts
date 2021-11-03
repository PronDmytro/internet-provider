import {Injectable} from '@angular/core';
import {ApiService} from './api/api.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  public constructor(private apiService: ApiService) {
  }

  public getOrders() {
    return this.apiService.get('/orders');
  }

  public getClients() {
    return this.apiService.get('/clients');
  }

  public getEmployees() {
    return this.apiService.get('/employees');
  }

  public getPayments() {
    return this.apiService.get('/payments');
  }

}
