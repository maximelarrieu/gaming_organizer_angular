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

  constructor(
    private gameService: GamesService,
    private route: ActivatedRoute,
    private token: TokenService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this.token.getUser()
    console.log(this.user)

    this.getGame(this.route.snapshot.paramMap.get('id'))
    this.getUserGames()
    // this.check()
  }


  ngDoCheck() {
    this.check()
    console.log(this.added)
    // }
  }

  getGame(id: string | null): void {
    this.gameService.getOne(id)
      .subscribe(
        data =>{
          this.game = data;
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
    if (this.user_games !== undefined) {

      for (let index = 0; index < this.user_games.length; index++) {
        if (this.user_games[index].title == this.game.title) {
          this.added = true
          console.log(this.added)
        }
      }
    } else {
      console.log("oui")
    }
  }

}
