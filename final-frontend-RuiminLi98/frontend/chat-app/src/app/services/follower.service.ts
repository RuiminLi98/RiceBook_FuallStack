import { Injectable } from '@angular/core';
import { DataService} from "src/app/services/data.service";
import {Follower} from "../common/follower";
@Injectable({
  providedIn: 'root'
})
export class FollowerService {

  constructor( private dataSerivce: DataService) { }

  public followersHelper = [
    {
      "image": "https://pic2.zhimg.com/v2-e66e0ab190802fed675fb3a236cefc25_720w.jpg?source=172ae18b",
      "name": "Bret",
      "status": "Multi-layered client-server neural-net",
      "id": 1
    },
    {
      "image": "https://pic2.zhimg.com/v2-e66e0ab190802fed675fb3a236cefc25_720w.jpg?source=172ae18b",
      "name": "Antonette",
      "status": "Proactive didactic contingency",
      "id": 2,
    },
    {
      "image": "https://pic2.zhimg.com/v2-e66e0ab190802fed675fb3a236cefc25_720w.jpg?source=172ae18b",
      "name": "Samantha",
      "status": "Face to face bifurcated interface",
      "id": 3,
    },
    {
      "image": "https://pic2.zhimg.com/v2-e66e0ab190802fed675fb3a236cefc25_720w.jpg?source=172ae18b",
      "name": "Karianne",
      "status": "Multi-tiered zero tolerance productivity",
      "id": 4,
    },
    {
      "image": "https://pic2.zhimg.com/v2-e66e0ab190802fed675fb3a236cefc25_720w.jpg?source=172ae18b",
      "name": "Kamren",
      "status": "User-centric fault-tolerant solution",
      "id": 5,
    },
    {
      "image": "https://pic2.zhimg.com/v2-e66e0ab190802fed675fb3a236cefc25_720w.jpg?source=172ae18b",
      "name": "Leopoldo_Corkery",
      "status": "Synchronised bottom-line interface",
      "id": 6,
    },
    {
      "image": "https://pic2.zhimg.com/v2-e66e0ab190802fed675fb3a236cefc25_720w.jpg?source=172ae18b",
      "name": "Elwyn.Skiles",
      "status": "Configurable multimedia task-force",
      "id": 7,
    },
    {
      "image": "https://pic2.zhimg.com/v2-e66e0ab190802fed675fb3a236cefc25_720w.jpg?source=172ae18b",
      "name": "Maxime_Nienow",
      "status": "Implemented secondary concept",
      "id": 8,
    },
    {
      "image": "https://pic2.zhimg.com/v2-e66e0ab190802fed675fb3a236cefc25_720w.jpg?source=172ae18b",
      "name": "Delphine",
      "status": "Switchable contextually-based project",
      "id": 9,
    },
    {
      "image": "https://pic2.zhimg.com/v2-e66e0ab190802fed675fb3a236cefc25_720w.jpg?source=172ae18b",
      "name": "Moriah.Stanton",
      "status": "Centralized empowering task-force",
      "id": 10,
    }
  ]

  public userFollowers: Follower[] = []

