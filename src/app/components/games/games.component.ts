import {Component, OnInit} from '@angular/core';
import {GamesService} from "./games.service";
import {Router} from "@angular/router";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: any
  game: any
  isLoggedIn = false;
  user: any


  constructor(private gameService: GamesService, private router: Router, private token: TokenService) { }

  ngOnInit(): void {
    this.getGames();
    this.isLoggedIn = !this.token.getToken()

    if (!this.isLoggedIn) {
      this.user = this.token.getUser()
      console.log(this.user)
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

  selectGame(id: any) {
    let link = ['/games', id];
    this.router.navigate(link);
  }

  addGameToUser(game_id: any, user_id: any): void {
    this.gameService.addOneToUser(game_id, user_id)
      .subscribe(
        data => {
          console.log(data)
        },
        err => {
          console.log(err)
        }
      )
  }

}
