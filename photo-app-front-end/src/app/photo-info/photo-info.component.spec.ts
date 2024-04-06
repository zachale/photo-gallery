import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoInfoComponent } from './photo-info.component';

describe('PhotoInfoComponent', () => {
  let component: PhotoInfoComponent;
  let fixture: ComponentFixture<PhotoInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
