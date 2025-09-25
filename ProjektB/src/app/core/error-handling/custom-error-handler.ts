import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    // Check if this is the specific LockManager error from Supabase
    if (this.isSupabaseLockManagerError(error)) {
      // Silently handle the LockManager error - this is expected behavior
      return;
    }

    // For all other errors, use the default error handling
    console.error('An error occurred:', error);
  }

  private isSupabaseLockManagerError(error: any): boolean {
    // Handle various error formats
    let errorMessage = '';
    
    if (error?.message) {
      errorMessage = error.message;
    } else if (error?.toString) {
      errorMessage = error.toString();
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    // Check for various LockManager error patterns
    return errorMessage.includes('Navigator LockManager lock') ||
           errorMessage.includes('LockManager lock') ||
           errorMessage.includes('lock:sb-') ||
           errorMessage.includes('auth-token') ||
           errorMessage.includes('immediately failed') ||
           errorMessage.includes('Acquiring an exclusive') ||
           (errorMessage.includes('lock') && errorMessage.includes('sb-')) ||
           (errorMessage.includes('exclusive') && errorMessage.includes('lock')) ||
           (error?.name === 'Error' && errorMessage.includes('lock'));
  }
}