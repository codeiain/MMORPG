import { Component } from '@angular/core';
import { ModalController, NavController, MenuController, Events } from 'ionic-angular';
import { SocketProvider } from '../../providers/SocketProviders/SocketProvider';
import { Game } from '../../providers/GameService/Game'
import { ModalIntro } from './Modal/ModalIntro';
import { SettingsProvider } from '../../providers/OptionProviders/SettingsProvider'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private game: Game;

  constructor(public settings: SettingsProvider, public navCtrl: NavController, private socket: SocketProvider, public menuCtrl: MenuController, public events: Events, public modalCtrl: ModalController) {

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
