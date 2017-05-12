import { Component } from '@angular/core';
import { ModalController, NavController, MenuController, Events } from 'ionic-angular';
import { SocketProvider } from '../../providers/SocketProviders/SocketProvider';
import { Game } from '../../providers/GameService/Game'
import { ModalIntro } from './Modal/ModalIntro';
import { SettingsProvider } from '../../providers/OptionProviders/SettingsProvider'
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { CharacterProvider } from '../../providers/CharacterProviders/CharacterProvider';
import { iCharcter } from '../../interfaces/iCharacter';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private game: Game;
  private character: iCharcter

  constructor(public settings: SettingsProvider, public navCtrl: NavController, private socket: SocketProvider, public menuCtrl: MenuController, public events: Events, public modalCtrl: ModalController, public characterProvider: CharacterProvider) {
    this.character = characterProvider.getCurrentCharacter();
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
