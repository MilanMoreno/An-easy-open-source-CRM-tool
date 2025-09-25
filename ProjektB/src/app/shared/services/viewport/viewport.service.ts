import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewportObserverService {
  constructor(private ngZone: NgZone) {}

  observeElement(element: HTMLElement, threshold: number = 0.1): Observable<boolean> {
    return new Observable(subscriber => {
      const observer = new IntersectionObserver(
        entries => {
          this.ngZone.run(() => {
            entries.forEach(entry => subscriber.next(entry.isIntersecting));
          });
        },
        { threshold }
      );

      observer.observe(element);

      return () => observer.disconnect();
    });
  }
}