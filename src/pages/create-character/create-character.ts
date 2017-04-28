import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Characters } from '../../providers/characters';
import { iCharcter } from '../../interfaces/iCharacter';
import { CharactersPage } from '../characters/characters';

import { CreatCharacterName } from './components/name';
import { CreatCharacterClasses } from './components/classes';
import { CreatCharacterRace } from './components/race';
import { CreatCharacterStats } from './components/stats';


@Component({
  selector: 'page-create-character',
  templateUrl: 'create-character.html',
})
export class CreateCharacter {

  shownGroup = null;
  NewCharcter: iCharcter;


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public characterService: Characters) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCharacter');
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };
  save() {
    var _self = this;
    this.storage.get('playerId').then((value) => {
      _self.NewCharcter = {
        name: "test1",
        playerId: value,
        Cha: 1,
        Con: 2,
        Dex: 3,
        Int: 4,
        Str: 5,
        Wis: 6,
        Inventory: []
      }

      _self.characterService.createCharacter(_self.NewCharcter).then((result) => {
        this.navCtrl.setRoot(CharactersPage);
      }, (err) => {
        if (err.stats = 422){
          var reason = JSON.parse(err._body)
          alert (reason.error);
        }
        console.log(err);
      });
    });
  }
}
