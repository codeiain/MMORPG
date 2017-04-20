import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'modal-Character',
  templateUrl: 'ModalCharacter.html'
})
export class ModalCharacter {

  constructor(
    public viewCtrl: ViewController) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}