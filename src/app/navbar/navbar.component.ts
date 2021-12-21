import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  loggedInUser: any;
  constructor(private router: Router, public authService: AuthService) {
    this.loggedInUser = this.authService.getLoggedInUser();
  }

  items!: MenuItem[];
  ngOnInit(): void {
    this.items = [
      // {
      //   label: 'Qc',
      //   icon: 'pi pi-user',
      //   routerLink: ['/qc'],
      // },
      {
        label: 'Work Location',
        icon: 'pi pi-home',
        routerLink: ['/workLocation'],
      },
      {
        label: 'Buyer',
        icon: 'pi pi-users',
        routerLink: ['/customers'],
      },
      {
        label: 'Expense',
        icon: 'pi pi-money-bill',
        routerLink: ['/expense-table'],
      },
      {
        label: 'Reports',
        icon: 'pi pi-file',
        items: [
          {
            label: 'Individual Reports',
            icon: 'pi pi-file-pdf',
            routerLink: ['/individual-report'],
          },
          { label: 'Monthly Reports', icon: 'pi pi-file-pdf' },
        ],
      },
    ];
  }

  logOut() {
    this.authService.logout();
  }
}
