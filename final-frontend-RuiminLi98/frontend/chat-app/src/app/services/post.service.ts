import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Post} from 'src/app/common/post'
import { Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})


export class PostService {
  public _url: string = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient) { }
  getDummyUsers():Observable<Post[]>{
    return this.http.get<Post[]>(this._url);
  }

}


