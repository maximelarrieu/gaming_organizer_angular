import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GamesComponent} from "./components/games/games.component";
import {GameDetailsComponent} from "./components/game-details/game-details.component";
import {MainComponent} from "./components/main/main.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {UserComponent} from "./components/user/user.component";
import {MessageComponent} from "./components/message/message.component";

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'games', component: GamesComponent},
  { path: 'games/:id', component: GameDetailsComponent},
  { path: 'users/:id', component: UserComponent},
  { path: 'messages', component: MessageComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
