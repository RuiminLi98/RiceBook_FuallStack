import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {HttpClientModule} from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';
// import {Router} from "@angular/router";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  // let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [HttpClientModule,
        RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    // component.userName = 'Bret';
    // component.inputNewStatus = '';
    // component.userHeadLine = 'Multi-layered client-server neural-net';
    fixture.detectChanges();
  });

  it('should create', () => {
    component.userHeadLine = "I am happy";
    expect(component).toBeTruthy();
  });

  it('should log out for current user', () => {
    // localStorage.setItem('userName', "Bret");
    component.userHeadLine = "I am happy";
    component.inputNewStatus = "test";
    component.logOutHelper();
    expect(component.userName).toEqual("");
    expect(component.inputNewStatus).toEqual("");
    expect(component.userHeadLine).toEqual("");
  });


});
