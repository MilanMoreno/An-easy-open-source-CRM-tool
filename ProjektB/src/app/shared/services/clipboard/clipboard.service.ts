import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClipboardManagerService {
  private copyStatusSubject = new BehaviorSubject<boolean>(false);
  copyStatus$: Observable<boolean> = this.copyStatusSubject.asObservable();

  async copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      this.copyStatusSubject.next(true);
      setTimeout(() => this.copyStatusSubject.next(false), 2000);
      return true;
    } catch (err) {
      console.error('Failed to copy text:', err);
      return false;
    }
  }
}