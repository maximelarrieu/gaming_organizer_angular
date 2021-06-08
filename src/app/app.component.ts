import {Component, ElementRef} from '@angular/core';
import { TokenService } from "./services/token.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private elementRef: ElementRef, private token: TokenService) {}

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#3d405b';
    this.elementRef.nativeElement.style.color = '#f4f1de'
  }

  ngOnInit(): void {
    this.ngAfterViewInit()
  }

  logout(): void {
    this.token.logout()
    window.location.reload()
  }
}
