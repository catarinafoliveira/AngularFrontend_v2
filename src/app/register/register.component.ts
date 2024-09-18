import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = "";
  idCard: string = "";
  isEmployee: boolean = true;
  licence: string = "";
  password: string = "";
  passwordStrengthLabel: string = "";
  password2: string = "";

  register(): void{

  }

  checkPasswordStrength(): void {

  }

  toggleShowPassword(){

  }

  toggleShowPassword2(){

  }
}
