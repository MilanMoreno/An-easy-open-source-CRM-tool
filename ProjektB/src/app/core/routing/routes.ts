import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('../../features/home/pages/home-page/home-page.component')
        .then(m => m.HomePageComponent)
  },
  {
    path: 'legal/imprint',
    loadComponent: () => 
      import('../../features/legal/pages/imprint-page/imprint-page.component')
        .then(m => m.ImprintPageComponent)
  },
  {
    path: 'legal/privacy',
    loadComponent: () => 
      import('../../features/legal/pages/privacy-page/privacy-page.component')
        .then(m => m.PrivacyPageComponent)
  }
];