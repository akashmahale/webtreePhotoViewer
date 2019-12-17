import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewerPage } from './viewer.page';

describe('ViewerPage', () => {
  let component: ViewerPage;
  let fixture: ComponentFixture<ViewerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
