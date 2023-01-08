import { ToastrService } from 'ngx-toastr';
import { OrdersService } from './../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deliverers-current-order',
  templateUrl: './deliverers-current-order.component.html',
  styleUrls: ['./deliverers-current-order.component.css']
})
export class DeliverersCurrentOrderComponent implements OnInit {

  private data:any;
  deliverersId: number = -1;
  deliverersCurrentOrder: Order = new Order();
  gotOrder: boolean = false;
  mins: string = "";
  secs: string = "";

  totalPriceWithDelivery:number = 0;

  constructor(private ordersService: OrdersService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {  
    this.data = sessionStorage.getItem('token');
    const tokenPayload = JSON.parse(atob(this.data.split('.')[1]));
    this.deliverersId = Number(tokenPayload["ID"]);
    
    if (this.deliverersId != -1)
      this.getDeliverersCurrentOrder(this.deliverersId);
    
  }

  getDeliverersCurrentOrder(consumersId: number){
    this.ordersService.getDeliverersCurrentOrder(consumersId).subscribe(
      data=>{
        this.deliverersCurrentOrder = data;
        this.totalPriceWithDelivery = Number(this.deliverersCurrentOrder.totalPrice) + 200;
        this.gotOrder=true;
      },
      error=>{
        this.gotOrder = false;
      }    
    )
  }

  finishDelivery(){
    this.ordersService.orderIsDelivered(this.deliverersCurrentOrder.id).subscribe(
      result=>{
        this.toastr.success("Uspešno ste dostavili porudžbinu. Hvala na saradnji.");
        this.router.navigate(['/orderBids']);
      },
      error=>{
        this.toastr.error("Ups, došlo je do greške.");
      }

    )
  }


  x = setInterval(()=>{
    var currentTime = new Date().getTime();
    if (this.deliverersCurrentOrder != null){
      var deliveredAt = new Date(new Date(this.deliverersCurrentOrder.createdAt).getTime() + Number(this.deliverersCurrentOrder.deliveryTime)*60000).getTime();
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
        this.deliverersCurrentOrder.delivered = 1;
      }
    }    
  },1000)

}
