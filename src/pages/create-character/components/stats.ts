import { Component, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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

  constructor(public alertController: AlertController, private navController: NavController, public statService: CharacterStatsProviders, private dragulaService: DragulaService) {
    this.stats = this.statService.getStats();
    dragula([document.getElementById('left'), document.getElementById('right')]);
    this.dragulaService.drop.subscribe((el) => {
      if (document.getElementsByClassName('inner')["0"].children["0"]) {
        this.str = document.getElementsByClassName('inner')["0"].children["0"].attributes[1].nodeValue;
        var x = {
          key: "str",
          value: this.str
        }
        if (!this.contains(this.totalStats, x)) {
          this.totalStats.push(x);
        } else {
          for (let i = 0; i < this.totalStats.length; i++) {
            this.totalStats[i] = x;
          }
        }
      }
      if (document.getElementsByClassName('inner')["1"].children["0"]) {
        this.dex = document.getElementsByClassName('inner')["1"].children["0"].attributes[1].nodeValue;
        var x = {
          key: "dex",
          value: this.dex
        }
        if (!this.contains(this.totalStats, x)) {
          this.totalStats.push(x);
        } else {
          for (let i = 0; i < this.totalStats.length; i++) {
            this.totalStats[i] = x;
          }
        }
      }
      if (document.getElementsByClassName('inner')["2"].children["0"]) {
        this.con = document.getElementsByClassName('inner')["2"].children["0"].attributes[1].nodeValue;
        var x = {
          key: "con",
          value: this.con
        }
        if (!this.contains(this.totalStats, x)) {
          this.totalStats.push(x);
        } else {
          for (let i = 0; i < this.totalStats.length; i++) {
            this.totalStats[i] = x;
          }
        }
      }
      if (document.getElementsByClassName('inner')["3"].children["0"]) {
        this.int = document.getElementsByClassName('inner')["3"].children["0"].attributes[1].nodeValue;
        var x = {
          key: "int",
          value: this.int
        }
        if (!this.contains(this.totalStats, x)) {
          this.totalStats.push(x);
        } else {
          for (let i = 0; i < this.totalStats.length; i++) {
            this.totalStats[i] = x;
          }
        }
      }
      if (document.getElementsByClassName('inner')["4"].children["0"]) {
        this.wis = document.getElementsByClassName('inner')["4"].children["0"].attributes[1].nodeValue;
        var x = {
          key: "wis",
          value: this.wis
        }
        if (!this.contains(this.totalStats, x)) {
          this.totalStats.push(x);
        } else {
          for (let i = 0; i < this.totalStats.length; i++) {
            this.totalStats[i] = x;
          }
        }
      }
      if (document.getElementsByClassName('inner')["5"].children["0"]) {
        this.cha = document.getElementsByClassName('inner')["5"].children["0"].attributes[1].nodeValue;
        var x = {
          key: "cha",
          value: this.cha
        }
        if (!this.contains(this.totalStats, x)) {
          this.totalStats.push(x);
        } else {
          for (let i = 0; i < this.totalStats.length; i++) {
            this.totalStats[i] = x;
          }
        }
      }
      if (this.totalStats.length == 6) {
        this.updateCharacterStats.emit(this.totalStats);
      }
    });
  }

  ngOnInit() {

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