import BABYLON from 'babylonjs'
import { Injectable } from '@angular/core'
import { Game } from './Game'


var Target = function(game, posX, posZ) {

    this.game = game;

    BABYLON.Mesh.call(this, "target", game.scene);
    var vd = BABYLON.VertexData.CreateSphere(16);
    vd.applyToMesh(this, false);

    // The game
    this.game = game;

    // Target position
    this.position = new BABYLON.Vector3(posX, 4, posZ);

    // Check collisions
    this.checkCollisions = true;

    var _this = this;
    this.game.scene.registerBeforeRender(function() {
        _this.rotation.y += 0.01;
    });
};

// Our object is a BABYLON.Mesh
Target.prototype = Object.create(BABYLON.Mesh.prototype);
// And its constructor is the Ship function described above.
Target.prototype.constructor = Target;

Target.prototype.explode = function() {
    this.dispose();
};