import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavController, MenuController, Events } from 'ionic-angular';
import { SocketService } from '../../providers/socket-service/socket-service';
import BABYLON from 'babylonjs'
import { Game } from '../../providers/GameService/Game'
import { Arena } from '../../providers/GameService/Arena'
import { SampleModalPage } from './Modal/ModalCharacter.html';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private socket: SocketService, public menuCtrl: MenuController, public events: Events, public modalCtrl: ModalController) {


    events.subscribe('menu:opened', () => {
      var vjcanvas = document.getElementsByTagName("canvas")[1];
      vjcanvas.style.display = "none";
    });

    events.subscribe('menu:closed', () => {
      var vjcanvas = document.getElementsByTagName("canvas")[1];
      vjcanvas.style.display = "block";
    });
  }

  public showModal() {
    const modal = this.modalCtrl.create(SampleModalPage);
    modal.present();
  }

  initSockets() {
    this.socket.initialize();
    this.socket.socketService.subscribe(event => {
      //   console.log('message received from server... ', event);
    });
  }

  ngAfterViewInit() {
    let game = new Game()
    game.init('renderCanvas');
  }

}
