import { Component, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core'; // Added OnInit
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../../pages/main/hero/hero.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../../shared/services/language/language.service'; // Added LanguageService import
import { Subscription } from 'rxjs'; // Added Subscription import

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [CommonModule, HeroComponent, TranslateModule],
    standalone: true // Added standalone flag as imports are used
})
export class HeaderComponent implements OnInit, AfterViewInit { // Implemented OnInit
  logoUrl: string = 'assets/img/logo.png';
  linkUrl: string = '#hero';
  burgerMenuOpen: boolean = false;
  currentLanguage: string = 'de'; // Added currentLanguage property
  private langSubscription!: Subscription; // Added subscription property

  @ViewChild('burgerMenu') burgerMenu!: ElementRef;
  @ViewChild('burger') burger!: ElementRef;
  @ViewChild('checkbox4') checkbox!: ElementRef<HTMLInputElement>;
  @ViewChild('header') header!: ElementRef;

  constructor(
    private languageService: LanguageService, // Injected LanguageService
    private translate: TranslateService // Kept TranslateService for now
  ) { }

  ngOnInit() {
    // Aktuelle Sprache beim Initialisieren abonnieren
    this.langSubscription = this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
      // Hier kannst du weitere Logik für das Ändern der Sprache implementieren
      this.updateContent();
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
    // The subscription in ngOnInit will trigger updateContent
  }

  updateContent() {
    // Hier die Logik für das Aktualisieren der Inhalte entsprechend der Sprache
    // This might involve using TranslateService or other methods
    this.translate.use(this.currentLanguage); // Example using TranslateService
  }

  ngAfterViewInit() {
    // ngAfterViewInit logic remains here if needed
  }

  toggleBurgerMenu(): void {
    if (!this.checkbox.nativeElement.checked) {
      this.openBurgerMenu();
    } else {
      this.closeBurgerMenu();
    }
  }

  openBurgerMenu(): void {
    this.burgerMenuOpen = true;
    this.burgerMenu.nativeElement.classList.remove('d-none');
    this.burgerMenu.nativeElement.classList.remove('slide-out');
    setTimeout(() => {
      this.burgerMenu.nativeElement.classList.add('slide-in');
    }, 10);
    setTimeout(() => {
      this.header.nativeElement.classList.add('fixed');
    }, 1000);
  }

  closeBurgerMenu(): void {
    this.burgerMenuOpen = false;
    this.burgerMenu.nativeElement.classList.remove('slide-in');
    this.burgerMenu.nativeElement.classList.add('slide-out');
    setTimeout(() => {
      this.burgerMenu.nativeElement.classList.add('d-none');
      this.checkbox.nativeElement.checked = false;
    }, 1000);
    this.header.nativeElement.classList.remove('fixed');
  }

  linkClicked(): void {
    this.closeBurgerMenu();
  }
}
