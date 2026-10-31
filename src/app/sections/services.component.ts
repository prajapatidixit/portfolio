import { Component } from '@angular/core';
import { FadeInDirective } from '../shared/fade-in.directive';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [FadeInDirective],
  template: `
    <section id="services" class="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <h2 class="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style="color:#0C0C0C; font-size: clamp(3rem, 12vw, 160px); line-height:1">Services</h2>
      <div class="max-w-5xl mx-auto">
        @for (s of services; track s.name; let i = $index) {
          <div appFadeIn [delay]="i * 0.1"
               class="flex items-start gap-6 sm:gap-10 md:gap-16 py-8 sm:py-10 md:py-12"
               [style.border-top]="i === 0 ? 'none' : '1px solid rgba(12, 12, 12, 0.15)'"
               style="color:#0C0C0C">
            <span class="font-black leading-none" style="font-size: clamp(3rem, 10vw, 140px)">0{{ i + 1 }}</span>
            <div class="flex flex-col gap-3">
              <h3 class="font-medium uppercase" style="font-size: clamp(1rem, 2.2vw, 2.1rem)">{{ s.name }}</h3>
              <p class="font-light leading-relaxed max-w-2xl" style="font-size: clamp(0.85rem, 1.6vw, 1.25rem); opacity:0.6">{{ s.desc }}</p>
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class ServicesSectionComponent {
  services = [
    { name: 'Angular Development', desc: 'Component-based Angular and TypeScript interfaces that stay maintainable as the product grows, with clean structure and REST API integration.' },
    { name: 'Responsive UI', desc: 'Pixel-accurate, mobile-first layouts in semantic HTML, CSS/SCSS and Bootstrap that hold up across browsers and screen sizes.' },
    { name: 'Web3 Interfaces', desc: 'Wallet connections, transaction flows and real-time status updates for blockchain and crypto payment platforms.' },
    { name: 'Performance', desc: 'Page load optimization, DOM performance, debugging and cross-browser fixes that keep live products fast and stable.' },
    { name: 'Design Handoff', desc: 'Turning Figma, Adobe XD and Photoshop designs into production UI, and running sprint demos and sign-offs with clients.' },
  ];
}
