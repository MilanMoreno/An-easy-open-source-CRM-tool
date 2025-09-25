import { Component, ElementRef, ViewChild } from '@angular/core';
import { ClipboardManagerService } from '../../../../shared/services/clipboard/clipboard.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-footer',
    imports: [CommonModule, TranslateModule, RouterModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {

  @ViewChild('copyAlert', { static: false }) copyAlert!: ElementRef;

  constructor(private clipboardService: ClipboardManagerService) {}

  copyText() {
    const textToCopy = 'milan.moreno.crea@gmail.com';
    this.clipboardService.copyToClipboard(textToCopy); // Assuming the service method doesn't need the copyAlert elementRef anymore based on the service code read earlier. If it does, this might need adjustment.
  }
}
