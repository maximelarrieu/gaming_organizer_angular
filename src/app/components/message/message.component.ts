import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service'
import { TokenService } from "../../services/token.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  currentUser: any
  form: any = {
    sender: null,
    message: null,
  };
  messages: any;

  constructor(
    private messageService: MessageService,
    private token: TokenService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser()
    this.getMessages()
  }

  getMessages(): void {
    this.messageService.getAll()
      .subscribe(
        data => {
          this.messages = data
        },
        err => {
          console.log(err)
        }
      )
  }

  onSubmit(): void {
    const { message } = this.form
    this.messageService.send(this.currentUser.id, message, Date.now())
      .subscribe(
        data => {
          console.log(data)
          this.getMessages()
        },
        error => {
          console.log(error)
        }
      )
  }

}
