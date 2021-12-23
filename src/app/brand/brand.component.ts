import { AuthService } from './../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brandForm!: FormGroup;
  id!: string | null;
  constructor(
    private router: Router,
    private http: HttpClient,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.brandForm = this.formBuilder.group({
      brandName: ['', [Validators.required]],
    });

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.id) {
      this.getData(this.id);
    }
  }

  onSubmit(): void {
    let user = this.authService.getLoggedInUser();
    if (this.id) {
      this.http
        .put('http://localhost:3000/brand/' + this.id, {
          updatedById: user.id,
          ...this.brandForm.value,
        })
        .subscribe((response) => {
          console.log(response);
          this.messageService.add({
            severity: 'success',
            summary: 'Brand Details',
            detail: 'Edited Successfully',
            key: 't1',
          });
          this.router.navigate(['/brandList']);
        });
    } else {
      this.http
        .post('http://localhost:3000/brand', {
          createdById: user.id,
          ...this.brandForm.value,
        })
        .subscribe((response) => {
          console.log(response);
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

  getData(id: string) {
    this.http.get('http://localhost:3000/brand/' + id).subscribe((response) => {
      this.brandForm.patchValue(response);
    });
  }
}
