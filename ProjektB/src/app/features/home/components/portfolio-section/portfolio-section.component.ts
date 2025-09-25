import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from './project-card/project-card.component';

import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-portfolio-section',
    imports: [CommonModule, TranslateModule, ProjectCardComponent],
    template: `
    <section class="portfolio" id="portfolio">
      <div class="portfolio__container">
        <div class="portfolio__header">
          <div class="portfolio__title-container">
            <div class="portfolio__line-left"></div>
            <h2 class="portfolio__title">{{ "PORTFOLIO.HEADLINE" | translate }}</h2>
            <div class="portfolio__line-right-container">
              <div class="portfolio__line-right"></div>
            </div>
          </div>
          
          <p class="portfolio__introduction">
            {{ "PORTFOLIO.INTRODUCTION" | translate }}
          </p>
        </div>

        <div class="portfolio__projects">
          <app-project-card
            *ngFor="let project of projects; let i = index"
            [image]="project.image"
            [titleKey]="project.titleKey"
            [stackKey]="project.stackKey"
            [descriptionKey]="project.descriptionKey"
            [demoUrl]="project.demoUrl"
            [repoUrl]="project.repoUrl"
            [isReversed]="i % 2 === 1">
          </app-project-card>
        </div>
      </div>

      <img 
        class="portfolio__shadow-purple" 
        src="assets/img/shadow-purple-big.png" 
        alt="">
      <img 
        class="portfolio__shadow-green" 
        src="assets/img/shadow-green-big.png" 
        alt="">
    </section>
  `,
    styles: [`
    .portfolio {
      position: relative;
      display: flex;
      justify-content: center;
      padding: 2rem 0;
      background-color: var(--color-background-primary);
      min-height: 1000px;
      height: auto;
    }
    
    .portfolio__container {
      width: 100%;
      max-width: var(--max-content-width);
      margin: 0 auto;
      padding: 0 var(--content-padding-desktop);
      box-sizing: border-box;
      position: relative;
      z-index: 2;
    }

    @media (max-width: 1024px) {
      .portfolio__container {
        padding: 0 var(--content-padding-tablet);
      }
    }

    @media (max-width: 768px) {
      .portfolio__container {
        padding: 0 var(--content-padding-mobile);
      }
    }
    
    .portfolio__header {
      margin-bottom: 3rem;
    }
    
    .portfolio__title-container {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .portfolio__line-left {
      width: 100px;
      height: 4px;
      background-color: var(--color-accent-secondary);
      margin-right: 2rem;
    }
    
    .portfolio__title {
      font-size: 90px;
      color: var(--color-text-primary);
      margin: 0;
      white-space: nowrap;
    }
    
    .portfolio__line-right-container {
      position: relative;
      width: 100%;
      margin-left: 2rem;
    }
    
    .portfolio__line-right {
      position: absolute;
      left: 0;
      width: 99999px;
      height: 4px;
      background-color: var(--color-accent-secondary);
    }
    
    .portfolio__introduction {
      text-align: center;
      color: var(--color-text-primary);
      font-size: 16px;
      max-width: 800px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .portfolio__projects {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      position: relative;
      z-index: 3;
    }
    
    .portfolio__shadow-purple {
      position: absolute;
      left: 0;
      top: 20%;
      z-index: 1;
      opacity: 0.5;
      max-width: 40%;
    }
    
    .portfolio__shadow-green {
      position: absolute;
      right: 0;
      top: 50%;
      z-index: 1;
      opacity: 0.5;
      max-width: 40%;
    }
    
    @media (max-width: 1200px) {
      .portfolio__title {
        font-size: 70px;
      }
    }
    
    @media (max-width: 992px) {
      .portfolio__title {
        font-size: 60px;
      }
    }
    
    @media (max-width: 768px) {
      .portfolio__title-container {
        flex-wrap: wrap;
        justify-content: center;
        padding: 0 1rem;
       padding: 0 1.5rem;
      }
      
      .portfolio__title {
        font-size: 45px;
        order: 1;
        margin: 1rem 0;
      }
      
      .portfolio__line-left {
        width: 5%;
        order: 0;
        margin-right: 0;
      }
      
      .portfolio__line-right-container {
        width: 1%;
        order: 2;
        margin-left: 0;
      }
      
      .portfolio__introduction {
        max-width: 80vw;
      }
      
      .portfolio__shadow-purple,
      .portfolio__shadow-green {
        max-width: 30%;
      }
      
      .portfolio__projects {
        gap: 1.5rem;
      }
    }
    
    @media (max-width: 480px) {
      .portfolio__title {
        font-size: 26px;
      }
      
      .portfolio__shadow-purple,
      .portfolio__shadow-green {
        max-width: 25%;
      }
      
      .portfolio__projects {
        gap: 1rem;
      }
    }
    
    `]
})
export class PortfolioSectionComponent {
  projects = [
    {
      image: 'assets/img/join-project.png',
      titleKey: 'PORTFOLIO.PROJECTS.0.HEADLINE',
      stackKey: 'PORTFOLIO.PROJECTS.0.TECH_STACK',
      descriptionKey: 'PORTFOLIO.PROJECTS.0.DESCRIPTION',
      demoUrl: 'https://milan-moreno.developerakademie.net/Join/index.html',
      repoUrl: 'https://github.com/MilanMoreno/Join/'
    },
    {
      image: 'assets/img/Polloloco1.png',
      titleKey: 'PORTFOLIO.PROJECTS.1.HEADLINE',
      stackKey: 'PORTFOLIO.PROJECTS.1.TECH_STACK',
      descriptionKey: 'PORTFOLIO.PROJECTS.1.DESCRIPTION',
      demoUrl: 'https://milan-moreno.developerakademie.net/PolloLoco_/index.html',
      repoUrl: 'https://github.com/MilanMoreno/PolloLoco'
    },
    {
      image: 'assets/img/quiz-app-project.png',
      titleKey: 'PORTFOLIO.PROJECTS.3.HEADLINE',
      stackKey: 'PORTFOLIO.PROJECTS.3.TECH_STACK',
      descriptionKey: 'PORTFOLIO.PROJECTS.3.DESCRIPTION',
      demoUrl: 'https://milan-moreno.developerakademie.net/easyQuizzApp/index.html',
      repoUrl: 'https://github.com/MilanMoreno/easyQuizzApp'
    }
  ];
}