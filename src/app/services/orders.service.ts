
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { environment } from 'src/environments/environment';
import { NewOrder } from '../models/newOrder.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private url = "order";

  private geocodingUrl = "https://nominatim.openstreetmap.org/search?q=";
  private geocodingLimit = "&limit=1";
  private geocodingFormat = "&format=json";

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(`${environment.apiUrl}/${this.url}`);
  }

  getAllMyOrders(usersId: number): Observable<Order[]>{
    return this.http.get<Order[]>(`${environment.apiUrl}/${this.url}/ordersOfUser/${usersId}`);
  }

  getOrderBids(): Observable<Order[]>{
    return this.http.get<Order[]>(`${environment.apiUrl}/${this.url}/orderBids`);
  }

  getDeliverersDoneOrders(deliverersId: number) : Observable<Order[]>{
    return this.http.get<Order[]>(`${environment.apiUrl}/${this.url}/deliverersDoneOrders/${deliverersId}`);
  }

  getDeliverersCurrentOrder(deliverersId: number) : Observable<Order>{
    return this.http.get<Order>(`${environment.apiUrl}/${this.url}/deliverersCurrentOrder/${deliverersId}`);
  }

  getConsumersCurrentOrder(deliverersId: number) : Observable<Order>{
    return this.http.get<Order>(`${environment.apiUrl}/${this.url}/consumersCurrentOrder/${deliverersId}`);
  }

  getOrderById(ordersId: number) : Observable<Order>{
    return this.http.get<Order>(`${environment.apiUrl}/${this.url}/${ordersId}`);
  }

  addNewOrder(order: NewOrder): Observable<Order>{
    return this.http.post<Order>(`${environment.apiUrl}/${this.url}`, order);
  }

  takeOrder(orderId: number, delivererId: number): Observable<Order>{
    return this.http.put<Order>(`${environment.apiUrl}/${this.url}/takeOrder/${orderId}/${delivererId}`, {});
  }

  orderIsDelivered(orderId: number): Observable<Order>{
    return this.http.put<Order>(`${environment.apiUrl}/${this.url}/orderIsDelivered/${orderId}/`, {});
  }
  
  getOrdersLatLon(address: string): Observable<any>{
    return this.http.get<any>(`${this.geocodingUrl}${address}${this.geocodingLimit}${this.geocodingFormat}`);
  }

}
