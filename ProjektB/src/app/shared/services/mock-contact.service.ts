import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockContactService {
  private contacts: any[] = [];

  async submitContactForm(formData: {
    name: string;
    email: string;
    message: string;
  }) {
    try {
      console.log('Mock service: Submitting contact form:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a contact entry
      const contact = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: 'Contact Form Submission',
        processed: false,
        email_sent: false,
        created_at: new Date().toISOString()
      };
      
      // Store in memory (for demo purposes)
      this.contacts.push(contact);
      
      console.log('Mock service: Contact form submitted successfully');
      console.log('All contacts:', this.contacts);
      
      return { success: true, data: [contact] };
    } catch (error) {
      console.error('Mock service: Error submitting form:', error);
      return { 
        success: false, 
        error: 'Mock service error. Please try again.' 
      };
    }
  }

  // Method to get all contacts (for testing)
  getContacts() {
    return this.contacts;
  }

  // Method to clear contacts (for testing)
  clearContacts() {
    this.contacts = [];
  }
}
