import BABYLON from 'babylonjs'
import { Injectable } from '@angular/core'
import { Game } from './Game'
import {Target } from './Target'

export class Arena {

    private game: Game;
    private size: number = 100;


    constructor(game: Game) {
        this.game = game;
        var ground = BABYLON.Mesh.CreateGround("ground", this.size, this.size, 2, this.game.scene);

        this.deactivateSpecular(ground);
        ground.checkCollisions = true;
        var _self = this;
        setInterval(function () {
            var posX = _self.randomNumber(-_self.size / 2, _self.size / 2);
            var posZ = _self.randomNumber(-_self.size / 2, _self.size / 2);
            var t = new Target(_self.game, posX, posZ);
        },1000)

        var mm = new BABYLON.FreeCamera("minimap", new BABYLON.Vector3(0, 100, 0), this.game.scene);
        mm.layerMask = 1;
        mm.setTarget(new BABYLON.Vector3(0.1, 0.1, 0.1));
        mm.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;

        mm.orthoLeft = -this.size / 2;
        mm.orthoRight = this.size / 2;
        mm.orthoTop = this.size / 2;
        mm.orthoBottom = -this.size / 2;

        mm.rotation.x = Math.PI / 2;

        var xstart = 0.8,
            ystart = 0.75;
        var width = 0.99 - xstart,
            height = 1 - ystart;

        mm.viewport = new BABYLON.Viewport(
            xstart,
            ystart,
            width,
            height
        );
        this.game.scene.activeCameras.push(mm);
    }

    randomNumber(min, max) {
        if (min == max) {
            return (min);
        }
        var random = Math.random();
        return ((random * (max - min)) + min);
    }

    deactivateSpecular(mesh: BABYLON.Mesh) {
        if (!mesh.material) {
            mesh.material = new BABYLON.StandardMaterial(mesh.name + "mat", this.game.scene);
        }
        //mesh.material.specularColor = BABYLON.Color3.Black();
    }
}