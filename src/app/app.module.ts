import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularDocxViewerModule, AngularImageViewerModule } from 'angular-docx-viewer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularDocxViewerModule,
    AngularImageViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
