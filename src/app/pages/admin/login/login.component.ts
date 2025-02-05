import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: any = {
    userName: '',
    password: ''
  };
  constructor(private router: Router) {}

  onLogin() {
    if(this.loginObj.userName == "admin" && this.loginObj.password =="12345"){
      this.router.navigateByUrl('/products');
      console.log("loged in")

    }else  {
      alert('Wrong account or password');
      console.log('Wrong password')
    }
  }
}
