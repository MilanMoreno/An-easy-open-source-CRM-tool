import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-imprint-page',
    imports: [CommonModule, TranslateModule],
    template: `
    <div class="legal">
      <div class="legal__container">
        <h1 class="legal__title">{{ 'IMPRINT.HEADLINE' | translate }}</h1>

        <section class="legal__section">
          <h2>{{ 'IMPRINT.CONTACT' | translate }}</h2>
          <p>
            Milan Moreno<br>
            Untere Waldstr. 4<br>
            79194 Gundelfingen
          </p>

          <p>
            <strong>{{ 'IMPRINT.TELEPHONE' | translate }}:</strong> 01638447612<br>
            <strong>{{ 'IMPRINT.EMAIL' | translate }}:</strong> milan.moreno.crea&#64;gmail.com
          </p>
        </section>
      </div>
    </div>
  `,
    styles: [`
    .legal {
      display: flex;
      justify-content: center;
      padding: 2rem;
      min-height: calc(100vh - var(--header-height) - var(--footer-height));
      background-color: var(--color-background-primary);
      /* Ensure the legal page takes up the remaining space properly */
      flex: 1;
    }

   .legal__container {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 100px var(--content-padding-desktop) 1rem;
      width: 100%;
      max-width: var(--max-content-width);
      margin: 0 auto;
      color: var(--color-text-primary);
      box-sizing: border-box;
    }

    @media (max-width: 1024px) {
      .legal__container {
        padding: 100px var(--content-padding-tablet) 1rem;
      }
    }

    @media (max-width: 768px) {
      .legal__container {
        padding: 100px var(--content-padding-mobile) 1rem;
      }
    }

.legal__title {
  font-size: var(--font-size-heading-large);
  margin-bottom: 2rem;
  margin-top: 40px; /* << füge das hier hinzu */
}


    .legal__section {
      margin-bottom: 2rem;

      h2 {
        font-size: var(--font-size-heading-medium);
        margin-bottom: 1rem;
      }

      p {
        margin-bottom: 1rem;
        line-height: 1.6;
      }
    }

    @media (max-width: 768px) {
      .legal {
        padding: 1rem;
      }

      .legal__title {
        font-size: var(--font-size-heading-medium);
      }
    }
  `]
})
export class ImprintPageComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Scroll to top when component loads
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 0);
  }
}