import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { RaceProvider } from '../../../providers/raceProvider'
import { ModalRace } from '../modal/ModalRace';
@Component({
    selector: 'page-create-character-race',
    templateUrl: 'race.html',
})
export class CreatCharacterRace {
    keysGetter = Object.keys;
    races: Array<any>;
    grid: Array<Array<string>>;
    matrix:any;
    shownGroup = null;
    constructor(public raceService: RaceProvider, public modalCtrl: ModalController) {

    }
    ngOnInit() {
        var _self = this;
        this.raceService.getAllRaces().then((data: any) => {
           
            _self.races = this.raceService.groupByArray(data.races, "type");
            for(var x =0; x != _self.races.length; x++ ){
                    _self.races[x].values = this.listToMatrix(_self.races[x].values, 3);
            }
            console.log(_self.races);
            //_self.matrix = _self.listToMatrix(_self.races, 3);
        })
    }
    listToMatrix(list, elementsPerSubArray) {
        var matrix = [], i, k;

        for (i = 0, k = -1; i < list.length; i++) {
            if (i % elementsPerSubArray === 0) {
                k++;
                matrix[k] = [];
            }

            matrix[k].push(list[i]);
        }

        return matrix;
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

  raceClicked(race){
      const modal = this.modalCtrl.create(ModalRace, {race:race});
      modal.present();
  }
}

