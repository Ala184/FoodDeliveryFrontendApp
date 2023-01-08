import { Router } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { passwordUpdate } from './../../models/passwordUpdate.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLoginData } from 'src/app/models/userLoginData.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  @Input() usersId?: number;
  passwordData: passwordUpdate = new passwordUpdate();
  allowUpdate: boolean = false;

  constructor(private toastr: ToastrService, private usersService: UsersService, private router: Router) { }

  updatePasswordForm = new FormGroup({
    'oldPassword': new FormControl('', Validators.required),
    'newPassword': new FormControl('', Validators.required),
    'confirmedPassword': new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.passwordData.id = 0
    if (this.usersId != null)
      this.passwordData.id = this.usersId;
    
    }
    
    
  onSubmit(){
      this.passwordData.oldPassword = this.updatePasswordForm.controls['oldPassword'].value;
      this.passwordData.newPassword = this.updatePasswordForm.controls['newPassword'].value;
      const confirmedPassword = this.updatePasswordForm.controls['confirmedPassword'].value;
      if (confirmedPassword === this.passwordData.newPassword && (confirmedPassword != "" && this.passwordData.newPassword != "")){
        this.usersService.changePassword(this.passwordData).subscribe(result=>{
          this.toastr.success('Uspešno ste promenili lozinku. Molimo vas ulogujte se opet.');
          this.router.navigate(['/signin']);
        },
        error =>{
          this.toastr.error('Došlo je do greške. Molimo pokušajte opet.');
        }
        );
      }
      else if(confirmedPassword == "" || this.passwordData.newPassword == ""){        
        this.toastr.error('Polja ne smiju biti prazna. Molimo pokušajte opet.');
      }
      else if(this.passwordData.newPassword != confirmedPassword){  
        this.toastr.error('Ponovljena lozinka nije ispravno unešena. Molimo pokušajte opet.');
      }
      else{
        this.toastr.error('Došlo je do greške. Molimo pokušajte opet.');
      }

      this.logOut();
  }    

  logOut(): void {
    let userData = new UserLoginData();
    sessionStorage.setItem('myCredentials', JSON.stringify(userData));
    sessionStorage.setItem('token', "");
    this.router.navigate(["/singin"]);
  }
}

