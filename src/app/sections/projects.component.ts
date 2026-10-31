import { AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, ViewChild, inject } from '@angular/core';
import { FadeInDirective } from '../shared/fade-in.directive';
import { LiveProjectButtonComponent, ContactButtonComponent } from '../shared/buttons.component';

interface Project {
  category: string;
  name: string;
  url: string;
  stack?: string;
  /** Optional screenshots: [leftTop, leftBottom, right]. Empty = gradient tiles. */
  images?: [string, string, string];
}

const HYPER = 'https://d2r466kukss8se.cloudfront.net';
const SWAMP = 'https://development.swamplord.pages.dev';
const MPCN = 'https://d3bbavc933zs3b.cloudfront.net';
const NODE = 'https://dkn9sz34bv91x.cloudfront.net';

/** Images are loaded directly from each live site. */
const PROJECTS: Project[] = [
  { category: 'Web3 Presale', name: 'Bitcoin Hyper', url: HYPER + '/',
    images: [HYPER + '/assets/images/webp/logo-white.webp', HYPER + '/assets/images/webp/bitcoin-hyper.webp', HYPER + '/assets/images/gif/tokenomics.gif'] },
  { category: 'Web3 Presale', name: 'Swamp Lord', url: SWAMP + '/',
    images: [SWAMP + '/assets/images/png/swamp-lord-logo.png', SWAMP + '/assets/images/png/tokenomics-donut.png', SWAMP + '/assets/images/webp/launchpad-meme.webp'] },
  { category: 'Web3 Membership', name: 'Manhattan Private Credit Network', url: MPCN + '/',
    images: [MPCN + '/assets/images/webp/mpcn-icon-1.webp', MPCN + '/assets/images/webp/chart.webp', MPCN + '/assets/images/webp/hero-token.webp'] },
  { category: 'Web3 Presale', name: 'Pepenode', url: NODE + '/',
    images: [NODE + '/assets/images/svg-icons/token.svg', NODE + '/assets/images/svg-icons/pepe-token.svg', NODE + '/assets/images/png/faq_laptop.png'] },
];

/** Earlier HTML/CSS sites, shown as links under the cards. */
const MORE_WORK = [
  { name: 'Lunya', url: 'https://lunya.co/' },
  { name: 'Sayyar', url: 'https://sayyar.com/en/' },
  { name: 'Zeus AI', url: 'https://zeus-ai.pages.dev/' },
  { name: 'Frogknox', url: 'https://frogknox.com/' },
  { name: 'Pepe Unchained', url: 'https://pepeunchained.com/en' },
];

