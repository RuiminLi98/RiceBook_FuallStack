import {Injectable } from "@angular/core";
import{BehaviorSubject }from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService{
  // public firstEnterFlag: boolean = true;   //when first enter, we use the getFollower method to get the last three initially followers
  public userData: any = 0;    //current user data
  public postData: any = 0;
  public dummyPost: any = 0;   //all posts
  public dummyUser: any = 0;    //all users
  public searchPost: any = 0;   // posts need to show
  public addedPost: any = 0;    //added posts
  public currentMessage=new BehaviorSubject<string>('default data');
  public timeTemp: string[] = ["10/11/2021:12:00:37", "10/11/2021:12:00:36","10/11/2021:12:00:35", "10/11/2021:12:00:34",
    "10/10/2021:12:00:37", "10/10/2021:12:00:36","10/10/2021:12:00:35", "10/10/2021:12:00:34",
    "10/9/2021:12:00:37", "10/9/2021:12:00:36","10/9/2021:12:00:35", "10/9/2021:12:00:34",
    "10/8/2021:12:00:37", "10/8/2021:12:00:36","10/8/2021:12:00:35", "10/8/2021:12:00:34",
    "10/7/2021:12:00:37", "10/7/2021:12:00:36","10/7/2021:12:00:35", "10/7/2021:12:00:34",
    "10/6/2021:12:00:37", "10/6/2021:12:00:36","10/6/2021:12:00:35", "10/6/2021:12:00:34",
    "10/5/2021:12:00:37", "10/5/2021:12:00:36","10/5/2021:12:00:35", "10/5/2021:12:00:34",
    "10/4/2021:12:00:37", "10/4/2021:12:00:36","10/4/2021:12:00:35", "10/4/2021:12:00:34",
    "10/3/2021:12:00:37", "10/3/2021:12:00:36","10/3/2021:12:00:35", "10/3/2021:12:00:34",
    "10/3/2021:12:00:37", "10/3/2021:12:00:36","10/3/2021:12:00:35", "10/3/2021:12:00:34",
  ];
  constructor(){}

  changeMessage(message:string):void{
    this.currentMessage.next(message)
  }



   public followers1 = [
  {
    image: 'https://i.natgeofe.com/k/5b396b5e-59e7-43a6-9448-708125549aa1/new-york-statue-of-liberty.jpg',
    name: 'Jack',
    status: 'Happy things happened'
  }];
  public followers2 = [
  {
    image: 'https://scx2.b-cdn.net/gfx/news/2020/2-beijing.jpg',
    name: 'Tom',
    status: 'Sad things happened'
  }];
  public followers3 = [
  {
    image:  'https://ichef.bbci.co.uk/news/976/cpsprodpb/E927/production/_117878695_gettyimages-953919536.jpg',
    name: 'Victor',
    status: 'Amazing things happened'
  }];
  public followers4 = [
  {
    image:  'https://i.natgeofe.com/n/2024d353-131c-4c29-a04f-5589c541e980/beijing_travel_16x9.jpg',
    name: 'Lisa',
    status: 'Surpring things happened'
  }];

}
