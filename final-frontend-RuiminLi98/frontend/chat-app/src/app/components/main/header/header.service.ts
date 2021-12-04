import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HeaderService {
  headline: string;
  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.headline = ""
    // this.url = "http://127.0.0.1:3000/"    //后端上线了之后，改
    this.url = "https://ruiminli-final.herokuapp.com/";   //后端上线了之后，改
  }

  async getHeadline() {
    var data = JSON.parse(<string>localStorage.getItem("userLoginForm"));
    let login = new Promise(resolve => this.http.post(this.url + 'login', {
      username: data.username,
      password: data.password
    }, {withCredentials: true}))
    await login;
    this.http.get(this.url + 'headline', { withCredentials: true}).subscribe(res => {
      // @ts-ignore
      this.userHeadLine = res["headline"];
    })
  }
}
