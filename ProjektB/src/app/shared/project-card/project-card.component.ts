import { CommonModule } from '@angular/common';
import { Component, Input, ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ViewportService } from '../services/viewport/viewport-service.service';
import { slideInOutLeft, slideInFromBottom, slideInOutRight } from '../animations/animations';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-project-card',
    imports: [CommonModule, TranslateModule],
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.scss'],
    animations: [
        slideInOutLeft,
        slideInOutRight,
        slideInFromBottom
    ]
})
export class ProjectCardComponent implements AfterViewInit, OnDestroy {
  @Input() projectImage!: string;
  @Input() titleKey!: string;
  @Input() stackKey!: string;
  @Input() descriptionKey!: string;
  @Input() demoUrl!: string;
  @Input() repoUrl!: string;

  @Input() rowReverse: boolean = false;
  @Input() index: number = 1;

  slideIn = 'out';
  slideInRight = 'out';
  slideInBottom: string = 'out';
  private subscription: Subscription | undefined;

  constructor(
    private el: ElementRef,
    private viewportService: ViewportService,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    if (this.isBrowser() && 'IntersectionObserver' in window) {
      this.subscription = this.viewportService.observeElement(this.el.nativeElement).subscribe(isIntersecting => {
        this.slideIn = isIntersecting ? 'in' : 'out';
        this.slideInRight = isIntersecting ? 'in' : 'out';
        this.slideInBottom = isIntersecting ? 'in' : 'out';
        this.cdr.detectChanges();
      });
    } else {
      // Fallback: Set all animations to 'in' if IntersectionObserver is not available
      this.slideIn = 'in';
      this.slideInRight = 'in';
      this.slideInBottom = 'in';
      this.cdr.detectChanges();
      console.warn('IntersectionObserver is not available in this environment.');
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.IntersectionObserver !== 'undefined';
  }
}