const GRADIENTS = [
  ['#18011F', '#7621B0'],
  ['#7621B0', '#B600A8'],
  ['#B600A8', '#BE4C00'],
  ['#18011F', '#B600A8'],
  ['#7621B0', '#BE4C00'],
];

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [LiveProjectButtonComponent],
  template: `
    <div #container class="h-[85vh]">
      <div class="sticky top-24 md:top-32">
        <div #card
             class="relative rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8"
             style="background:#0C0C0C; transform-origin: top center; will-change: transform"
             [style.top.px]="index * 28">
          <div class="flex items-center justify-between gap-4 mb-4 sm:mb-6 text-[#D7E2EA]">
            <div class="flex items-center gap-4 sm:gap-8 min-w-0">
              <span class="font-black leading-none hero-heading" style="font-size: clamp(3rem, 10vw, 140px)">0{{ index + 1 }}</span>
              <div class="flex flex-col min-w-0">
                <span class="font-light uppercase tracking-wide opacity-60" style="font-size: clamp(0.75rem, 1.4vw, 1.1rem)">{{ project.category }}</span>
                <span class="font-medium uppercase leading-tight" style="font-size: clamp(0.95rem, 2vw, 1.9rem)">{{ project.name }}</span>
              </div>
            </div>
            <app-live-project-button class="hidden sm:block shrink-0" [href]="project.url" />
          </div>

          <div class="flex gap-3 items-stretch">
            <div class="flex flex-col gap-3" style="width:40%">
              @if (project.images) {
                <img [src]="project.images[0]" [alt]="project.name" loading="lazy" referrerpolicy="no-referrer" class="w-full object-contain p-6 sm:p-8 rounded-[40px] sm:rounded-[50px] md:rounded-[60px]" style="height: clamp(130px, 16vw, 230px)" [style.background]="g(160)" />
                <img [src]="project.images[1]" alt="" loading="lazy" referrerpolicy="no-referrer" class="w-full object-contain p-6 sm:p-8 rounded-[40px] sm:rounded-[50px] md:rounded-[60px]" style="height: clamp(160px, 22vw, 340px)" [style.background]="g(20)" />
              } @else {
                <div class="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] flex items-center justify-center p-4 text-center text-white/90 font-light break-all"
                     style="height: clamp(130px, 16vw, 230px); font-size: clamp(0.7rem, 1.3vw, 1.1rem)" [style.background]="g(160)">
                  {{ host }}
                </div>
                <div class="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] flex items-center justify-center p-4 text-center text-white/90 font-light uppercase tracking-wide"
                     style="height: clamp(160px, 22vw, 340px); font-size: clamp(0.7rem, 1.3vw, 1.1rem)" [style.background]="g(20)">
                  {{ project.stack }}
                </div>
              }
            </div>
            <div style="width:60%">
              @if (project.images) {
                <img [src]="project.images[2]" alt="" loading="lazy" referrerpolicy="no-referrer" class="w-full h-full object-contain p-6 sm:p-10 rounded-[40px] sm:rounded-[50px] md:rounded-[60px]" [style.background]="g(120)" />
              } @else {
                <div class="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] flex items-center justify-center p-4 text-center text-white font-black uppercase leading-none"
                     style="font-size: clamp(1.75rem, 6vw, 5.5rem)" [style.background]="g(120)">
                  {{ project.name }}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProjectCardComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) project!: Project;
  @Input() index = 0;
  @Input() total = 1;
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  @ViewChild('card', { static: true }) card!: ElementRef<HTMLElement>;
  private zone = inject(NgZone);

  get host() { return new URL(this.project.url).host; }
  g(angle: number) {
    const [a, b] = GRADIENTS[this.index % GRADIENTS.length];
    return `linear-gradient(${angle}deg, ${a}, ${b})`;
  }

  private update = () => {
    const targetScale = 1 - (this.total - 1 - this.index) * 0.03;
    const vh = window.innerHeight;
    const top = this.container.nativeElement.getBoundingClientRect().top;
    const p = Math.min(1, Math.max(0, (vh - top) / vh));
    this.card.nativeElement.style.transform = `scale(${1 + (targetScale - 1) * p})`;
  };

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => window.addEventListener('scroll', this.update, { passive: true }));
    this.update();
  }
  ngOnDestroy() { window.removeEventListener('scroll', this.update); }
}

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [FadeInDirective, ProjectCardComponent, ContactButtonComponent],
  template: `
    <section id="projects" class="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32"
             style="background:#0C0C0C">
      <h2 appFadeIn class="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
          style="font-size: clamp(3rem, 12vw, 160px)">Project</h2>
      @for (p of projects; track p.name; let i = $index) {
        <app-project-card [project]="p" [index]="i" [total]="projects.length" />
      }
      <div class="pb-20 sm:pb-28 flex flex-col items-center gap-6 text-center">
        <h3 appFadeIn class="text-[#D7E2EA] font-medium uppercase tracking-widest" style="font-size: clamp(0.9rem, 1.6vw, 1.25rem)">More websites</h3>
        <div appFadeIn [delay]="0.1" class="flex flex-wrap justify-center gap-3">
          @for (m of more; track m.name) {
            <a [href]="m.url" target="_blank" rel="noopener noreferrer"
               class="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-6 py-2.5 text-xs sm:text-sm transition-colors duration-200 hover:bg-[#D7E2EA]/10">{{ m.name }}</a>
          }
        </div>
      </div>
    </section>

    <section id="contact" class="relative z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-28 flex flex-col items-center gap-10 text-center"
             style="background:#0C0C0C">
      <h2 appFadeIn class="hero-heading font-black uppercase leading-none tracking-tight"
          style="font-size: clamp(3rem, 12vw, 160px)">Contact</h2>
      <div appFadeIn [delay]="0.1" class="flex flex-col gap-2 text-[#D7E2EA] font-light"
           style="font-size: clamp(1rem, 2vw, 1.5rem)">
        <a href="mailto:prajapatidixit35@gmail.com" class="hover:opacity-70 transition-opacity duration-200">prajapatidixit35&#64;gmail.com</a>
        <a href="tel:+919724678445" class="hover:opacity-70 transition-opacity duration-200">+91 97246 78445</a>
        <span>Ahmedabad, Gujarat</span>
      </div>
      <app-contact-button />
    </section>
  `,
})
export class ProjectsSectionComponent {
  projects = PROJECTS;
  more = MORE_WORK;
}
