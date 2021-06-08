import { Component, OnInit } from '@angular/core';
import { TokenService } from "../../services/token.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private roles: string[] = []
  isLoggedIn = false;
  username?: string;

  constructor(private token: TokenService) {}
  public title: string = "Gaming Organizer"

  ngOnInit(): void {
    this.isLoggedIn = !this.token.getToken()

    if (!this.isLoggedIn) {
      const user = this.token.getUser()
      this.roles = user.roles
      this.username = user.username
    }
  }

  logout(): void {
    this.token.logout()
    window.location.reload()
  }
}
