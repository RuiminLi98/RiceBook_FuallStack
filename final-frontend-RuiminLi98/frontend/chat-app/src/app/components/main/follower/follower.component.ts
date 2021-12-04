import { Component, OnInit } from '@angular/core';
import{ DataService} from "../../../services/data.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Follower} from "../../../common/follower";
import { FollowerService} from "../../../services/follower.service"

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.css']
})
export class FollowerComponent implements OnInit {
  url: string;
  inputName: any;
  nameCheck: any;
  public dummyFollowersNames: [];
  public dummyFollowers: Follower[];
  tempDummyFollowers: any;
  constructor(private userData: DataService,
              private http: HttpClient,
              private router: Router,
              private followerService: FollowerService,
  ) {
    this.dummyFollowersNames = [];
    this.dummyFollowers = [];
    // this.url = "http://127.0.0.1:3000/"    //后端上线了之后，改
    this.url = "https://ruiminli-final.herokuapp.com/";   //后端上线了之后，改

  }
  ngOnInit(): void {
    this.http.get(this.url + 'following', {withCredentials: true}).subscribe(res => {
      // @ts-ignore
      this.dummyFollowersNames = res.followers;
      this.dummyFollowersNames.forEach((value) => {
        this.http.get(this.url + 'avatar/' + value, {withCredentials: true}).subscribe(res2 => {
            // @ts-ignore
            var image = res2["avatar"];
            var name = value;
            var status = name + "'s headline";
            // @ts-ignore
            this.dummyFollowers.push({
              "image": image,
              "name": name,
              // @ts-ignore
              "status": status
            })
          })
        })
      })
  }
  createFollowersHelper(i : number) {
    // var userDB = JSON.parse(<string>localStorage.getItem('dummyUser'));
    // this.dummyFollowers.push({
    //   "image": "https://pic2.zhimg.com/v2-e66e0ab190802fed675fb3a236cefc25_720w.jpg?source=172ae18b",
    //   "name": userDB[i].username,
    //   "status": userDB[i].company.catchPhrase,
    //   "id": userDB[i].id
    // })
    // this.nameCheck = "";
    // this.followerService.userFollowers = this.dummyFollowers;
    // localStorage.setItem('followers', JSON.stringify((this.followerService.userFollowers)));
  }

   createFollowers() {

    var newF = (<HTMLInputElement>document.getElementById("newFollower")).value
    if (newF != "" ) {
      this.http.put(this.url + 'following/' + newF, {withCredentials: true}).subscribe(res => {
        // @ts-ignore
        if (res["result"] === "you cannot follow yourself")
          this.nameCheck = "you cannot follow yourself";
        // @ts-ignore
        if (res["result"] === "the follow user do not exist")
          this.nameCheck = "the follow user do not exist";
      })
    }
     this.http.put(this.url + 'following/' + newF, {},{withCredentials: true}).subscribe(res => {
       // @ts-ignore
       if (res["result"] === "you cannot follow yourself") {
         this.nameCheck = "you cannot follow yourself";
         return
       }
       // @ts-ignore
       if (res["result"] === "the follow user do not exist") {
         this.nameCheck = "the follow user do not exist";
         return
       }

     })
     window.location.reload();
  }

  removeFollowersHelper(removeId: number) {
  }

  removeFollowers(removeName: string) {
    this.http.delete(this.url + 'following/' + removeName, {withCredentials: true}).subscribe(res => {
    })
    window.location.reload();
  }

}

