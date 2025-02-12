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

    }else if (this.loginObj.userName == "guest1" && this.loginObj.password == "12345"){
      this.router.navigateByUrl('/shop');
      console.log('guest1 logged in')
    } else {
      alert('Wrong username or password, try again')
      console.log('login failed')
    }
  }
}
