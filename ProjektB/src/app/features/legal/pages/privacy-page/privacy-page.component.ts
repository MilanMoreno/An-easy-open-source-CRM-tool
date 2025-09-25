import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-privacy-page',
    imports: [CommonModule, TranslateModule],
    template: `
    <div class="legal">
      <div class="legal__container">
        <h1 class="legal__title">{{ 'PRIVACY_POLICY.HEADLINE' | translate }}</h1>

        <section class="legal__section">
          <p>{{ 'PRIVACY_POLICY.INTRO' | translate }}</p>
        </section>

        <section class="legal__section">
          <h2>{{ 'PRIVACY_POLICY.RESPONSIBLE.TITLE' | translate }}</h2>
          <p [innerHTML]="'PRIVACY_POLICY.RESPONSIBLE.DESCRIPTION' | translate"></p>
        </section>

        <section class="legal__section">
          <h2>{{ 'PRIVACY_POLICY.DATA_COLLECTION.TITLE' | translate }}</h2>
          
          <h3>{{ 'PRIVACY_POLICY.DATA_COLLECTION.VISIT.TITLE' | translate }}</h3>
          <p>{{ 'PRIVACY_POLICY.DATA_COLLECTION.VISIT.DESCRIPTION' | translate }}</p>
          <ul>
            <li *ngFor="let item of 'PRIVACY_POLICY.DATA_COLLECTION.VISIT.ITEMS' | translate | keyvalue">
              {{ item.value }}
            </li>
          </ul>
          <p>{{ 'PRIVACY_POLICY.DATA_COLLECTION.VISIT.PURPOSE' | translate }}</p>
          <ul>
            <li *ngFor="let item of 'PRIVACY_POLICY.DATA_COLLECTION.VISIT.PURPOSE_ITEMS' | translate | keyvalue">
              {{ item.value }}
            </li>
          </ul>
          <p>{{ 'PRIVACY_POLICY.DATA_COLLECTION.VISIT.LEGAL_BASIS' | translate }}</p>

          <h3>{{ 'PRIVACY_POLICY.DATA_COLLECTION.CONTACT_FORM.TITLE' | translate }}</h3>
          <p>{{ 'PRIVACY_POLICY.DATA_COLLECTION.CONTACT_FORM.DESCRIPTION' | translate }}</p>
          <p>{{ 'PRIVACY_POLICY.DATA_COLLECTION.CONTACT_FORM.LEGAL_BASIS' | translate }}</p>
          <p>{{ 'PRIVACY_POLICY.DATA_COLLECTION.CONTACT_FORM.DATA_DELETION' | translate }}</p>
        </section>

        <section class="legal__section">
          <h2>{{ 'PRIVACY_POLICY.DATA_TRANSFER.TITLE' | translate }}</h2>
          <p>{{ 'PRIVACY_POLICY.DATA_TRANSFER.DESCRIPTION' | translate }}</p>
          <ul>
            <li *ngFor="let item of 'PRIVACY_POLICY.DATA_TRANSFER.ITEMS' | translate | keyvalue">
              {{ item.value }}
            </li>
          </ul>
        </section>

        <section class="legal__section">
          <h2>{{ 'PRIVACY_POLICY.RIGHTS.TITLE' | translate }}</h2>
          <p>{{ 'PRIVACY_POLICY.RIGHTS.DESCRIPTION' | translate }}</p>
          <ul>
            <li *ngFor="let item of 'PRIVACY_POLICY.RIGHTS.ITEMS' | translate | keyvalue">
              {{ item.value }}
            </li>
          </ul>
        </section>

        <section class="legal__section">
          <h2>{{ 'PRIVACY_POLICY.OBJECTION.TITLE' | translate }}</h2>
          <p>{{ 'PRIVACY_POLICY.OBJECTION.DESCRIPTION' | translate }}</p>
          <p>{{ 'PRIVACY_POLICY.OBJECTION.CONTACT' | translate }}</p>
        </section>

        <section class="legal__section">
          <h2>{{ 'PRIVACY_POLICY.SECURITY.TITLE' | translate }}</h2>
          <p>{{ 'PRIVACY_POLICY.SECURITY.DESCRIPTION' | translate }}</p>
          <p>{{ 'PRIVACY_POLICY.SECURITY.TECH_MEASURES' | translate }}</p>
        </section>

        <section class="legal__section">
          <h2>{{ 'PRIVACY_POLICY.CHANGES.TITLE' | translate }}</h2>
          <p [innerHTML]="'PRIVACY_POLICY.CHANGES.DESCRIPTION' | translate"></p>
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
      width: 100%;
      max-width: 800px;
      color: var(--color-text-primary);
    }

    .legal__title {
      font-size: var(--font-size-heading-large);
      margin-bottom: 2rem;
    }

    .legal__section {
      margin-bottom: 3rem;

      h2 {
        font-size: var(--font-size-heading-medium);
        margin-bottom: 1rem;
      }

      h3 {
        font-size: var(--font-size-heading-small);
        margin: 1.5rem 0 1rem;
      }

      p {
        margin-bottom: 1rem;
        line-height: 1.6;
      }

      ul {
        margin: 1rem 0;
        padding-left: 2rem;

        li {
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }
      }

      a {
        color: var(--color-accent-primary);
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    h1{padding-top:100px;
    
    }


    @media (max-width: 768px) {
      .legal {
        padding: 1rem;
      }

      .legal__title {
        font-size: var(--font-size-heading-medium);
      }

      .legal__section {
        h2 {
          font-size: var(--font-size-heading-small);
        }

        h3 {
          font-size: calc(var(--font-size-base) * 1.2);
        }
      }
    }
  `]
})
export class PrivacyPageComponent {}