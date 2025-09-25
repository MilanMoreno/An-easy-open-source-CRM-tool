import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ClipboardService } from '../../../../shared/services/clipboard/clipboard.service';
import { CommonModule } from '@angular/common';
import { slideInOutLeft, slideInOutRight, slideInFromBottom } from '../../../../shared/animations/animations';
import { ViewportService } from '../../../../shared/services/viewport/viewport-service.service';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-hero',
    templateUrl: './hero.component.html',
    imports: [CommonModule, TranslateModule],
    styleUrls: ['./hero.component.scss'],
    animations: [
        slideInOutLeft,
        slideInOutRight,
        slideInFromBottom
    ]
})
export class HeroComponent implements AfterViewInit, OnDestroy {

  @ViewChild('copyAlert', { static: false }) copyAlert!: ElementRef;

  constructor(
    private clipboardService: ClipboardService, 
    private el: ElementRef,
    private viewportService: ViewportService,
    private cdr: ChangeDetectorRef) {


  }

  copyText() {
    const textToCopy = 'milan.moreno@gmail.com';
    this.clipboardService.copyTextToClipboard(textToCopy, this.copyAlert);
  }


  slideIn = 'out';
  slideInRight = 'out';
  slideInBottom: string = 'out';
  private subscription: Subscription | undefined;


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
