import { trigger, state, style, transition, animate } from '@angular/animations';

export const slideInOutLeft = trigger('slideInOutLeft', [
  state('void', style({
    transform: 'translateX(-100%)',
    opacity: 0
  })),
  state('in', style({
    transform: 'translateX(0)',
    opacity: 1
  })),
  state('out', style({
    transform: 'translateX(-100%)',
    opacity: 0
  })),
  transition('void => in', [
    animate('0.5s ease-in')
  ]),
  transition('in => out', [
    animate('0.5s ease-out')
  ]),
  transition('out => in', [
    animate('0.5s ease-in')
  ])
]);

export const slideInOutRight = trigger('slideInOutRight', [
  state('void', style({
    transform: 'translateX(100%)',
    opacity: 0
  })),
  state('in', style({
    transform: 'translateX(0)',
    opacity: 1
  })),
  state('out', style({
    transform: 'translateX(100%)',
    opacity: 0
  })),
  transition('void => in', [
    animate('0.5s ease-in')
  ]),
  transition('in => out', [
    animate('0.5s ease-out')
  ]),
  transition('out => in', [
    animate('0.5s ease-in')
  ])
]);

export const slideInFromBottom = trigger('slideInFromBottom', [
  state('void', style({
    transform: 'translateY(100%)',
    opacity: 0
  })),
  state('in', style({
    transform: 'translateY(0)',
    opacity: 1
  })),
  state('out', style({
    transform: 'translateY(100%)',
    opacity: 0
  })),
  transition('void => in', [
    animate('0.5s ease-in')
  ]),
  transition('in => out', [
    animate('0.5s ease-out')
  ]),
  transition('out => in', [
    animate('0.5s ease-in')
  ])
]);
