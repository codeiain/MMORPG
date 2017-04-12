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
    var vjcanvas = document.getElementsByTagName("canvas")[1];
    vjcanvas.style.display = "block";
    this.viewCtrl.dismiss();
  }
  ngAfterViewInit() {
    var vjcanvas = document.getElementsByTagName("canvas")[1];
    vjcanvas.style.display = "none";
  }
}