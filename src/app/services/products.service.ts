import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  private url = "Product";

  constructor(private http: HttpClient) { }

  public getAllProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.apiUrl}/${this.url}`);
  }

  public addNewProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(`${environment.apiUrl}/${this.url}`,product );
  }


}
