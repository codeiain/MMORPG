import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CharacterApiProvider } from '../../providers/CharacterProviders/CharacterApiProvider';
import { Storage } from '@ionic/storage';
import { CreateCharacter } from '../create-character/create-character';
import { CharacterDisplayProvider } from '../../providers/CharacterProviders/CharacterDisplayProvider'

@Component({
  selector: 'page-characters',
  templateUrl: 'characters.html',
})
export class CharactersPage {

  characters: any;
  playerId: String

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public characterService: CharacterApiProvider,
    public storage: Storage,
    public displayService: CharacterDisplayProvider
  ) {

  }

  ionViewDidLoad() {
    var _self = this;
    this.storage.get('playerId').then((value) => {
      _self.playerId = value;
      this.characterService.getChracters(value).then((data: any) => {
        this.characters = data.characters;
        let canvas = <HTMLCanvasElement>document.getElementById("displayCharacter");
        this.displayService.init(canvas);
        this.displayService.displayMesh("Female","DanceMoves");
      }, (err) => {
        console.log("not allowed");
      });
    });
  };

  newCharacter() {
    this.navCtrl.push(CreateCharacter);
  }
}
