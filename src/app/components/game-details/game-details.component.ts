import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params} from "@angular/router";
import { GamesService } from "../games/games.service";

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

  game: any

  constructor(private gameService: GamesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']
    this.getGame(this.route.snapshot.paramMap.get('id'))
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

}
