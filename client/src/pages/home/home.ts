import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavController, MenuController, Events } from 'ionic-angular';
import { SocketService } from '../../providers/socket-service/socket-service';
import BABYLON from 'babylonjs'
import { Game } from '../../providers/GameService/Game'
import { Arena } from '../../providers/GameService/Arena'
import { ModalCharacter } from './Modal/ModalCharacter';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private game: Game;

  constructor(public navCtrl: NavController, private socket: SocketService, public menuCtrl: MenuController, public events: Events, public modalCtrl: ModalController) {

    events.subscribe('menu:opened', () => {
      var vjcanvas = document.getElementsByTagName("canvas")[1];
      vjcanvas.style.display = "none";
    });

    events.subscribe('menu:closed', () => {
      var ionModal = document.getElementsByTagName("ion-modal")[0];
      if (!ionModal) {
        var vjcanvas = document.getElementsByTagName("canvas")[1];
        vjcanvas.style.display = "block";
      }
    });
  }

  initSockets() {
    this.socket.initialize();
    this.socket.socketService.subscribe(event => {
      //   console.log('message received from server... ', event);
    });
  }

  fire(event) {
    this.game.player.fire();
  }

  ngAfterViewInit() {
    this.game = new Game()
    this.game.init('renderCanvas');
  }

}
