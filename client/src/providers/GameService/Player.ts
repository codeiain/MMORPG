import BABYLON from 'babylonjs'
import { Game } from './Game'
import { Weapon } from './Weapon'
import { Injectable } from '@angular/core'

@Injectable()
export class Player {

    private _spawnPoint: BABYLON.Vector3;
    private _scene: BABYLON.Scene;
    private _game: Game;
    private _height: number = 2;
    private _speed: number = 1;
    private _inertia: number = 0.9;
    private _angularInertia: number = 0;
    private _angularSensibility: number = 1000;
    public _camera: BABYLON.Camera;
    private _controlEnabled = false;
    private _weapon: Weapon;


    constructor(game: Game, spawnPoint?: BABYLON.Vector3) {
        let _self = this;
        if (!spawnPoint) {
            this._spawnPoint = new BABYLON.Vector3(0, 10, -10);
        } else {
            this._spawnPoint = spawnPoint;
        }
        _self._game = game;
        _self._scene = game.scene;
        this._camera = this.initCamera();
        this._weapon = new Weapon(_self._game, _self);

        var canvas = _self._scene.getEngine().getRenderingCanvas();

        // canvas.addEventListener("click", function (evt) {
        //     var width = _this.scene.getEngine().getRenderWidth();
        //     var height = _this.scene.getEngine().getRenderHeight();

        //     if (_this.controlEnabled) {
        //         var pickInfo = _this.scene.pick(width / 2, height / 2, null, false, _this.camera);
        //         _this.handleUserMouse(evt, pickInfo);
        //     }
        // }, false);

        this.initPointerLock();

        var s = BABYLON.Mesh.CreateSphere("player2", 16, 4, this._scene);
        s.position.y = 10;
        s.registerBeforeRender(function () {
            s.position.x = _self._camera.position.x;
            s.position.z = _self._camera.position.z;
        })

        var red = new BABYLON.StandardMaterial("red", this._scene);
        red.diffuseColor = BABYLON.Color3.Red();
        red.specularColor = BABYLON.Color3.Black();
        s.material = red;
        s.layerMask = 1;

        this._scene.activeCameras.push(this._camera);
        this._scene.activeCamera = this._camera;
    }

    initPointerLock() {
        var _self = this;
        let canvas = <HTMLCanvasElement>_self._scene.getEngine().getRenderingCanvas();
        canvas.addEventListener("click", function (evt) {
            if (canvas.requestPointerLock) {
                canvas.requestPointerLock();
            }
        }, false);

        let ponterlockChange = function (event) {
            _self._controlEnabled = (document.pointerLockElement === canvas);
            if (!_self._controlEnabled) {
                _self._camera.detachControl(canvas);
            } else {
                _self._camera.attachControl(canvas);
            }
        };

        document.addEventListener("pointerlockchange", ponterlockChange, false);
        document.addEventListener("mspointerlockchange", ponterlockChange, false);
        document.addEventListener("mozpointerlockchange", ponterlockChange, false);
        document.addEventListener("webkitpointerlockchange", ponterlockChange, false);
    }

    initCamera(): BABYLON.Camera {
        var cam = new BABYLON.FreeCamera("camera", this._spawnPoint, this._scene);

        cam.attachControl(<HTMLCanvasElement>this._scene.getEngine().getRenderingCanvas());
        cam.ellipsoid = new BABYLON.Vector3(2, this._height, 2);
        cam.checkCollisions = true;
        cam.applyGravity = true;
        cam.keysUp = [90];
        cam.keysDown = [83];
        cam.keysLeft = [81];
        cam.keysRight = [68];
        cam.speed = this._speed;
        cam.inertia = this._inertia;
        //cam.angularInertia = this._angularInertia;
        cam.angularSensibility = this._angularSensibility;
        cam.layerMask = 2;

        return cam;
    }

    handleUserMouse(evt, pickInfo:BABYLON.PickingInfo){
        this._weapon.fire(pickInfo);
    }

}