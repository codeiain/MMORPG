import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CharacterApiProvider } from '../../providers/CharacterProviders/CharacterApiProvider';
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


  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public storage: Storage, 
      public characterService: CharacterApiProvider) {
    this.NewCharcter = {
      name: null,
      playerId: null,
      Cha: 0,
      Con: 0,
      Dex: 0,
      Int: 0,
      Str: 0,
      Wis: 0,
      Inventory: []
    }

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
    this.validateData();
    var _self = this;
    this.storage.get('playerId').then((value) => {
      _self.NewCharcter.playerId = value;

      _self.characterService.createCharacter(_self.NewCharcter).then((result) => {
        this.navCtrl.setRoot(CharactersPage);
      }, (err) => {
        if (err.stats = 422) {
          var reason = JSON.parse(err._body)
          alert(reason.error);
        }
        console.log(err);
      });
    });
  }

  handleUpdateCharacterName(characterName) {
    this.NewCharcter.name = characterName
  }

  validateData(){
    if (this.NewCharcter.name == null){
      throw Error('Character Name is required');
    }
  }

}
