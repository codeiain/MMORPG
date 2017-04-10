import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocketService } from '../../providers/socket-service/socket-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private socket: SocketService) {
    this.socket.initialize();
    this.socket.socketService.subscribe(event => {
      console.log('message received from server... ', event);
    });
  }

}
