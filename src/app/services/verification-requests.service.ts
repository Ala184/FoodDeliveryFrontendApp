import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VerificationRequest } from '../models/verificationRequest.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class VerificationRequestsService {

  private url = "verification"

  constructor(private http: HttpClient) { }

  public getAllVerificationRequests() : Observable<VerificationRequest[]>{
    return this.http.get<VerificationRequest[]>(`${environment.apiUrl}/${this.url}`);
  }

  public verifyRequest(id:number): Observable<VerificationRequest>{
    return this.http.put<VerificationRequest>(`${environment.apiUrl}/${this.url}/verify/${id}`, {});
  }

  public refuseRequest(id:number): Observable<VerificationRequest>{
    return this.http.put<VerificationRequest>(`${environment.apiUrl}/${this.url}/refuseVerification/${id}`, {});
  }
}
