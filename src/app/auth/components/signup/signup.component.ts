import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  isSpinning: boolean = false;
  signupForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authservice: AuthService) {
    this.signupForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, Validators.required, this.confirmationValidate],
      username: [null, Validators.required]
    });
  }

  confirmationValidate = (control: FormControl): { [s: string]: boolean } => {

    if (!control.value) {
      return { required: true };
    } else if (control.value! == this.signupForm.controls['passwprd'].value) {
      return { required: true, error: true };
    }
    return {};
  };




  signup() {
    console.log(this.signupForm.value);
    this.authservice.register(this.signupForm.value).subscribe((res) => {

      console.log(res);

    })
  }

}
