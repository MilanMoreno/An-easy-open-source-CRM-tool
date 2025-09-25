import { 
  trigger, 
  state, 
  style, 
  transition, 
  animate 
} from '@angular/animations';

export const fadeInLeft = trigger('fadeInLeft', [
  state('void', style({
    transform: 'translateX(-100%)',
    opacity: 0
  })),
  state('visible', style({
    transform: 'translateX(0)',
    opacity: 1
  })),
  transition('void => visible', [
    animate('0.5s ease-out')
  ]),
  transition('visible => void', [
    animate('0.5s ease-in')
  ])
]);

export const fadeInRight = trigger('fadeInRight', [
  state('void', style({
    transform: 'translateX(100%)',
    opacity: 0
  })),
  state('visible', style({
    transform: 'translateX(0)',
    opacity: 1
  })),
  transition('void => visible', [
    animate('0.5s ease-out')
  ]),
  transition('visible => void', [
    animate('0.5s ease-in')
  ])
]);

export const fadeInUp = trigger('fadeInUp', [
  state('void', style({
    transform: 'translateY(30px)',
    opacity: 0
  })),
  state('visible', style({
    transform: 'translateY(0)',
    opacity: 1
  })),
  transition('void => visible', [
    animate('0.5s ease-out')
  ]),
  transition('visible => void', [
    animate('0.5s ease-in')
  ])
]);