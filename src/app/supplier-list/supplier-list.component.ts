import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Supplier } from '../supplier';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css'],
})
export class SupplierListComponent implements OnInit {
  suppliers: Supplier[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/supplier').subscribe((data: any) => {
      this.suppliers = data;
    });
  }
  addSupplier(): void {
    this.router.navigate(['/supplier']);
  }

  editSupplier(supplier: Supplier): void {
    this.router.navigate(['/edit-supplier', supplier.id]);
  }

  deleteSupplier(supplier: Supplier): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',

      accept: () => {
        this.http
          .delete('http://localhost:3000/supplier/' + supplier.id)
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
