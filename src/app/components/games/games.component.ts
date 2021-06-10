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
  user_games: any
  isLoggedIn = false;
  connected_user: any
  user: any
  check = false
  added = false

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
    this.getUserGames()
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

  getUserGames(): void {
    this.userService.getOne(this.connected_user.id)
      .subscribe(
        data => {
          console.log(data)
          this.user = data
          this.user_games = data.games
        },
        error => {
          console.log(error)
        }
      )
  }

  // @ts-ignore
/*  checkTest(): boolean {
    // Loop for array1
    for(let i = 0; i < this.user.games.length; i++) {
      // Loop for array2
      for(let j = 0; j < this.games.length; j++) {
        // Compare the element of each and
        // every element from both of the
        // arrays
        if(this.user.games[i] === this.games[j]) {
          // Return if common element found
          console.log(this.user.games[i] === this.games[j])
          this.check = true;
          console.log(this.check)
        }
      }
    }

    // Return if no common element exist
    this.check = false
    console.log(this.check)

  }*/
}
