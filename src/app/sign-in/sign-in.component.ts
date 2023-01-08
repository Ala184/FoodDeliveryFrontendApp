import { CommonService } from './../services/common.service';
import { UserLoginData } from '../models/userLoginData.model';
import { UsersService } from './../services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  userLoginData : UserLoginData = new UserLoginData();
  usersId: number = -1;
  approved : boolean = false;

  constructor(private userService:UsersService, private router: Router, private commonService:CommonService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login(){
    if(this.loginForm.valid){
      this.populateUserLoginData();
      this.userService.loginUser(this.userLoginData).subscribe(
        data => {
          const token = data.token;
          
          const tokenPayload = JSON.parse(atob(token.split('.')[1]));
          this.usersId = -1;

          this.usersId = Number(tokenPayload["ID"]);
          
          sessionStorage.setItem("token", token);
  
          this.commonService.sendUpdate("Update header component.");
          this.checkIfApproved(this.usersId);
          this.toastr.success('Dobro došli nazad ' + tokenPayload["username"] +"e.");
          if(tokenPayload["typeOfUser"] == 'dostavljac'){
            this.router.navigate(["/myProfile"]);
          }
          else{
            this.router.navigate(["/productListing"]);
          }
        },
        error =>{
          this.toastr.error("Greška prilikom prijave. Pokušajte opet. ");
        }
        );
        
    }


  };

  populateUserLoginData(){
    this.userLoginData.username = this.loginForm.controls['username'].value;
    this.userLoginData.password = this.loginForm.controls['password'].value;
  }

  loginWithGoogle(){
    
  }

  checkIfApproved(id: number){
    this.userService.checkIfApproved(id).subscribe(
      (result:boolean) => { 
        this.approved = result;
        sessionStorage.setItem('approved', JSON.stringify(this.approved));
      }, error => {
        console.log('Error:' + error);
      });
  }

}
