import BABYLON from 'babylonjs'
import { Game } from './Game'
import { Weapon } from './Weapon'
import { Controller } from './Controller'


export class Player {

    private _spawnPoint: BABYLON.Vector3;
    private _scene: BABYLON.Scene;
    private _game: Game;
    private _height: number = 2;
    public _camera: BABYLON.Camera;
    private _controlEnabled = false;
    private _weapon: Weapon;
    private _controller: Controller;
    private _speed: number = 1;
    private _inertia: number = 0.9;
    private _angularSensibility: number = 1000;
    private _isJumping = false;

    constructor(game: Game, spawnPoint?: BABYLON.Vector3) {

        let _self = this;
        if (!spawnPoint) {
            this._spawnPoint = new BABYLON.Vector3(0, 50, -10);
        } else {
            this._spawnPoint = spawnPoint;
        }
        _self._game = game;
        _self._scene = game.scene;
        this._camera = this.initCamera();
        this._weapon = new Weapon(_self._game, _self);

        var canvas = document.getElementById('renderCanvas');
        canvas.addEventListener("click", function (evt) {
            var width = _self._scene.getEngine().getRenderWidth();
            var height = _self._scene.getEngine().getRenderHeight();

            if (_self._controlEnabled) {
                var pickInfo = _self._scene.pick(width / 2, height / 2, null, false, _self._camera);
                _self.handleUserMouse(evt, pickInfo);
            }
        }, false);

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

    cameraJump() {
        if (!this._isJumping) {
            this._isJumping = true;
            var cam = this._scene.cameras[0];

            cam.animations = [];

            var a = new BABYLON.Animation(
                "a",
                "position.y", 30,
                BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

            // Animation keys
            var keys = [];
            keys.push({ frame: 0, value: cam.position.y });
            keys.push({ frame: 15, value: cam.position.y + 30 });
            keys.push({ frame: 20, value: cam.position.y });
            a.setKeys(keys);

            var easingFunction = new BABYLON.CircleEase();
            easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
            a.setEasingFunction(easingFunction);

            cam.animations.push(a);

            this._scene.beginAnimation(cam, 0, 20, false, 1, ()=>{
                this._isJumping = false;
            });
            
        }
    }

    initPointerLock() {
        // Request pointer lock
        var _this = this;
        var canvas = <any>this._scene.getEngine().getRenderingCanvas();
        canvas.addEventListener("click", function (evt) {
            canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
            if (canvas.requestPointerLock) {
                canvas.requestPointerLock();
            }
        }, false);

        // Event listener when the pointerlock is updated.
        var pointerlockchange = function (event) {
            _this._controlEnabled = (document.pointerLockElement === canvas);
            if (!_this._controlEnabled) {
                _this._camera.detachControl(canvas);
            } else {
                _this._camera.attachControl(canvas);
            }
        };
        document.addEventListener("pointerlockchange", pointerlockchange, false);
    }


    initCamera(): BABYLON.Camera {
        var cam = new BABYLON.FreeCamera("camera", this._spawnPoint, this._scene);
        cam.attachControl(<HTMLCanvasElement>this._scene.getEngine().getRenderingCanvas());
        cam.ellipsoid = new BABYLON.Vector3(2, 2, 2);
        cam.checkCollisions = true;
        cam.applyGravity = true;
        cam.speed = this._speed;
        cam.inertia = this._inertia;
        cam.angularSensibility = this._angularSensibility;
        var _self = this
        window.addEventListener("keyup", (event) => {
            switch (event.keyCode) {
                case 16:
                    var b = false;
                    _self.cameraJump();
                    break;
            }
        }, false);



        this._controller = new Controller(cam);
        this._controller.setKeyboardControls(this._game.settings)

        //cam.angularInertia = this._angularInertia;
        //cam.angularSensibility = this._angularSensibility;
        cam.layerMask = 2;

        return cam;
    }

    handleUserMouse(evt, pickInfo: BABYLON.PickingInfo) {
        //this._controller.fire(evt, pickInfo, this._weapon);
        this._weapon.fire(pickInfo);
    }


}