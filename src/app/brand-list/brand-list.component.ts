import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Brand } from '../brand';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css'],
})
export class BrandListComponent implements OnInit {
  brands: Brand[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/brand').subscribe((data: any) => {
      console.log(data);
      this.brands = data;
    });
  }

  addBrand(): void {
    this.router.navigate(['/brand']);
  }

  editBrand(brand: Brand): void {
    this.router.navigate(['/edit-brand', brand.id]);
  }

  deleteBrand(brand: Brand): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',

      accept: () => {
        this.http
          .delete('http://localhost:3000/brand/' + brand.id)
          .subscribe((data: any) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Deleted Successfully',
              key: 't1',
            });
          });
      },
      reject: (type: any) => {},
    });
  }
}
