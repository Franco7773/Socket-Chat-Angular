import { Component, OnInit, OnDestroy, Inject, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  @ViewChild('chatMsg', { static: false }) public chatMsg: ElementRef;
  public texto: string;
  public mensajes: any[] = [];
  public element: HTMLElement;
  private subscription: Subscription;

  constructor( private chatService: ChatService ) { }

  ngOnInit() {
    this.subscription = this.chatService.getMessages().subscribe( msg => {

      this.mensajes.push( msg );

      this.element = this.chatMsg.nativeElement as HTMLElement;
      setTimeout(() => {

        const value = this.element.scrollHeight;
        const options: ScrollToOptions = { top: value };

        this.element.scrollTo(options);
      }, 50);

    });
  }

  enviar() {

    if (this.texto.trim().length === 0) {
      return;
    }

    this.chatService.sendMessage( this.texto );
    this.texto = '';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
