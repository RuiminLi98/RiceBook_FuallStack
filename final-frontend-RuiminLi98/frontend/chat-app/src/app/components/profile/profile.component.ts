import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { DataService} from "../../services/data.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
  passWord: any;
  phone: any;
  email: any;
  displayName: any;
  DOB: any;
  ziper: any;
  userName: any;
  img: File | undefined;
  imgUrl: string | undefined;
  // fileToUpload: File | null = null;
  constructor(private http: HttpClient, private router: Router, private data: DataService, private userData: DataService) {
    this.nameCheck = "";
    this.emailCheck = "";
    this.birthCheck = "";
    this.zipCheck = "";
    this.phoneCheck = "";
    this.passwordCheck="";
    this.data.currentMessage.subscribe(res=>this.userName=res);
    // this.url = "http://127.0.0.1:3000/"    //后端上线了之后，改
    this.url = "https://ruiminli-final.herokuapp.com/";   //后端上线了之后，改
  }
  ngOnInit(): void {
    // if (this.userData.userData.username != null) {
    //   this.userName = this.userData.userData.username;
    //   this.DOB = this.userData.userData.DOB;
    //   this.phone = this.userData.userData.phone;
    //   this.ziper = this.userData.userData.ZIP;
    //   this.displayName = this.userData.userData.displayName;
    //   this.passWord = this.userData.userData.password;
    //   this.email = this.userData.userData.email;
    // }
    // else {
    //   this.userName = JSON.parse(<string>localStorage.getItem('userName'));
    //   this.DOB = JSON.parse(<string>localStorage.getItem('DOB'));
    //   this.phone = JSON.parse(<string>localStorage.getItem('phone'));
    //   this.ziper = JSON.parse(<string>localStorage.getItem('ZIP'));
    //   this.displayName = JSON.parse(<string>localStorage.getItem('displayName'));
    //   this.passWord = JSON.parse(<string>localStorage.getItem(('password')));
    //   this.email = JSON.parse(<string>localStorage.getItem(('email')));
    // }
    this.http.get(this.url + 'username/', { withCredentials: true}).subscribe(res => {
      // @ts-ignore
      this.userName = res["username"];
    })
    this.http.get(this.url + 'email/', { withCredentials: true}).subscribe(res => {
      // @ts-ignore
      this.email = res["email"];
    })
    this.http.get(this.url + 'dob/', { withCredentials: true}).subscribe(res => {
      // @ts-ignore
      this.DOB = res["dob"];
    })
    this.http.get(this.url + 'zipcode/', { withCredentials: true}).subscribe(res => {
      // @ts-ignore
      this.ziper = res["zipcode"];
    })
    this.http.get(this.url + 'phone/', { withCredentials: true}).subscribe(res => {
      // @ts-ignore
      this.phone = res["phone"];
    })
    this.http.get(this.url + 'displayName/', { withCredentials: true}).subscribe(res => {
      // @ts-ignore
      this.displayName = res["displayName"];
    })
    this.http.get(this.url + 'avatar/', { withCredentials: true}).subscribe(res => {
      // @ts-ignore
      this.imgUrl = res["avatar"];
    })
    this.passWord = '123';
    var len = this.passWord.length;
    var passwordTemp = '*';
    var password = "";
    while(len>0){
      len--;
      password = password + passwordTemp;
    }
    this.passWord = password;

  }

  onSubmit() {
    this.router.navigate(['main']);
  }

  onSubmit2() {
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
        "email": this.inputEmail
      }
      localStorage.setItem(userInfoKey, JSON.stringify(data));
      var data2 = JSON.parse(<string>localStorage.getItem(userInfoKey));
      localStorage.removeItem(userInfoKey);
      this.userName = this.inputName;
      this.DOB = this.inputBirth;
      this.phone = this.inputPhone;
      this.ziper = this.inputZIP;
      this.displayName = this.inputDisplayName;
      var len = (<HTMLInputElement>document.getElementById("loginPassword")).value.length;
      var passwordTemp = '*';
      var password = "";
      while(len>0){
        len--;
        password = password + passwordTemp;
      }
      this.passWord = password;
      this.email = this.inputEmail;
      this.inputDisplayName="";
      this.inputEmail="";
      this.inputZIP="";
      this.inputName="";
      this.inputPhone="";
      this.inputPassword="";
      this.inputDisplayName="";
      this.inputPassword2="";

      this.router.navigate(['profile']);
    }
  }
  // uploadImage(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     this.img = <File>event.target.files[0]
  //     var data = new FormData()
  //     data.append('image', this.img, this.img.name)
  //     this.pServ.uploadAvatar(data).subscribe(res => {
  //       if (res['img'])
  //         this.imgUrl = res['img']
  //       else
  //         this.imgUrl = ''
  //     })
  //   }
  // }
  // handleFileInput(files: FileList) {
  //   this.fileToUpload = files.item(0);
  // }
  // uploadFileToActivity() {
  //   this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
  //     // do something, if upload success
  //   }, error => {
  //   });
  // }

  uploadImage() {
    // @ts-ignore
    let file = (<HTMLInputElement>document.getElementById("newImage")).files[0];
    if(file){
      const fd = new FormData();
      fd.append('image', file);
      this.http.put(this.url+'avatar', fd, { withCredentials: true }).subscribe(res => {
      // @ts-ignore
        this.imgUrl = res["avatar"];
        // this.http.get(this.url + 'avatar/', { withCredentials: true}).subscribe(res => {
        //   // @ts-ignore
        //
        // })
      })
      }
    }


}
