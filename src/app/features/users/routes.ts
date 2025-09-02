import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'profil',
    loadComponent: async () => (await import('./pages/profil.page')).ProfilPage,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'profil',
  },
];
