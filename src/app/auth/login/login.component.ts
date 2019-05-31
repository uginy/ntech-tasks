import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginPattern: any = '^[a-zA-Z0-9_-]+$';
  passwordPattern: any =
    '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]+$';

  constructor(private authService: AuthService, private router: Router) {}

  formErrors = {
    login: '',
    password: ''
  };

  // Object with error messages
  validationMessages = {
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
        Validators.minLength(5),
        Validators.pattern(this.loginPattern)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(this.passwordPattern)
      ])
    });

    this.loginForm.valueChanges.subscribe(formData =>
      this.ControlValidator(formData)
    );
  }

  get f() {
    return this.loginForm.controls;
  }

  private ControlValidator(formData?: any) {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm;

    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const message = this.validationMessages[field];
        for (const key of Object.keys(control.errors)) {
          this.formErrors[field] = message[key];
        }
      }
    }
  }

  onSubmit() {
    this.authService.loginUser(this.loginForm.value);
    this.router.navigateByUrl('/profile');
  }
}
