import { Injectable } from '@angular/core';


@Injectable()
export class SettingsService {

    public KeyUp: number = 87;
    public KeyDown: number = 83;
    public KeyLeft: number = 65;
    public KeyRight: number = 68;


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