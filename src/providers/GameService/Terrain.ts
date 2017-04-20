import BABYLON from 'babylonjs'
import { Injectable } from '@angular/core'
import { Game } from './Game'
import { Target } from './Target'

declare var BABYLONX: any;


export class Terrain {

    private game: Game
    private GB: any;
    private mat: BABYLON.StandardMaterial;
    time = 0;
    constructor(game: Game) {
        this.game = game;
        this.game.scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
        this.game.scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
        this.game.scene.fogDensity = 0.01;
        this.game.scene.fogStart = 20.0;
        this.game.scene.fogEnd = 300.0;
        this.GB = BABYLONX.GeometryBuilder;
        BABYLONX.GeometryBuilder.InitializeEngine();
        BABYLONX.ShaderBuilder.InitializeEngine();
        this.mat = new BABYLON.StandardMaterial("as", this.game.scene);
        // mat.wireframe = true;
        this.mat.diffuseTexture = new BABYLON.Texture("assets/textures/ground.jpg", this.game.scene);

    }

    geo1(op: any) {
        var _self = this;
        var builder = function (s /*{seg:number}*/, geo) {
            var step = s.size / s.seg;

            // calculate vertex info
            for (var i = 0; i < s.seg; i++) {
                for (var j = 0; j < s.seg; j++) {

                    var p = { x: s.x + j * step, y: 0., z: s.y + i * step };

                    var ns = _self.height_Map(p);

                    _self.GB.PushVertex(geo, { x: p.x, y: ns, z: p.z });
                    geo.uvs.push(p.x / 100., p.z / 100.);
                }
            }
            // make face 
            for (var i = 1; i < s.seg - 1; i++) {
                for (var j = 0; j < s.seg - 1; j++) {
                    _self.GB.MakeFace(geo, [(i - 1) * s.seg + j, (i - 1) * s.seg + j + 1, i * s.seg + j + 0, i * s.seg + j + 1], { flip: !s.flip });
                }
            }
        };
        return new BABYLONX.Geometry(_self.GB.GeometryBase(op, builder, op.custom));
    }

    height_Map(p) {
        var ns = Math.max(30., Math.min(80., Math.abs(
            Math.sin(p.x * 0.01) + Math.cos(p.z * 0.01)) * 100.));
        ns = -50. + Math.pow(ns - 29., 1.13);
        return ns;
    }

    update() {
        var mesh = this.geo1({ seg: 20, size: 1000, x: -500, y: -500 }).toMesh(this.game.scene);
        mesh.material = this.mat;
        var lastPos = { x: 0, z: 0 };
        var _self = this;
        this.game.scene.registerBeforeRender(() => {
            let camera: any = _self.game.scene.cameras[0];

            var dis = Math.sqrt(Math.pow(lastPos.x - camera.position.x, 2.) +
                Math.pow(lastPos.z - camera.position.z, 2.));

            if (dis > 300.) {
                lastPos.x = camera.position.x;
                lastPos.z = camera.position.z;

                mesh.dispose();
                mesh = _self.geo1({ seg: 200, size: 1000, x: -500 + camera.position.x, y: -500 + camera.position.z, }).toMesh(_self.game.scene);
                mesh.material = _self.mat;
            }

            new BABYLONX.ShaderMaterialHelper().SetUniforms(
                _self.game.scene.meshes,
                camera.position,
                camera._currentTarget,
                { x: 0, y: 0 },
                { x: 100, y: 100 },
                _self.time++);


            camera.position.y = 5. + _self.height_Map(camera.position);
        })

    }
}