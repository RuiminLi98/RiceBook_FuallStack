import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import{ DataService} from "../../../services/data.service";
import { HeaderService} from "./header.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [HeaderService]
})
export class HeaderComponent implements OnInit {
  url: string;
  userName: any;
  inputNewStatus: any;
  userHeadLine: any;
  imgUrl: any;

  constructor(    private http: HttpClient,
                  private router: Router,
     private hServ: HeaderService,
     private userData: DataService) {
    // this.url = "http://127.0.0.1:3000/"    //后端上线了之后，改
    this.url = "https://ruiminli-final.herokuapp.com/";   //后端上线了之后，改
  }

  ngOnInit(): void {
    this.http.get(this.url + 'username/', { withCredentials: true}).subscribe(res => {
      // @ts-ignore
      this.userName = res["username"];
    })
    this.http.get(this.url + 'headline', {withCredentials: true}).subscribe(res => {
      // @ts-ignore
      this.userHeadLine = res["headline"];
    })
    this.http.get(this.url + 'avatar/', { withCredentials: true}).subscribe(res => {
      // @ts-ignore
      this.imgUrl = res["avatar"];
    })
  }

  logOutHelper() {
    this.userName = "";
    this.inputNewStatus = "";
    this.userHeadLine = "";
    localStorage.removeItem("followers");
  }
  logOut() {
    this.logOutHelper();
    this.http.put(this.url + 'logout', {},{ withCredentials: true}).subscribe(res2 => {
      // @ts-ignore
      if (res2["result"] === "logout success") {
        this.router.navigate(['auth']);
      }
    })
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }

  changeStatus() {
    if ((<HTMLInputElement>document.getElementById("userStatus")).value != "") {
      (<HTMLInputElement>document.getElementById("userStatus")).innerHTML = this.inputNewStatus;
      this.http.put(this.url + 'headline', {"headline": this.inputNewStatus}, {withCredentials: true}).subscribe(res2 => {
      })
    }
  }


}
