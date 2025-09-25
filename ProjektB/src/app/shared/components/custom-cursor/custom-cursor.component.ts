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
      this.updateCursorPosition(event.clientX, event.clientY);
      this.cursorStyles.display = 'block';
    });
  }

  @HostListener('document:mouseleave')
  onMouseLeave(): void {
    this.ngZone.run(() => {
      this.cursorStyles.display = 'none';
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    // Cursor bleibt immer sichtbar, unabhängig von der Bildschirmgröße
  }

  private updateCursorPosition(x: number, y: number): void {
    this.cursorStyles.left = `${x}px`;
    this.cursorStyles.top = `${y}px`;
  }
}