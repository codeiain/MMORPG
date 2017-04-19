import BABYLON from 'babylonjs'
import {Injectable} from '@angular/core';

@Injectable()
export class GameUtils {

    public static axis(scene:BABYLON.Scene, size){
        var x = BABYLON.Mesh.CreateCylinder("x", size, 0.1, 0.1, 6,6, scene, false);
        x.material = new BABYLON.StandardMaterial("xColor", scene);
        //x.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
        x.position = new BABYLON.Vector3(size/2, 0, 0);
        x.rotation.z = Math.PI / 2;

        //Y axis
        var y = BABYLON.Mesh.CreateCylinder("y", size, 0.1, 0.1, 6,6, scene, false);
        y.material = new BABYLON.StandardMaterial("yColor", scene);
        //y.material.diffuseColor = new BABYLON.Color3(0, 1, 0);
        y.position = new BABYLON.Vector3(0, size / 2, 0);

        //Z axis
        var z = BABYLON.Mesh.CreateCylinder("z", size, 0.1, 0.1, 6,6,  scene, false);
        z.material = new BABYLON.StandardMaterial("zColor", scene);
        //z.material.diffuseColor = new BABYLON.Color3(0, 0, 1);
        z.position = new BABYLON.Vector3(0, 0, size/2);
        z.rotation.x = Math.PI / 2;


    }

    public static Skydome(scene:BABYLON.Scene, shaderPath:string){
        var skybox = BABYLON.Mesh.CreateSphere("skyBox", 50, 1000, scene);
        skybox.layerMask = 2;

        // The sky creation
        BABYLON.Engine.ShadersRepository = shaderPath;

        var shader = new BABYLON.ShaderMaterial("gradient", scene, "gradient", {});
        shader.setFloat("offset", 200);
        shader.setColor3("topColor", BABYLON.Color3.FromInts(0,119,255));
        shader.setColor3("bottomColor", BABYLON.Color3.FromInts(240,240, 255));
        shader.backFaceCulling = false;
        skybox.material = shader;
    }
}