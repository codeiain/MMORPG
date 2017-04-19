import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavController, MenuController, Events } from 'ionic-angular';
import { SocketService } from '../../providers/socket-service/socket-service';
import BABYLON from 'babylonjs'
import { Game } from '../../providers/GameService/Game'
import { Arena } from '../../providers/GameService/Arena'
import { ModalCharacter } from './Modal/ModalCharacter';
import { SettingsService } from '../../providers/OptionServices/SettingsService'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private game: Game;

  constructor(public settings: SettingsService, public navCtrl: NavController, private socket: SocketService, public menuCtrl: MenuController, public events: Events, public modalCtrl: ModalController) {

  }

  initSockets() {
    this.socket.initialize();
    this.socket.socketService.subscribe(event => {
      //   console.log('message received from server... ', event);
    });
  }

  ngAfterViewInit() {
    this.game = new Game(this.settings);
    this.game.init('renderCanvas');
  }

}
