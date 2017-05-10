import { Component, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CharacterProvider } from '../../../providers/CharacterProviders/CharacterProvider'
import { CharacterStatsProviders } from '../../../providers/CharacterProviders/CharacterStatsProviders';
import { DragulaService, dragula } from "ng2-dragula/ng2-dragula";

@Component({
  selector: 'page-create-character-stats',
  templateUrl: 'stats.html'
})

export class CreatCharacterStats {

  @Output() updateCharacterStats = new EventEmitter();
  stats = [];
  str: string;
  dex: string;
  con: string;
  int: string;
  wis: string;
  cha: string;
  totalStats = [];
  skills:any[];


  constructor(public characterProvider: CharacterProvider, public alertController: AlertController, private navController: NavController, public statService: CharacterStatsProviders, private dragulaService: DragulaService) {
    this.stats = this.statService.getStats();
    this.skills = this.characterProvider.getSkills();
    dragula([document.getElementById('left'), document.getElementById('right')]);
    this.dragulaService.drop.subscribe((el) => {
      if (document.getElementsByClassName('inner')["0"].children["0"]) {
        this.str = document.getElementsByClassName('inner')["0"].children["0"].attributes[1].nodeValue;
        this.updateSkills('str', this.str);
        var x = {
          key: "str",
          value: parseInt(this.str)
        }
        if (!this.contains(this.totalStats, x)) {
          this.totalStats.push(x);
        } else {
          for (let i = 0; i < this.totalStats.length; i++) {
            if (x.key == this.totalStats[i].key) {
              this.totalStats[i] = x;
            }
          }
        }
      }
      if (document.getElementsByClassName('inner')["1"].children["0"]) {
        this.dex = document.getElementsByClassName('inner')["1"].children["0"].attributes[1].nodeValue;
        this.updateSkills('dex', this.dex);
        var x = {
          key: "dex",
          value: parseInt(this.dex)
        }
        if (!this.contains(this.totalStats, x)) {
          this.totalStats.push(x);
        } else {
          for (let i = 0; i < this.totalStats.length; i++) {
            if (x.key == this.totalStats[i].key) {
              this.totalStats[i] = x;
            }
          }
        }
      }
      if (document.getElementsByClassName('inner')["2"].children["0"]) {
        this.con = document.getElementsByClassName('inner')["2"].children["0"].attributes[1].nodeValue;
        this.updateSkills('con', this.con);
        var x = {
          key: "con",
          value: parseInt(this.con)
        }
        if (!this.contains(this.totalStats, x)) {
          this.totalStats.push(x);
        } else {
          for (let i = 0; i < this.totalStats.length; i++) {
            if (x.key == this.totalStats[i].key) {
              this.totalStats[i] = x;
            }
          }
        }
      }
      if (document.getElementsByClassName('inner')["3"].children["0"]) {
        this.int = document.getElementsByClassName('inner')["3"].children["0"].attributes[1].nodeValue;
        this.updateSkills('int', this.int);
        var x = {
          key: "int",
          value: parseInt(this.int)
        }
        if (!this.contains(this.totalStats, x)) {
          this.totalStats.push(x);
        } else {
          for (let i = 0; i < this.totalStats.length; i++) {
            if (x.key == this.totalStats[i].key) {
              this.totalStats[i] = x;
            }
          }
        }
      }
      if (document.getElementsByClassName('inner')["4"].children["0"]) {
        this.wis = document.getElementsByClassName('inner')["4"].children["0"].attributes[1].nodeValue;
        this.updateSkills('wis', this.wis);
        var x = {
          key: "wis",
          value: parseInt(this.wis)
        }
        if (!this.contains(this.totalStats, x)) {
          this.totalStats.push(x);
        } else {
          for (let i = 0; i < this.totalStats.length; i++) {
            if (x.key == this.totalStats[i].key) {
              this.totalStats[i] = x;
            }
          }
        }
      }
      if (document.getElementsByClassName('inner')["5"].children["0"]) {
        this.cha = document.getElementsByClassName('inner')["5"].children["0"].attributes[1].nodeValue;
        this.updateSkills('cha', this.cha);
        var x = {
          key: "cha",
          value: parseInt(this.cha)
        }
        if (!this.contains(this.totalStats, x)) {
          this.totalStats.push(x);
        } else {
          for (let i = 0; i < this.totalStats.length; i++) {
            if (x.key == this.totalStats[i].key) {
              this.totalStats[i] = x;
            }
          }
        }
      }
      if (this.totalStats.length == 6) {

        this.updateCharacterStats.emit(this.totalStats);
      }
    });
  }

  updateSkills(baseStat, value){
    for (let x =0; x< this.skills.length; x++ ){
      if (this.skills[x].baseSkill == baseStat){
        this.skills[x].value = this.characterProvider.calculateModifier(value);
      }
    }
  }

  contains(a, obj) {
    var i = a.length;
    while (i--) {
      if (a[i].key === obj.key) {
        return true;
      }
    }
    return false;
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