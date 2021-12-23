import { AuthGuard } from './auth.guard';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandComponent } from './brand/brand.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'new-register',
    component: RegisterComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'brand',
    component: BrandComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'brandList',
    component: BrandListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-brand/:id',
    component: BrandComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
