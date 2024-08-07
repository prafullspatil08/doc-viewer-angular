import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularDocxViewerComponent } from './angular-docx-viewer.component';

describe('AngularDocxViewerComponent', () => {
  let component: AngularDocxViewerComponent;
  let fixture: ComponentFixture<AngularDocxViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngularDocxViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AngularDocxViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
