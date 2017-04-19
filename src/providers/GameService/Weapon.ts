import BABYLON from 'babylonjs'
import { Injectable } from '@angular/core'
import { Game } from './Game'
import { Player } from './Player'

@Injectable()
export class Weapon {

    private game: Game;
    private player: Player;
    private wp: any;
    private mesh: any;
    private _initialRotation: any;
    private fireRate: number = 250.0;
    private _currentFireRate = this.fireRate;
    private canFire = true;
    private _scene: BABYLON.Scene;
    private _particalSystem: BABYLON.ParticleSystem;

    constructor(game: Game, player: Player) {
        this.game = game;
        this.player = player;
        this.wp = this.game.assets["gun"][0];
        this.wp.isVisible = true;
        this.wp.rotationQuaternion = null;
        this.wp.rotation.x = -Math.PI / 2;
        this.wp.rotation.y = Math.PI;
        this.wp.parent = this.player._camera;
        this.wp.position = new BABYLON.Vector3(0.25, -0.4, 1);
        this.mesh = this.wp;
        this._initialRotation = this.mesh.rotation.clone();

        this._scene = this.game.scene;
        let particleSystem = new BABYLON.ParticleSystem("particales", 100, this._scene);
        particleSystem.emitter = this.mesh;
        particleSystem.particleTexture = new BABYLON.Texture("assets/particles/gunshot_125.png", this._scene);
        particleSystem.emitRate = 5;
        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
        particleSystem.minEmitPower = 1;
        particleSystem.maxEmitPower = 3;
        particleSystem.colorDead = new BABYLON.Color4(1, 1, 1, 0.0);

        particleSystem.minLifeTime = 0.2;
        particleSystem.maxLifeTime = 0.2;

        particleSystem.updateSpeed = 0.02;
        this._particalSystem = particleSystem;

        let _self = this;
        _self.game.scene.registerBeforeRender(function () {
            if (!_self.canFire) {
                _self._currentFireRate -= _self.game._engine.getDeltaTime();
                if (_self._currentFireRate < 0) {
                    _self.canFire = true;
                    _self._currentFireRate = _self.fireRate;
                }
            }
        });

    }

    animate() {
        this._particalSystem.start();
        var start = this._initialRotation.clone();
        var end = start.clone();
        end.x += Math.PI / 100;

        var display = new BABYLON.Animation(
            "fire",
            "rotation",
            60,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

        var keys = [{
            frame: 0,
            value: start
        }, {
            frame: 100,
            value: end
        }, {
            frame: 1000,
            value: start
        }];

        display.setKeys(keys);
        this.mesh.animations.push(display);

        var _self = this;

        this.game.scene.beginAnimation(this.mesh, 0, 100, false, 10, function () {
            _self._particalSystem.stop();
        })
    }

    fire(pickInfo: any) {
        if (this.canFire) {
            if (pickInfo.hit && pickInfo.pickedMesh.name === "target") {
                pickInfo.pickedMesh.explode();
            } else {
                var b = BABYLON.Mesh.CreateBox("box", 0.1, this.game.scene);
                b.position = pickInfo.pickedPoint.clone();
            }
            this.animate();
            this.canFire = false;
        } else {

        }
    }
}