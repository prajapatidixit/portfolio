import { Component } from '@angular/core';
import { FadeInDirective } from '../shared/fade-in.directive';
import { AnimatedTextComponent } from '../shared/animated-text.component';
import { ContactButtonComponent } from '../shared/buttons.component';

const BASE = 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [FadeInDirective, AnimatedTextComponent, ContactButtonComponent],
  template: `
    <section id="about" class="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
             style="background:#0C0C0C">
      @for (d of decor; track d.src) {
        <div appFadeIn [delay]="d.delay" [x]="d.x" [y]="0" [duration]="0.9" class="absolute {{ d.pos }} {{ d.w }}">
          <img [src]="d.src" alt="" class="w-full block" />
        </div>
      }

      <div class="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div class="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <h2 appFadeIn [delay]="0" [y]="40"
              class="hero-heading font-black uppercase leading-none tracking-tight text-center"
              style="font-size: clamp(3rem, 12vw, 160px)">About me</h2>
          <app-animated-text
            [text]="text"
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style="font-size: clamp(1rem, 2vw, 1.35rem)" />
        </div>
        <app-contact-button />
      </div>
    </section>
  `,
})
export class AboutSectionComponent {
  text = "With more than nine years of experience in frontend development, i focus on Angular, responsive interfaces, and web3 payment products, i truly enjoy working with teams that care about clean code and a polished user experience. Let's build something great together!";
  decor = [
    { src: BASE + 'moon_icon.11395d36.png', delay: 0.1, x: -80, w: 'w-[120px] sm:w-[160px] md:w-[210px]', pos: 'top-[4%] left-[1%] sm:left-[2%] md:left-[4%]' },
    { src: BASE + 'p59_1.4659672e.png', delay: 0.25, x: -80, w: 'w-[100px] sm:w-[140px] md:w-[180px]', pos: 'bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]' },
    { src: BASE + 'lego_icon-1.703bb594.png', delay: 0.15, x: 80, w: 'w-[120px] sm:w-[160px] md:w-[210px]', pos: 'top-[4%] right-[1%] sm:right-[2%] md:right-[4%]' },
    { src: BASE + 'Group_134-1.2e04f3ce.png', delay: 0.3, x: 80, w: 'w-[130px] sm:w-[170px] md:w-[220px]', pos: 'bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]' },
  ];
}