  public getFollowers2() {   //get registed user follower
    this.userFollowers.push(this.followersHelper[0]);
    localStorage.removeItem("followers");
    localStorage.setItem('followers', JSON.stringify((this.userFollowers)));
    return this.userFollowers;
  }
  public getFollowers() {   //get placeholder user followers
    this.dataSerivce.userData = JSON.parse(<string>localStorage.getItem('user'));
    if (this.dataSerivce.userData.userId == 11) {
      this.userFollowers.push(this.followersHelper[0]);
      this.userFollowers.push(this.followersHelper[1]);
      this.userFollowers.push(this.followersHelper[2]);
    }
    else if (this.dataSerivce.userData.userId == 1) {
      this.userFollowers.push(this.followersHelper[1]);
      this.userFollowers.push(this.followersHelper[2]);
      this.userFollowers.push(this.followersHelper[3]);
    }
    else if (this.dataSerivce.userData.userId == 2) {
      this.userFollowers.push(this.followersHelper[2]);
      this.userFollowers.push(this.followersHelper[3]);
      this.userFollowers.push(this.followersHelper[4]);
    }
    else if (this.dataSerivce.userData.userId == 3) {
      this.userFollowers.push(this.followersHelper[3]);
      this.userFollowers.push(this.followersHelper[4]);
      this.userFollowers.push(this.followersHelper[5]);
    }
    else if (this.dataSerivce.userData.userId == 4) {
      this.userFollowers.push(this.followersHelper[4]);
      this.userFollowers.push(this.followersHelper[5]);
      this.userFollowers.push(this.followersHelper[6]);
    }
    else if (this.dataSerivce.userData.userId == 5) {
      this.userFollowers.push(this.followersHelper[5]);
      this.userFollowers.push(this.followersHelper[6]);
      this.userFollowers.push(this.followersHelper[7]);
    }
    else if (this.dataSerivce.userData.userId == 6) {
      this.userFollowers.push(this.followersHelper[6]);
      this.userFollowers.push(this.followersHelper[7]);
      this.userFollowers.push(this.followersHelper[8]);
    }
    else if (this.dataSerivce.userData.userId == 7) {
      this.userFollowers.push(this.followersHelper[7]);
      this.userFollowers.push(this.followersHelper[8]);
      this.userFollowers.push(this.followersHelper[9]);
    }
    else if (this.dataSerivce.userData.userId == 8) {
      this.userFollowers.push(this.followersHelper[8]);
      this.userFollowers.push(this.followersHelper[9]);
      this.userFollowers.push(this.followersHelper[0]);
    }
    else if (this.dataSerivce.userData.userId == 9) {
      this.userFollowers.push(this.followersHelper[9]);
      this.userFollowers.push(this.followersHelper[0]);
      this.userFollowers.push(this.followersHelper[1]);
    }
    else if (this.dataSerivce.userData.userId == 10) {
      this.userFollowers.push(this.followersHelper[0]);
      this.userFollowers.push(this.followersHelper[1]);
      this.userFollowers.push(this.followersHelper[2]);
    }
    localStorage.removeItem("followers");
    localStorage.setItem('followers', JSON.stringify((this.userFollowers)));
    return this.userFollowers;
  }

  public updatePost() {
    this.dataSerivce.userData = JSON.parse(<string>localStorage.getItem('user'));
    this.dataSerivce.dummyPost = JSON.parse(<string>localStorage.getItem('dummyPost'));
    this.userFollowers = JSON.parse(<string>localStorage.getItem('followers'));
    var dummyPost;
    // if (this.dataSerivce.userData.userId == 11)
    //   this.dataSerivce.userData.userId = 1;
    var timePointer = 0;
    dummyPost = this.dataSerivce.dummyPost;
    this.dataSerivce.postData = [];
    if (this.dataSerivce.userData.userId <= 10) {
      for (var i = 0; i < dummyPost.length; i++) {

        if (dummyPost[i].userId == this.dataSerivce.userData.userId) {
          var data9 = {
            "url": "https://i.natgeofe.com/n/f8379de2-618a-4ef1-b39c-2865c3f61109/forbiddencity-beijing-china.jpg",
            "author": this.dataSerivce.userData.username,
            "timestamp": this.dataSerivce.timeTemp[timePointer],
            "title": dummyPost[i].title,
            "body": dummyPost[i].body
          }
          this.dataSerivce.postData.push(data9);
          timePointer++;
        }
      }
    }
    // for (var i = 0; i < this.userFollowers.length; i++) {
    //   for (var j = 0; j < dummyPost.length; j++) {
    //     if (this.userFollowers[i].id == dummyPost[j].userId) {
    //       var data2 = {
    //         "url": "https://i.natgeofe.com/n/f8379de2-618a-4ef1-b39c-2865c3f61109/forbiddencity-beijing-china.jpg",
    //         "author": this.userFollowers[i].name,
    //         "timestamp": this.dataSerivce.timeTemp[timePointer],
    //         "title": dummyPost[j].title,
    //         "body": dummyPost[j].body
    //       }
    //       timePointer ++;
    //       this.dataSerivce.postData.push(data2);
    //     }
    //   }
    // }
    localStorage.removeItem("posts");
    localStorage.setItem('posts', JSON.stringify((this.dataSerivce.postData)));
  }
}










