import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order.model';
import { UserLoginData } from '../models/userLoginData.model';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-consumers-current-order',
  templateUrl: './consumers-current-order.component.html',
  styleUrls: ['./consumers-current-order.component.css']
})
export class ConsumersCurrentOrderComponent implements OnInit {

  private data:any;
  usersId: number = -1;
  consumersCurrentOrder: Order = new Order();
  userData: UserLoginData = new UserLoginData();

  mins: string = "";
  secs: string = "";

  totalPriceWithDelivery:number = 0;

  constructor(private ordersService: OrdersService, private toaster:ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.data = sessionStorage.getItem('token');
    const tokenPayload = JSON.parse(atob(this.data.split('.')[1]));
    this.usersId = Number(tokenPayload["ID"]);
    
    if (this.usersId != -1)
      this.getConsumersCurrentOrder(this.usersId);
    else{
      this.toaster.error("Nažalost, došlo je do greške. Molimo probajte opet.");
      this.router.navigate(['/makeOrder']);
    }
    
  }

  getConsumersCurrentOrder(consumersId: number){
    this.ordersService.getConsumersCurrentOrder(consumersId).subscribe(
      data=>{
        this.consumersCurrentOrder = data;
        this.totalPriceWithDelivery = Number(this.consumersCurrentOrder.totalPrice) + 200;
      },
      error=>{
        this.toaster.error("Nažalost, došlo je do greške. Molimo probajte opet.");
        this.router.navigate(['/makeOrder']);
      }    
    )
  }

  x = setInterval(()=>{
    var currentTime = new Date().getTime();
    if (this.consumersCurrentOrder != null){
      var deliveredAt = new Date(new Date(this.consumersCurrentOrder.createdAt).getTime() + Number(this.consumersCurrentOrder.deliveryTime)*60000).getTime();
      var distance = deliveredAt - currentTime;
      this.mins = Math.floor((distance % (1000 * 60 * 60))/(1000 * 60)).toString();
      if (Number(this.mins) < 10)
        this.mins = "0"+this.mins;
      this.secs = Math.floor((distance % (1000 * 60))/(1000)).toString();
      if (Number(this.secs) < 10)
        this.secs = ":0"+this.secs;
      else {
      this.secs = ":"+this.secs;
      }
      if (distance < 0){
      this.mins = "Porudžbina je dostavljena.";
      this.secs = "";
      this.consumersCurrentOrder.delivered = 1;
      }
    }    
  },1000)

}
