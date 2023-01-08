import { Router } from '@angular/router';
import { ProductsService } from './../services/products.service';
import { Product } from './../models/product.model';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from './../services/orders.service';
import { UsersService } from './../services/users.service';
import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import {NewOrder} from '../models/newOrder.model'

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent implements OnInit {

  address: string = "";
  comment: string = "Vaš komentar";
  totalPrice: number = 0;
  totalPriceWithDelivery : number = 0;
  
  usersUsername:string = "unknown";
  myInfo: User = new User();
  products: Product[] = [];
  orderedProducts: Product[] = [];
  newOrder:NewOrder = new NewOrder();
  private data : any;

  constructor(private usersService: UsersService, private ordersService: OrdersService, private toastr: ToastrService, 
              private productsService:ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.getUsername();
    this.getUserByUsername();
    this.getProducts();
    this.totalPriceWithDelivery = this.totalPrice + 200;

  }

  getUsername(){
    this.data = sessionStorage.getItem('token');
    const tokenPayload = JSON.parse(atob(this.data.split('.')[1]));
    this.usersUsername = tokenPayload["username"];
  }

  getUserByUsername(){
    this.usersService.getUserByUsername(this.usersUsername).subscribe(
      (result:User)=>{
        this.myInfo = result;
        if (result.id != null)
          this.newOrder.usersId = result.id;
        this.address = result.address;
      },
      error =>{
        this.toastr.error('Ups, došlo je do greške.');
      }    
    )
  }

  getProducts(){
    this.productsService.getAllProducts().subscribe(
      (result:Product[]) => {
        this.products = result;
      },
      error =>{
        this.toastr.error('Ups, došlo je do greške.');
      }
    );
  }

  addToOrder(id?:number){

    var pid = -1;
    if (id!= null)
      pid = id;
    const product = this.products.find(x=>x.id == pid);
    if (product != null){
      this.orderedProducts.push(product)
      this.totalPriceWithDelivery += product.price;
      this.newOrder.totalPrice = (Number(this.newOrder.totalPrice) + product.price).toString();
      if (this.newOrder.productsIDs != ""){
        this.newOrder.productsIDs += ","+product.id;
      }
      else{
        this.newOrder.productsIDs += product.id;
      }
    }
  }



  
  sendOrder(){
    if (this.newOrder.productsIDs != ""){
      this.newOrder.address = this.address;
      this.newOrder.comment = this.comment;
      this.newOrder.deliveryTime = "0";
      this.newOrder.createdAt = "2022-07-11T00:22:08.5205058+02:00"; //podesiti da stavlja sadasnje vrijeme
      this.newOrder.delivered = 0;
      this.newOrder.delivererId = 0;

      this.ordersService.addNewOrder(this.newOrder).subscribe(
        result => {
          console.log(result);
          this.toastr.success('Vaša porudžbina je primljena.');
          this.router.navigate(['/consumersCurrentOrder'])
        }, 
        error=>{
          this.toastr.error('Nažalost, došlo je do greške. Molimo pokušajte opet.');
          this.router.navigate(['/makeOrder']);
        });
    }
    
  }


}
