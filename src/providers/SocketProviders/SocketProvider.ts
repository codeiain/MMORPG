import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';

/*
  Generated class for the SocketService provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SocketProvider {
  socketObserver: any; 
  socketService: any;
  socket: any;
  user: any;
  data: any = null;
  socketHost: string = 'http://localhost:3000';

  constructor() {
    this.socketService = Observable.create(observer => {
        this.socketObserver = observer;
      });
  }


  initialize(){
    this.socket = io.connect(this.socketHost);
    
    this.socket.on("connect", (msg) => {
      console.log('on connect');
      this.socketObserver.next({ category: 'connect', message: 'user connected'});
    });

    this.socket.on("reconnecting", (msg) => {
      console.log('on reconnecting');
    });

    this.socket.on("reconnect_error", (msg) => {
      console.log('on reconnect_error');
    });
    
    this.socket.on("reconnect_failed", (msg) => {
      console.log('on reconnect_failed');
    });

     this.socket.on('disconnect', function () {
      console.log('user disconnected');
      // io.emit('user disconnected');
    });

    this.socket.on("message", (msg) => {
      this.socketObserver.next({ category: 'message', message: msg });
    }); //end of socket.on('message')


  }

  sendMessage(message: string) {
    // console.log('in sendMessage and socket is: ', this.socket);
    this.socket.emit('message', message);
    this.socketObserver.next({ category: 'sendMessage', message: message });

  }

}