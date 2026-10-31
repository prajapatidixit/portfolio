import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

/** Equivalent of the Framer Motion FadeIn wrapper: whileInView, once, margin 50px. */
@Directive({ selector: '[appFadeIn]', standalone: true })
export class FadeInDirective implements OnInit, OnDestroy {
  @Input() delay = 0;
  @Input() duration = 0.7;
  @Input() x = 0;
  @Input() y = 30;

  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private io?: IntersectionObserver;

  ngOnInit() {
    const s = this.el.style;
    this.el.setAttribute('data-fade', '');
    s.opacity = '0';
    s.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
    s.willChange = 'transform, opacity';

    this.io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        s.transition =
          `opacity ${this.duration}s cubic-bezier(0.25,0.1,0.25,1) ${this.delay}s, ` +
          `transform ${this.duration}s cubic-bezier(0.25,0.1,0.25,1) ${this.delay}s`;
        s.opacity = '1';
        s.transform = 'translate3d(0,0,0)';
        this.io?.disconnect(); // once: true
      },
      { rootMargin: '50px', threshold: 0 },
    );
    this.io.observe(this.el);
  }

  ngOnDestroy() { this.io?.disconnect(); }
}
