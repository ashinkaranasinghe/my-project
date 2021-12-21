import { AuthService } from './../auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  // value3!: string;

  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.http
      .post('http://localhost:3000/auth/login', this.loginForm.value)
      .subscribe((response: any) => {
        if (response.error) {
          this.messageService.add({
            severity: 'error',
            summary: 'User Details',
            detail: response.message,
            key: 't1',
          });
        } else {
          this.authService.saveToken(response.token);
          this.router.navigate(['/brand']);
        }
      });
  }
}
