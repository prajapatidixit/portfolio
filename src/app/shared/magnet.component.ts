import { Component, ElementRef, Input, NgZone, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';

@Component({
  selector: 'app-magnet',
  standalone: true,
  template: `
    <div #wrap style="display:inline-block; will-change:transform" [style.transition]="transition"
         [style.transform]="transform">
      <ng-content />
    </div>
  `,
})
export class MagnetComponent implements OnInit, OnDestroy {
  @Input() padding = 100;
  @Input() strength = 2;
  @Input() activeTransition = 'transform 0.3s ease-out';
  @Input() inactiveTransition = 'transform 0.6s ease-in-out';
  @Input() disabled = false;

  @ViewChild('wrap', { static: true }) wrap!: ElementRef<HTMLElement>;
  transform = 'translate3d(0,0,0)';
  transition = this.inactiveTransition;
  private zone = inject(NgZone);

  private onMove = (e: MouseEvent) => {
    if (this.disabled) return;
    const el = this.wrap.nativeElement;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = Math.abs(cx - e.clientX);
    const dy = Math.abs(cy - e.clientY);
    if (dx < r.width / 2 + this.padding && dy < r.height / 2 + this.padding) {
      el.style.transition = this.activeTransition;
      el.style.transform = `translate3d(${(e.clientX - cx) / this.strength}px, ${(e.clientY - cy) / this.strength}px, 0)`;
    } else {
      el.style.transition = this.inactiveTransition;
      el.style.transform = 'translate3d(0,0,0)';
    }
  };

  ngOnInit() {
    this.transition = this.inactiveTransition;
    this.zone.runOutsideAngular(() => window.addEventListener('mousemove', this.onMove));
  }
  ngOnDestroy() { window.removeEventListener('mousemove', this.onMove); }
}
