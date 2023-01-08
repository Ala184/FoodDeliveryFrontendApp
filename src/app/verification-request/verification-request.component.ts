import { UsersService } from './../services/users.service';
import { Router } from '@angular/router';
import { VerificationRequestsService } from './../services/verification-requests.service';
import { Component, OnInit } from '@angular/core';
import { VerificationRequest } from '../models/verificationRequest.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-verification-request',
  templateUrl: './verification-request.component.html',
  styleUrls: ['./verification-request.component.css']
})
export class VerificationRequestComponent implements OnInit {

  verificationRequests: VerificationRequest[] = [];
  deliverers: User[] = [];
  constructor(private verReqService: VerificationRequestsService, private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
    this.getRequests();
    this.getAllDeliverers();
  }

  getRequests(){
    this.verReqService.getAllVerificationRequests()
                       .subscribe((result: VerificationRequest[])  => {(this.verificationRequests = result); console.log(result); console.log(this.verificationRequests)});
   
  }

  verifyRequest(id: number){
    this.verReqService.verifyRequest(id).subscribe((result: VerificationRequest) => {console.log(result); 
                                                                                      this.getRequests();
                                                                                      this.getAllDeliverers();});
  }

  refuseRequest(id: number){
    this.verReqService.refuseRequest(id).subscribe((result: VerificationRequest) => {console.log(result); 
                                                                                      this.getRequests();
                                                                                      this.getAllDeliverers();});
  }

  getAllDeliverers(){
    this.usersService.getAllDeliverers().subscribe((result: User[]) => {this.deliverers = result; console.log(this.deliverers)});
  }

}
