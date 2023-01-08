import { Order } from './../models/order.model';
import { OrdersService } from './../services/orders.service';
import { DetailsService } from './../services/details.service';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  ordersId: number = 0;
  order: Order = new Order();
  
  deliverersId: number = -1;


  gotOrder: boolean = false;

  mins: string = "";
  secs: string = "";

  data: any;

  totalPriceWithDelivery:number = 0;

  constructor(private detailsService: DetailsService, private ordersService: OrdersService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    
    this.detailsService.currentMessage.subscribe(
      result => {
        this.ordersId = result;
        if (this.ordersId != -1){
          this.gotOrder = true;
          this.getDeliverersId();
          this.getOrderDetails();
        }
      }
      
    );

    
  }

  getDeliverersId(){
    this.data = sessionStorage.getItem('token');
    const tokenPayload = JSON.parse(atob(this.data.split('.')[1]));
    this.deliverersId = Number(tokenPayload["ID"]);
    console.log("DeliverersID: " + this.deliverersId )
  }

  getOrderDetails(){
    this.ordersService.getOrderById(this.ordersId).subscribe(
      result =>{
        this.order = result;
        this.totalPriceWithDelivery = Number(this.order.totalPrice) + 200;
    })
  }

  takeOrder(){
    this.ordersService.takeOrder(this.order.id, this.deliverersId).subscribe(
      result=>{
        this.toastr.success("Uspešno ste preuzeli dostavu.");
        this.router.navigate(['/deliverersCurrentOrder']);
      },
      error =>
      {
        this.toastr.error("Ups, došlo je do greške. Molimo pokušajte ponovo.");
      }    

    )
  }

  finishDelivery(){
    this.ordersService.orderIsDelivered(this.order.id).subscribe(
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
    var deliveredAt = new Date(new Date(this.order.createdAt).getTime() + Number(this.order.deliveryTime)*60000).getTime();
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
      this.order.delivered = 1;
    }
  },1000)


  

}
