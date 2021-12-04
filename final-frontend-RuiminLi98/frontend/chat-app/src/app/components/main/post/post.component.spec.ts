import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import {HttpClientModule} from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let postsDB = [
    {
      "author" : "Bert",
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "author" : "Bert",
      "userId": 1,
      "id": 2,
      "title": "qui est esse",
      "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
      "author" : "Bert",
      "userId": 1,
      "id": 3,
      "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    },
    {
      "author": "Bert",
      "userId": 1,
      "id": 4,
      "title": "eum et est occaecati",
      "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
    },
    {
      "author" : "Bert",
      "userId": 1,
      "id": 5,
      "title": "nesciunt quas odio",
      "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
    },
    {
      "author" : "Bert",
      "userId": 1,
      "id": 6,
      "title": "dolorem eum magni eos aperiam quia",
      "body": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
    },
    {
      "author" : "Bert",
      "userId": 1,
      "id": 7,
      "title": "magnam facilis autem",
      "body": "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas"
    },
    {
      "author" : "Bert",
      "userId": 1,
      "id": 8,
      "title": "dolorem dolore est ipsam",
      "body": "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae"
    },
    {
      "author" : "Bert",
      "userId": 1,
      "id": 9,
      "title": "nesciunt iure omnis dolorem tempora et accusantium",
      "body": "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
    },
    {
      "author" : "Bert",
      "userId": 1,
      "id": 10,
      "title": "optio molestias id quia eum",
      "body": "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error"
    }]
  let data = {
    "username": "Bret",
    "displayName": "Leanne Graham",
    "password": "Kulas Light",
    "phone": "770-736-8031",
    "ZIP": "92998",
    "DOB": "11/13/2000",
    "email": "Sincere@april.biz",
    "userId": 2,
    "userHeadLine": "Multi-layered client-server neural-net"
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostComponent ],
      imports: [HttpClientModule,
        RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter displayed articles by the search keyword ', (done) => {
    // postsDB = [
    //   {
    //     "author" : "Bert",
    //     "userId": 1,
    //     "id": 1,
    //     "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    //     "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    //   },
    //   {
    //     "author" : "Bert",
    //     "userId": 1,
    //     "id": 2,
    //     "title": "qui est esse",
    //     "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    //   },
    //   {
    //     "author" : "Bert",
    //     "userId": 1,
    //     "id": 3,
    //     "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    //     "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    //   },
    //   {
    //     "author": "Bert",
    //     "userId": 1,
    //     "id": 4,
    //     "title": "eum et est occaecati",
    //     "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
    //     },
    //   {
    //     "author" : "Bert",
    //     "userId": 1,
    //     "id": 5,
    //     "title": "nesciunt quas odio",
    //     "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
    //   },
    //   {
    //     "author" : "Bert",
    //     "userId": 1,
    //     "id": 6,
    //     "title": "dolorem eum magni eos aperiam quia",
    //     "body": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
    //   },
    //   {
    //     "author" : "Bert",
    //     "userId": 1,
    //     "id": 7,
    //     "title": "magnam facilis autem",
    //     "body": "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas"
    //   },
    //   {
    //     "author" : "Bert",
    //     "userId": 1,
    //     "id": 8,
    //     "title": "dolorem dolore est ipsam",
    //     "body": "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae"
    //   },
    //   {
    //     "author" : "Bert",
    //     "userId": 1,
    //     "id": 9,
    //     "title": "nesciunt iure omnis dolorem tempora et accusantium",
    //     "body": "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
    //   },
    //   {
    //     "author" : "Bert",
    //     "userId": 1,
    //     "id": 10,
    //     "title": "optio molestias id quia eum",
    //     "body": "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error"
    //   }]
    component.tempPost = postsDB;
    component.inputSearch = "sunt";
    component.tempPostForSearch = [];
    component.newSearch();
    expect(component.tempPost.length).toEqual(4);
    // data = {
    //   "username": "Bret",
    //   "displayName": "Leanne Graham",
    //   "password": "Kulas Light",
    //   "phone": "770-736-8031",
    //   "ZIP": "92998",
    //   "DOB": "11/13/2000",
    //   "email": "Sincere@april.biz",
    //   "userId": 2,
    //   "userHeadLine": "Multi-layered client-server neural-net"
    // }
    localStorage.removeItem("user");
    localStorage.setItem('user', JSON.stringify((data)));
    done();
  });


  it('show all posts work', () => {
    expect(component.showAllPosts).toBeTruthy();
  });

  it('clearPost work', () => {
    component.clearPost();
    expect(component.inputNewPost).toEqual("");
  });

  it('clearPost2 work', () => {
    component.clearPost2();
    expect(component.inputNewPost2).toEqual("");
  });

  it('clearAllposts work', () => {
    component.clearAllposts();
    expect(component.tempPost).toEqual([]);
  });

  it('add posts work', () => {
    var len = component.tempPost.length;
    component.newPost();
    expect(component.tempPost.length).toEqual(len + 1);
  });

  it('add posts2 work', () => {
    var len = component.tempPost.length;
    component.newPost2();
    expect(component.tempPost.length).toEqual(len + 1);
  });

  it('show comments work', () => {
    expect(component.showComments).toBeTruthy();
  });

});
