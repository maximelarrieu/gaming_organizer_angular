import { Component, OnInit } from '@angular/core';
import { TokenService } from "../../services/token.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private roles: string[] = []
  isLoggedIn = false;
  username?: string;
  isLogout = false;
  message = ''

  constructor(
    private token: TokenService,
    private router: Router,
  ) {}
  public title: string = "Gaming Organizer"

  ngOnInit(): void { }

  ngDoCheck() {
    this.isLoggedIn = !this.token.getToken()
    if (!this.isLoggedIn) {
      const user = this.token.getUser()
      this.roles = user.roles
      this.username = user.username
    }
  }

  logout(): void {
    this.token.logout()
    this.isLogout = true
    this.router.navigate(['login'], {queryParams: {isLogout: true}}).then(r => console.log(r))
  }
}
