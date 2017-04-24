import BABYLON from 'babylonjs'
import { SettingsService } from '../OptionServices/SettingsService'
export class Controller {

    camera: BABYLON.FreeCamera;


    constructor(camera: BABYLON.FreeCamera) {
        this.camera = camera;
    }

    setKeyboardControls(setting: SettingsService) {
        this.camera.keysUp = [setting.getKeyUp()];
        this.camera.keysDown = [setting.getKeyDown()];
        this.camera.keysLeft = [setting.getKeyLeft()];
        this.camera.keysRight = [setting.getKeyRigh()];
    }

    

    fire(evt, pickInfo, weapon) {
        weapon.fire(pickInfo);
    }

}