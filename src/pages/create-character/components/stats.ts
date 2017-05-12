import { Component, Output, EventEmitter, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CharacterProvider } from '../../../providers/CharacterProviders/CharacterProvider'
import { CharacterStatsProviders } from '../../../providers/CharacterProviders/CharacterStatsProviders';
import { DragulaService, dragula } from "ng2-dragula/ng2-dragula";
import { iCharcter } from '../../../interfaces/iCharacter';
@Component({
  selector: 'page-create-character-stats',
  templateUrl: 'stats.html'
})

export class CreatCharacterStats {

  @Output() updateCharacterStats = new EventEmitter();
  currentCharacter: iCharcter;
  skills: any[];
  stats: any;

  constructor(
    public characterProvider: CharacterProvider,
    public alertController: AlertController,
    private navController: NavController,
    public statService: CharacterStatsProviders,
    private dragulaService: DragulaService,
    private zone: NgZone) {

    this.stats = this.statService.getStats();
    this.currentCharacter = characterProvider.getCurrentCharacter();
    this.skills = this.characterProvider.getSkills();

    var drake = dragula([document.getElementById('left'), document.getElementById('right')]);
    this.dragulaService.drop.subscribe((el) => {

      var dropped = el[2];
      if (dropped.className == "tray") {
        return;
      }
      var stat = dropped.getAttribute('data-stat');
      var value = parseInt(dropped.children["0"].attributes[1].value);
      this.updateSkills(stat, value);
      switch (stat) {
        case "str":
          this.currentCharacter.str = value;
          break;
        case "dex":
          this.currentCharacter.dex = value;
          break;
        case "con":
          this.currentCharacter.con = value;
          break;
        case "int":
          this.currentCharacter.int = value;
          break;
        case "wis":
          this.currentCharacter.wis = value;
          break;
        case "cha":
          this.currentCharacter.cha = value;
          break;
      }
    });
  }

  updateSkills(baseStat, value) {
    for (let x = 0; x < this.skills.length; x++) {
      if (this.skills[x].baseSkill == baseStat) {
        this.skills[x].value = this.characterProvider.calculateModifier(value);
      }
    }
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

  regenerateStats() {
    var die = document.getElementsByClassName('die')[0];
    var tray = document.getElementsByClassName('tray')[0];
    var inners = document.getElementsByClassName('inner');
    for (let x = 0; x < inners.length; x++) {
      inners[x].innerHTML = null;
    }

    /*tray.removeChild(tray.childNodes[6]);
    tray.removeChild(tray.childNodes[5]);
    tray.removeChild(tray.childNodes[4]);
    tray.removeChild(tray.childNodes[3]);
    tray.removeChild(tray.childNodes[2]);
    tray.removeChild(tray.childNodes[1]);*/


    this.stats = null;//this.statService.getStats();
    this.stats = this.statService.getStats();

    this.zone.run(() => { });
  }

}