import {Component, Input, OnInit} from '@angular/core';
import { TokenService } from "../../services/token.service";
import { UserService } from "../user/user.service";
import {GamesService} from "../games/games.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  user: any;
  isLogout = false
  message = '';

  constructor(
    private token: TokenService,
    private gameService: GamesService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser()
    console.log(this.currentUser)
    this.getUserGames()
    this.route.queryParams
      .subscribe(params => {
        if(params.isLoggedIn !== undefined && params.isLoggedIn === 'true') {
          this.message = 'Connexion établie.'
        }
      })
  }

  getUserGames(): void {
    this.userService.getOne(this.currentUser.id)
      .subscribe(
        data => {
          console.log(data)
          this.user = data
        },
        error => {
          console.log(error)
        }
      )
  }

  logout(): void {
    this.token.logout()
    this.isLogout = true
    this.router.navigate(['login'], {queryParams: {isLogout: true}}).then(r => console.log(r))
  }

}
