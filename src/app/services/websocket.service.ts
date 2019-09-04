import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus: boolean = false;
  public usuario: Usuario = null;

  constructor( private socket: Socket ) {

    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      this.socketStatus = true;
      console.log('Conectado al servidor');
    });

    this.socket.on('disconnect', () => {
      this.socketStatus = false;
      console.log('Desconectado del servidor');
    });
  }

  emit( evento: string, payload?: any, callback?: ( arg: object) => any ) {
    console.log('Emitiendo: ', evento);
    this.socket.emit( evento, payload, callback );
  }

  listen( evento: string ) {

    return this.socket.fromEvent( evento );
  }

  loginWS( nombre: string ) {

    return new Promise( (resolve, reject) => {

      this.emit('user-config', { user: nombre }, resp => {

        this.usuario = new Usuario( nombre );

        this.guardarStorage();
        resolve();
      });
    });
  }

  getUsuarioAuth() {
    return this.usuario;
  }

  guardarStorage() {
    localStorage.setItem( 'usuario', JSON.stringify( this.usuario ));
  }
  cargarStorage() {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loginWS( this.usuario.nombre );
    }
  }
}
