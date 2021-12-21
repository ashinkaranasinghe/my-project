import { AuthService } from './../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brandForm!: FormGroup;
  constructor(
    private router: Router,
    private http: HttpClient,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.brandForm = this.formBuilder.group({
      brandName: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.http
      .post('http://localhost:3000/brand', this.brandForm.value)
      .subscribe((response: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Brand Details',
          detail: 'Saved Successfully',
          key: 't1',
        });
        this.router.navigate(['/brandList']);
      });
  }
}
