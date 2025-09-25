import { CommonModule } from '@angular/common';
import { Component, ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewportService } from '../../../../shared/services/viewport/viewport-service.service'; 
import { slideInOutLeft, slideInOutRight, slideInFromBottom } from '../../../../shared/animations/animations';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-skills',
    imports: [CommonModule, TranslateModule],
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.scss',
    animations: [
        slideInOutLeft,
        slideInOutRight,
        slideInFromBottom
    ]
})
export class SkillsComponent implements AfterViewInit, OnDestroy {


  slideIn = 'out';
  slideInRight = 'out';
  slideInBottom: string = 'out';
  private subscription: Subscription | undefined;

  constructor(
    private el: ElementRef,
    private viewportService: ViewportService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.subscription = this.viewportService.observeElement(this.el.nativeElement).subscribe(isIntersecting => {
      this.slideIn = isIntersecting ? 'in' : 'out';
      this.slideInRight = isIntersecting ? 'in' : 'out';
      this.slideInBottom = isIntersecting ? 'in' : 'out';
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}




