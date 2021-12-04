import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {HttpClientModule} from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';
import {DataService} from "../../services/data.service";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let service: DataService;
  let data = {
    "username": "testName",
    "displayName": "",
    "password": "111",
    "phone": "111-111-1111",
    "ZIP": "77030",
    "DOB": "11/13/2000",
    "email": "rl88@rice.edu",
    "userId": 1,
    "userHeadLine": "happy"
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      providers: [DataService],
      imports: [HttpClientModule,
        RouterTestingModule]
    })
      .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the users profile username', () => {
    const hostElement = fixture.nativeElement;
    service.userData = data;
    component.ngOnInit();
    expect(component.userName).toEqual("testName");
  });

  it ('submit button should work', () => {
    component.inputEmail = "asdf";
    component.inputName = "1";
    component.onSubmit2()
    expect(component.emailCheck).toEqual("Expected email form should be include a @. Ex: rl88@rice.edu");
    expect(component.nameCheck).toEqual("Expect proper format is a string of upper and lower case letters and numbers begin with a letter");
    component.inputName = "test";
    component.inputEmail = "rl88@rice.edu"
    component.onSubmit2()
    expect(component.emailCheck).toEqual("");
    expect(component.nameCheck).toEqual("");
    component.birthCheck = ""
    component.nameCheck = ""
    component.emailCheck = ""
    component.zipCheck = ""
    component.phoneCheck = ""
    component.passwordCheck=""
    component.onSubmit2();
    const hostElement = fixture.nativeElement;
    const passwordInput: HTMLInputElement = hostElement.querySelector('#loginPassword');
    const passwordInput2: HTMLInputElement = hostElement.querySelector('#loginPassword2');
    passwordInput.value = '1111';
    passwordInput2.value = '1111';
    component.inputPhone = "111-111-1111"
    component.inputZIP = "77030"
    component.onSubmit2();
    expect(component.phoneCheck).toEqual("");
    expect(component.zipCheck).toEqual("");
    expect(component.passwordCheck).toEqual("");
  })
});
