import { Component, HostListener, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="custom-cursor" [ngStyle]="cursorStyle">
      <div class="cursor-tip"></div>
    </div>
  `,
  styles: [`
    .custom-cursor {
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 20px solid white;
      position: absolute;
      transform: translate(-50%, -50%) rotate(-30deg);
      z-index: 999;
      pointer-events: none;
    }
  `]
})
export class CursorComponent {
  cursorStyle = {
    top: '0px',
    left: '0px',
    display: 'none'
  };

  constructor(private ngZone: NgZone) {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.ngZone.run(() => {
      if (window.innerWidth > 1000) {
        this.updateCursorPosition(event);
        this.cursorStyle.display = 'block';
      } else {
        this.cursorStyle.display = 'none';
      }
    });
  }

  @HostListener('document:mouseleave')
  onMouseLeave() {
    this.ngZone.run(() => {
      if (window.innerWidth > 1000) {
        this.cursorStyle.display = 'none';
      }
    });
  }

  @HostListener('document:mouseenter')
  onMouseEnter() {
    this.ngZone.run(() => {
      if (window.innerWidth > 1000) {
        this.cursorStyle.display = 'block';
      }
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.ngZone.run(() => {
      if (window.innerWidth <= 1000) {
        this.cursorStyle.display = 'none';
      }
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.ngZone.run(() => {
      if (window.innerWidth > 1000) {
        this.updateCursorPosition();
      }
    });
  }

  private updateCursorPosition(event?: MouseEvent) {
    if (event) {
      this.cursorStyle.top = `${event.clientY + window.scrollY}px`;
      this.cursorStyle.left = `${event.clientX + window.scrollX}px`;
    }
  }
}