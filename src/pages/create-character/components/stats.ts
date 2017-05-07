import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CharacterStatsProviders } from '../../../providers/CharacterProviders/CharacterStatsProviders';
import { DragulaService, dragula } from "ng2-dragula/ng2-dragula";

@Component({
  selector: 'page-create-character-stats',
  templateUrl: 'stats.html'
})

export class CreatCharacterStats {

  stats = [];
  str: string;
  dex: string;
  con: string;
  int: string;
  wis: string;
  cha: string;
  q1 = [];
  q2 = [];

  constructor(public alertController: AlertController, private navController: NavController, public statService: CharacterStatsProviders, private dragulaService: DragulaService) {
    for (var i = 0; i < 20; i++) {
      this.q1.push("1. <" + i + ">");
      this.q2.push("2. <" + i + ">");
    }
    this.stats = this.statService.getStats();
    dragula([document.getElementById('left'), document.getElementById('right')]);
    this.dragulaService.drop.subscribe((value) => {
      let alert = this.alertController.create({
        title: 'Item moved',
        subTitle: 'So much fun!',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  ngOnInit() {

  }



  ionViewDidLoad() {



  }
  ngAfterViewInit() {
    var $die = document.getElementsByClassName('.die'),
      sides = 20,
      initialSide = 1,
      lastFace,
      timeoutId,
      transitionDuration = 500,
      animationDuration = 3000
  }

}