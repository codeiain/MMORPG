import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormWizardModule } from 'angular2-wizard';

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

  isCompleted: boolean = false;

  onStep1Next(event) {
    console.log('Step1 - Next');
  }

  onStep2Next(event) {
    console.log('Step2 - Next');
  }

  onStep3Next(event) {
    console.log('Step3 - Next');
  }
  onStep4Next(event){
    console.log('Step4 - Next');
  }
  onStep5Next(event){
    console.log('Step4 - Next');
  }
  onComplete(event) {
    this.isCompleted = true;
  }

  onStepChanged(step) {
    console.log('Changed to ' + step.title);
  }

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
      cha: 0,
      con: 0,
      dex: 0,
      int: 0,
      str: 0,
      wis: 0,
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

  validateData() {
    if (this.NewCharcter.name == null) {
      throw Error('Character Name is required');
    }
  }

}
