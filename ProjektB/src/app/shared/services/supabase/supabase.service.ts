import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  async submitContactForm(formData: {
    name: string;
    email: string;
    message: string;
  }) {
    try {
      console.log('📧 Starting contact form submission...', formData);
      
      // Use the correct table name: contact_requests_simple
      const { data, error } = await this.supabase
        .from('contact_requests_simple')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message
          }
        ])
        .select();

      if (error) {
        console.error('❌ Supabase database error:', error);
        throw error;
      }

      console.log('✅ Contact form data successfully saved to database:', data);

      // Optional: Call edge function to send email notification
      try {
        const { data: emailData, error: emailError } = await this.supabase.functions.invoke('send-email', {
          body: {
            to: 'milan.moreno.crea@gmail.com',
            subject: `New Contact Form Submission from ${formData.name}`,
            name: formData.name,
            email: formData.email,
            message: formData.message
          }
        });
        
        if (emailError) {
          console.warn('⚠️ Email sending failed, but form data was saved:', emailError);
        } else {
          console.log('📨 Email notification sent successfully:', emailData);
        }
      } catch (emailError) {
        console.warn('⚠️ Email service unavailable, but form data was saved:', emailError);
      }

      return { success: true, data };
    } catch (error) {
      console.error('❌ Contact form submission failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : String(error) 
      };
    }
  }
}