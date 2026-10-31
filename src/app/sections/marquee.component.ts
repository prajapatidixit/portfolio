import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild, inject } from '@angular/core';

const GIFS = [
  'hero-space-voyage-preview-eECLH3Yc', 'hero-codenest-preview-Cgppc2qV', 'hero-vex-ventures-preview-BczMFIiw',
  'hero-stellar-ai-v2-preview-DjvxjG3C', 'hero-asme-preview-B_nGDnTP', 'hero-transform-data-preview-Cx5OU29N',
  'hero-vitara-preview-Cjz2QYyU', 'hero-terra-preview-BFjrCr7T', 'hero-skyelite-preview-DHaZIgUv',
  'hero-aethera-preview-DknSlcTa', 'hero-designpro-preview-D8c5_een', 'hero-stellar-ai-preview-D3HL6bw1',
  'hero-xportfolio-preview-D4A8maiC', 'hero-orbit-web3-preview-BXt4OttD', 'hero-nexora-preview-cx5HmUgo',
  'hero-evr-ventures-preview-DZxeVFEX', 'hero-planet-orbit-preview-DWAP8Z1P', 'hero-new-era-preview-CocuDUm9',
  'hero-wealth-preview-B70idl_u', 'hero-luminex-preview-CxOP7ce6', 'hero-celestia-preview-0yO3jXO8',
].map((n) => `https://motionsites.ai/assets/${n}.gif`);

const triple = (a: string[]) => [...a, ...a, ...a];

@Component({
  selector: 'app-marquee-section',
  standalone: true,
  template: `
    <section #section class="pt-24 sm:pt-32 md:pt-40 pb-10" style="background:#0C0C0C; overflow:hidden">
      <div class="flex flex-col gap-3">
        <div #row1 class="flex gap-3 w-max" style="will-change:transform">
          @for (src of row1Imgs; track $index) {
            <img [src]="src" loading="lazy" alt="" class="rounded-2xl object-cover shrink-0" style="width:420px; height:270px" />
          }
        </div>
        <div #row2 class="flex gap-3 w-max" style="will-change:transform">
          @for (src of row2Imgs; track $index) {
            <img [src]="src" loading="lazy" alt="" class="rounded-2xl object-cover shrink-0" style="width:420px; height:270px" />
          }
        </div>
      </div>
    </section>
  `,
})
export class MarqueeSectionComponent implements AfterViewInit, OnDestroy {
  row1Imgs = triple(GIFS.slice(0, 11));
  row2Imgs = triple(GIFS.slice(11));

  @ViewChild('section', { static: true }) section!: ElementRef<HTMLElement>;
  @ViewChild('row1', { static: true }) row1!: ElementRef<HTMLElement>;
  @ViewChild('row2', { static: true }) row2!: ElementRef<HTMLElement>;
  private zone = inject(NgZone);

  private update = () => {
    const top = this.section.nativeElement.getBoundingClientRect().top + window.scrollY;
    const offset = (window.scrollY - top + window.innerHeight) * 0.3;
    this.row1.nativeElement.style.transform = `translateX(${offset - 200}px)`;
    this.row2.nativeElement.style.transform = `translateX(${-(offset - 200)}px)`;
  };

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => window.addEventListener('scroll', this.update, { passive: true }));
    this.update();
  }
  ngOnDestroy() { window.removeEventListener('scroll', this.update); }
}
