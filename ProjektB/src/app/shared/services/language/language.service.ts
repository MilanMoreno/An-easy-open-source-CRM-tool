import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private STORAGE_KEY = 'selected_language';
  private defaultLanguage = 'en'; // Default language if none is stored

  private languageSubject = new BehaviorSubject<string>(this.getInitialLanguage());
  public currentLanguage$ = this.languageSubject.asObservable();

  constructor() { }

  private getInitialLanguage(): string {
    // Check if a language is stored in localStorage
    const savedLanguage = localStorage.getItem(this.STORAGE_KEY);
    return savedLanguage || this.defaultLanguage;
  }

  setLanguage(lang: string) {
    // Save selected language to localStorage
    localStorage.setItem(this.STORAGE_KEY, lang);
    // Update the BehaviorSubject to notify subscribers
    this.languageSubject.next(lang);
  }

  getCurrentLanguage(): string {
    return this.languageSubject.value;
  }
}
