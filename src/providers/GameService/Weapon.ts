import BABYLON from 'babylonjs'
import { Game } from './Game'
import { Player } from './Player'

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
    private _bullets: any = new Array();

    constructor(game: Game, player: Player) {
        this.game = game;
        this.player = player;
        this.wp = this.game.assets["gun"][0];
        this.wp.isVisible = true;
        this.wp.rotationQuaternion = null;
        this.wp.rotation.x = -Math.PI / 2;
        this.wp.rotation.y = Math.PI;
        this.wp.parent = this.player._camera;
        this.wp.position = new BABYLON.Vector3(0.25, -0.4, 1.7);
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

            if (_self._bullets != undefined) {
                _self._bullets.forEach(element => {

                    if (_self.isPossative(element.mesh.position.z)) {
                        element.mesh.position.z -= 0.1
                    } else {
                        element.mesh.position.z += 0.1
                    }

                    if (_self.isPossative(element.mesh.position.x)) {
                        element.mesh.position.x -= 0.1
                    } else {
                        element.mesh.position.x += 0.1
                    }
                });
            }
        });

    }

    isPossative(value: number): boolean {
        if (value > 0) {
            return true;
        }
        return false;
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
            var bullet = BABYLON.Mesh.CreateSphere('bullet', 3, 0.3, this.game.scene);

            // var bullet = BABYLON.Mesh.CreateCylinder("cylinder", .3, 0, .3, 16, 1, this.game.scene, false);
            // var cylinder1 = BABYLON.Mesh.CreateCylinder("cylinder", .4, .3, .3, 16, 1, this.game.scene, false);
            // cylinder1.position.y = -.35;
            // cylinder1.parent = bullet;
            // bullet.rotate( new BABYLON.Vector3(0,5,5), BABYLON.Angle.FromDegrees(180).radians());
            var camera = <BABYLON.TargetCamera>this._scene.cameras[0];
            var startPos = camera.position;

            bullet.position = new BABYLON.Vector3(startPos.x, startPos.y, startPos.z);
            bullet.material = new BABYLON.StandardMaterial('texture1', this.game.scene);
            bullet.checkCollisions = true;
            var invView = new BABYLON.Matrix();
            camera.getViewMatrix().invertToRef(invView);
            var direction = BABYLON.Vector3.TransformNormal(new BABYLON.Vector3(0, 0, 1), invView);

            direction.normalize();
            var _self = this;
            this.game.scene.registerBeforeRender(function () {
                var skybox = _self.game.scene.getMeshByName("skyBox");
                var ground = _self.game.scene.getMeshByName("ground");
                //if (balloon2.intersectsMesh(plan2, true)) {
                bullet.position.addInPlace(direction);


                if (!bullet.intersectsMesh(skybox, true)) {
                     //console.log("hit");
                     bullet.dispose();
                }
                if (!bullet.intersectsMesh(ground,true)){
                    bullet.dispose();
                    //console.log('hit ground');
                }

                var targets = _self.game.scene.meshes.filter(_self.findTargets);
                for (let x =0; x < targets.length; x++){
                    if (bullet.intersectsMesh(targets[x],true)){
                        targets[x].dispose();
                        bullet.dispose();
                    }
                }

            });

            //if (pickInfo.hit && pickInfo.pickedMesh.name === "target") {
              //  pickInfo.pickedMesh.explode();
            //}
            this.animate();
            this.canFire = false;
        } else {

        }
    }
    findTargets(element):any{
        return element.name == "target";
    }
}