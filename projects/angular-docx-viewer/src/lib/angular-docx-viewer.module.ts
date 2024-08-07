import { NgModule } from '@angular/core';
import { AngularDocxViewerComponent } from './angular-docx-viewer.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AngularDocxViewerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AngularDocxViewerComponent
  ]
})
export class AngularDocxViewerModule { }
