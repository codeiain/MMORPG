import BABYLON from 'babylonjs'
import {Injectable} from '@angular/core';

@Injectable()
export class GameMain {

    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.VirtualJoysticksCamera;
    private _light: BABYLON.PointLight;

    constructor() {
        
    }

    init(canvasElement: string):void{
        this._canvas = <HTMLCanvasElement>document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);
    }


    createScene(): void {
        this._scene = new BABYLON.Scene(this._engine);
        this._camera = new BABYLON.VirtualJoysticksCamera("camera1", BABYLON.Vector3.Zero(), this._scene);

        // target the camera to scene origin
        this._camera.position = new BABYLON.Vector3(-10, 0, 0);

        // attach the camera to the canvas
        this._camera.attachControl(this._canvas, false);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        this._light = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(60, 100, 10), this._scene);

        var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, this._scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this._scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../../assets/textures/skybox", this._scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;
        skybox.position = this._camera.position;

        var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "../../assets/textures/heightMap.gif", 100, 100, 100, 0, 10, this._scene, false);
        var groundMaterial = new BABYLON.StandardMaterial("ground", this._scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture("../../assets/textures/ground.jpg", this._scene);

        groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        ground.position.y = -2.0;
        ground.material = groundMaterial;

        this._scene.executeWhenReady(function () {
            //hack to resize the joystick area.
            var vjcanvas = document.getElementsByTagName("canvas")[1];
            vjcanvas.style.position = "absolute";
            vjcanvas.style.top = "50px";
            vjcanvas.style.width = "90%";
            vjcanvas.style.height = "85%";
            vjcanvas.style.border = "red 2pt dashed"
        });


    }

    animate(): void {
        // run the render loop
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        // the canvas/window resize event handler
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }

}