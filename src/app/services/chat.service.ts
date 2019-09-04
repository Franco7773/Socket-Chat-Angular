import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( private wsService: WebsocketService ) { }

  sendMessage( message: string ) {

    const payload = {
      from: this.wsService.getUsuarioAuth().nombre,
      msg: message
    };

    this.wsService.emit( 'sendMessage', payload );
  }

  getMessages() {

    return this.wsService.listen('new-message');
  }

  getMessagesPrivate() {
    return this.wsService.listen( 'private-message' );
  }
}
