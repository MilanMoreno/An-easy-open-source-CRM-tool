import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef, ViewChild, OnInit } from '@angular/core'; // Added OnInit
// Removed FormsModule, NgForm. Added ReactiveFormsModule, FormBuilder, FormGroup, Validators
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ViewportService } from '../../../../shared/services/viewport/viewport-service.service';
import { slideInOutLeft, slideInOutRight, slideInFromBottom } from '../../../../shared/animations/animations';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
@Component({
    selector: 'app-contact',
    // Added ReactiveFormsModule, removed FormsModule
    imports: [CommonModule, ReactiveFormsModule, TranslateModule, RouterModule],
    standalone: true, // Added standalone flag
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    animations: [
        slideInOutLeft,
        slideInOutRight,
        slideInFromBottom
    ]
})

export class ContactComponent implements OnInit, AfterViewInit, OnDestroy { // Implemented OnInit and OnDestroy
  slideIn = 'out';
  slideInRight = 'out';
  slideInBottom: string = 'out';
  private subscription: Subscription | undefined;
  contactForm!: FormGroup; // Added FormGroup property
  submitted = false; // Added submitted flag
  formSubmitted = false; // Added formSubmitted flag

  http = inject(HttpClient);

  @ViewChild('emailAlert', { static: false}) emailAlert!: ElementRef;

  constructor(
    private el: ElementRef,
    private viewportService: ViewportService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder // Injected FormBuilder
  ) { }

  // Removed contactData object
  // Removed mailTest property (assuming not needed with new logic)

  post = {
    // Keep existing endpoint for now, but it seems incorrect (LinkedIn profile?)
    // Consider changing this to your actual mail sending endpoint.
    endPoint: 'https://www.linkedin.com/in/milan-moreno-9a7482360/', // Placeholder - CHANGE THIS
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
      },
    },
  };

  ngOnInit() {
    // Initialize the reactive form
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      // Add privacyPolicy control with requiredTrue validator
      privacyPolicy: [false, Validators.requiredTrue]
    });
  }

  // Getter for easier access to form fields in the template
  get f() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.contactForm.invalid) {
      // Optionally trigger visual feedback for invalid fields if needed beyond CSS classes
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
      return;
    }

    // Form is valid, proceed with submission logic

    // Use the existing HTTP post logic, but with reactive form values
    this.http.post(this.post.endPoint, this.post.body(this.contactForm.value), this.post.options)
      .subscribe({
        next: (response) => {
          this.formSubmitted = true; // Show success feedback in template
          this.showSendingAlert(); // Show the visual alert animation
          this.resetFormAfterDelay();
        },
        error: (error) => {
          // Handle error - maybe show an error message to the user
          // For now, just log it. Consider adding user feedback.
        },
      });
  }

  resetFormAfterDelay() {
     // Formular zurücksetzen nach einer Weile
     setTimeout(() => {
      this.formSubmitted = false; // Hide success feedback
      this.submitted = false; // Reset submitted flag
      this.contactForm.reset();
      // Ensure checkbox is reset visually if needed
       this.contactForm.patchValue({ privacyPolicy: false });
    }, 3000); // Keep existing delay
  }


  ngAfterViewInit() {
    // Keep existing viewport observation logic
    this.subscription = this.viewportService.observeElement(this.el.nativeElement).subscribe(isIntersecting => {
      this.slideIn = isIntersecting ? 'in' : 'out';
      this.slideInRight = isIntersecting ? 'in' : 'out';
      this.slideInBottom = isIntersecting ? 'in' : 'out';
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  showSendingAlert() {
    this.emailAlert.nativeElement.classList.remove('d-none');
    setTimeout(() => this.emailAlert.nativeElement.classList.add('slide-in'), 100);
    setTimeout(() => {
      this.emailAlert.nativeElement.classList.remove('slide-in');
      this.emailAlert.nativeElement.classList.add('slide-out');
    }, 3000);
    setTimeout(() => {
      this.emailAlert.nativeElement.classList.remove('slide-out');
      this.emailAlert.nativeElement.classList.add('d-none');
    }, 3000);
  }
  }