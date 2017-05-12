import { Component, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CharacterApiProvider } from '../../../providers/CharacterProviders/CharacterApiProvider'


@Component({
  selector: 'page-create-character-name',
  templateUrl: 'name.html',
})
export class CreatCharacterName {
  @Output() updateCharacterName = new EventEmitter();
  isValid: string = "form-control-danger";
  isValidGroup: string = "has-danger";


  constructor(public apiProvider: CharacterApiProvider) { }

  valuechange(newValue) {
    var _self = this;
    this.updateCharacterName.emit(newValue);
    this.apiProvider.verifyCharacterName(newValue).then((value: any) => {
      if (value.name.length == 0) {
        _self.isValid = "form-control-success"
        _self.isValidGroup = "has-success"
      } else {
        _self.isValid = "form-control-danger"
        _self.isValidGroup = "has-danger"
      }
    }, (err) => {
      _self.isValid = "form-control-danger";
      _self.isValidGroup = "has-danger"
    })

  }

}