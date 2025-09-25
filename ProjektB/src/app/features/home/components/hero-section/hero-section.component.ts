import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardManagerService } from '../../../../shared/services/clipboard/clipboard.service';
import { fadeInLeft, fadeInUp } from '../../../../shared/animations/fade.animations';

@Component({
    selector: 'app-hero-section',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    template: `
<section class="hero" id="hero">
  <!-- Desktop Vector Shape - only visible above 900px -->
  <div class="hero__desktop-vector">
    <img src="assets/img/Vector shape hero.png" alt="Vector Shape" class="hero__desktop-vector-image">
  </div>

  <div class="hero__content">
    <div class="hero__left-container">
      <img class="hero__image" src="assets/img/hero.png" alt="Hero image">
      <div class="hero__image-shadow"></div>
      
      <!-- Mobile Vector Shape - only visible under 900px -->
      <div class="hero__mobile-vector">
        <img src="assets/img/Vector shape hero.png" alt="Vector Shape" class="hero__mobile-vector-image">
      </div>
    </div>

    <div class="hero__text-wrapper">
      <div class="hero__intro-text" [@fadeInLeft]>
        {{ 'HERO.IAM' | translate }}
      </div>

      <div class="hero__name-container" [@fadeInUp]>
        <h1 class="hero__name">{{ 'HERO.NAME' | translate }}</h1>
        <p class="hero__title">{{ 'HERO.JOBTITLE' | translate }}</p>

        <div class="hero__cta-wrapper">
          <a href="#contact" class="hero__cta">
            {{ 'HERO.LETSTALK' | translate }}
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="hero__footer">
    <div class="hero__line-container">
      <div class="hero__line"></div>
    </div>

    <div class="hero__social">
      <a href="https://github.com/MilanMoreno" target="_blank" class="hero__social-link">
        <img src="assets/img/github.png" alt="GitHub">
      </a>
      <a class="hero__social-link" (click)="copyEmail()">
        <img src="assets/img/email.png" alt="Email">
      </a>
      <a href="https://www.linkedin.com/in/milan-moreno-9a7482360//" target="_blank" class="hero__social-link">
        <img src="assets/img/linkedin.png" alt="LinkedIn">
      </a>
      <span class="hero__email">milan.moreno&#64;gmail.com</span>
    </div>

  </div>

  <!-- Scroll down element outside footer, between sections -->
  <a href="#about" class="hero__scroll">
    {{ 'HERO.SCROLLDOWN' | translate }}
  </a>

  <div class="hero__notification" [class.hero__notification--visible]="(clipboardService.copyStatus$ | async)">
    {{ 'HERO.EMAIL_COPIED' | translate }}
  </div>

</section>
  `,
    styles: [`
    .hero {
      position: relative;
      height: 100vh !important;
      background-color: #141D2F;
      display: flex;
      flex-direction: column;
      overflow: visible !important;
      padding-top: 4%;
      padding-bottom: 0;
      box-sizing: border-box;
      
      /* KEIN MARGIN-BOTTOM MEHR! */
      /* Die Spacer-Wall-Komponente regelt jetzt den Abstand zur About-Section */
    }

    .hero__content {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      width: 100%;
      max-width: var(--max-content-width);
      margin: 0 auto;
      padding: 0 var(--content-padding-desktop);
      box-sizing: border-box;
      margin-top: calc(-1 * var(--header-height));
      position: relative;
      z-index: 3;
      gap: 5rem;
      overflow: visible !important;
    }

    @media (max-width: 1024px) {
      .hero__content {
        padding: 0 var(--content-padding-tablet);

      }
       
    }

    @media (max-width: 768px) {
      .hero__content {
        padding: 0 var(--content-padding-mobile);
      }
    }

    .hero__left-container { 
      position: relative;
      width: auto; 
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
      margin-top: 25px;
      flex-shrink: 0; 
    }

    img, video {
      max-width: 90%;
      height: auto;
    }

    .hero__image {
      margin-top:40px;
      height:90%; 
      height: 50%;
      object-fit: contain;
      padding-top:50px;
      position: relative;
      z-index: 3;
    }
 
    .hero__image-shadow {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      background: url('/assets/img/hero-shadows.png') no-repeat center center;
      background-size: contain;
      z-index: 2;
      opacity: 0.8;
      pointer-events: none;
    }

    .hero__desktop-vector {
      position: absolute !important;
      left: -5% !important;
      bottom: 1% !important;   
      width: 175% !important;
      top: 36%; 
      height: 57% !important;
      pointer-events: none !important;
      z-index: 5 !important;
      transform: rotate(-3deg) !important;
    }

    .hero__desktop-vector-image {
      width: 90% !important;
      height: 90% !important;
      object-fit: fill !important;
      opacity: 1 !important;
      transform: perspective(1000px) rotateX(-15deg) !important;
      border-radius: 300px 300px 0 0 / 150px 150px 0 0 !important;
    } 

    /* Mobile Vector Shape - original positioning from your code */
    .hero__mobile-vector {
      display: none;
      position: absolute;
      bottom: -40px;
      left: -50%;
      right: -50%;
      transform: translateX(10%) rotate(2deg);
      width: 200%;
      max-width: none;
      height: 100px;
      z-index: 4;
      pointer-events: none;
    }

    .hero__mobile-vector-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    .hero__text-wrapper {
      display: flex;
      align-items: center;
      gap: 20px;
      column-gap: 0px; 
      margin-left: -90px;
      z-index: 3;
    }

    .hero__intro-text {
      transform: rotate(-90deg);
      font-size: 58px;
      color: var(--color-text-primary);
      white-space: nowrap;
      flex-shrink: 0;
    }

    .hero__name-container {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
      align-items: flex-start;
    }

    .hero__cta-wrapper {  
      margin-top: 0;   
    }

    /* Desktop: Button zentrieren oberhalb 900px */
    @media (min-width: 901px) {
      .hero__name-container {
        align-items: center;
      }
      
      .hero__cta-wrapper {
        display: flex;
        justify-content: center;
        width: 100%;
      }
    }

    .hero__name {
      margin: 0;
      line-height: 1.1;
      font-size: 90px;
      color: var(--color-text-primary);
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .hero__title {
      color: var(--color-accent-secondary);
      font-size: 54px;
      margin: 0;
      line-height: 1.1;
      font-weight: 400;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .hero__cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 165px;
      height: 50px;
      border-radius: 10px;
      background-color: var(--color-accent-primary);
      color: white;
      font-size: 16px;
      font-weight: 700;
      /* Center the footer content when scroll text is hidden */
      justify-content: center;
      text-decoration: none;
      transition: all 0.3s ease;
      position: relative;
      z-index: 35;
    }

    .hero__cta:hover {
      transform: scale(1.05);
      background-color: var(--color-accent-secondary);
    }

    .hero__footer {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      max-width: var(--max-content-width);
      margin: 0 auto;
      padding: 0 60px;
      box-sizing: border-box;
      height: 10%;
      z-index: 20;
      margin-top: auto;
      position: relative;
      flex-shrink: 0;
      overflow: visible !important;
    }

    @media (max-width: 1024px) {
      .hero__footer {
        padding: 0 calc(var(--content-padding-tablet) - 3rem);
      }
    }

    @media (max-width: 768px) {
      .hero__footer {
        padding: 0 calc(var(--content-padding-mobile) - 1.5rem);
      }
    }


    .hero__social {
      display: flex;
      align-items: center;
      gap: 20px;
      position: relative;
      z-index: 10;
      flex-shrink: 0;
      
      /* Linie DIREKT bei Social Links - geht unendlich nach links */
      &::before {
        content: '';
        position: absolute;
        left: -99999px;
        top: 50%;
        transform: translateY(-50%);
        width: 99999px;
        height: 4px;
        background-color: var(--color-accent-secondary);
        z-index: 1;
      }
    }

    .hero__social-link {
      display: inline-block;
    }

    .hero__social-link:hover img {
      filter: brightness(0) saturate(100%) invert(76%) sepia(15%) saturate(4614%) hue-rotate(71deg) brightness(102%) contrast(101%);
    }

    .hero__email {
      margin-left: 1rem;
      font-size: 23px;
      color: var(--color-text-primary);
      cursor: pointer;
    }

    .hero__email:hover {
      color: var(--color-accent-primary);
    }

    .hero__scroll {
      transform: rotate(90deg);
      color: var(--color-text-primary);
      font-size: 16px;
      transition: color 0.3s ease;
      position: absolute;
      right: 0;
      bottom: 50px;
      width: 200px;
      display: block;
      z-index: 100;
    }

    .hero__scroll:hover {
      color: var(--color-accent-primary);
    }

    /* Hide scroll text when zoomed out below 100% */
    @media screen and (max-resolution: 95dpi) {
      .hero__scroll {
        display: none;
      }
    }

    /* Hide on smaller screens */
    @media (max-width: 1100px) {
      .hero__scroll {
        display: none;
      }
    }

    .hero__notification {
      position: fixed;
      bottom: -100%;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.8);
      padding: 1rem 2rem;
      border-radius: 10px;
      color: var(--color-text-primary);
      transition: bottom 0.3s ease;
      z-index: 100;
    }

    .hero__notification--visible {
      bottom: 2rem;
    }

    /* iPad specific footer positioning */
    @media (min-width: 990px) and (max-width: 1080px) and (min-height: 990px) and (max-height: 1080px) {
      .hero__footer {
        padding-bottom: 150px;
        margin-bottom: -50px;
      }
    }

    @media (max-width: 1300px) {
      .hero__content {
        padding-right: 20px;
      }
      
      .hero{
        height: 100vh;
      }
        
      .hero__footer {
      padding: 0 50px;
      }
 
      .hero__image {
        height:450px;
        object-fit: contain;
        padding-top:30px;
        position: relative;
        z-index: 3;
      }

      .hero__name {
        font-size: 90px;
      }
 .hero__desktop-vector {
      position: absolute !important;
      left: -1% !important;
      bottom: 10% !important;   
      width: 132% !important;
      top: 45%; 
      height: 99% !important;
      pointer-events: none !important;
      z-index: 5 !important;
      transform: rotate(-2deg) !important;
    }


      .hero__title { 
        font-size: 48px;
      }
    }


    @media (max-width: 1800px) {
      
      
      .hero{
        height: 100vh;
      }
      
      .hero__image {
        height:450px;
        object-fit: contain;
        padding-top:30px;
        position: relative;
        z-index: 3;
      }

    
 .hero__desktop-vector {
      position: absolute !important;
      left: -1% !important;
      bottom: 10% !important;   
      width: 132% !important;
      top: 41%; 
      height: 75% !important;
      pointer-events: none !important;
      z-index: 5 !important;
      transform: rotate(-2deg) !important;
    }
    }


        @media (max-width: 2400px) {
      
      
      .hero{
        height: 100vh;
      }
      
      .hero__image {
        height:500px;
        object-fit: contain;
        padding-top:30px;
        position: relative;
        z-index: 3;
      }

    
 .hero__desktop-vector {
      position: absolute !important;
      left: -1% !important;
      bottom: 10% !important;   
      width: 132% !important;
      top: 43%; 
      height: 58% !important;
      pointer-events: none !important;
      z-index: 5 !important;
      transform: rotate(-2deg) !important;
    }
    }
    @media (max-width: 1200px) {
      .hero__name {
        font-size: 70px;
      }

      .hero__desktop-vector { 
      position: absolute !important;
      left: -4% !important;
      bottom: 1% !important;   
      width: 132% !important;
      top: 45%; 
      height: 75% !important;
      pointer-events: none !important;
      z-index: 5 !important;
      transform: rotate(-2deg) !important;
    } 

    
      .hero__title {
        font-size: 48px;
      }

      .hero__intro-text {
        font-size: 45px;
      }

      .hero__title {
        font-size: 43px;
      }
    }

    @media (max-width: 1000px) {
      .hero__name {
        font-size: 60px;
      }

      .hero__desktop-vector{
        position: absolute !important;
        left: -4% !important;
        bottom: 15% !important;   
        width: 132% !important;
        top: 50%; 
        height: 70% !important;
        pointer-events: none !important;
        z-index: 5 !important;
        transform: rotate(-2deg) !important;
      }

      .hero__text-wrapper {
        margin-left:-132px;
      }

      .hero__title {
        font-size: 48px;
      }

      .hero__title {
        font-size: 38px;
      }
    }
 
    @media (max-width: 900px) {
      /* Hide desktop vector shape */
      .hero__desktop-vector {
        display: none;
      }

      /* Show mobile vector shape - positioned more to the left */
      .hero__mobile-vector {
        display: flex;
        position: absolute !important;
        bottom: -50px !important;
        left: -130px !important;
        width: 50% !important;
        z-index: 10 !important;
      }
      
      .hero {
        height: 100vh !important;
        padding-bottom: 0;
        position: relative;
        display: flex;
        flex-direction: column;
        padding-top: 40px;
      }

      .hero__name { 
        font-size: 55px;
        white-space: normal;
      }

      .hero__title {
        font-size: 28px;
        white-space: normal;
      }

      .hero__cta {
        font-size: 16px;
      }

      .hero__cta-wrapper {
        margin-top: 10px;
      }

      .hero__content {
        flex-direction: column;
        padding: 0px;
        gap: 0rem; 
        margin-top: 2px;
        flex: 1;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 50;
      }

      .hero__left-container {
        width: 100%;
        order: 1;
        flex-shrink: 0;
        margin-top: 0;
        position: relative;
        z-index: 2;
      }

      .hero__text-wrapper {
        width: 100%;
        order: 2; 
        flex-shrink: 0;
        margin-left: 0; 
        flex-direction: column; 
        align-items: center;
        text-align: center;
        gap: 0rem;
        position: relative;
        z-index: 100; 
        margin-top: 0px; 
      }

      .hero__name-container {
        max-width: 100%; 
        max-height: none; 
        align-items: center;
        position: relative;
        z-index: 30;
      }

      .hero__intro-text {
        transform: none; 
        font-size: 24px;
        position: relative;
        z-index: 30;
      }

      .hero__image {
        height: 360px;
        max-width: 100%;
        object-fit: contain;
        padding-top:30px;
        position: relative;
        z-index: 3;
      }

      .hero__image-shadow {
        left: 50%;
        top: 56%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
      }

      .hero__footer {
        position: relative;
        bottom: 1%;      
        left: 10px;
        right: 10px;
        padding: 0 20px;
        height: 18%;
        background-color: transparent;
        backdrop-filter: none;
        z-index: 10;
        top:-1%;
        margin-top: 5%;
        flex-shrink: 0;
        margin-bottom: -10%;
      }

      .hero__email {
        display: none;
      }

      /* Mobile Linie Anpassung - Links ausgerichtet */
      .hero__line {
        width: 50px !important;
      }

      .hero__line-container {
        width: 50px !important;
        margin-right: 10px !important;
      }

      .hero__social {
        margin-left: 10px !important;
      }
    }

    /* Spezielle Anpassung für Bereich 601px bis 900px */
    @media (max-width: 900px) and (min-width: 601px) {
      .hero__content {
        justify-content: center;
        padding-top: 0;
        gap: 0rem;
      }

      .hero__image {
        height: 380px; 
        object-fit: contain;
        padding-top:30px;
        position: relative;
        z-index: 3;
      }

      .hero__name {
        font-size: 48px;
      }

      .hero__title {
        font-size: 28px;
      }

      .hero__intro-text {
        font-size: 20px;
      }
    }

    @media (max-width: 600px) {
      .hero__content {
        justify-content: center;
        padding-top: 0;
        gap: 0rem;
      }

      .hero__name {
        font-size: 50px;
      }

      .hero__title {
        font-size: 24px;
      }

      .hero__intro-text {
        font-size: 24px;
      }

      .hero__image {
        height: 380px; 
        object-fit: contain;
        padding-top:30px;
        position: relative;
        z-index: 3;
      }

      .hero__mobile-vector {
        width: 220%;
        max-width: none;
        height: 80px;
        bottom: -50px;
        left: -60%;
        transform: translate(0, 0) rotate(3deg);
      }
    }

    /* Spezifischer Fix für 584x748 Auflösung */
    @media (min-width: 580px) and (max-width: 590px) and (min-height: 740px) and (max-height: 750px) {
      .hero__content {
        padding-top:11%;
      }
    }

    /* Spezifischer Fix für 312x739px Auflösung */
    @media (min-width: 310px) and (max-width: 320px) and (min-height: 735px) and (max-height: 745px) {
      .hero__content {
        padding-top: 30%;
        padding-bottom:30%;
      }
    }

    /* Spezifischer Fix für iPad 990x1080 - Vector Shape höher positionieren */
    @media (max-width: 450px) {
      .hero__content {
        justify-content: center;
        padding-top: 0;
        gap: 0rem;
      }

      .hero__name {
        font-size: 48px;
      }

      .hero__title {
        font-size: 29px;
      }

      .hero__intro-text {
        font-size: 28px;
      }

      .hero__image {
        height: 300px;
        object-fit: contain;
        padding-top:30px;
        position: relative;
        z-index: 3;
      }
      
      .hero__mobile-vector {
        width: 171%;
        max-width: none;
        height: 80px;
        bottom: -40px;
        left: -75%;
        transform: translate(20%, 0) rotate(4deg);
      }
    }

    @media (max-width: 350px) {
      .hero__name {
        font-size: 33px;
      }

      .hero__title {
        font-size: 20px;
      }

      .hero__intro-text {
        font-size: 20px;
      }

      .hero__image {
        object-fit: contain;
        padding-top:30px;
        position: relative;
        z-index: 3;
      }

      .hero__line {
        width: 50px !important;
        right: 0px !important;
        margin-right: 0px !important;
      }
      
      .hero__line-container {
        width: 50px !important;
      }
    }

    @media (max-width: 300px) {
      .hero__name {
        font-size: 32px;
      }

      .hero__title {
        font-size: 16px;
        font-size: 20px;
      }

      .hero__intro-text {
        font-size: 16px;
      }
      
      .hero__content {
        justify-content: center;
        padding-top: 0;
        gap: 0rem;
      }

      .hero__image {
        height: 250px;
        object-fit: contain;
        padding-top:30px;
        position: relative;
        z-index: 3;
      }
      
      .hero__cta {
        width: 120px;
        height: 40px;
        font-size: 14px;
      }

      .hero__content {
        padding: 10px;
      }

      .hero__mobile-vector {
        width: 280%;
        max-width: none;
        height: 70px;
        bottom: -30px;
        left: -95%;
        transform: translate(25%, 0) rotate(5deg);
      }
      
      .hero__content {
        justify-content: center;
        padding-top: 0;
        gap: 0rem;
      }
      
      .hero__line {
        width: 30px !important;
      }
      
      .hero__line-container {
        width: 30px !important;
        margin-right: 10px !important;
      }

      .hero__social {
        margin-left: 10px !important;
      }
    }

    /* FIX FÜR HOHE BILDSCHIRME - Vector Shape höher positionieren */
    /* Für hohe Bildschirme ab 1200px Höhe */
    @media (min-width: 901px) and (min-height: 1200px) {
      .hero__desktop-vector {
        position: absolute !important;
        left: -5% !important;
        bottom: 1% !important;   
        width: 175% !important;
        top: 31% !important;  /* Höher positioniert - war 36% */
        height: 70% !important;  /* Höhere Höhe für bessere Abdeckung */
        pointer-events: none !important;
        z-index: 5 !important;
        transform: rotate(-3deg) !important;
      }
    }

    /* Für sehr hohe Bildschirme über 1500px Höhe */
    @media (min-width: 901px) and (min-height: 1500px) {
      .hero__desktop-vector {
        top: 36% !important;  /* Noch höher für sehr große Bildschirme */
        height: 55% !important;
      }
    }

    /* Für ultra-hohe Bildschirme über 2000px Höhe */
    @media (min-width: 901px) and (min-height: 2000px) {
      .hero__desktop-vector {
        top: 36% !important;  /* Maximal hoch für ultra-große Bildschirme */
        height: 50% !important;
      }
    }

    /* Für extrem hohe Bildschirme über 3000px Höhe */
    @media (min-width: 901px) and (min-height: 3000px) {
      .hero__desktop-vector {
        top: 35% !important;  /* Höchste Position für extreme Bildschirme */
        height: 55% !important;
      }
    }

    /* FIX FÜR DAS HERO-BILD BEI HOHEN BILDSCHIRMEN */
    /* Zusätzliche Media Queries für das Hero-Bild bei hohen Y-Achsen */

    /* Für Bildschirme zwischen 1500px und 2000px Höhe */
    @media (min-width: 901px) and (min-height: 1500px) and (max-height: 1999px) {
      .hero__image {
        height: 520px !important; /* Größeres Bild */
        padding-top: 20px !important;
        margin-top: 20px !important;
      }
      
      .hero__left-container {
        margin-top: 40px !important;
      }
      
      .hero__content {
        gap: 4rem !important; /* Weniger Gap zwischen Bild und Text */
      }
    }

    /* Für Bildschirme zwischen 2000px und 2500px Höhe */
    @media (min-width: 901px) and (min-height: 2000px) and (max-height: 2499px) {
      .hero__image {
        height: 580px !important; /* Noch größeres Bild */
        padding-top: 15px !important;
        margin-top: 30px !important;
      }
      
      .hero__left-container {
        margin-top: 60px !important;
      }
      
      .hero__content {
        gap: 3.5rem !important;
      }
    }

    /* Für Bildschirme zwischen 2500px und 3000px Höhe */
    @media (min-width: 901px) and (min-height: 2500px) and (max-height: 2999px) {
      .hero__image {
        height: 650px !important; /* Maximale Bildgröße */
        padding-top: 10px !important;
        margin-top: 40px !important;
      }
      
      .hero__left-container {
        margin-top: 80px !important;
      }
      
      .hero__content {
        gap: 3rem !important;
      }
      
      .hero__image-shadow {
        top: 52% !important; /* Schatten anpassen */
      }
    }

    /* Für sehr hohe Bildschirme über 3000px */
    @media (min-width: 901px) and (min-height: 3000px) {
      .hero__image {
        height: 720px !important; /* Extra große Bildgröße */
        padding-top: 5px !important;
        margin-top: 50px !important;
      }
      
      .hero__left-container {
        margin-top: 100px !important;
      }
      
      .hero__content {
        gap: 2.5rem !important;
      }
      
      .hero__image-shadow {
        top: 50% !important;
      }
    }

    /* Alternative Lösung: Content besser verteilen */
    @media (min-width: 901px) and (min-height: 1800px) {
      .hero__content {
        justify-content: space-between !important;
        align-items: stretch !important;
        padding-top: 2% !important;
        padding-bottom: 2% !important;
      }
    }

    /* Spezifischer Fix für kleinere hohe Bildschirme */
    /* X-Achse um 1178px und Y-Achse um 1100px */
    @media (min-width: 1100px) and (max-width: 1250px) and (min-height: 1050px) and (max-height: 1150px) {
      .hero__image {
        height: 480px !important;
        margin-top: 60px !important;
        padding-top: 20px !important;
      }
      
      .hero__left-container {
        margin-top: 80px !important;
      }
      
      .hero__content {
        gap: 3.5rem !important;
        padding-top: 3% !important;
      }
      
      .hero__desktop-vector {
        top: 38% !important;
        height: 68% !important;
        left: -3% !important;
      }
    }

    /* MEDIA QUERIES FÜR Y-ACHSE ~600-700px (kleinere Höhen) */
    /* Für X-Achse 900px-1000px mit Y-Achse 600px-700px */
    @media (min-width: 900px) and (max-width: 1000px) and (min-height: 600px) and (max-height: 700px) {
      .hero__image {
        height: 320px !important;
        margin-top: 20px !important;
        padding-top: 35px !important;
      }
      
      .hero__left-container {
        margin-top: 40px !important;
      }
      
      .hero__content {
        gap: 5rem !important;
        padding-top: 5% !important;
        justify-content: center !important;
        align-items: center !important;
      }
      
      .hero__desktop-vector {
        top: 48% !important;
        height: 55% !important;
        left: -4.5% !important;
        transform: rotate(-1deg) !important;
      }
    }

    /* MEDIA QUERIES FÜR Y-ACHSE ~1000-1100px (mittlere Breite, höhere Höhe) */
    /* Für X-Achse 900px-1000px mit Y-Achse 1000px-1100px */
    @media (min-width: 900px) and (max-width: 1000px) and (min-height: 1000px) and (max-height: 1100px) {
      .hero__image {
        height: 450px !important;
        margin-top: 55px !important;
        padding-top: 20px !important;
      }
      
      .hero__left-container {
        margin-top: 75px !important;
      }
      
      .hero__content {
        gap: 3.8rem !important;
        padding-top: 3% !important;
        justify-content: center !important;
        align-items: center !important;
      }
      
      .hero__desktop-vector {
        top: 41% !important;
        height: 65% !important;
        left: -4.2% !important;
        transform: rotate(-2deg) !important;
      }
    }

    /* MEDIA QUERIES FÜR Y-ACHSE ~700-1000px (mittlere Auflösungen) */
    /* Für X-Achse 900px-1200px mit Y-Achse 700px-1000px */
    @media (min-width: 901px) and (max-width: 1200px) and (min-height: 700px) and (max-height: 1000px) {
      .hero__image {
        height: 420px !important;
        margin-top: 40px !important;
        padding-top: 25px !important;
      }
      
      .hero__left-container {
        margin-top: 65px !important;
      }
      
      .hero__content {
        gap: 4.2rem !important;
        padding-top: 3.5% !important;
        justify-content: center !important;
        align-items: center !important;
      }
      
      .hero__desktop-vector {
        top: 43% !important;
        height: 62% !important;
        left: -3.5% !important;
        transform: rotate(-2deg) !important;
      }
    }

    /* MEDIA QUERIES FÜR Y-ACHSE ~924px */
    /* Spezifisch für 1030x924px */
    @media (min-width: 1027px) and (max-width: 1033px) and (min-height: 920px) and (max-height: 928px) {
      .hero__image {
        height: 420px !important;
        margin-top: 45px !important;
        padding-top: 25px !important;
      }
      
      .hero__left-container {
        margin-top: 65px !important;
      }
      
      .hero__content {
        gap: 4.2rem !important;
        padding-top: 3.5% !important;
      }
      
      .hero__desktop-vector {
        top: 42% !important;
        height: 62% !important;
        left: -3.5% !important;
      }
    }

    /* MEDIA QUERIES FÜR Y-ACHSE ~1106px */
    /* Spezifisch für 945x1106px */
    @media (min-width: 942px) and (max-width: 948px) and (min-height: 1103px) and (max-height: 1110px) {
      .hero__image {
        height: 485px !important;
        margin-top: 63px !important;
        padding-top: 18px !important;
      }
      
      .hero__left-container {
        margin-top: 83px !important;
      }
      
      .hero__content {
        gap: 3.4rem !important;
        padding-top: 2.6% !important;
      }
      
      .hero__desktop-vector {
        top: 39.8% !important;
        height: 68.5% !important;
        left: -3.9% !important;
      }
    }

    /* Spezifisch für 900-979px x 1106px */
    @media (min-width: 900px) and (max-width: 979px) and (min-height: 1103px) and (max-height: 1110px) {
      .hero__image {
        height: 480px !important;
        margin-top: 62px !important;
        padding-top: 19px !important;
      }
      
      .hero__left-container {
        margin-top: 82px !important;
      }
      
      .hero__content {
        gap: 3.5rem !important;
        padding-top: 2.7% !important;
      }
      
      .hero__desktop-vector {
        top: 40% !important;
        height: 68% !important;
        left: -4.1% !important;
      }
    }

    /* Spezifisch für 1000-1094px x 1106px (FEHLENDE LÜCKE) */
    @media (min-width: 1000px) and (max-width: 1094px) and (min-height: 1103px) and (max-height: 1110px) {
      .hero__image {
        height: 488px !important;
        margin-top: 65px !important;
        padding-top: 17px !important;
      }
      
      .hero__left-container {
        margin-top: 85px !important;
      }
      
      .hero__content {
        gap: 3.3rem !important;
        padding-top: 2.5% !important;
      }
      
      .hero__desktop-vector {
        top: 39.5% !important;
        height: 68.8% !important;
        left: -3.2% !important;
      }
    }

    /* Spezifisch für 1098x1106px */
    @media (min-width: 1095px) and (max-width: 1101px) and (min-height: 1103px) and (max-height: 1110px) {
      .hero__image {
        height: 490px !important;
        margin-top: 66px !important;
        padding-top: 16px !important;
      }
      
      .hero__left-container {
        margin-top: 86px !important;
      }
      
      .hero__content {
        gap: 3.2rem !important;
        padding-top: 2.4% !important;
      }
      
      .hero__desktop-vector {
        top: 39.2% !important;
        height: 69% !important;
        left: -2.8% !important;
      }
    }

    /* MEDIA QUERIES FÜR Y-ACHSE ~2950px */
    /* Spezifisch für ~1980x2950px - erweitert und verbessert */
    @media (min-width: 1970px) and (max-width: 2010px) and (min-height: 2930px) and (max-height: 2970px) {
      .hero__image {
        height: 950px !important;
        margin-top: 120px !important;
        padding-top: 0px !important;
      }
      
      .hero__left-container {
        margin-top: 180px !important;
      }
      
      .hero__content {
        gap: 1.8rem !important;
        padding-top: 0.5% !important;
        padding-bottom: 0.5% !important;
        justify-content: center !important;
        align-items: center !important;
      }
      
      .hero__desktop-vector {
        top: 28% !important;
        height: 62% !important;
        left: -0.5% !important;
      }
      
      .hero__image-shadow {
        top: 48% !important;
      }
    }

    /* MEDIA QUERIES FÜR Y-ACHSE ~1094px */
    @media (min-width: 925px) and (max-width: 935px) and (min-height: 1090px) and (max-height: 1100px) {
      .hero__image {
        height: 460px !important;
        margin-top: 60px !important;
        padding-top: 20px !important;
      }
      
      .hero__left-container {
        margin-top: 80px !important;
      }
      
      .hero__content {
        gap: 3.3rem !important;
        padding-top: 2.8% !important;
      }
      
      .hero__desktop-vector {
        top: 40% !important;
        height: 67% !important;
        left: -4% !important;
      }
    }

    /* Spezifisch für 951x1094px */
    @media (min-width: 948px) and (max-width: 955px) and (min-height: 1090px) and (max-height: 1100px) {
      .hero__image {
        height: 465px !important;
        margin-top: 62px !important;
        padding-top: 19px !important;
      }
      
      .hero__left-container {
        margin-top: 82px !important;
      }
      
      .hero__content {
        gap: 3.25rem !important;
        padding-top: 2.7% !important;
      }
      
      .hero__desktop-vector {
        top: 39.5% !important;
        height: 68% !important;
        left: -3.8% !important;
      }
    }

    /* Spezifisch für 992x1094px */
    @media (min-width: 990px) and (max-width: 1000px) and (min-height: 1090px) and (max-height: 1100px) {
      .hero__image {
        height: 470px !important;
        margin-top: 65px !important;
        padding-top: 18px !important;
      }
      
      .hero__left-container {
        margin-top: 85px !important;
      }
      
      .hero__content {
        gap: 3.2rem !important;
        padding-top: 2.5% !important;
      }
      
      .hero__desktop-vector {
        top: 39% !important;
        height: 69% !important;
        left: -3.5% !important;
      }
    }

    /* Spezifisch für 1011x1094px */
    @media (min-width: 1008px) and (max-width: 1015px) and (min-height: 1090px) and (max-height: 1100px) {
      .hero__image {
        height: 475px !important;
        margin-top: 67px !important;
        padding-top: 17px !important;
      }
      
      .hero__left-container {
        margin-top: 87px !important;
      }
      
      .hero__content {
        gap: 3.1rem !important;
        padding-top: 2.3% !important;
      }
      
      .hero__desktop-vector {
        top: 38.5% !important;
        height: 70% !important;
        left: -3.2% !important;
      }
    }

    /* Spezifisch für 1070x1094px */
    @media (min-width: 1067px) and (max-width: 1074px) and (min-height: 1090px) and (max-height: 1100px) {
      .hero__image {
        height: 477px !important;
        margin-top: 68px !important;
        padding-top: 16px !important;
      }
      
      .hero__left-container {
        margin-top: 88px !important;
      }
      
      .hero__content {
        gap: 3.05rem !important;
        padding-top: 2.2% !important;
      }
      
      .hero__desktop-vector {
        top: 38.2% !important;
        height: 70.3% !important;
        left: -3.1% !important;
      }
    }

    /* Spezifisch für 1088x1094px */
    @media (min-width: 1085px) and (max-width: 1092px) and (min-height: 1090px) and (max-height: 1100px) {
      .hero__image {
        height: 478px !important;
        margin-top: 68px !important;
        padding-top: 16px !important;
      }
      
      .hero__left-container {
        margin-top: 88px !important;
      }
      
      .hero__content {
        gap: 3.0rem !important;
        padding-top: 2.2% !important;
      }
      
      .hero__desktop-vector {
        top: 38% !important;
        height: 70.5% !important;
        left: -3% !important;
      }
    }

    /* Erweiterte Abdeckung für ähnliche Auflösungen um 992px */
    @media (min-width: 980px) and (max-width: 1010px) and (min-height: 1000px) and (max-height: 1150px) {
      .hero__image {
        height: 465px !important;
        margin-top: 55px !important;
        padding-top: 22px !important;
      }
      
      .hero__left-container {
        margin-top: 75px !important;
      }
      
      .hero__content {
        gap: 3.8rem !important;
        justify-content: center !important;
        align-items: center !important;
      }
      
      .hero__desktop-vector {
        top: 40% !important;
        height: 66% !important;
        left: -3% !important;
      }
    }

    /* Erweiterte Abdeckung für ähnliche Auflösungen um 1300px */
    @media (min-width: 1300px) and (max-width: 1450px) and (min-height: 1000px) and (max-height: 1200px) {
      .hero__image {
        height: 480px !important;
        margin-top: 60px !important;
        padding-top: 20px !important;
      }
      
      .hero__left-container {
        margin-top: 80px !important;
      }
      
      .hero__content {
        gap: 3.5rem !important;
        justify-content: center !important;
        align-items: center !important;
      }
      
      .hero__desktop-vector {
        top: 38% !important;
        height: 68% !important;
        left: -2% !important;
      }
    }

    /* Für kleinere hohe Bildschirme */
    @media (min-width: 1100px) and (max-width: 1299px) and (min-height: 1000px) and (max-height: 1200px) {
      .hero__image {
        height: 460px !important;
        margin-top: 50px !important;
        padding-top: 25px !important;
      }
      
      .hero__left-container {
        margin-top: 70px !important;
      }
      
      .hero__content {
        gap: 4rem !important;
        justify-content: center !important;
        align-items: center !important;
      }
      
      .hero__desktop-vector {
        top: 40% !important;
        height: 65% !important;
        left: -2% !important;
      }
    }

    /* Spezifischer Fix für die größeren Pixel-Bereiche */
    /* X-Achse=1990 Pixel und Y-Achse zwischen 1868-2953 Pixel */
    @media (min-width: 1980px) and (max-width: 2000px) and (min-height: 1868px) and (max-height: 2953px) {
      .hero__image {
        height: 600px !important;
        margin-top: 50px !important;
        padding-top: 10px !important;
      }
      
      .hero__left-container {
        margin-top: 70px !important;
      }
      
      .hero__desktop-vector {
        top: 33% !important;
        height: 65% !important;
      }
    }

    /* FÜGE DIESE MEDIA QUERY IN DEINEN STYLES HINZU */
/* Spezifischer Fix für iPad Pro 1024x1366 */
@media (min-width: 1020px) and (max-width: 1030px) and (min-height: 1360px) and (max-height: 1370px) {
  .hero__image {
    height: 500px !important;
    margin-top: 100px !important;  /* Bild nach unten verschieben */
    padding-top: 40px !important;
  }
  
  .hero__left-container {
    margin-top: 120px !important;  /* Container nach unten */
  }
  
  .hero__content {
    gap: 3rem !important;
    padding-top: 8% !important;  /* Content mehr nach unten */
    justify-content: center !important;
  }
  
  .hero__desktop-vector {
    top: 46% !important;  /* Vector Shape höher positionieren */
    height: 60% !important;
    left: -2% !important;
    width: 140% !important;
  }
  
  .hero__image-shadow {
    top: 54% !important;
  }
}

/* Erweiterte Abdeckung für iPad Pro Bereich */
@media (min-width: 1000px) and (max-width: 1050px) and (min-height: 1300px) and (max-height: 1400px) {
  .hero__image {
    height: 490px !important;
    margin-top: 90px !important;
    padding-top: 35px !important;
  }
  
  .hero__left-container {
    margin-top: 110px !important;
  }
  
  .hero__content {
    gap: 3.2rem !important;
    padding-top: 6% !important;
  }
  
  .hero__desktop-vector {
    top: 45% !important;
    height: 62% !important;
    left: -2.5% !important;
  }
}

/* Alternative für leicht andere iPad Pro Auflösungen */
@media (min-width: 1024px) and (max-width: 1024px) and (min-height: 1366px) and (max-height: 1366px) {
  .hero__image {
    height: 495px !important;
    margin-top: 95px !important;
    padding-top: 38px !important;
  }
  
  .hero__left-container {
    margin-top: 115px !important;
  }
  
  .hero__content {
    gap: 3.1rem !important;
    padding-top: 7% !important;
    justify-content: center !important;
    align-items: center !important;
  }
  
  .hero__desktop-vector {
    top: 45.5% !important;
    height: 61% !important;
    left: -2.3% !important;
    width: 138% !important;
  }
  
  .hero__image-shadow {
    top: 53% !important;
  }
}
  `],
    animations: [fadeInLeft, fadeInUp]
})
export class HeroSectionComponent {
  constructor(public clipboardService: ClipboardManagerService) {}

  copyEmail(): void {
    this.clipboardService.copyToClipboard('milan.moreno.crea@gmail.com');
  }
}