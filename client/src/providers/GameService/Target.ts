import BABYLON from 'babylonjs'
import { Injectable } from '@angular/core'
import { Game } from './Game'


@Injectable()
export class Target extends BABYLON.Mesh {

    private game: Game;

    // constructor(game: Game, posX: number, posZ: number) {
    //     this.game = game;
    //     BABYLON.Mesh.call(this, "target", game.scene);
    //     var vd = BABYLON.VertexData.CreateSphere(16);
    //     vd.applyToMesh(this, false);

    //     this.position
    // }
    init(game: Game, posX: number, posZ: number) {
        this.game = game;
        BABYLON.Mesh.call(this, "target", game.scene);
        var vd = BABYLON.VertexData.CreateSphere(16);
        vd.applyToMesh(this, false);

        this.position = new BABYLON.Vector3(posX, 4, posZ);
        this.checkCollisions = true;
        var _self = this;
        this.game.scene.registerBeforeRender(function () {
            _self.rotation.y += 0.01;
        })
    }
    explode(){
        this.dispose();
    }


}