import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

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
    }

   .legal__container {
  position: relative; /* oder ganz weglassen, falls nicht gebraucht */
  display: flex;
  flex-direction: column; /* wichtig! */
  align-items: flex-start; /* oder center */
  justify-content: flex-start;
  padding: 1rem;
  padding-top:100px;
  width: 100%;
  max-width: 800px;
  color: var(--color-text-primary);
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
export class ImprintPageComponent {}