import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DetailsService } from './../services/details.service';
import { OrdersService } from './../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order.model';
import { UserLoginData } from '../models/userLoginData.model';

@Component({
  selector: 'app-deliverers-done-orders',
  templateUrl: './deliverers-done-orders.component.html',
  styleUrls: ['./deliverers-done-orders.component.css']
})
export class DeliverersDoneOrdersComponent implements OnInit {

  private data:any;
  deliverersId: number = -1;
  deliverersDoneOrders: Order[] = [];
  userData: UserLoginData = new UserLoginData();
  
  constructor(private orderService: OrdersService, private detailsService: DetailsService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.data = sessionStorage.getItem('token');
    const tokenPayload = JSON.parse(atob(this.data.split('.')[1]));
    this.deliverersId = Number(tokenPayload["ID"]);
    
    if (this.deliverersId != -1)
      this.getDoneOrders(this.deliverersId);
    
  }
  
  getDoneOrders(deliverersId: number){
    this.orderService.getDeliverersDoneOrders(deliverersId).subscribe(
      data=>{
        this.deliverersDoneOrders = data;
      },
      error=>{
        this.toastr.error("Nažalost, došlo je do greške. Molimo probajte opet.");
        this.router.navigate(['/myProfile']);
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
