import {Component, OnInit} from '@angular/core';
import {GamesService} from "./games.service";
import {Router} from "@angular/router";
import {TokenService} from "../../services/token.service";
import { UserService } from "../user/user.service";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: any
  isLoggedIn = false;
  connected_user: any
  user: any
  added = false
  removed = false

  constructor(
    private gameService: GamesService,
    private userService: UserService,
    private router: Router,
    private token: TokenService
  ) { }

  ngOnInit(): void {
    this.getGames();
    this.isLoggedIn = !this.token.getToken()
    if (!this.isLoggedIn) {
      this.connected_user = this.token.getUser()
      console.log(this.connected_user)
    }
  }

  getGames(): void {
    this.gameService.getAll()
      .subscribe(
        data => {
          this.games = data
          console.log(data)
        },
        error => {
          console.log(error)
        }
      )
  }

  addGameToUser(game_id: any, user_id: any): void {
    this.gameService.addOneToUser(game_id, user_id)
      .subscribe(
        data => {
          console.log(data)
        },
        err => {
          console.log(err)
        },
      )
      this.added = true
  }
  addUserToGame(user_id: any, game_id: any): void {
    this.userService.addUserToGame(user_id, game_id)
      .subscribe(
        data => {
          console.log(data)
        },
        err => {
          console.log(err)
        }
      )
    this.added = true
  }

  removeGameToUser(game_id: any, user_id: any): void {
    this.gameService.removeOneToUser(game_id._id, user_id)
      .subscribe(
        data => {
          console.log(data)
        },
        err => {
          console.log(err)
        }
      )
    this.removed = true
  }

}
