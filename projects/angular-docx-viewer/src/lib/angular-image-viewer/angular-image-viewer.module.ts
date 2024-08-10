import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularImageViewerComponent } from './angular-image-viewer.component';
import { FullScreenDirective } from './directive/fullscreen.directive';

@NgModule({
  declarations: [AngularImageViewerComponent, FullScreenDirective],
  imports: [CommonModule],
  exports: [AngularImageViewerComponent, FullScreenDirective],
})
export class AngularImageViewerModule {}
