import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import zxcvbn from 'zxcvbn';
import { AuthenticatorService } from '../thisServices/authenticator.service';
import { MessageService } from '../thisServices/message.service';
import { User } from '../thisModels/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = "";
  idCard: string = "";
  isEmployee: boolean = true;
  licence: string = "";
  password: string = "";
  showPassword: boolean = false;
  passwordStrength: number = 0;
  passwordStrengthLabel: string = "";
  passwordStrengthClass: string = ""
  password2: string = "";
  showPassword2: boolean = false;
  
  constructor(
    private messageService: MessageService,
    private authenticationService: AuthenticatorService,
    private router: Router
  ){}
  
  register(): void{
    if(this.password!=this.password2){
      this.messageService.sendMessage({
        text: 'Passwords do not match',
        type: 'alert alert-danger'
      });
    } else {
      var user: User = {username:this.username, password:this.password, idCard:this.idCard, licence:this.licence, role:this.isEmployee?"employee":"driver"};
      this.authenticationService.register(user).subscribe({
        next: () => {
          this.messageService.sendMessage({
            text: 'User created successfully.',
            type: 'alert alert-success'
          });
          this.username = "";
          this.idCard = "";
          this.licence = "";
          this.isEmployee = true;
          this.password = "";
          this.password2 = "";
          this.router.navigate(['login']);
        },
        error: (err) => {
          this.messageService.sendMessage({
            text: 'Error creating user: ' + err.error.error,
            type: 'alert alert-danger'
          });
        }
      });
    }
    
  }
  
  checkPasswordStrength(): void {
    const strength = zxcvbn(this.password);
    this.passwordStrength = (strength.score / 4) * 100;
    if(this.passwordStrength==0){
      this.passwordStrength=1;
    }
    
    switch (strength.score) {
      case 0:
      this.passwordStrengthLabel = 'Very Weak';
      this.passwordStrengthClass = 'bg-danger';
      break;
      case 1:
      this.passwordStrengthLabel = 'Weak';
      this.passwordStrengthClass = 'bg-warning';
      break;
      case 2:
      this.passwordStrengthLabel = 'Okay';
      this.passwordStrengthClass = 'bg-info';
      break;
      case 3:
      this.passwordStrengthLabel = 'Good';
      this.passwordStrengthClass = 'bg-primary';
      break;
      case 4:
      this.passwordStrengthLabel = 'Strong';
      this.passwordStrengthClass = 'bg-success';
      break;
      default:
      this.passwordStrengthLabel = '';
      this.passwordStrengthClass = '';
    }
  }
  
  toggleShowPassword(){
    this.showPassword = !this.showPassword;
  }
  
  toggleShowPassword2(){
    this.showPassword2 = !this.showPassword2;
  }
}
