import { Router } from '@angular/router';
import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

  products: Product[] = [];
  constructor(private producService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.producService.getAllProducts().subscribe((result: Product[]) => (this.products = result));
    console.log(this.products);
  }

  addNewComponent(){
    this.router.navigate(['/addNewProduct']);
  }

}
