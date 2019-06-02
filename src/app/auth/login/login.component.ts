import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginPattern, passwordPattern } from 'src/assets/config';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  private formErrors = {
    login: '',
    password: ''
  };

  // Object with error messages
  private validationMessages = {
    login: {
      required: 'Required field.',
      minlength: 'Specify at least 4 chars.',
      pattern: 'No spaces allowed.'
    },
    password: {
      required: 'Required field.',
      minlength: 'Specify at least 10 chars.',
      pattern: 'Specify at least one capitalized character and digit.'
    }
  };

  ngOnInit() {
    this.loginForm = new FormGroup({
      login: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(loginPattern)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(passwordPattern)
      ])
    });

    // Solution for making fields' validation on the fly.
    this.loginForm.valueChanges.subscribe(() => {
      const { formErrors, loginForm, validationMessages } = this;
      const errorKeys = Object.keys(formErrors);

      errorKeys.forEach(field => {
        const control = loginForm.get(field);

        if (control && control.dirty && !control.valid) {
          const message = validationMessages[field];
          const controlErrorKeys = Object.keys(control.errors);

          controlErrorKeys.forEach(key => {
            formErrors[field] = message[key];
          });
        }
      });
    });
  }

  onSubmit() {
    this.authService.loginUser(this.loginForm.value);
    this.router.navigateByUrl('/profile');
  }
}
