import { AuthInterceptor } from './auth/auth.interceptor';
import { RegistrationRequestsService } from './services/registration-requests.service';
import { UsersService } from './services/users.service';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { UsersListingComponent } from './users-listing/users-listing.component';
import { RegistrationRequestComponent } from './registration-request/registration-request.component';
import { VerificationRequestComponent } from './verification-request/verification-request.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { DeliverersDoneOrdersComponent } from './deliverers-done-orders/deliverers-done-orders.component';
import { DeliverersCurrentOrderComponent } from './deliverers-current-order/deliverers-current-order.component';
import { ConsumersCurrentOrderComponent } from './consumers-current-order/consumers-current-order.component';
import { OrdersOnWaitComponent } from './orders-on-wait/orders-on-wait.component';
import { OrdersListingComponent } from './orders-listing/orders-listing.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ChangePasswordComponent } from './my-profile/change-password/change-password.component';
import { MakeOrderComponent } from './make-order/make-order.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './orders-on-wait/map/map.component';

//import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignInComponent,
    RegisterComponent,
    ProductListingComponent,
    UsersListingComponent,
    RegistrationRequestComponent,
    VerificationRequestComponent,
    MyProfileComponent,
    AddNewProductComponent,
    MyOrdersComponent,
    DeliverersDoneOrdersComponent,
    DeliverersCurrentOrderComponent,
    ConsumersCurrentOrderComponent,
    OrdersOnWaitComponent,
    OrdersListingComponent,
    OrderDetailsComponent,
    ChangePasswordComponent,
    MakeOrderComponent,
    FooterComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-top-center'
    }),
    //NgxPayPalModule,
  ],
  providers: [UsersService,
     RegistrationRequestsService,
     {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
     }
    
    
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
