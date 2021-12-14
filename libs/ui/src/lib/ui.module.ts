import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { GalleryComponent } from './components/gallery/gallery.component';

import { ButtonModule } from "primeng/button";

@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [
    BannerComponent,
    GalleryComponent
  ],
  exports: [
    BannerComponent,
    GalleryComponent
  ],
})
export class UiModule {}
