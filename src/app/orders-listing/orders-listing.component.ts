import { DetailsService } from './../services/details.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order.model';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-orders-listing',
  templateUrl: './orders-listing.component.html',
  styleUrls: ['./orders-listing.component.css']
})
export class OrdersListingComponent implements OnInit {

  orders: Order[] = [];
  
  constructor(private orderService: OrdersService, private router: Router, private detailsService: DetailsService) { }

  ngOnInit(): void {
    
    this.getAllOrders();
    
  }
  
  getAllOrders(){
    this.orderService.getAllOrders().subscribe(
      data=>{
        this.orders = data;
      },
      error=>{
        alert(error);
      }    
    )
  }
  
  showOrderDetails(id?: number){
    var ordersId = Number(id);
    
    this.detailsService.changeMessage(ordersId);
    //this.detailsService.currentMessage.subscribe(result => alert(result));
    this.router.navigate(["/orderDetails"]);
  }
}
