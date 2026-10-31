import { Component } from '@angular/core';
import { HeroSectionComponent } from './sections/hero.component';
import { MarqueeSectionComponent } from './sections/marquee.component';
import { AboutSectionComponent } from './sections/about.component';
import { ServicesSectionComponent } from './sections/services.component';
import { ProjectsSectionComponent } from './sections/projects.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeroSectionComponent, MarqueeSectionComponent, AboutSectionComponent,
    ServicesSectionComponent, ProjectsSectionComponent,
  ],
  template: `
    <main style="background:#0C0C0C; overflow-x:clip">
      <app-hero-section />
      <app-marquee-section />
      <app-about-section />
      <app-services-section />
      <app-projects-section />
    </main>
  `,
})
export class AppComponent {}
