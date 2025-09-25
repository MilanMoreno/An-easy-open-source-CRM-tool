import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectCardComponent } from '../../../../shared/project-card/project-card.component';
import { PROJECTS } from '../../../data/project-data';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-portfolio',
    imports: [CommonModule, ProjectCardComponent, TranslateModule],
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  projects = PROJECTS.map((project, index) => ({
    ...project,
    headlineKey: `PORTFOLIO.PROJECTS.${index}.HEADLINE`,
    techStackKey: `PORTFOLIO.PROJECTS.${index}.TECH_STACK`,
    descriptionKey: `PORTFOLIO.PROJECTS.${index}.DESCRIPTION`
  }));

  constructor(private translate: TranslateService) {}

  getTranslatedProjects() {
    return this.projects.map(project => ({
      ...project,
      headline: this.translate.instant(project.headlineKey),
      techStack: this.translate.instant(project.techStackKey),
      description: this.translate.instant(project.descriptionKey)
    }));
  }
}
