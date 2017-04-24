import { Component } from '@angular/core';
import { ModalController, NavController, MenuController, Events } from 'ionic-angular';
import { SocketService } from '../../providers/socket-service/socket-service';
import { Game } from '../../providers/GameService/Game'
import { ModalIntro } from './Modal/ModalIntro';
import { SettingsService } from '../../providers/OptionServices/SettingsService'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private game: Game;

  constructor(public settings: SettingsService, public navCtrl: NavController, private socket: SocketService, public menuCtrl: MenuController, public events: Events, public modalCtrl: ModalController) {

  }
  ngOnInit() {
    const modal = this.modalCtrl.create(ModalIntro);
    modal.present();
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
