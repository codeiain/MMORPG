import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CharacterProvider } from '../../../providers/CharacterProviders/CharacterProvider';
@Component({
    selector: 'page-create-character-skills',
    templateUrl: 'skills.html'
})
export class CreateCharacterSkills {

    stats: any[];
    skills: any[];


    constructor(public characterProvider: CharacterProvider) {
        var currentCharacter = characterProvider.getCurrentCharacter();

        this.skills = characterProvider.getSkills();


    }
    getVal(baseType) {
        let stat = 0;

        return stat;
    };

    ngOnInit() {
        console.log('ngOnInit');

    }
    ngAfterContentInit() {
        console.log('ngAfterContentInit')
    };
    ionViewDidLoad() {
        console.log('ionViewDidLoad');
    }
    ionViewWillEnter() {
        console.log('ionViewWillEnter');
    }
    ionViewDidEnter() {
        console.log('ionViewDidEnter');
    }
    ionViewWillLeave() {
        console.log('ionViewWillLeave');
    }
    ionViewDidLeave() {
        console.log('ionViewDidLeave');
    }
    ionViewWillUnload() {
        console.log('ionViewWillUnload');
    }


    contains(a, obj) {
        var i = a.length;
        while (i--) {
            if (a[i].key === obj.key) {
                return true;
            }
        }
        return false;
    };
}