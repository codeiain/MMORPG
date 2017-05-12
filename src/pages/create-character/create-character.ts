import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormWizardModule } from 'angular2-wizard';

import { CharacterProvider } from '../../providers/CharacterProviders/CharacterProvider';
import { CharacterApiProvider } from '../../providers/CharacterProviders/CharacterApiProvider';

import { iCharcter } from '../../interfaces/iCharacter';
import { CharactersPage } from '../characters/characters';

import { CreatCharacterName } from './components/name';
import { CreatCharacterClasses } from './components/classes';
import { CreatCharacterRace } from './components/race';
import { CreatCharacterStats } from './components/stats';
import { CreateCharacterGeneder } from './components/gender';
import { CreateCharacterSkills } from './components/skills';
import { CharacterDisplayProvider } from '../../providers/CharacterProviders/CharacterDisplayProvider'
@Component({
  selector: 'page-create-character',
  templateUrl: 'create-character.html',
})
export class CreateCharacter {
  @ViewChild(CreateCharacterSkills) mySon: CreateCharacterSkills;
  isCompleted: boolean = false;
  stats: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public characterProvider: CharacterProvider,
    public characterApiService: CharacterApiProvider, public displayService: CharacterDisplayProvider) {
    this.NewCharcter = this.characterProvider.CreateEmptyCharacter();
    this.characterProvider.setCurrentCharacter(this.NewCharcter);
  }

  preSkillStep(event) {
    this.mySon.updateSkills();
    //this.characterProvider.getSkills();
  }
  onComplete(event) {
    this.isCompleted = true;
  }


  shownGroup = null;
  NewCharcter: iCharcter;




  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCharacter');
    let canvas = <HTMLCanvasElement>document.getElementById("displayCharacter1");
    this.displayService.init(canvas);
    this.displayService.displayMesh("Female", "DanceMoves");
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

      _self.characterApiService.createCharacter(_self.NewCharcter).then((result) => {
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
    this.characterProvider.setCurrentCharacter(this.NewCharcter);

  }

  handleUpdateCharacterGender(characterGender) {
    this.NewCharcter.gender = characterGender;
    if (characterGender == "Male") {
      this.displayService.displayMesh("Male", "Dude");
    } else {
      this.displayService.displayMesh("Female", "DanceMoves");
    }

  }
  handleUpdateCharacterStats(stats) {
    this.stats = stats;
    for (let x = 0; x < stats.length; x++) {
      switch (stats[x].key) {
        case "str":
          this.NewCharcter.str = stats[x].value;
          break;
        case "dex":
          this.NewCharcter.dex = stats[x].value;
          break;
        case "con":
          this.NewCharcter.con = stats[x].value;
          break;
        case "int":
          this.NewCharcter.int = stats[x].value;
          break;
        case "wis":
          this.NewCharcter.wis = stats[x].value;
          break;
        case "cha":
          this.NewCharcter.cha = stats[x].value;
          break;

      }
    }
    this.characterProvider.setCurrentCharacter(this.NewCharcter);
  }

  validateData() {
    if (this.NewCharcter.name == null) {
      throw Error('Character Name is required');
    }
  }

}
