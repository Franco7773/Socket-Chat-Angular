import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WebsocketService } from '../websocket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private wsService: WebsocketService, private router: Router ) { }

  canActivate(): boolean  {

    if (this.wsService.getUsuarioAuth()) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
