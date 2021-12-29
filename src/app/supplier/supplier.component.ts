import { AuthService } from './../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
})
export class SupplierComponent implements OnInit {
  supplierForm!: FormGroup;
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
    this.supplierForm = this.formBuilder.group({
      supplierCode: ['', [Validators.required]],
      supplierName: ['', [Validators.required]],
      supplierDescription: ['', [Validators.required]],
      country: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.id) {
      this.getData(this.id);
    }
  }

  getData(id: string) {
    this.http
      .get('http://localhost:3000/supplier/' + id)
      .subscribe((response) => {
        this.supplierForm.patchValue(response);
      });
  }

  onSubmit(): void {
    let user = this.authService.getLoggedInUser();
    if (this.id) {
      this.http
        .put('http://localhost:3000/supplier/' + this.id, {
          updatedById: user.id,
          ...this.supplierForm.value,
        })
        .subscribe((response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Supplier Details',
            detail: 'Edited Successfully',
            key: 't1',
          });
          this.router.navigate(['/supplierList']);
        });
    } else {
      this.http
        .post('http://localhost:3000/supplier', {
          createdById: user.id,
          ...this.supplierForm.value,
        })
        .subscribe((response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Supplier Details',
            detail: 'Saved Successfully',
            key: 't1',
          });
          this.router.navigate(['/supplierList']);
        });
    }
  }
}
