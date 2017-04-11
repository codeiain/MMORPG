import BABYLON from 'babylonjs'
import { Injectable } from '@angular/core'
import { Game } from './Game'


export class Target extends BABYLON.Mesh{

    private game: Game;
    private mesh: BABYLON.Mesh;

    constructor(game:Game, posX:number, posZ:number){
        super("target", game.scene);
        var vd = BABYLON.VertexData.CreateSphere(16);
        vd.applyToMesh(this, false);
        this.position = new BABYLON.Vector3(posX,4,posZ);
        this.checkCollisions = true;
        var _self = this;
        game.scene.registerBeforeRender(function(){
            _self.rotation.y +=0.01;
        })
    }

    explode(){
        this.mesh.dispose();
    }

}