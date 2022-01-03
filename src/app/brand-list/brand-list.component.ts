import { environment } from './../../environments/environment';
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
  loading: boolean = false;
  serverip = environment.serverip;

  constructor(
    private router: Router,
    private http: HttpClient,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.http.get(this.serverip + 'brand').subscribe((data: any) => {
      this.brands = data;
      this.loading = false;
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
          .delete(this.serverip + 'brand/' + brand.id)
          .subscribe((data: any) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Deleted Successfully',
              key: 't1',
            });
            this.loadData();
          });
      },
      reject: (type: any) => {},
    });
  }
}
