import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, MenuController, Events } from 'ionic-angular';
import { SocketService } from '../../providers/socket-service/socket-service';
import { GameMain } from '../../providers/GameService/GameMain'
import BABYLON from 'babylonjs'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('renderCanvas') renderCanvas;
  _gameMain: GameMain;
  constructor(public navCtrl: NavController, private socket: SocketService, public menuCtrl: MenuController, public events: Events, public gameMain: GameMain) {
    this._gameMain = gameMain;

    events.subscribe('menu:opened', () => {
      var vjcanvas = document.getElementsByTagName("canvas")[1];
      vjcanvas.style.display = "none";
    });

    events.subscribe('menu:closed', () => {
      var vjcanvas = document.getElementsByTagName("canvas")[1];
      vjcanvas.style.display = "block";
    });
  }

  initSockets() {
    this.socket.initialize();
    this.socket.socketService.subscribe(event => {
      //   console.log('message received from server... ', event);
    });
  }

  ngAfterViewInit() {
    this._gameMain.init('renderCanvas');
    this._gameMain.createScene();
    this._gameMain.animate();
  }

}
