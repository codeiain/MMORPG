import { Component } from '@angular/core';
import { ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'ModalCharacter.html'
})
export class SampleModalPage {

  constructor(private viewCtrl: ViewController) {
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}