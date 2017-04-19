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

    PointerLock(canvas: HTMLCanvasElement) {
        //     var _this = this;
        //     // Request pointer lock
        //     var canvas = this.scene.getEngine().getRenderingCanvas();
        //     canvas.addEventListener("click", function (evt) {
        //         canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
        //         if (canvas.requestPointerLock) {
        //             canvas.requestPointerLock();
        //         }
        //     }, false);

        //     // Event listener when the pointerlock is updated.
        //     var pointerlockchange = function (event) {
        //         _this.controlEnabled = (document.mozPointerLockElement === canvas || document.webkitPointerLockElement === canvas || document.msPointerLockElement === canvas || document.pointerLockElement === canvas);
        //         if (!_this.controlEnabled) {
        //             _this.camera.detachControl(canvas);
        //         } else {
        //             _this.camera.attachControl(canvas);
        //         }
        //     };
        //     document.addEventListener("pointerlockchange", pointerlockchange, false);
        //     document.addEventListener("mspointerlockchange", pointerlockchange, false);
        //     document.addEventListener("mozpointerlockchange", pointerlockchange, false);
        //     document.addEventListener("webkitpointerlockchange", pointerlockchange, false);
        // }
    }

    fire(evt, pickInfo, weapon) {
       weapon.fire(pickInfo);
    }

}