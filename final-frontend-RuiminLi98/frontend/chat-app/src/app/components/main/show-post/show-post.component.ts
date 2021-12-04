import { Component, OnInit } from '@angular/core';
import { DataService} from "../../../services/data.service";
@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {
  url: string;
  printPost: any[] = [];
  constructor(private dataTransmit: DataService) {
    this.printPost = dataTransmit.searchPost;
    // this.url = "http://127.0.0.1:3000/"    //后端上线了之后，改
    this.url = "https://ruiminli-final.herokuapp.com/";   //后端上线了之后，改
  }

  ngOnInit(): void {
  }

}
