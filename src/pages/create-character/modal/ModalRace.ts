import { Component } from '@angular/core';
import{ ViewController, NavParams } from 'ionic-angular'

@Component({
    selector:'modal-race',
    templateUrl:'ModalRace.html'
})
export class ModalRace{

    selectedRace:any;

    constructor(public viewCtrl: ViewController, params: NavParams){
        this.selectedRace = params.get('race');
    }

    dismiss(){
        this.viewCtrl.dismiss();
    }
}