import { AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, QueryList, ViewChildren, inject } from '@angular/core';

/** Character-by-character scroll reveal. Offset: ['start 0.8', 'end 0.2']. */
@Component({
  selector: 'app-animated-text',
  standalone: true,
  template: `
    <p #p [class]="className" [style]="style">
      @for (c of chars; track $index) {
        <span class="relative inline-block" style="white-space:pre-wrap">
          <span style="opacity:0">{{ c }}</span>
          <span #ch style="position:absolute; left:0; top:0; opacity:0.2; will-change:opacity">{{ c }}</span>
        </span>
      }
    </p>
  `,
})
export class AnimatedTextComponent implements AfterViewInit, OnDestroy {
  @Input() text = '';
  @Input() className = '';
  @Input() style = '';
  @ViewChildren('ch') spans!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('p') ps!: QueryList<ElementRef<HTMLElement>>;

  private zone = inject(NgZone);
  get chars() { return Array.from(this.text); }

  private update = () => {
    const p = this.ps.first?.nativeElement;
    if (!p) return;
    const r = p.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.min(1, Math.max(0, (0.8 * vh - r.top) / (0.6 * vh + r.height)));
    const n = this.spans.length;
    this.spans.forEach((ref, i) => {
      const t = Math.min(1, Math.max(0, (progress - i / n) / (1 / n)));
      ref.nativeElement.style.opacity = String(0.2 + 0.8 * t);
    });
  };

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.update, { passive: true });
      window.addEventListener('resize', this.update, { passive: true });
    });
    this.update();
  }
  ngOnDestroy() {
    window.removeEventListener('scroll', this.update);
    window.removeEventListener('resize', this.update);
  }
}
