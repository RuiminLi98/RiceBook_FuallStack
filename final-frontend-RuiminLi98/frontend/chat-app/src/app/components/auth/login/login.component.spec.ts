import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientModule,
        RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.nameCheck = "";
    component.passwordCheck = "";
    component.dummyUser = [
      {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
          "street": "Kulas Light",
          "suite": "Apt. 556",
          "city": "Gwenborough",
          "zipcode": "92998-3874",
          "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
          }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
          "name": "Romaguera-Crona",
          "catchPhrase": "Multi-layered client-server neural-net",
          "bs": "harness real-time e-markets"
        }
      }
    ]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be empty username', () => {
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('#loginName');
    const passwordInput: HTMLInputElement = hostElement.querySelector('#loginPassword');
    const nameCheck: HTMLInputElement = hostElement.querySelector('#nameValidity');
    nameInput.value = '';
    passwordInput.value = 'Kulas Light'
    component.inputName = nameInput.value;
    component.inputPassword = passwordInput.value;
    component.onSubmit();
    expect(component.nameCheck).toEqual("UserName cannot be empty")
  });

  it('should not be empty password', () => {
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('#loginName');
    const passwordInput: HTMLInputElement = hostElement.querySelector('#loginPassword');
    const nameCheck: HTMLInputElement = hostElement.querySelector('#nameValidity');
    nameInput.value = 'test';
    passwordInput.value = ''
    component.inputName = nameInput.value;
    component.inputPassword = passwordInput.value;
    component.onSubmit();
    expect(component.passwordCheck).toEqual("Password cannot be empty")
  });

  it('should log in a user', () => {
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('#loginName');
    const passwordInput: HTMLInputElement = hostElement.querySelector('#loginPassword');
    const nameCheck: HTMLInputElement = hostElement.querySelector('#nameValidity');
    const passwordCheck: HTMLInputElement = hostElement.querySelector('#passwordValidity');
    nameInput.value = 'Bret';
    passwordInput.value = 'Kulas Light'
    component.inputName = nameInput.value;
    component.inputPassword = passwordInput.value;

    component.onSubmit();
    // let routerSpy = {navigate: jasmine.createSpy('navigate')};
    // expect (routerSpy.navigate).toHaveBeenCalledWith(['main']);
    expect(JSON.parse(<string>localStorage.getItem('userName'))).toEqual("Bret")
    expect(JSON.parse(<string>localStorage.getItem('password'))).toEqual("Kulas Light")
  });

  it('should not log in an invalid user', () => {
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('#loginName');
    const passwordInput: HTMLInputElement = hostElement.querySelector('#loginPassword');
    const nameCheck: HTMLInputElement = hostElement.querySelector('#nameValidity');
    nameInput.value = 'BadInput';
    passwordInput.value = '111'
    component.onSubmit();
    expect(component.loginFailInfo).toEqual("The input data do not match to our user database, try again!")
  });



});
