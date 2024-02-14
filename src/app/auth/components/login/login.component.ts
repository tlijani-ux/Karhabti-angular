import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  nzSpinning: boolean = false;
  loginform!: FormGroup;


  constructor(private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginform = this.fb.group({

      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })

  }

  login() {
    console.log(this.loginform?.value);
    this.authService.login(this.loginform.value).subscribe((res) =>{
      console.log(res);
   
    })
  }


}
