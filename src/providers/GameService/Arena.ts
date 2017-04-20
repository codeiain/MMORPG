import BABYLON from 'babylonjs'
import { Injectable } from '@angular/core'
import { Game } from './Game'
import { Target } from './Target'
import { Terrain } from './Terrain'
export class Arena {

    private game: Game;
    private size: number = 1000;
    private terrain: Terrain;

    constructor(game: Game) {


        this.game = game;
        this.terrain = new Terrain(game);
        this.terrain.update();


        //this.deactivateSpecular(ground);
        //ground.checkCollisions = true;
        var _self = this;
        setInterval(function () {
            var posX = _self.randomNumber(-_self.size / 2, _self.size / 2);
            var posZ = _self.randomNumber(-_self.size / 2, _self.size / 2);
            var posY = _self.terrain.height_Map(new BABYLON.Vector3(posX, 4, posZ));
            var t = new Target(_self.game, posX, posZ, posY);
        }, 1000)


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