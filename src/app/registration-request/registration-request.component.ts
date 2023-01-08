import { RegistrationRequest } from '../models/registrationRequest.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationRequestsService } from '../services/registration-requests.service';

@Component({
  selector: 'app-registration-request',
  templateUrl: './registration-request.component.html',
  styleUrls: ['./registration-request.component.css']
})
export class RegistrationRequestComponent implements OnInit {

  registrationRequest : RegistrationRequest = new RegistrationRequest();
  registrationRequests : RegistrationRequest[] = [];

  constructor(private regReqService: RegistrationRequestsService, private router: Router) { }

  ngOnInit(): void {
   this.getRequests()
  }

  getRequests(){
    this.regReqService.getAllRegistrationRequests()
                       .subscribe((result: RegistrationRequest[]) => {(this.registrationRequests = result);});
  }

  acceptRequest(id:number){
    this.regReqService.acceptRegistrationRequest(id).subscribe(result => {console.log(result); this.getRequests()});
  }

  declineRequest(id:number){
    this.regReqService.declineRegistrationRequest(id).subscribe(result => {console.log(result); this.getRequests()});
  }


}
