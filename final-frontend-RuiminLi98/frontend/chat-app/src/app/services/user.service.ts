import { Injectable } from '@angular/core';
// import {users} from "../common/user";
import {HttpClient} from "@angular/common/http";
import {test, User} from 'src/app/common/user'
import { Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})


export class UserService {
  private _url: string = "https://jsonplaceholder.typicode.com/users";

  constructor(private http: HttpClient) { }
  getDummyUsers():Observable<User[]>{
    return this.http.get<User[]>(this._url);
  }

}
