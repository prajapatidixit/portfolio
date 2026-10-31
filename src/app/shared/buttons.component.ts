import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact-button',
  standalone: true,
  template: `
    <a [href]="href"
      class="inline-block rounded-full text-white font-medium uppercase tracking-widest cursor-pointer
             px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base"
      style="background: linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%);
             box-shadow: 0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset;
             outline: 2px solid white; outline-offset: -3px; text-decoration: none;">
      Contact Me
    </a>
  `,
})
export class ContactButtonComponent {
  @Input() href = 'mailto:prajapatidixit35@gmail.com';
}

@Component({
  selector: 'app-live-project-button',
  standalone: true,
  template: `
    <a [href]="href" target="_blank" rel="noopener noreferrer"
      class="inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest
             cursor-pointer transition-colors duration-200 hover:bg-[#D7E2EA]/10
             px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base"
      style="text-decoration: none">
      Live Project
    </a>
  `,
})
export class LiveProjectButtonComponent {
  @Input() href = '#';
}
