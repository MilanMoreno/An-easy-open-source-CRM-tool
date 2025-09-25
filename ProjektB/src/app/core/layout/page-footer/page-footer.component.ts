import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardManagerService } from '../../../shared/services/clipboard/clipboard.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-page-footer',
    standalone: true,
    imports: [CommonModule, RouterModule, TranslateModule],
    template: `
    <footer class="footer">
      <div class="footer__container">
        <div class="footer__left">
          <img 
            src="assets/img/logo.png" 
            alt="Logo" 
            class="footer__logo"
            (click)="navigateHome()">
          <a (click)="navigateToImprint()" class="footer__imprint">
            Imprint
          </a>
        </div>

        <div class="footer__center">
          © Milan Moreno 2025
        </div>

        <div class="footer__social">
          <a 
            href="https://github.com/MilanMoreno" 
            target="_blank" 
            class="footer__social-link">
            <img src="assets/img/github.png" alt="GitHub">
          </a>
          <a 
            href="mailto:milan.moreno.crea@gmail.com"
            class="footer__social-link">
            <img src="assets/img/email.png" alt="Email">
          </a>
          <a 
            href="https://www.linkedin.com/in/milan-moreno-9a7482360/"
            target="_blank" 
            class="footer__social-link">
            <img src="assets/img/linkedin.png" alt="LinkedIn">
          </a>
        </div>
      </div>
    </footer>
  `,
    styles: [`
    .footer {
      width: 100%;
      background-color: var(--color-background-primary);
      padding: 2rem 0;
      border-top: 2px solid #70E61C;
      /* Ensure consistent footer height across all pages */
      min-height: var(--footer-height);
      max-height: var(--footer-height);
    }

    .footer__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: var(--max-content-width);
      margin: 0 auto;
      padding: 0 var(--content-padding-desktop);
      box-sizing: border-box;
    }

    @media (max-width: 1024px) {
      .footer__container {
        padding: 0 var(--content-padding-tablet);
      }
    }

    @media (max-width: 768px) {
      .footer__container {
        padding: 0 var(--content-padding-mobile);
      }
    }
    .footer__left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .footer__logo {
      height: 80px;
      cursor: pointer;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.02);
      }
    }

    .footer__imprint {
      color: var(--color-text-primary);
      text-decoration: none;
      font-size: 1rem;
      opacity: 0.8;
      transition: opacity 0.3s ease;
      margin-top: -1rem;
      padding: 8px 16px;
      border-radius: 4px;
      display: inline-block;
      min-height: 24px;
      line-height: 1.5;
      cursor: pointer;
      margin: 0 15px;

      &:hover {
        opacity: 1;
        background-color: rgba(112, 230, 28, 0.1);
      }
    }

    .footer__center {
      color: var(--color-text-primary);
      font-size: 1rem;
    }

    .footer__social {
      display: flex;
      gap: 1.5rem;
    }

    .footer__social-link {
      opacity: 0.8;
      transition: opacity 0.3s ease;

      img {
        width: 24px;
        height: 24px;
      }

      &:hover {
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      .footer__container {
        flex-direction: column;
        gap: 2rem;
        text-align: center;
      }

      .footer__left {
        align-items: center;
      }

      .footer__logo {
        height: 60px;
      }

      .footer__social {
        gap: 2rem;
      }
    }
    `]
})
export class PageFooterComponent {
  constructor(
    public clipboardService: ClipboardManagerService,
    private router: Router
  ) {}

  navigateHome() {
    this.router.navigate(['/']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  navigateToImprint() {
    this.router.navigate(['/legal/imprint']).then(() => {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }, 0);
    });
  }
}