import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  nzSpinning: boolean = false;
  loginform!: FormGroup;


  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService
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
      //let user = null; 

      if (res.userId!=null){
        const user = { 
          id: res.userId,
          role: res.userRole
        }
      StorageService.saveToken(res.jwt);
      StorageService.setUser(user);

      }else{
        this.message.error("Bad credentials" , {nzDuration:5000});
        

      }

    });
}


}
