import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { AboutSectionComponent } from '../../components/about-section/about-section.component';
import { SkillsSectionComponent } from '../../components/skills-section/skills-section.component';
import { PortfolioSectionComponent } from '../../components/portfolio-section/portfolio-section.component';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';

@Component({
    selector: 'app-home-page',
    imports: [
        CommonModule,
        HeroSectionComponent,
        AboutSectionComponent,
        SkillsSectionComponent,
        PortfolioSectionComponent,
        ContactSectionComponent
    ],
    template: `
    <div class="home">
      <app-hero-section></app-hero-section>
      <app-about-section></app-about-section>
      <app-skills-section></app-skills-section>
      <app-portfolio-section></app-portfolio-section>
      <app-contact-section></app-contact-section>
    </div>
  `,
    styles: [`
    .home {
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 100vh;
      background-color: var(--color-background-primary);
    }
  `]
})
export class HomePageComponent {}