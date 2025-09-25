import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  template: `
    <nav class="nav-wrapper" #navHeader>
      <div class="nav-container">
        <a [href]="brandUrl" class="nav-brand">
          <img [src]="logoPath" alt="Logo" [style.height.px]="80" />
        </a>

        <div class="nav-links">
          <ul>
            <li *ngFor="let link of navigationLinks">
              <a class="nav-link" [href]="link.href">
                {{ link.label | translate }}
              </a>
            </li>
          </ul>
        </div>

        <div class="mobile-menu" #mobileMenuToggle>
          <input type="checkbox" id="menuToggle" class="menu-checkbox" #menuCheckbox />
          <label for="menuToggle" (click)="toggleMobileMenu()" class="menu-button">
            <div class="hamburger">
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
            </div>
          </label>
        </div>

        <div class="mobile-nav hidden" #mobileMenu>
          <div class="mobile-nav-content">
            <a *ngFor="let link of navigationLinks" 
               (click)="handleMobileNavClick()" 
               [href]="link.href">
              {{ link.label | translate }}
            </a>
            <div class="language-selector">
              <img (click)="switchLanguage('en')" 
                   src="assets/img/en.png" 
                   alt="English" 
                   class="lang-icon" />
              <img (click)="switchLanguage('de')" 
                   src="assets/img/de.png" 
                   alt="Deutsch" 
                   class="lang-icon" />
            </div>
          </div>
        </div>
      </div>

      <div class="language-selector-desktop">
        <img (click)="switchLanguage('en')" 
             src="assets/img/en.png" 
             alt="English" 
             class="lang-icon" />
        <img (click)="switchLanguage('de')" 
             src="assets/img/de.png" 
             alt="Deutsch" 
             class="lang-icon" />
      </div>
    </nav>
  `,
  styles: [`
    .nav-wrapper {
      width: 100%;
      height: 109px;
      background-color: var(--color-background);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999;
    }

    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      width: 100%;
      max-width: 1920px;
      margin: 0 50px;
    }

    .nav-brand {
      height: 80px;
      z-index: 889;
    }

    .nav-links {
      ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;

        li {
          margin: 0 20px;
        }
      }
    }

    .nav-link {
      text-transform: uppercase;
      color: white;
      font-size: 24px;
      position: relative;
      
      &:hover {
        color: var(--color-highlight);
      }

      &:after {
        content: "";
        position: absolute;
        bottom: -5px;
        left: 50%;
        width: 0;
        height: 2px;
        background: var(--color-highlight);
        transition: all 0.3s ease;
      }

      &:hover:after {
        width: 100%;
        left: 0;
      }
    }

    .mobile-menu {
      display: none;
      z-index: 889;
    }

    .language-selector-desktop {
      position: absolute;
      top: 10px;
      right: 20px;
      display: flex;
      gap: 5px;
    }

    .lang-icon {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      cursor: pointer;

      &:hover {
        filter: brightness(0.5);
      }
    }

    .mobile-nav {
      display: none;
    }

    @media (max-width: 936px) {
      .nav-links {
        display: none;
      }

      .mobile-menu {
        display: flex;
      }

      .language-selector-desktop {
        display: none;
      }

      .mobile-nav {
        &.hidden {
          display: none;
        }

        position: fixed;
        top: 0;
        right: -100%;
        height: 100vh;
        width: 100vw;
        background-color: var(--color-background);
        transition: right 1s ease;
        z-index: 888;

        &.active {
          right: 0;
        }

        .mobile-nav-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 20px;

          a {
            font-size: 30px;
            color: white;
            margin: 10px 0;
            
            &:hover {
              color: var(--color-highlight);
            }
          }

          .language-selector {
            margin-top: 20px;
            display: flex;
            gap: 10px;

            img {
              width: 50px;
              height: 50px;
            }
          }
        }
      }
    }
  `]
})
export class NavigationComponent {
  @ViewChild('mobileMenu') mobileMenu!: ElementRef;
  @ViewChild('menuCheckbox') menuCheckbox!: ElementRef;
  @ViewChild('navHeader') navHeader!: ElementRef;

  logoPath = 'assets/img/logo.png';
  brandUrl = '#top';
  navigationLinks = [
    { href: '#about', label: 'HEADER.ABOUT_ME' },
    { href: '#skills', label: 'HEADER.SKILLS' },
    { href: '#portfolio', label: 'HEADER.PORTFOLIO' }
  ];

  constructor(private translate: TranslateService) {}

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  toggleMobileMenu() {
    if (!this.menuCheckbox.nativeElement.checked) {
      this.openMobileMenu();
    } else {
      this.closeMobileMenu();
    }
  }

  openMobileMenu() {
    const menu = this.mobileMenu.nativeElement;
    menu.classList.remove('hidden');
    setTimeout(() => {
      menu.classList.add('active');
    }, 10);
    setTimeout(() => {
      this.navHeader.nativeElement.classList.add('fixed');
    }, 1000);
  }

  closeMobileMenu() {
    const menu = this.mobileMenu.nativeElement;
    menu.classList.remove('active');
    setTimeout(() => {
      menu.classList.add('hidden');
      this.menuCheckbox.nativeElement.checked = false;
    }, 1000);
    this.navHeader.nativeElement.classList.remove('fixed');
  }

  handleMobileNavClick() {
    this.closeMobileMenu();
  }
}