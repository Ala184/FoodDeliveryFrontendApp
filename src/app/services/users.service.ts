import { passwordUpdate } from './../models/passwordUpdate.model';
import { UserLoginData } from '../models/userLoginData.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = "users";

  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${environment.apiUrl}/${this.url}`)
  }
  
  public getAllDeliverers(): Observable<User[]>{
    return this.http.get<User[]>(`${environment.apiUrl}/${this.url}/deliverers`);
  }

  public registerUser(user: User):Observable<User>{
    return this.http.post<User>(`${environment.apiUrl}/${this.url}/register`, user)
  }

  public loginUser(user: UserLoginData): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/${this.url}/login`, user)
  }

  public getUserByUsername(username: string): Observable<User>{
    return this.http.get<User>(`${environment.apiUrl}/${this.url}/profile/${username}`);
  }

  public updateUser(user: User): Observable<User>{
    return this.http.put<User>(`${environment.apiUrl}/${this.url}/update/${user.id}`, user);
  }

  public changePassword(paswordData: passwordUpdate ): Observable<User>{
    return this.http.put<User>(`${environment.apiUrl}/${this.url}/changePassword/`, paswordData);
  }

  public checkIfApproved(id: number): Observable<boolean>{
    return this.http.get<boolean>(`${environment.apiUrl}/${this.url}/checkIfApproved/${id}`);
  }
}
