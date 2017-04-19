import BABYLON from 'babylonjs'
import { SettingsService } from '../OptionServices/SettingsService'
export class Controller {

    camera: BABYLON.FreeCamera;

    constructor(camera: BABYLON.FreeCamera) {
        this.camera = camera;
    }

    setKeyboardControls(setting: SettingsService) {
        // cam.keysUp = [90]; // Z
        // cam.keysDown = [83]; // S
        // cam.keysLeft = [81]; // Q
        // cam.keysRight = [68]; // D
    }



}