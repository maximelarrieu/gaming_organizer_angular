import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { TokenService } from "../../services/token.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  }
  isLoggedIn = false;
  isLoginFailed = false;
  logoutMessage = ""
  errorMessage = ""
  roles: string[] = []

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    this.route.queryParams
      .subscribe(params => {
        if(params.isLogout !== undefined && params.isLogout === 'true') {
          this.logoutMessage = "Vous avez été déconnecté."
        }
      })
  }

  onSubmit(): void {
    const { username, password } = this.form

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken)
        this.tokenStorage.saveUser(data)

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['profile'], {queryParams: {isLoggedIn: true}}).then(r => console.log(r));
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true
      }
    )
  }
}
