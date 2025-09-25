import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-project-card',
    imports: [CommonModule, TranslateModule],
    template: `
    <article class="project" [class.project--reversed]="isReversed">
      <div class="project__image-wrapper">
        <img [src]="image" [alt]="titleKey | translate" class="project__image">
      </div>
      
      <div class="project__content">
        <h3 class="project__title">{{ titleKey | translate }}</h3>
        <div class="project__tech">{{ stackKey | translate }}</div>
        <p class="project__description">{{ descriptionKey | translate }}</p>
        
        <div class="project__actions">
          <a [href]="demoUrl" target="_blank" class="project__button project__button--primary">
            {{ 'PORTFOLIO.LIVE_TEST' | translate }}
          </a>
          <a [href]="repoUrl" target="_blank" class="project__button project__button--secondary">
            {{ 'PORTFOLIO.GITHUB' | translate }}
          </a>
        </div>
      </div>
    </article>
  `,
    styles: [`
    .project {
      display: flex;
      align-items: center;
      gap: 4rem;
      position: relative;
      z-index: 5;
    }
    
    .project--reversed {
      flex-direction: row-reverse;
    }
    
    .project__image-wrapper {
      flex: 1;
      max-width: 600px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 0px 0px rgba(0, 0, 0, 0.2);
    }
    
    .project__image {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.5s ease;
    }
    
    .project__image-wrapper:hover .project__image {
      transform: scale(1.05);
    }
    
    .project__content {
      flex: 1;
      max-width: 500px;
      padding: 0 1rem;
    }
    
    .project__title {
      font-size: 2rem;
      color: var(--color-accent-secondary);
      margin: 0 0 1rem 0;
      font-weight: 700;
    }
    
    .project__tech {
      color: var(--color-accent-primary);
      font-size: 1.25rem;
      margin-bottom: 1.5rem;
      font-weight: 500;
    }
    
    .project__description {
      color: var(--color-text-primary);
      font-size: 1.125rem;
      line-height: 1.8;
      margin-bottom: 2rem;
    }
    
    .project__actions {
      display: flex;
      gap: 1.5rem;
    }
    
    .project__button {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      min-width: 140px;
    }
    
    .project__button--primary {
      background-color: var(--color-accent-secondary);
      color: var(--color-text-primary);
    }
    
    .project__button--primary:hover {
      background-color: var(--color-accent-primary);
      transform: scale(1.05);
    }
    
    .project__button--secondary {
      border: 2px solid var(--color-accent-primary);
      color: var(--color-text-primary);
      background-color: transparent;
    }
    
    .project__button--secondary:hover {
      background-color: var(--color-accent-primary);
      transform: scale(1.05);
    }
    
    /* Desktop breakpoint adjustments */
    @media (max-width: 1200px) and (min-width: 1001px) {
      .project__title {
        font-size: 1.75rem;
      }
      
      .project__tech {
        font-size: 1.125rem;
      }
      
      .project__description {
        font-size: 1rem;
      }
    }
    
    /* Tablet breakpoint - vertical layout but still relatively large */
    @media (max-width: 1000px) and (min-width: 769px) {
      .project,
      .project--reversed {
        flex-direction: column;
        text-align: center;
        gap: 2rem;
        margin-bottom: 60px;
      }
      
      .project__image-wrapper {
        max-width: 90vw;
        width: auto;
        height: auto;
        display: flex;
        justify-content: center;
      }
      
      .project__image {
        width: 100%;
        height: auto;
        max-width: 500px;
        object-fit: contain;
      }
      
      .project__content {
        max-width: 90vw;
        width: auto;
      }
      
      .project__actions {
        justify-content: center;
      }
    }
    
    /* Mobile breakpoint - compact layout with exact dimensions */
    @media (max-width: 768px) {
      .project,
      .project--reversed {
        flex-direction: column;
        text-align: center;
        gap: 1.5rem;
        margin-bottom: 50px;
      }
      
      .project__image-wrapper {
        max-width: 90vw;
        width: auto;
        height: auto;
        display: flex;
        justify-content: center;
      }
      
      .project__image {
        width: 100%;
        height: auto;
        max-width: 390px;
        object-fit: contain;
      }
      
      .project__content {
        max-width: 90vw;
        width: auto;
        padding: 0 1rem;
      }
      
      .project__title {
        font-size: 1.5rem;
      }
      
      .project__tech {
        font-size: 1rem;
      }
      
      .project__description {
        font-size: 0.875rem;
        line-height: 1.6;
      }
      
      .project__button {
        font-size: 0.875rem;
        min-width: 120px;
        padding: 0.625rem 1.25rem;
      }
    }
    
    /* Small mobile breakpoint - even more compact */
    @media (max-width: 480px) {
      .project__image-wrapper {
        max-width: 85vw;
        width: auto;
        height: auto;
      }
      
      .project__image {
        width: 100%;
        height: auto;
        max-width: 340px;
        object-fit: contain;
      }
      
      .project__content {
        max-width: 85vw;
        width: auto;
        padding: 0 0.75rem;
      }
      
      .project__actions {
        flex-direction: column;
        gap: 1rem;
        align-items: center;
      }
      
      .project__button {
        width: 100%;
        max-width: 200px;
      }
    }
    
    /* Extra small mobile breakpoint */
    @media (max-width: 360px) {
      .project__image-wrapper {
        max-width: 80vw;
        width: auto;
        height: auto;
      }
      
      .project__image {
        width: 100%;
        height: auto;
        max-width: 300px;
        object-fit: contain;
      }
      
      .project__content {
        max-width: 80vw;
        width: auto;
        padding: 0 0.5rem;
      }
      
      .project__title {
        font-size: 1.25rem;
      }
      
      .project__tech {
        font-size: 0.875rem;
      }
      
      .project__description {
        font-size: 16px;

      }
    }
  `]
})
export class ProjectCardComponent {
  @Input() image!: string;
  @Input() titleKey!: string;
  @Input() stackKey!: string;
  @Input() descriptionKey!: string;
  @Input() demoUrl!: string;
  @Input() repoUrl!: string;
  @Input() isReversed = false;
}