import BABYLON from 'babylonjs'
import { Player } from './Player';
import { Arena } from './Arena';
import { GameUtils } from './GameUtils';
import { Injectable } from '@angular/core'
import { SettingsService} from '../OptionServices/SettingsService' 

@Injectable()
export class Game {

    private _canvas: HTMLCanvasElement;
    public _engine: BABYLON.Engine;
    public scene: BABYLON.Scene;
    private _camera: BABYLON.VirtualJoysticksCamera;
    private _light: BABYLON.PointLight;
    private _loader: BABYLON.AssetsManager;
    public assets: any = {};
    public player: Player;


    constructor(public settings: SettingsService) {

    }

    init(canvasElement: string): void {
        let _self = this;
        _self._canvas = <HTMLCanvasElement>document.getElementById(canvasElement);
        _self._engine = new BABYLON.Engine(_self._canvas, true);
        _self.scene = this.initScene();

        _self._loader = new BABYLON.AssetsManager(_self.scene);
        let meshTask = _self._loader.addMeshTask("gun", "", "assets/", "gun.babylon");
        meshTask.onSuccess = function (task) {
            _self.initMesh(task);
        }
        _self._loader.onFinish = function (tasks) {
            _self.player = new Player(_self);
            var arena = new Arena(_self);
            _self._engine.runRenderLoop(function () {
                _self.scene.render();
            });


        }
        _self._loader.load();
    }

    initScene(): BABYLON.Scene {
        let scene = new BABYLON.Scene(this._engine);

        //GameUtils.axis(scene, 5);

        scene.clearColor = new BABYLON.Color4(0.8, 0.8, 0.8, 1);

        let light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        GameUtils.Skydome(scene, '../../assets/shaders/');

        return scene;
    }

    initMesh(task): void {
        this.assets[task.name] = task.loadedMeshes;
        for (let i = 0; i < task.loadedMeshes.length; i++) {
            let mesh = task.loadedMeshes[i];
            mesh.isVisible = false;
        }
    }

}