import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  nzSpinning: boolean = false;
  loginform!: FormGroup;


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.loginform = this.fb.group({

      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })

  }

  login() {
    console.log(this.loginform?.value);
  }



}
