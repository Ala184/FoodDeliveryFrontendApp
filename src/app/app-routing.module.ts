import { DelivererGuard } from './auth/guards/deliverer.guard';
import { ConsumerGuard } from './auth/guards/consumer.guard';
import { AdministratorGuard } from './auth/guards/administrator.guard';
import { MakeOrderComponent } from './make-order/make-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersOnWaitComponent } from './orders-on-wait/orders-on-wait.component';
import { OrdersListingComponent } from './orders-listing/orders-listing.component';
import { ConsumersCurrentOrderComponent } from './consumers-current-order/consumers-current-order.component';
import { DeliverersCurrentOrderComponent } from './deliverers-current-order/deliverers-current-order.component';
import { DeliverersDoneOrdersComponent } from './deliverers-done-orders/deliverers-done-orders.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { VerificationRequestComponent } from './verification-request/verification-request.component';
import { RegistrationRequestComponent } from './registration-request/registration-request.component';
import { UsersListingComponent } from './users-listing/users-listing.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'signin', component: SignInComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'productListing', component: ProductListingComponent},
  {path: 'addNewProduct', component: AddNewProductComponent, canActivate: [AdministratorGuard]},
  {path: 'userListing', component: UsersListingComponent,  canActivate: [AdministratorGuard]},
  {path: 'registrationRequests', component: RegistrationRequestComponent, canActivate: [AdministratorGuard]},
  {path: 'verificationRequests', component: VerificationRequestComponent, canActivate: [AdministratorGuard]},
  {path: 'myProfile', component: MyProfileComponent},
  {path: 'myOrders', component: MyOrdersComponent,  canActivate: [ConsumerGuard]},
  {path: 'deliveredOrders', component: DeliverersDoneOrdersComponent},
  {path: 'deliverersCurrentOrder', component: DeliverersCurrentOrderComponent, canActivate: [DelivererGuard]},
  {path: 'consumersCurrentOrder', component: ConsumersCurrentOrderComponent, canActivate:[ConsumerGuard]},
  {path: 'ordersListing', component: OrdersListingComponent},
  {path: 'orderBids', component: OrdersOnWaitComponent, canActivate:[DelivererGuard]},
  {path: 'orderDetails', component: OrderDetailsComponent},
  {path: 'makeOrder', component: MakeOrderComponent, canActivate:[ConsumerGuard]},
  {path:'**', component: SignInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
