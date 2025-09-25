import { Routes } from '@angular/router';
import { MainComponent } from './modules/pages/main/main.component';
import { ImprintComponent } from './modules/pages/imprint/imprint.component';
import { PrivacyPolicyComponent } from './modules/pages/privacy-policy/privacy-policy.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'Privacy-Policy', component: PrivacyPolicyComponent }
];