import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import { DataService} from "../../../services/data.service";
import {UserService} from "../../../services/user.service";
import { PostService} from "../../../services/post.service";
import { FollowerService} from "../../../services/follower.service";
import { Observable} from "rxjs";
import {User} from "../../../common/user";
import {timestamp} from "rxjs/operators";
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  url: string;
  inputNewPost: any;
  inputNewPost2: any;
  userObj: any;
  usersToQuery: any;
  imgUrl: any;
  public dummyPost: any[] = [];  //all posts( ten person)
  public tempPostForSearch: any[] = [];
  public tempPost: any[] = []; //post need to print (searched posts or the 4 person posts)
  public addedPost: any[] = [];
  public searchedPost: any[] = [];
  // loadDataNum = 0;//进去先刷新一次更新数据
  inputSearch: any;
  inputNewComment: any;
  inputNewText: any;
  inputNewTextId: any;
  inputNewCommentId: any;
  inputNewComment2: any;
  constructor(    private http: HttpClient,
                  private router: Router,
                  private dataTransmit: DataService,
                  private userTransmit: UserService,
                  private postTransmit: PostService,
                  private followerTransmit: FollowerService) {
    // this.url = "http://127.0.0.1:3000/"    //后端上线了之后，改
    this.url = "https://ruiminli-final.herokuapp.com/";   //后端上线了之后，改
    this.userObj = "";
    this.usersToQuery = [];
  }

  ngOnInit(): void {
    this.http.get(this.url + 'username/', { withCredentials: true}).subscribe(res => {
      // @ts-ignore
      this.userObj = res["username"];
      this.http.get(this.url + 'article/', {withCredentials: true}).subscribe(res => {
        // @ts-ignore
          this.tempPost = res["posts"]
        })
      })

    }

  uploadImage() {
    // @ts-ignore
    let file = (<HTMLInputElement>document.getElementById("newImage")).files[0];
    if(file){
      const fd = new FormData();
      fd.append('image', file);
      this.http.put(this.url+'url', fd, { withCredentials: true }).subscribe(res => {
        // @ts-ignore
        this.imgUrl = res["url"];
      })
    }
  }
  newPost() {
    this.http.get(this.url + 'username/', { withCredentials: true}).subscribe(res => {
      // @ts-ignore
      var currUser = res["username"];
      var data5 = {
        "url": this.imgUrl,
        "author": currUser,
        "date": "10/20/2021:12:00:34",
        "title": "new post",
        "text":  this.inputNewPost
      }
      this.http.post(this.url + 'article', data5, { withCredentials: true}).subscribe(res2 => {
        // @ts-ignore
        var len = res2["articles"].length - 1;
        data5 = {
          "url": this.imgUrl,
          "author": currUser,
          "date": "10/20/2021:12:00:34",
          "title": "new post",
          "text":  this.inputNewPost,
          // @ts-ignore
          "_id": res2["articles"][len]._id
        }
        this.tempPost.unshift(data5);
        this.addedPost.push(data5);
        this.inputNewPost="";
      })

    })
  }

  newPost2() {
    this.http.get(this.url + 'username/', { withCredentials: true}).subscribe(res => {
      // @ts-ignore
      var currUser = res["username"];
      var data5 = {
        "author": currUser,
        "date": "10/20/2021:12:00:34",
        "title": "new post",
        "text": this.inputNewPost2
      }
      this.http.post(this.url + 'article', data5, { withCredentials: true}).subscribe(res2 => {
        // @ts-ignore
        var len = res2["articles"].length - 1;
        data5 = {
          "author": currUser,
          "date": "10/20/2021:12:00:34",
          "title": "new post",
          "text":  this.inputNewPost2,
          // @ts-ignore
          "_id": res2["articles"][len]._id
        }
        this.tempPost.unshift(data5);
        this.addedPost.push(data5);
        this.inputNewPost2 = "";
      })

    })
  }
  clearPost() {
    this.inputNewPost = "";
  }
  clearPost2() {
    this.inputNewPost2="";
  }
  clearAllposts() {
    this.tempPost = [];
  }


  newSearch(){
    var tempPost2 = this.tempPost;
    if (this.tempPostForSearch.length != 0)
      tempPost2 = this.tempPostForSearch;
    this.searchedPost = [];
    this.tempPostForSearch = tempPost2;
    for (var i = 0; i < tempPost2.length; i++) {
      if (tempPost2[i].author.includes(this.inputSearch) || tempPost2[i].text.includes(this.inputSearch)) {
        this.searchedPost.push(tempPost2[i]);
      }
    }
    this.tempPost = this.searchedPost;
  }

  newSearchText() {

  }


  showAllPosts() {
    window.location.reload();
  }

  showComments(){
    alert("Messsage 1: This post is awesome.\n" +
      "Message 2: Nice!\n" +
      "Message 3: This post is prefect!");
  }


  editText() {
    this.http.put(this.url + 'articles/' + this.inputNewTextId, {"text": this.inputNewText}, { withCredentials: true}).subscribe(res => {
      this.http.get(this.url + 'article/', {withCredentials: true}).subscribe(res => {
        // @ts-ignore
        this.tempPost = res["posts"]
      })
    })
    // window.location.reload();
    }

  editTextHere() {
    this.http.put(this.url + 'comment/' + this.inputNewCommentId, {"text": this.inputNewComment2}, { withCredentials: true}).subscribe(res => {
      this.http.get(this.url + 'article/', {withCredentials: true}).subscribe(res => {
        // @ts-ignore
        this.tempPost = res["posts"]
      })
    })
    // window.location.reload();
  }
}

