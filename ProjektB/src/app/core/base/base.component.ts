import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <footer class="base-container">
      <div class="content-wrapper">
        <div class="brand-section">
          <img routerLink="/" src="assets/img/logo.png" alt="Logo" />
          <a routerLink="/legal">{{ "FOOTER.IMPRINT" | translate }}</a>
        </div>
        
        <div class="copyright">&copy; Milan Moreno</div>

        <div class="social-links">
          <a target="_blank" href="https://github.com/MilanMoreno">
            <img src="assets/img/github.png" alt="GitHub" />
          </a>
          <img (click)="copyEmail()" src="assets/img/email.png" alt="Email" />
          <a target="_blank" href="https://www.linkedin.com/in/milan-moreno-9a7482360">
            <img src="assets/img/linkedin.png" alt="LinkedIn" />
          </a>
        </div>
        
        <a routerLink="/legal" class="mobile-legal">{{ "FOOTER.IMPRINT" | translate }}</a>
      </div>
      <div #emailAlert class="email-alert hidden">{{ "FOOTER.EMAIL_COPIED" | translate }}</div>
    </footer>
  `,
  styles: [`
    .base-container {
      position: relative;
      height: 200px;
      background-color: var(--color-background);
      border-top: 2px solid var(--color-highlight);
      padding: 0 100px 0 100px;
      z-index: 55;
    }

    .content-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
    }

    .brand-section {
      display: flex;
      flex-direction: column;

      img {
        width: 420px;
        margin: 0;
      }

      a {
        width: 50%;
        text-align: left;
        color: white;
        margin-top: -25px;

        &:hover {
          color: var(--color-highlight);
        }
      }
    }

    .copyright {
      color: white;
      font-size: 23px;
    }

    .social-links {
      display: flex;
      align-items: center;
      gap: 13px;
      z-index: 66;

      img {
        &:hover {
          filter: brightness(0) saturate(100%) invert(76%) sepia(15%) saturate(4614%) 
                 hue-rotate(71deg) brightness(102%) contrast(101%);
        }
      }
    }

    .mobile-legal {
      display: none;
      color: white;
      margin-bottom: 5px;

      &:hover {
        color: var(--color-highlight);
      }
    }

    .email-alert {
      position: fixed;
      bottom: -3000px;
      left: 50%;
      border-radius: 10px;
      background-color: black;
      opacity: 0.3;
      z-index: 999;
      padding: 10px;
      color: white;
      transform: translate(-50%);
      transition: all 0.2s ease-in-out, transform 0.4s ease-in-out 0.4s;

      &.show {
        bottom: 50px;
      }
    }

    @media (max-width: 875px) {
      .base-container {
        height: auto;
        padding: 20px;
      }

      .content-wrapper {
        flex-direction: column;
      }

      .copyright {
        text-align: center;
        margin-bottom: 10px;
      }

      .social-links {
        margin-bottom: 10px;
      }

      .brand-section {
        img {
          max-width: 70vw;
        }

        a {
          display: none;
        }
      }

      .mobile-legal {
        display: block;
      }
    }
  `]
})
export class BaseComponent {
  copyEmail() {
    const email = 'milan.moreno.crea@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      const alert = document.querySelector('.email-alert') as HTMLElement;
      if (alert) {
        alert.classList.remove('hidden');
        alert.classList.add('show');
        setTimeout(() => {
          alert.classList.remove('show');
          setTimeout(() => alert.classList.add('hidden'), 300);
        }, 2000);
      }
    });
  }
}