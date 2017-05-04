import { Injectable } from '@angular/core';
import BABYLON from 'babylonjs'


@Injectable()
export class CharacterDisplayProvider {

    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera:any;

    constructor(){}

    init(canvas) {
        var _self = this;
        _self._canvas = canvas;
        _self._engine = new BABYLON.Engine(_self._canvas, true);
        _self.createBaseScene();
        
        _self._engine.runRenderLoop(()=>{
            _self._scene.render();
        })

    }

    createBaseScene() {
        this._scene = new BABYLON.Scene(this._engine);
        let light = new BABYLON.PointLight("Omin", new BABYLON.Vector3(20, 20, 100), this._scene);
        this._camera = new BABYLON.ArcRotateCamera("Camera", 1.532885643199045, 1.4583467295845025, 100, new BABYLON.Vector3(0,0,0), this._scene);
        this._camera.attachControl(this._canvas, false);

        var _self = this;
        this._scene.registerBeforeRender(function () {
                light.position = _self._camera.position;
        });
    }

    displayMesh(folder:string, name:string){
        var _self = this;
        BABYLON.SceneLoader.ImportMesh("","assets/models/"+folder+"/",name+".babylon", this._scene, function (newMeshes){
            newMeshes[0].position.y -=35;
            
            if (folder == "Female"){
                _self._camera.radius = 200;
                newMeshes[0].position.y -=45;
            }            
        });
    }



}