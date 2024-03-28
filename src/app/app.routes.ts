import { Routes } from '@angular/router';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';
import { LayoutComponent } from '@shared/components/layouts/layout/layout.component';
import { LayoutAdminComponent } from '@shared/components/layouts/admin/admin.component';
import { AuthGuard } from '@shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./domains/ecommerce/products/pages/list/list.component'),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./domains/info/pages/about/about.component'),
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import(
            './domains/ecommerce/products/pages/product-detail/product-detail.component'
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./domains/auth/login/login.component'),
  },
  {
    path: 'admin',
    canActivate: [ AuthGuard ],
    component: LayoutAdminComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./domains/admin/products/components/products/products.component'),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./domains/admin/products/components/product-create/product-create.component'),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./domains/admin/products/components/product-edit/product-edit.component'),
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
