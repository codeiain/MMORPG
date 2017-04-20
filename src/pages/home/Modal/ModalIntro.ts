import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular'

@Component({
    selector:'modal-Intro',
    templateUrl: 'ModalIntro.html'
})
export class ModalIntro{

    constructor( public viewCtrl: ViewController){

    }

    dismiss(){

        this.viewCtrl.dismiss();
        document.getElementById('renderCanvas').click();
    }

}