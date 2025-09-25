import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguageService } from './shared/services/language/language.service';
import { NavigationBarComponent } from './core/layout/navigation-bar/navigation-bar.component';
import { PageFooterComponent } from './core/layout/page-footer/page-footer.component';
import { CustomCursorComponent } from './shared/components/custom-cursor/custom-cursor.component';

@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        RouterOutlet,
        TranslateModule,
        NavigationBarComponent,
        PageFooterComponent,
        CustomCursorComponent
    ],
    template: `
    <div class="app-container">
      <app-navigation-bar></app-navigation-bar>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <app-page-footer></app-page-footer>
      <app-custom-cursor></app-custom-cursor>
    </div>
  `,
    styles: [`
    .app-container {
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: var(--color-background-primary);
    }

    .main-content {
      min-height: calc(100vh - var(--header-height) - var(--footer-height));
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  private langChangeSubscription: Subscription | undefined;

  constructor(
    private translateService: TranslateService,
    private languageService: LanguageService
  ) {
    this.initializeLanguage();
  }

  ngOnInit(): void {
    // Subscribe to language changes
    this.langChangeSubscription = this.languageService.currentLanguage$.subscribe(lang => {
      this.translateService.use(lang);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  private initializeLanguage(): void {
    const initialLang = this.languageService.getCurrentLanguage();
    this.translateService.setDefaultLang(initialLang); // Use initialLang as default
    this.translateService.use(initialLang); // Use initialLang initially
  }
}
