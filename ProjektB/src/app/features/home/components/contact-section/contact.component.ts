import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { fadeInLeft, fadeInUp } from '../../../../shared/animations/fade.animations';
import { SupabaseService } from '../../../../shared/services/supabase/supabase.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-contact-section',
    imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
    template: `
    <section class="contact" id="contact">
      <div class="contact__container">
        <header class="contact__header">
          <div class="contact__title-wrapper">
            <div class="contact__line"></div>
            <h2 class="contact__title">{{ 'CONTACT.HEADLINE' | translate }}</h2>
          </div>
        </header>

        <div class="contact__content">
          <div class="contact__intro">
            <h3 class="contact__subtitle" [@fadeInUp]>
              {{ 'CONTACT.INTRODUCTION' | translate }}
            </h3>
            <p>{{ 'CONTACT.DESCRIPTION_1' | translate }}</p>
            <p>
              {{ 'CONTACT.DESCRIPTION_2' | translate }}
              <strong>{{ 'CONTACT.DESCRIPTION_3' | translate }}</strong>
            </p>
          </div>

          <form 
            [formGroup]="contactForm" 
            (ngSubmit)="onSubmit()" 
            class="contact__form"
            [@fadeInLeft]>
            
            <div class="contact__form-group">
              <input
                type="text"
                id="name"
                formControlName="name"
                [placeholder]="'CONTACT.NAME_PLACEHOLDER' | translate"
                [class.is-invalid]="submitted && f['name'].errors">
              
              <div class="contact__error-container">
                <span class="contact__error" *ngIf="submitted && f['name'].errors">
                  {{ 'CONTACT.NAME_ERROR' | translate }}
                </span>
              </div>
            </div>

            <div class="contact__form-group">
              <input
                type="email"
                id="email"
                formControlName="email"
                [placeholder]="'CONTACT.EMAIL_PLACEHOLDER' | translate"
                [class.is-invalid]="submitted && f['email'].errors">
              
              <div class="contact__error-container">
                <span class="contact__error" *ngIf="submitted && f['email'].errors">
                  {{ 'CONTACT.EMAIL_ERROR' | translate }}
                </span>
              </div>
            </div>

            <div class="contact__form-group">
              <textarea
                id="message"
                formControlName="message"
                rows="4"
                [placeholder]="'CONTACT.MESSAGE_PLACEHOLDER' | translate"
                [class.is-invalid]="submitted && f['message'].errors">
              </textarea>
              
              <div class="contact__error-container">
                <span class="contact__error" *ngIf="submitted && f['message'].errors">
                  {{ 'CONTACT.MESSAGE_ERROR' | translate }}
                </span>
              </div>
            </div>

            <div class="contact__form-group">
              <label class="contact__checkbox-label">
                <input
                  type="checkbox"
                  formControlName="privacyPolicy">
                <span class="contact__checkbox-custom"></span>
                <span class="contact__checkbox-text">
                  {{ 'CONTACT.PRIVACY_POLICY_TEXT1' | translate }}
                  <a routerLink="/legal/privacy">
                    {{ 'CONTACT.PRIVACY_POLICY_TEXT2' | translate }}
                  </a>
                  {{ 'CONTACT.PRIVACY_POLICY_TEXT3' | translate }}
                </span>
              </label>
              
              <div class="contact__error-container">
                <span class="contact__error" *ngIf="submitted && f['privacyPolicy'].errors">
                  {{ 'CONTACT.PRIVACY_POLICY_ERROR' | translate }}
                </span>
              </div>
            </div>

            <div class="contact__form-actions">
              <button 
                type="submit" 
                class="contact__submit"
                [disabled]="isSubmitting">
                {{ 'CONTACT.SEND_BUTTON' | translate }}
              </button>
            </div>

            <div *ngIf="submitSuccess" class="contact__success-message">
              {{ 'CONTACT.SUCCESS_MESSAGE' | translate }}
            </div>

            <div *ngIf="submitError" class="contact__error-message">
              {{ errorMessage }}
            </div>
          </form>
        </div>

        <a href="#hero" class="contact__scroll-top">
          <svg viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zm0 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm1.879 7.121l5.707 5.707a1 1 0 01-1.414 1.414L17 11.071V24a1 1 0 01-2 0V11.07l-5.172 5.173a1 1 0 01-1.414-1.414l5.707-5.707a1 1 0 011.414 0 1 1 0 011.344 0z"/>
          </svg>
        </a>
      </div>

      <img 
        class="contact__shadow" 
        src="assets/img/shadow-purple-big.png" 
        alt=""
      />
    </section>
  `,
    styles: [`
    .contact {
      position: relative;
      display: flex;
      justify-content: center;
      width: 100%;
    }

    .contact__container {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: var(--color-background-primary);
      min-height: 100vh;
      width: 100%;
      max-width: 1920px;
    }

    .contact__header {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 4rem;
      z-index: 60;
    }

    .contact__title-wrapper {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .contact__line {
      background-color: var(--color-accent-secondary);
      width: 20vw;
      height: 4px;
      margin-right: 2rem;
    }

    .contact__title {
      font-size: var(--font-size-heading-large);
      color: var(--color-text-primary);
      margin: 0;
    }

    .contact__content {
      display: flex;
      justify-content: center;
      gap: 4rem;
      width: 100%;
      max-width: 1200px;
      padding: 0 2rem;
    }

    .contact__intro {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 470px;
      z-index: 60;

      p {
        font-size: var(--font-size-base);
        color: var(--color-text-primary);
      }
    }

    .contact__subtitle {
      color: var(--color-text-primary);
      font-size: var(--font-size-heading-medium);
      margin: 0;
    }

    .contact__form {
      width: 680px;
      z-index: 60;
      position: relative;
    }

    .contact__form-group {
      margin-bottom: 2.5rem;
      position: relative;
    }

    .contact__error-container {
      position: relative;
      min-height: 20px;
      margin-top: 8px;
    }

    .contact__input,
    input,
    textarea {
      width: 100%;
      font-size: 17px;
      border: 1px solid var(--color-accent-secondary);
      border-radius: 10px;
      padding: 15px 25px;
      background-color: rgba(20, 29, 47, 0.1);
      color: var(--color-text-primary);

      &::placeholder {
        color: var(--color-text-primary);
      }

      &:hover {
        border-color: var(--color-accent-primary);
      }

      &:focus {
        outline: none;
        border-color: var(--color-accent-primary);
      }

      &.is-invalid {
        border-color: red;
      }
    }

    textarea {
      min-height: 150px;
      resize: vertical;
    }

    .contact__checkbox-label {
      display: flex;
      align-items: center;
      gap: 1rem;
      color: var(--color-text-primary);
      cursor: pointer;

      input[type="checkbox"] {
        display: none;
      }
    }

    .contact__checkbox-custom {
      width: 20px;
      height: 20px;
      border: 2px solid var(--color-accent-secondary);
      border-radius: 4px;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 6px;
        height: 12px;
        border: solid var(--color-text-primary);
        border-width: 0 2px 2px 0;
        transform: translate(-50%, -50%) rotate(45deg) scale(0);
        transition: transform 0.2s ease;
      }
    }

    input[type="checkbox"]:checked + .contact__checkbox-custom {
      border-color: var(--color-accent-primary);

      &::after {
        transform: translate(-50%, -50%) rotate(45deg) scale(1);
      }
    }

    .contact__checkbox-text {
      font-size: 15px;

      a {
        color: var(--color-accent-secondary);
        margin: 0 5px;

        &:hover {
          color: var(--color-accent-primary);
        }
      }
    }

    .contact__error {
      display: block;
      color: red;
      font-size: 14px;
      position: absolute;
      left: 0;
    }

    .contact__form-actions {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }

    .contact__submit {
      width: 250px;
      background-color: var(--color-accent-primary);
      border: none;
      border-radius: 10px;
      padding: 15px 30px;
      color: var(--color-text-primary);
      font-size: var(--font-size-base);
      cursor: pointer;
      transition: all 0.3s ease;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background-color: var(--color-accent-secondary);
      }
    }

    .contact__success-message {
      margin-top: 1rem;
      padding: 1rem;
      background-color: rgba(112, 230, 28, 0.2);
      border: 1px solid var(--color-accent-primary);
      border-radius: 10px;
      color: var(--color-text-primary);
      text-align: center;
    }

    .contact__error-message {
      margin-top: 1rem;
      padding: 1rem;
      background-color: rgba(255, 0, 0, 0.2);
      border: 1px solid red;
      border-radius: 10px;
      color: var(--color-text-primary);
      text-align: center;
    }

    .contact__scroll-top {
      position: absolute;
      right: 100px;
      bottom: 50px;
      height: 40px;
      width: 40px;
      color: var(--color-text-primary);
      transition: color 0.3s ease;

      &:hover {
        color: var(--color-accent-primary);
      }
    }

    .contact__shadow {
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 1;
      max-width: 50%;
      height: auto;
    }

    @media (max-width: 1395px) {
      .contact__content {
        flex-direction: column;
        align-items: center;
      }

      .contact__intro {
        width: 100%;
        max-width: 80vw;
        text-align: center;
      }

      .contact__form {
        width: 100%;
        max-width: 80vw;
      }
    }

    @media (max-width: 768px) {
      .contact__scroll-top {
        right: 1rem;
        bottom: 1rem;
      }

      .contact__title {
        font-size: 45px;
      }

      .contact__subtitle {
        font-size: 24px;
      }

      .contact__shadow {
        display: none;
      }
    }

    @media (max-width: 480px) {
      .contact__checkbox-text {
        font-size: 12px;
      }

      .contact__submit {
        width: 100%;
      }
    }
  `],
    animations: [fadeInLeft, fadeInUp]
})
export class ContactSectionComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private supabaseService: SupabaseService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      privacyPolicy: [false, Validators.requiredTrue]
    });
  }

  // Getter for easy access to form fields
  get f() { return this.contactForm.controls; }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    try {
      const result = await this.supabaseService.submitContactForm({
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        message: this.contactForm.value.message
      });

      if (result.success) {
        this.submitSuccess = true;
        this.contactForm.reset();
        this.submitted = false;
      } else {
        this.submitError = true;
        this.errorMessage = 'There was an error sending your message. Please try again later.';
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      this.submitError = true;
      this.errorMessage = 'There was an error sending your message. Please try again later.';
    } finally {
      this.isSubmitting = false;
    }
  }
}