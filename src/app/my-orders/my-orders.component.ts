import { UserLoginData } from '../models/userLoginData.model';
import { Order } from '../models/order.model';
import { OrdersService } from './../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../services/details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  private data:any;
  usersId: number = -1;

  myOrders: Order[] = [];
  constructor(private ordersService: OrdersService, private detailsService: DetailsService, private router: Router) { }

  ngOnInit(): void {
    this.data = sessionStorage.getItem('token');
    const tokenPayload = JSON.parse(atob(this.data.split('.')[1]));
    this.usersId = Number(tokenPayload["ID"]);
    
    if (this.usersId != -1)
      this.ordersService.getAllMyOrders(this.usersId).subscribe(
        result => {
           console.log(result); 
           this.myOrders=result
        });
  }

  showOrderDetails(id?: number){
    var ordersId = Number(id);
    
    this.detailsService.changeMessage(ordersId);
    //this.detailsService.currentMessage.subscribe(result => alert(result));
    this.router.navigate(["/orderDetails"]);
  }

}
