import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'signin',
    loadComponent: async () => (await import('./pages/signin.page')).SigninPage,
  },
  {
    path: 'signup',
    loadComponent: async () => (await import('./pages/signup.page')).SignupPage,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signin',
  },
];
