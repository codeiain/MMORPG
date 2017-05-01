import { Component, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-create-character-name',
  templateUrl: 'name.html',
})
export class CreatCharacterName {
  @Output() updateCharacterName = new EventEmitter();

  valuechange(newValue) {
    this.updateCharacterName.emit(newValue);
  }

}