import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'page-create-character-gender',
    templateUrl: 'gender.html'
})
export class CreateCharacterGeneder {

    @Output() updateCharacterGender = new EventEmitter();
    gender: string;

    constructor() { }

    setGender(value: string) {
        this.gender = value;
        this.updateCharacterGender.emit(value);
    }
}