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

    updateSkills(){
        this.skills = this.characterProvider.getSkills();
    }

}