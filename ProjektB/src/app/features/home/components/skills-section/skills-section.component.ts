import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ViewportObserverService } from '../../../../shared/services/viewport/viewport.service';
import { fadeInLeft, fadeInUp } from '../../../../shared/animations/fade.animations';

interface Skill {
  name: string;
  icon: string;
}

@Component({
    selector: 'app-skills-section',
    imports: [CommonModule, TranslateModule],
    template: `
    <section class="skills" id="skills">
      <div class="skills__container">
        <div class="skills__content">
          <!-- Skills Grid FIRST (LEFT SIDE) -->
          <div class="skills__grid" [@fadeInLeft]="isVisible ? 'visible' : 'void'">
            <div class="skills__item" *ngFor="let skill of skillsList">
              <div class="skills__item-inner">
                <img [src]="skill.icon" [alt]="skill.name" class="skills__icon">
                <span class="skills__name">{{ skill.name }}</span>
              </div>
            </div>
          </div>
          
          <!-- Text SECOND (RIGHT SIDE) -->
          <div class="skills__text">
            <div class="skills__title-container" [@fadeInUp]="isVisible ? 'visible' : 'void'">
              <h2 class="skills__title">{{ "SKILLS.MY_SKILLS" | translate }}</h2>
              <div class="skills__title-line"></div>
            </div>
            
            <p class="skills__description">
              {{ "SKILLS.DESCRIPTION" | translate }}
            </p>
            
            <!-- Desktop Button -->
            <div class="skills__cta skills__cta--desktop">
              <a href="#contact" class="skills__button">
                {{ "SKILLS.GET_IN_TOUCH" | translate }}
              </a>
            </div>
          </div>
        </div>
        
        <!-- Mobile Button - ganz unten -->
        <div class="skills__cta skills__cta--mobile">
          <a href="#contact" class="skills__button">
            {{ "SKILLS.GET_IN_TOUCH" | translate }}
          </a>
        </div>
      </div>
      
      <div class="skills__background">
        <img src="assets/img/green-shadow.png" alt="" class="skills__shadow">
      </div>
    </section>
  `,
    styles: [`
    .skills {
      position: relative;
      width: 100%;
      min-height: 1000px;
      height: auto;
      background-color: var(--color-background-primary);
     padding: 4rem 0;
      overflow: hidden;
    }
    
    .skills__container {
      max-width: 1440px;
      margin: 0 auto;
      padding: 0 2rem;
      position: relative;
      z-index: 5;
    }
    
    .skills__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 4rem;
    }
    
    .skills__grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
      flex: 1;
      max-width: 600px;
    }
    
    .skills__text {
      flex: 1;
      max-width: 500px;
    }
    
    .skills__item {
      display: flex;
      justify-content: center;
    }
    
    .skills__item-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }
    
    .skills__icon {
      width: 60px;
      height: 60px;
      transition: transform 0.3s ease;
    }
    
    .skills__icon:hover {
      animation: skillBounce 1s linear;
    }
    
    @keyframes skillBounce {
      20%, 50%, 80%, to {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-30px);
      }
      70% {
        transform: translateY(-15px);
      }
      90% {
        transform: translateY(-4px);
      }
    }
    
    .skills__name {
      color: var(--color-text-primary);
      font-size: 1rem;
      font-weight: 600;
    }
    
    .skills__title {
      font-size: 89px;
      color: var(--color-text-primary);
      margin: 0 0 2rem 0;
      display: inline-block;
    }
    
    .skills__title-container {
      display: flex;
      align-items: center;
        text-align: center;
        justify-content: flex-end;
      margin-bottom: 2rem;
    }
    
    .skills__title-line {
      width: 2px;
      height: 4px;
      position: relative;
      margin-left: 1rem;
      display: inline-block;
    }
    
    .skills__title-line::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 9999px;
      height: 4px;
      background-color: var(--color-accent-secondary);
    }
    
    .skills__description {
      font-size: 1.125rem;
      color: var(--color-text-primary);
      line-height: 1.8;
      margin-bottom: 2rem;
    }
    
    .skills__cta {
      display: flex;
      justify-content: flex-start;
      margin: 0;
    }
    
    /* Desktop Button sichtbar */
    .skills__cta--desktop {
      display: flex;
    }
    
    /* Mobile Button versteckt */
    .skills__cta--mobile {
      display: none;
      justify-content: center;
      margin-top: 3rem;
    }
    
    .skills__button {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 180px;
      height: 50px;
      background-color: var(--color-accent-primary);
      color: var(--color-text-primary);
      border-radius: 8px;
      font-size: 1.125rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    
    .skills__button:hover {
      background-color: var(--color-accent-secondary);
      transform: scale(1.05);
    }
    
    .skills__background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      pointer-events: none;
    }
    
    .skills__shadow {
      position: absolute;
      left: 0;
      top: 30%;
      max-width: 40%;
      opacity: 0.4;
    }
    
    @media (max-width: 1200px) {
      .skills__title {
        font-size: 60px;
      }
      
      .skills__grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    @media (max-width: 1000px) {
      .skills__content {
        flex-direction: column;
        align-items: center;
      }
      
      .skills__text {
        max-width: 100%;
        order: 1;
        margin-bottom: 3rem;
      }
      
      .skills__grid {
        max-width: 100%;
        order: 2;
        margin-bottom: 3rem;
      }
      
      .skills__title-container {
        text-align: center;
        justify-content: flex-end;
    
      }
      
      .skills__title {
        text-align: center;
        margin-bottom: 0;
      }
      
      .skills__description {
        text-align: center;
        margin: 0;
      }
      
      /* Desktop Button verstecken */
      .skills__cta--desktop {
        display: none;
      }
      
      /* Mobile Button anzeigen */
      .skills__cta--mobile {
        display: flex;
      }
    }
    
    @media (max-width: 768px) {
      .skills {
        padding: 4rem 0;
      }
      
      .skills__title {
        font-size: 45px;
      }
      
      .skills__description {
        font-size: 1rem;
      }
      
      .skills__button {
        width: 160px;
        height: 45px;
        font-size: 1rem;
      }
    }
    
    @media (max-width: 576px) {
      .skills__grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
      }
      
      .skills__title {
        font-size: 45px;
      }
      
      .skills__icon {
        width: 50px;
        height: 50px;
      }
    }
    
    @media (max-width: 480px) {
      .skills__title {
        font-size:26px;
      }
      
      .skills__description {
        font-size: 0.875rem;
      }
      
      .skills__button {
        width: 140px;
        height: 40px;
        font-size: 0.875rem;
      }
      
      .skills__icon {
        width: 40px;
        height: 40px;
      }
      
      .skills__name {
        font-size: 0.875rem;
      }
    }
  `],
    animations: [fadeInLeft, fadeInUp]
})
export class SkillsSectionComponent implements OnInit {
  isVisible = false;

  skillsList: Skill[] = [
    { name: 'Angular', icon: 'assets/img/skills/Angular.png' },
    { name: 'TypeScript', icon: 'assets/img/skills/typescript.png' },
    { name: 'JavaScript', icon: 'assets/img/skills/Javascript.png' },
    { name: 'HTML', icon: 'assets/img/skills/html.png' },
    { name: 'Firebase', icon: 'assets/img/skills/firebase.png' },
    { name: 'Git', icon: 'assets/img/skills/git.png' },
    { name: 'CSS', icon: 'assets/img/skills/css.png' },
    { name: 'API', icon: 'assets/img/skills/Api.png' },
    { name: 'SCRUM', icon: 'assets/img/skills/scrum.png' },
    { name: 'Material', icon: 'assets/img/skills/material.png' }
  ];

  constructor(
    private elementRef: ElementRef,
    private viewportObserver: ViewportObserverService
  ) {}

  ngOnInit(): void {
    this.viewportObserver
      .observeElement(this.elementRef.nativeElement)
      .subscribe(visible => this.isVisible = visible);
  }
}