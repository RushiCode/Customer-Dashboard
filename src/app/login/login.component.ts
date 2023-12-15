import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Set the change detection strategy
})
export class LoginComponent {

  constructor(private fb: FormBuilder, private router: Router) { }

  loginform!: FormGroup;
  submitted: boolean = false;

  ngOnInit(): void {
    this.buildLoginForm();
  }

  get login() {
    return this.loginform.controls;
  }

  buildLoginForm() {
    this.loginform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    debugger
    this.router.navigate(['/dashboard']);
    return;
  }
}
