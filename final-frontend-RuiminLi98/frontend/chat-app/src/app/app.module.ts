import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule, Router} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { MainComponent } from './components/main/main.component';
import { RegisterationComponent } from './components/auth/registeration/registeration.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserService} from "./services/user.service";
import { LoginComponent } from './components/auth/login/login.component';
import { HeaderComponent } from './components/main/header/header.component';
import { FollowerComponent } from './components/main/follower/follower.component';
import { PostComponent } from "./components/main/post/post.component";
import { ShowPostComponent } from './components/main/show-post/show-post.component';


const routes: Routes = [

  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: "auth", component: AuthComponent},
  {path: "main", component: MainComponent},
  {path: "profile", component: ProfileComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent,
    RegisterationComponent,
    ProfileComponent,
    LoginComponent,
    HeaderComponent,
    FollowerComponent,
    PostComponent,
    ShowPostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
