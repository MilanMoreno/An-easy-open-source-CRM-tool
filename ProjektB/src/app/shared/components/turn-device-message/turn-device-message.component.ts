import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-turn-device-message',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  encapsulation: ViewEncapsulation.None, // Styles wirken global
  template: `
    <div class="turn-device-overlay">
      <div class="turn-device-content">
        <div class="turn-device-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
            <path d="M7 13l3-3 3 3"></path>
          </svg>
        </div>
        <h2 class="turn-device-title">Turn Your Device</h2>
        <p class="turn-device-subtitle">Please rotate your device to portrait mode for the best experience</p>
      </div>
    </div>
  `,
  styles: [`
    .turn-device-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: var(--color-background-primary);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 99999;
      backdrop-filter: blur(10px);
    }
    .turn-device-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 2rem;
      max-width: 400px;
    }
    .turn-device-icon {
      color: var(--color-accent-primary);
      margin-bottom: 1.5rem;
      animation: rotateDevice 2s ease-in-out infinite;
    }
    @keyframes rotateDevice {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-15deg); }
      75% { transform: rotate(15deg); }
    }
    .turn-device-title {
      font-size: 2rem;
      color: var(--color-text-primary);
      margin: 0 0 1rem 0;
      font-weight: 700;
    }
    .turn-device-subtitle {
      font-size: 1.125rem;
      color: var(--color-text-primary);
      margin: 0;
      opacity: 0.8;
      line-height: 1.5;
    }

    /* ===== iPhone 12/13/14 – 926x428 (Landscape) ===== */
    @media screen and (width: 926px) and (height: 428px) and (orientation: landscape) {
      .turn-device-overlay { display: flex !important; }
    }
    @media screen and (min-width: 922px) and (max-width: 930px)
      and (min-height: 424px) and (max-height: 432px)
      and (orientation: landscape) {
      .turn-device-overlay { display: flex !important; }
    }
    @media screen and (device-width: 926px) and (device-height: 428px) and (orientation: landscape) {
      .turn-device-overlay { display: flex !important; }
    }
    /* ===== /iPhone 12/13/14 ===== */

    /* Samsung Galaxy – 914x412 (Landscape) */
    @media screen and (width: 914px) and (height: 412px) and (orientation: landscape) {
      .turn-device-overlay { display: flex !important; }
    }
    @media screen and (min-width: 910px) and (max-width: 920px)
      and (min-height: 408px) and (max-height: 416px)
      and (orientation: landscape) {
      .turn-device-overlay { display: flex !important; }
    }
    @media screen and (device-width: 914px) and (device-height: 412px) and (orientation: landscape) {
      .turn-device-overlay { display: flex !important; }
    }

    /* iPhone 14 Pro Max – 932x430 (Landscape) */
    @media screen and (width: 932px) and (height: 430px) and (orientation: landscape) {
      .turn-device-overlay { display: flex !important; }
    }
    @media screen and (min-width: 930px) and (max-width: 935px)
      and (min-height: 428px) and (max-height: 432px)
      and (orientation: landscape) {
      .turn-device-overlay { display: flex !important; }
    }
    @media screen and (device-width: 932px) and (device-height: 430px) and (orientation: landscape) {
      .turn-device-overlay { display: flex !important; }
    }

    /* iPhone SE 2nd Gen – 667x375 (Landscape) */
    @media screen and (width: 667px) and (height: 375px) and (orientation: landscape) {
      .turn-device-overlay { display: flex !important; }
    }
    @media screen and (min-width: 664px) and (max-width: 670px)
      and (min-height: 372px) and (max-height: 378px)
      and (orientation: landscape) {
      .turn-device-overlay { display: flex !important; }
    }

    /* Optional: Portrait immer Overlay aus */
    @media screen and (orientation: portrait) {
      .turn-device-overlay { display: none !important; }
    }

    /* ---- Wenn du .section-spacer hier wirklich mitsteuern willst ---- */
    @media screen and (max-width: 667px) and (max-height: 375px) and (orientation: landscape) {
      .section-spacer { height: 159px; }
    }

/* ===== 720 x 540 (Landscape) – z. B. Surface Duo Emulation ===== */
/* Exakter Match */
@media screen and (width: 720px) and (height: 540px) and (orientation: landscape) {
  .about__heading {
    font-size: 89px;
    padding-top: 50% !important;
    color: var(--color-text-primary);
    margin-bottom: 2rem;
  }
}

/* Toleranzbereich (kleine Abweichungen durch Browser-UI) */
@media screen
  and (min-width: 718px) and (max-width: 722px)
  and (min-height: 538px) and (max-height: 542px)
  and (orientation: landscape) {
  .about__heading {
    font-size: 89px;
    padding-top: 50% !important;
    color: var(--color-text-primary);
    margin-bottom: 2rem;
  }
}

/* Optional: device-gebundene Variante */
@media screen and (device-width: 720px) and (device-height: 540px) and (orientation: landscape) {
  .about__heading {
    font-size: 89px;
    padding-top: 50% !important;
    color: var(--color-text-primary);
    margin-bottom: 2rem;
  }
}
/* ===== 720 x 540 (Landscape) – Turn Device Overlay ===== */
@media screen and (width: 720px) and (height: 540px) and (orientation: landscape) {
  .turn-device-overlay { display: flex !important; }
}

/* Toleranzbereich */
@media screen
  and (min-width: 718px) and (max-width: 722px)
  and (min-height: 538px) and (max-height: 542px)
  and (orientation: landscape) {
  .turn-device-overlay { display: flex !important; }
}

/* Device-spezifisch */
@media screen and (device-width: 720px) and (device-height: 540px) and (orientation: landscape) {
  .turn-device-overlay { display: flex !important; }
}




  `]
})
export class TurnDeviceMessageComponent {}
