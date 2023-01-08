import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  usersId = -1;
  usersUsername: string = "";
  myData: User = new User;
  newUserData: User = new User;
  data : any;
  showChangePassword: boolean = false;

  myProfileForm = new FormGroup({
    'userName': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.email),
    'password': new FormControl('', Validators.required),
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
    'photoUrl': new FormControl('default photo url')
  });

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.getCredentials();
    this.getUserByUsername();
    this.populateForm();
  }

  getCredentials(){
    this.data = sessionStorage.getItem('token');
    const tokenPayload = JSON.parse(atob(this.data.split('.')[1]));
    this.usersId = Number(tokenPayload["ID"]);
    this.usersUsername = tokenPayload["username"];
  }

  getUserByUsername(){
    this.usersService.getUserByUsername(this.usersUsername).subscribe((result) => {this.myData = result; 
                                                                                             this.populateForm();});
  }

  populateForm(){
    var splited = this.myData.address.split(", ");
    var splited2 = splited[1].split(" ");
    var date = this.myData.dateOfBirth.split("T");
    this.myProfileForm.controls['userName'].setValue(this.myData.username);
    this.myProfileForm.controls['email'].setValue(this.myData.email);
    this.myProfileForm.controls['name'].setValue(this.myData.name);
    this.myProfileForm.controls['surname'].setValue(this.myData.surname);
    this.myProfileForm.controls['dateOfBirth'].setValue(date[0]);
    this.myProfileForm.controls['city'].setValue(splited[0]);
    this.myProfileForm.controls['street'].setValue(splited2[0]);
    this.myProfileForm.controls['number'].setValue(splited2[1]);
  }

  private populateModelFromFields(){
    this.newUserData.id = this.myData.id;
    this.newUserData.username = this.myProfileForm.controls['userName'].value;
    this.newUserData.email = this.myProfileForm.controls['email'].value;
    //this.newUserData.password = '4321';
    this.newUserData.name = this.myProfileForm.controls['name'].value;
    this.newUserData.surname = this.myProfileForm.controls['surname'].value;
    this.newUserData.dateOfBirth = this.myData.dateOfBirth;
    this.newUserData.address = this.myProfileForm.controls['city'].value
                      + ", " + this.myProfileForm.controls['street'].value 
                      + " " + this.myProfileForm.controls['number'].value;
    this.newUserData.typeOfUser = this.myData.typeOfUser;
    this.newUserData.photoUrl = this.myProfileForm.controls['photoUrl'].value;   
    console.log(this.newUserData); 
  }

  onSubmit(){
    this.populateModelFromFields();
    
    this.usersService.updateUser(this.newUserData).subscribe(
      result => {
        console.log(result)
      },
      error=>{
        alert(error);
      });
  }

  showPasswordSettings(){
    this.showChangePassword = true;
  }

}
