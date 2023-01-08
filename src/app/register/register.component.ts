import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user.model';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm = new FormGroup({
    'userName': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.email),
    'password1': new FormControl('', Validators.required),
    'password2': new FormControl('', Validators.required),
    'name': new FormControl('', Validators.required),
    'surname': new FormControl('', Validators.required),
    'dateOfBirth': new FormControl('', Validators.required),
    'address': new FormControl('', Validators.required),
    'city': new FormControl('', Validators.required),
    'street': new FormControl('', Validators.required),
    'number': new FormControl('', Validators.required),
    'typeOfUser': new FormControl('', Validators.required),
    'photoUrl': new FormControl('/assets/images/defaultUserImg.png')
  });
  userData: any = {};
  user: User = new User();
  constructor(private fb:FormBuilder, private userService: UsersService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  private populateModelFromFields(){
    this.user.username = this.registrationForm.controls['userName'].value;
    this.user.email = this.registrationForm.controls['email'].value;
    this.user.password = this.registrationForm.controls['password1'].value;
    this.user.name = this.registrationForm.controls['name'].value;
    this.user.surname = this.registrationForm.controls['surname'].value;
    this.user.dateOfBirth = this.registrationForm.controls['dateOfBirth'].value;
    this.user.address = this.registrationForm.controls['city'].value
                      + ", " + this.registrationForm.controls['street'].value 
                      + " " + this.registrationForm.controls['number'].value;
    this.user.typeOfUser = this.registrationForm.controls['typeOfUser'].value;
    this.user.photoUrl = this.registrationForm.controls['photoUrl'].value;    
  }

  register() : void{ 
    this.populateModelFromFields();    
    if(this.registrationForm.controls['password1'].value != this.registrationForm.controls['password2'].value){
      this.toastr.error('Ponovljena lozinka nije ispravna. Molimo pokušajte ponovo.')
      alert ("")
    }
    else{
      this.userService.registerUser(this.user).subscribe(
        result => {
          this.router.navigate(['/signin']);
          this.toastr.success('Uspešno ste se registovali. Molimo Vas da se prijavite.')
        }, 
        error =>{
          this.toastr.error('Ups! Došlo je do greške. Molimo pokušajte ponovo.')
        }
          );
    }
  }
}
