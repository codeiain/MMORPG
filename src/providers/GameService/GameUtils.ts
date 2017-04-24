import BABYLON from 'babylonjs'

export class GameUtils {

    public static axis(scene: BABYLON.Scene, size) {
        var x = BABYLON.Mesh.CreateCylinder("x", size, 0.1, 0.1, 6, 6, scene, false);
        x.material = new BABYLON.StandardMaterial("xColor", scene);
        //x.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
        x.position = new BABYLON.Vector3(size / 2, 0, 0);
        x.rotation.z = Math.PI / 2;

        //Y axis
        var y = BABYLON.Mesh.CreateCylinder("y", size, 0.1, 0.1, 6, 6, scene, false);
        y.material = new BABYLON.StandardMaterial("yColor", scene);
        //y.material.diffuseColor = new BABYLON.Color3(0, 1, 0);
        y.position = new BABYLON.Vector3(0, size / 2, 0);

        //Z axis
        var z = BABYLON.Mesh.CreateCylinder("z", size, 0.1, 0.1, 6, 6, scene, false);
        z.material = new BABYLON.StandardMaterial("zColor", scene);
        //z.material.diffuseColor = new BABYLON.Color3(0, 0, 1);
        z.position = new BABYLON.Vector3(0, 0, size / 2);
        z.rotation.x = Math.PI / 2;


    }

    public static Skydome(scene: BABYLON.Scene, shaderPath: string): BABYLON.Mesh {
        var skybox = BABYLON.Mesh.CreateSphere("skyBox", 50, 1000, scene);
        skybox.layerMask = 2;

        // The sky creation
        BABYLON.Engine.ShadersRepository = shaderPath;

        var shader = new BABYLON.ShaderMaterial("gradient", scene, "gradient", {});
        shader.setFloat("offset", 200);
        shader.setColor3("topColor", BABYLON.Color3.FromInts(0, 119, 255));
        shader.setColor3("bottomColor", BABYLON.Color3.FromInts(240, 240, 255));
        shader.backFaceCulling = false;
        skybox.material = shader;
        //skybox.material.wireframe = true;
        return skybox;
    }

    public static miniMap(game: any, size: number) {
        var mm = new BABYLON.FreeCamera("minimap", new BABYLON.Vector3(0, 100, 0), game.scene);
        mm.layerMask = 1;
        mm.setTarget(new BABYLON.Vector3(0.1, 0.1, 0.1));
        mm.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;

        mm.orthoLeft = -size / 2;
        mm.orthoRight = size / 2;
        mm.orthoTop = size / 2;
        mm.orthoBottom = -size / 2;

        mm.rotation.x = Math.PI / 2;

        var xstart = 0.8,
            ystart = 0.75;
        var width = 0.99 - xstart,
            height = 1 - ystart;

        mm.viewport = new BABYLON.Viewport(
            xstart,
            ystart,
            width,
            height
        );
        game.scene.activeCameras.push(mm);
    }

    public static height_Map(p) {
        var ns = Math.max(30., Math.min(80., Math.abs(
            Math.sin(p.x * 0.01) + Math.cos(p.z * 0.01)) * 100.));
        ns = -50. + Math.pow(ns - 29., 1.13);
        return ns;
    }
}