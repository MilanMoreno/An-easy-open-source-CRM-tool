import { Component, HostListener, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-custom-cursor',
    imports: [CommonModule],
    template: `
    <div class="cursor" [ngStyle]="cursorStyles">
      <div class="cursor__pointer"></div>
    </div>
  `,
    styles: [`
    .cursor {
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 20px solid var(--color-text-primary);
      position: fixed;
      transform: translate(-50%, -50%) rotate(-30deg);
      z-index: 9999;
      pointer-events: none;
      transition: opacity 0.2s ease;
      /* Hide custom cursor on mobile devices and Firefox */
      display: none;
    }

    /* Only show cursor on desktop devices (1024px and above) */
    @media (min-width: 1024px) and (pointer: fine) {
      .cursor {
        display: block;
      }
    }

    /* Firefox-spezifisch: Custom Cursor verstecken */
    @-moz-document url-prefix() {
      .cursor {
        display: none !important;
      }
    }

    .cursor__pointer {
      width: 100%;
      height: 100%;
    }
  `]
})
export class CustomCursorComponent {
  cursorStyles = {
    top: '0px',
    left: '0px',
    display: 'none'
  };

  constructor(private ngZone: NgZone) {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.ngZone.run(() => {
      // Nur für Desktop-Geräte mit Maus und Nicht-Firefox Browser
      if (!this.isFirefox() && this.isDesktopDevice()) {
        this.updateCursorPosition(event.clientX, event.clientY);
        this.cursorStyles.display = 'block';
      } else {
        this.cursorStyles.display = 'none';
      }
    });
  }

  @HostListener('document:mouseleave')
  onMouseLeave(): void {
    this.ngZone.run(() => {
      if (!this.isFirefox() && this.isDesktopDevice()) {
        this.cursorStyles.display = 'none';
      }
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    // Cursor nur für Desktop-Geräte und Nicht-Firefox Browser
    if (this.isFirefox() || !this.isDesktopDevice()) {
      this.cursorStyles.display = 'none';
    }
  }

  private isFirefox(): boolean {
    return typeof window !== 'undefined' && 
           navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  }

  private isDesktopDevice(): boolean {
    if (typeof window === 'undefined') return false;
    
    // Check screen width (1024px and above for desktop)
    const isLargeScreen = window.innerWidth >= 1024;
    
    // Check if device has fine pointer (mouse) capability
    const hasFinePonter = window.matchMedia('(pointer: fine)').matches;
    
    // Check if device is not touch-primary
    const isNotTouchPrimary = !window.matchMedia('(pointer: coarse)').matches;
    
    return isLargeScreen && (hasFinePonter || isNotTouchPrimary);
  }

  private updateCursorPosition(x: number, y: number): void {
    this.cursorStyles.left = `${x}px`;
    this.cursorStyles.top = `${y}px`;
  }
}