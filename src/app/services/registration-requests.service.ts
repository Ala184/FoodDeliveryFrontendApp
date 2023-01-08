import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationRequest } from '../models/registrationRequest.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RegistrationRequestsService {

  private url = "registrationRequest";

  constructor(private http: HttpClient) { }

  public getAllRegistrationRequests() : Observable<RegistrationRequest[]>{
    return this.http.get<RegistrationRequest[]>(`${environment.apiUrl}/${this.url}`);
  }

  public acceptRegistrationRequest(id: number) : Observable<RegistrationRequest>{
    return this.http.put<RegistrationRequest>(`${environment.apiUrl}/${this.url}/accept/${id}`,{});
  }

  public declineRegistrationRequest(id: number) : Observable<RegistrationRequest>{
    return this.http.put<RegistrationRequest>(`${environment.apiUrl}/${this.url}/decline/${id}`,{});
  }


}
