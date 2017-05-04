import BABYLON from 'babylonjs'
import { SettingsProvider } from '../OptionProviders/SettingsProvider'
export class Controller {

    camera: BABYLON.FreeCamera;


    constructor(camera: BABYLON.FreeCamera) {
        this.camera = camera;
    }

    setKeyboardControls(setting: SettingsProvider) {
        this.camera.keysUp = [setting.getKeyUp()];
        this.camera.keysDown = [setting.getKeyDown()];
        this.camera.keysLeft = [setting.getKeyLeft()];
        this.camera.keysRight = [setting.getKeyRigh()];
    }

    

    fire(evt, pickInfo, weapon) {
        weapon.fire(pickInfo);
    }

}