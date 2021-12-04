import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { DataService} from "../../../services/data.service";
import { PostService} from "../../../services/post.service"
import { FollowerService} from "../../../services/follower.service";
import { UserService} from "../../../services/user.service";
import { NgForm } from '@angular/forms';
import {User} from "../../../common/user";

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {
  url: string
  nameCheck: any;
  emailCheck: any;
  phoneCheck: any;
  birthCheck: any;
  zipCheck: any;
  passwordCheck: any;
  inputName: string | undefined;
  inputDisplayName : string | undefined
  inputEmail: string | undefined
  inputPhone: string | undefined
  inputBirth: string | undefined
  inputZIP: string | undefined
  inputPassword: string | undefined
  inputPassword2: string | undefined
  public dummyUser: any[] = [];

  constructor(private http: HttpClient,
              private router: Router,
              private dataTransmit: DataService,
              private postTransmit: PostService,
              private followerService: FollowerService,
              private userService: UserService) {
    this.nameCheck = "";
    this.emailCheck = "";
    this.birthCheck = "";
    this.zipCheck = "";
    this.phoneCheck = "";
    this.passwordCheck="";
    // this.url = "http://127.0.0.1:3000/"    //后端上线了之后，改
    this.url = "https://ruiminli-final.herokuapp.com/";   //后端上线了之后，改
  }

  ngOnInit(): void {
  }

  onSubmit() {
    var namePattern = new RegExp("[a-zA-Z]+[a-zA-Z0-9]*");
    var emailPattern = new RegExp(".@.")
    var zipPattern = new RegExp("[0-9]{5}")
    var phonePattern = new RegExp("[0-9]{3}-[0-9]{3}-[0-9]{4}")
    var resultName;
    var resultEmail;
    var resultZIP;
    var resultPhone;
    var today = new Date();
    var now = today.getTime();
    var dob = document.getElementById("loginBirth")
    var ymd = (<HTMLInputElement>dob).value.split("-");
    var dobyear = parseInt(ymd[0]) + 18;
    var dobmonth = parseInt(ymd[1], 10);
    var dobday = parseInt(ymd[2], 10);
    var userDob = new Date();
    userDob.setFullYear(dobyear, dobmonth - 1, dobday);
    if (userDob.getTime() > now) {
      this.birthCheck = "User must older than 18 years old";
    }
    else {
      this.birthCheck = "";
    }
    if (typeof this.inputName === "string")
      resultName = namePattern.test(this.inputName);
    if (!resultName)
      this.nameCheck = "Expect proper format is a string of upper and lower case letters and numbers begin with a letter";

    if (this.inputName && resultName)
      this.nameCheck = "";
    if (typeof this.inputEmail === "string")
      resultEmail = emailPattern.test(this.inputEmail);
    if (!resultEmail)
      this.emailCheck = "Expected email form should be include a @. Ex: rl88@rice.edu";
    if (this.inputEmail && resultEmail)
      this.emailCheck = "";
    if (typeof this.inputZIP === "string")
      resultZIP = zipPattern.test(this.inputZIP);
    if (!resultZIP)
      this.zipCheck = "Expected zip should be 5 digit";
    if ((<HTMLInputElement>document.getElementById("loginZip")).value.length != 5)
      this.zipCheck = "Expected zip should be 5 digit";
    if (this.inputZIP && resultZIP && this.inputZIP.length == 5)
      this.zipCheck = "";
    if (typeof this.inputPhone === "string")
      resultPhone = phonePattern.test(this.inputPhone);
    if (!resultPhone)
      this.phoneCheck = "Expected phone number format 123-123-1234";
    if (this.inputPhone && resultPhone)
      this.phoneCheck = "";
    if ((<HTMLInputElement>document.getElementById("loginPassword")).value.length == 0)
      this.passwordCheck = "The password cannot be empty";
    else if (this.inputPassword == this.inputPassword2)
      this.passwordCheck="";
    else
      this.passwordCheck = "The password do not matched";
    if (this.birthCheck == "" &&
      this.nameCheck == "" &&
      this.emailCheck == "" &&
      this.zipCheck == "" &&
      this.phoneCheck == "" &&
      this.passwordCheck=="") {
      var userInfoKey = "user:" + this.inputName + ":" + this.inputPassword;
      var data = {
        "username": this.inputName,
        "displayName": this.inputDisplayName,
        "password": this.inputPassword,
        "phone": this.inputPhone,
        "ZIP": this.inputZIP,
        "DOB": this.inputBirth,
        "email": this.inputEmail,
        "userId": 11,
        "userHeadLine": "I am happy!"
      }
      if (data.displayName == null)
        data.displayName = "undefined";
      if (data.DOB == null)
        data.DOB = "0000-00-00";
      var data2 = {
        "username": this.inputName,
        "email": this.inputEmail,
        "dob": this.inputBirth,
        "zipcode": this.inputZIP,
        "password": this.inputPassword,
        "displayName": this.inputDisplayName,
        "phone": this.inputPhone
      }
      this.http.post(this.url + 'register', data2, { withCredentials: true}).subscribe(res => {
        // @ts-ignore
        if(res["result"] === "success") {
          var tempData = {
            "username": this.inputName,
            "password": this.inputPassword
          }
          this.http.post(this.url + 'login', tempData, { withCredentials: true}).subscribe(res2 => {
            // @ts-ignore
            if (res2["result"] === "success") {
              this.router.navigate(['main']);
            }
          })
        }
        // @ts-ignore
        if(res["result"] === "the username already exist") {
          this.nameCheck = "The username already exist";
        }
      })
    }
  }
}
