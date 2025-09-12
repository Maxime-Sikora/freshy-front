import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: async () => (await import('./features/home/routes')).routes,
  },
  {
    path: 'products',
    loadChildren: async () => (await import('./features/products/routes')).routes,
  },
  {
    path: 'cart',
    loadChildren: async () => (await import('./features/cart/routes')).routes,
  },
  {
    path: 'auth',
    loadChildren: async () => (await import('./features/auth/routes')).routes,
  },
  {
    path: 'users',
    loadChildren: async () => (await import('./features/users/routes')).routes,
  },
  {
    path: 'admin',
    loadChildren: async () => (await import('./features/admin/routes')).routes,
  },
];
