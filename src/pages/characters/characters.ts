import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Characters } from '../../providers/characters';
import { Storage } from '@ionic/storage';
import { CreateCharacter } from '../create-character/create-character';
/**
 * Generated class for the Characters page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-characters',
  templateUrl: 'characters.html',
})
export class CharactersPage {

  characters: any;
  playerId: String

  constructor(public navCtrl: NavController, public navParams: NavParams, public characterService: Characters, public storage: Storage) {

  }

  ionViewDidLoad() {
    var _self = this;
    this.storage.get('playerId').then((value) => {
      _self.playerId = value;
      this.characterService.getChracters(value).then((data:any) => {
        this.characters = data.characters;
      }, (err) => {
        console.log("not allowed");
      });
    });
  };

  newCharacter(){
    this.navCtrl.push(CreateCharacter);
  }
}
