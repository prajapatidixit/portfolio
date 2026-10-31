import { Component } from '@angular/core';
import { FadeInDirective } from '../shared/fade-in.directive';
import { MagnetComponent } from '../shared/magnet.component';
import { ContactButtonComponent } from '../shared/buttons.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [FadeInDirective, MagnetComponent, ContactButtonComponent],
  template: `
    <section class="relative h-screen flex flex-col" style="overflow-x:clip; background:#0C0C0C">
      <nav appFadeIn [delay]="0" [y]="-20"
           class="relative z-20 flex justify-between px-6 md:px-10 pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
        @for (l of links; track l.label) {
          <a [href]="l.href" class="transition-opacity duration-200 hover:opacity-70">{{ l.label }}</a>
        }
      </nav>

      <div class="overflow-hidden">
        <h1 appFadeIn [delay]="0.15" [y]="40"
            class="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full
                   text-[13vw] sm:text-[14vw] md:text-[15vw] lg:text-[16vw] mt-6 sm:mt-4 md:-mt-5">Hi, i&apos;m dixit</h1>
      </div>

      <div class="flex-1"></div>

      <div class="relative z-20 flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
        <p appFadeIn [delay]="0.35" [y]="20"
           class="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
           style="font-size: clamp(0.75rem, 1.4vw, 1.5rem)">
          a frontend developer crafting fast, clean angular interfaces for web3 and the web
        </p>
        <div appFadeIn [delay]="0.5" [y]="20"><app-contact-button /></div>
      </div>

      <div class="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]
                  top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0">
        <div appFadeIn [delay]="0.6" [y]="30">
          <app-magnet [padding]="150" [strength]="3"
                      activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
            @if (portrait) {
              <img [src]="portrait" alt="Dixit Prajapati" class="w-full block" />
            } @else {
              <div class="w-full aspect-[4/5] rounded-t-[999px] flex items-center justify-center"
                   style="background: linear-gradient(160deg, #7621B0 0%, #B600A8 45%, #18011F 100%)">
                <span class="font-black text-white/90 text-[22vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] leading-none">DP</span>
              </div>
            }
          </app-magnet>
        </div>
      </div>
    </section>
  `,
})
export class HeroSectionComponent {
  links = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];
  /** Treated portrait lives in /public (Angular 18+). On Angular 17 move it to src/assets and use 'assets/portrait.webp'. */
  portrait = '/assets/portrait.webp';
}
