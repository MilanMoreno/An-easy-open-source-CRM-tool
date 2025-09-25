import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Prevent browser from logging benign Supabase LockManager errors
window.addEventListener('error', (event) => {
  const errorMessage = event.error?.message || event.message || '';
  
  // Check if this is the benign Supabase LockManager error
  if (errorMessage.includes('Navigator LockManager lock') ||
      errorMessage.includes('LockManager lock') ||
      errorMessage.includes('lock:sb-') ||
      errorMessage.includes('auth-token') ||
      errorMessage.includes('Acquiring an exclusive') ||
      errorMessage.includes('immediately failed') ||
      (errorMessage.includes('lock') && errorMessage.includes('sb-'))) {
    // Prevent the browser from logging this error
    event.preventDefault();
    // Also prevent further propagation
    event.stopPropagation();
    event.stopImmediatePropagation();
  }
});

window.addEventListener('unhandledrejection', (event) => {
  const errorMessage = event.reason?.message || event.reason?.toString() || '';
  
  // Check if this is the benign Supabase LockManager error
  if (errorMessage.includes('Navigator LockManager lock') ||
      errorMessage.includes('LockManager lock') ||
      errorMessage.includes('lock:sb-') ||
      errorMessage.includes('auth-token') ||
      errorMessage.includes('Acquiring an exclusive') ||
      errorMessage.includes('immediately failed') ||
      (errorMessage.includes('lock') && errorMessage.includes('sb-'))) {
    // Prevent the browser from logging this error
    event.preventDefault();
    // Also prevent further propagation
    event.stopPropagation();
    event.stopImmediatePropagation();
  }
});

// Override console.error temporarily to catch any remaining instances
const originalConsoleError = console.error;
console.error = function(...args) {
  const message = args.join(' ');
  
  // Check if this is the benign Supabase LockManager error
  if (message.includes('Navigator LockManager lock') ||
      message.includes('LockManager lock') ||
      message.includes('lock:sb-') ||
      message.includes('auth-token') ||
      message.includes('Acquiring an exclusive') ||
      message.includes('immediately failed') ||
      (message.includes('lock') && message.includes('sb-'))) {
    // Silently ignore this error
    return;
  }
  
  // For all other errors, use the original console.error
  originalConsoleError.apply(console, args);
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
