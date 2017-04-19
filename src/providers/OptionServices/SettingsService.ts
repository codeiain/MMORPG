import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class SettingsService {

    public KeyUp: number = 119;
    public KeyDown: number =115;
    public KeyLeft: number = 97;
    public KeyRight: number = 100;


    constructor() {

    }

    setKeyUp(keyCode: number) {
        this.KeyUp = keyCode;
    }
    getKeyUp(): number {
        return this.KeyUp;
    }

    setKeyDown(keyCode: number) {
        this.KeyDown = keyCode;
    }
    getKeyDown(): number {
        return this.KeyDown;
    }
    setKeyLeft(keyCode: number) {
        this.KeyLeft = keyCode;
    }
    getKeyLeft(): number {
        return this.KeyLeft;
    }

    setKeyRight(keyCode: number) {
        this.KeyRight = keyCode;
    }
    getKeyRigh(): number {
        return this.KeyRight;
    }
}