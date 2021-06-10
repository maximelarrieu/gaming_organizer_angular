import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params} from "@angular/router";
import { UserService } from "./user.service";
import { GamesService } from "../games/games.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: any
  game: any

  constructor(private userService: UserService, private gameService: GamesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser(this.route.snapshot.paramMap.get('id'))
  }

  getUser(id: string | null): void {
    this.userService.getOne(id)
      .subscribe(
        data => {
          this.user = data
          console.log(data)
        },
        error => {
          console.log(error)
        }
      )
  }

}
