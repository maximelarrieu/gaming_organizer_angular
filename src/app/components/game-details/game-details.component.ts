import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params} from "@angular/router";
import { GamesService } from "../games/games.service";
import { TokenService } from "../../services/token.service";
import { UserService } from "../user/user.service";

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {


  game: any
  added = false
  user: any
  user_games: any
  removed = false

  constructor(
    private gameService: GamesService,
    private route: ActivatedRoute,
    private token: TokenService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this.token.getUser()
    this.getGame(this.route.snapshot.paramMap.get('id'))
    this.getUserGames()
    // this.check()
    console.log(this.added)
    console.log(this.removed)
    this.added = this.game.users.includes(this.user.id)
  }

  ngDoCheck() {
    // this.check()
    this.added = this.game.users.includes(this.user.id)
  }

  getGame(id: string | null): void {
    this.gameService.getOne(id)
      .subscribe(
        data =>{
          this.game = data;
          console.log(data.users)
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
    window.location.reload()

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
    window.location.reload()
  }
  removeUserToGame(user_id: any, game_id: any): void {
    this.userService.removeUserToGame(user_id, game_id)
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

  getUserGames(): void {
    this.userService.getOne(this.user.id)
      .subscribe(
        data => {
          console.log(data)
          this.user_games = data.games
          console.log(this.user_games)
        },
        error => {
          console.log(error)
        }
      )
  }

  check(): void {
    this.added = !!this.game.users.includes(this.user.id);
  }

}
