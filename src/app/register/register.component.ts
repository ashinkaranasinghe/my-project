import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      address: ['', [Validators.required]],
      PhoneNo: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.http
      .post('http://localhost:3000/user', this.registerForm.value)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['']);
      });
  }
}
