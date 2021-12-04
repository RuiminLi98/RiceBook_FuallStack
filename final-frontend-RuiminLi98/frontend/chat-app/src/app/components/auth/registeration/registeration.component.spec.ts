import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterationComponent} from './registeration.component';
import {HttpClientModule} from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterationComponent', () => {
  let component: RegisterationComponent;
  let fixture: ComponentFixture<RegisterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterationComponent ],
      imports: [HttpClientModule,
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('#loginName');
    const emailInput: HTMLInputElement = hostElement.querySelector('#loginEmail');
    const phoneInput: HTMLInputElement = hostElement.querySelector('#loginPhone');
    const birthInput: HTMLInputElement = hostElement.querySelector('#loginBirth');
    const zipInput: HTMLInputElement = hostElement.querySelector('#loginZip');
    const passwordInput: HTMLInputElement = hostElement.querySelector('#loginPassword');
    const passwordInput2: HTMLInputElement = hostElement.querySelector('#loginPassword2');
    nameInput.value = '';
    passwordInput.value = '';
    passwordInput2.value = '';
    phoneInput.value = '';
    emailInput.value = '';
    zipInput.value = '';
    component.onSubmit();
    expect(component.zipCheck).toEqual("Expected zip should be 5 digit");
    expect(component.birthCheck).toEqual("");
    expect(component.phoneCheck).toEqual("Expected phone number format 123-123-1234");
    expect(component.passwordCheck).toEqual("The password cannot be empty");
    expect(component.emailCheck).toEqual("Expected email form should be include a @. Ex: rl88@rice.edu");
    nameInput.value = 'a';
    passwordInput.value = '1';
    passwordInput2.value = '1';
    phoneInput.value = '111-111-1111';
    emailInput.value = 'rl88@rice.edu';
    zipInput.value = '12345';
    component.inputZIP = '11111';
    component.inputName = nameInput.value;
    component.inputPassword = passwordInput.value;
    component.inputEmail = emailInput.value;
    component.inputPhone = phoneInput.value;
    component.onSubmit();
    expect(component.zipCheck).toEqual("");
    expect(component.birthCheck).toEqual("");
    expect(component.phoneCheck).toEqual("");
    expect(component.emailCheck).toEqual("");
  });

  it('test register function', () => {
    expect(component).toBeTruthy();
  });


});
