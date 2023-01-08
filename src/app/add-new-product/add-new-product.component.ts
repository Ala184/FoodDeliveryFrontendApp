import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from './../services/products.service';
import {Product} from './../models/product.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  private newProduct: Product = new Product();

  newProductForm = new FormGroup({
    'name': new FormControl('', Validators.required),
    'price': new FormControl('', Validators.required),
    'ingredients': new FormControl('', Validators.required),
    'photoUrl': new FormControl('')
}  );

  constructor(private productsService: ProductsService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  

  onSubmit(){
    this.populateNewProduct();
    this.productsService.addNewProduct(this.newProduct).subscribe(
      result=>{
        this.toastr.success("Uspešno ste dodali novi proizvod.");
        this.router.navigate(['/productListing']);
      },
      error => {
        this.toastr.error("Došlo je do greške prilikom dodavanja proizvoda. Pokušajte ponovo.");
      }
      );
  }

  populateNewProduct(){
    this.newProduct.name = this.newProductForm.controls['name'].value;
    this.newProduct.price = this.newProductForm.controls['price'].value;
    // this.newProduct.photoUrl = this.newProductForm.controls['photoUrl'].value;
    this.newProduct.photoUrl = "notSetYet";
    this.newProduct.ingredients = this.newProductForm.controls['ingredients'].value;
  }

}
