import BABYLON from 'babylonjs'

import { Game } from './Game'
import { Target } from './Target'
import { Terrain } from './Terrain'
import { Tree } from './Tree'

export class Arena {

    private game: Game;
    private size: number = 1000;
    private terrain: Terrain;
    private treeNumber = 1;
    private _trees = [];
    private minSizeBranch = 15;
    private maxSizeBranch = 20;

    private minSizeTrunk = 10;
    private maxSizeTrunk = 15;
    private minRadius = 1;
    private maxRadius = 5;
    private sg;


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
            _self.game.octree.dynamicContent.push(t);
        }, 1000)
        var d1 = new BABYLON.DirectionalLight("dir", new BABYLON.Vector3(1, -1, -2), this.game.scene);
        d1.position = new BABYLON.Vector3(-300, 300, 600);
        this.sg = new BABYLON.ShadowGenerator(2048, d1);
        //this.generateTrees();

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

    generateTrees() {
        this.clean();
        var size,
            sizeTrunk, x, z, radius;

        for (var i = 0; i < this.treeNumber; i++) {
            size = this.randomNumber(this.minSizeBranch, this.maxSizeBranch);
            sizeTrunk = this.randomNumber(this.minSizeTrunk, this.maxSizeTrunk);
            radius = this.randomNumber(this.minRadius, this.maxRadius);
            x = this.randomNumber(-500, 500);
            z = this.randomNumber(-500, 500);

            var tree = new Tree(size, sizeTrunk, radius, this.game.scene, this.sg);
            tree.position.x = x;
            tree.position.z = z;
            this._trees.push(tree);

        }

    }
    clean() {
        this._trees.forEach(function (t) {
            t.dispose();
        });

        this._trees = [];
    }
}