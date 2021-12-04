// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import {Follower} from "../../../common/follower";
// @Injectable({
//   providedIn: 'root'
// })
//
// export class FollowerService {
//   url: string;
//   followers: [];
//   constructor(
//     private http: HttpClient
//   ) {
//     this.followers = [];
//     this.url = "http://127.0.0.1:3000/"    //后端上线了之后，改
//     // this.url = "https://ruiminli-final.herokuapp.com/";   //后端上线了之后，改
//   }
//
//   getFollowers() {
//     this.http.get(this.url + 'following', {withCredentials: true}).subscribe(res => {
//       // @ts-ignore
//       var followersName = res["followers"];
//       // @ts-ignore
//       followersName.forEach(value => {
//         this.http.get(this.url + 'avatar/' + value, {withCredentials: true}).subscribe(res2 => {
//           var followCurrent : Follower;
//           followCurrent["image"] = res2["avatar"][0]["avatar"];
//         })
//         }
//         var name = value;
//         var status;
//
//         this.http.get(this.url + 'headline/' + value, {withCredentials: true}).subscribe(res => {
//           // @ts-ignore
//           status = res["headline"];
//         })
//
//         // @ts-ignore
//         this.dummyFollowers.push({
//           "image": image,
//           "name": name,
//           // @ts-ignore
//           "status": status
//         })
//       })
//     })
//   }
// }
