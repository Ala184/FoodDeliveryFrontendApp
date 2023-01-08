import { UsersService } from './../services/users.service';
import { Router } from '@angular/router';
import { CommonService } from './../services/common.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private data: any;
  usersId: number = -1;
  usersUsername: string = "";
  usersRole: string = "unknown";
  approved: boolean = false;
  private subscriptionName: Subscription;
  constructor(private commonService: CommonService, private router: Router, private usersService: UsersService) {
    this.subscriptionName = this.commonService.getUpdate().subscribe(message => this.ngOnInit());
   }


  ngOnInit(): void {
    
  }

  logOut(): void {
    sessionStorage.setItem('token', "");
    this.approved = false;
    sessionStorage.setItem('approved', JSON.stringify(this.approved));
    this.ngOnInit();
    this.router.navigate(["/singin"]);
  }

  x = setInterval(()=>{
    this.data = sessionStorage.getItem('token');
    const tokenPayload = JSON.parse(atob(this.data.split('.')[1]));
    this.usersId = Number(tokenPayload["ID"]);
    this.usersUsername = tokenPayload["username"];
    this.usersRole = tokenPayload["typeOfUser"];

    this.data = sessionStorage.getItem('approved');
    this.approved = JSON.parse(this.data);
    if(this.usersId != -1){
      this.usersService.checkIfApproved(this.usersId).subscribe(
      (result:boolean) => { 
        this.approved = result;
      }, error => {
      console.log('Error:' + error);
      });
    }    
    this.ngOnInit();
  },2000);

}
