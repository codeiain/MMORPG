import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, MenuController, Events } from 'ionic-angular';
import { SocketService } from '../../providers/socket-service/socket-service';
import BABYLON from 'babylonjs'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('renderCanvas') renderCanvas;

  _self = null;
  constructor(public navCtrl: NavController, private socket: SocketService, public menuCtrl: MenuController, public events: Events) {
    // this.socket.initialize();
    // this.socket.socketService.subscribe(event => {
    //   console.log('message received from server... ', event);
    // });

    events.subscribe('menu:opened', () => {
      // your action here
      var vjcanvas = document.getElementsByTagName("canvas")[1];
      vjcanvas.style.display = "none";
    });

    events.subscribe('menu:closed', () => {
      // your action here
      var vjcanvas = document.getElementsByTagName("canvas")[1];
      vjcanvas.style.display = "block";
    });
  }



  ngAfterViewInit() {
    let canvas = document.getElementById("renderCanvas");
    let engine = new BABYLON.Engine(canvas, true, );
    var createScene = function () {
      var _self = this;
      // This creates a basic Babylon Scene object (non-mesh)
      var scene = new BABYLON.Scene(engine);

      // This creates and positions a free camera (non-mesh)
      var camera = new BABYLON.VirtualJoysticksCamera("camera1", BABYLON.Vector3.Zero(), scene);

      camera.position = new BABYLON.Vector3(-10, 0, 0);
      // This targets the camera to scene origin


      // This attaches the camera to the canvas
      camera.attachControl(canvas, true);

      // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
      var sun = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(60, 100, 10), scene);

      var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);
      var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
      skyboxMaterial.backFaceCulling = false;
      skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../../assets/textures/skybox", scene);
      skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
      skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
      skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
      skyboxMaterial.disableLighting = true;
      skybox.material = skyboxMaterial;
      skybox.position = camera.position;
      // var extraGround = BABYLON.Mesh.CreateGround("extraGround", 1000, 1000, 1, scene, false);
      // var extraGroundMaterial = new BABYLON.StandardMaterial("extraGround", scene);
      // extraGroundMaterial.diffuseTexture = new BABYLON.Texture("../../assets/textures/ground.jpg", scene);
      // //extraGroundMaterial.diffuseTexture.uScale = 60;
      // //extraGroundMaterial.diffuseTexture.vScale = 60;
      // extraGround.position.y = -2.05;
      // extraGround.material = extraGroundMaterial;

      var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "../../assets/textures/heightMap.gif", 100, 100, 100, 0, 10, scene, false);
      var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
      groundMaterial.diffuseTexture = new BABYLON.Texture("../../assets/textures/ground.jpg", scene);
      //groundMaterial.diffuseTexture.uScale = 6;
      //groundMaterial.diffuseTexture.vScale = 6;
      groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
      ground.position.y = -2.0;
      ground.material = groundMaterial;

      ground.onReady = function () {
        ground.optimize(100);
      }
      //scene.gravity = new BABYLON.Vector3(0, -0.9, 0);

      scene.collisionsEnabled = true;

      //Then apply collisions and gravity to the active camera
      camera.checkCollisions = true;
      //camera.applyGravity = true;

      scene.executeWhenReady(function () {
        var vjcanvas = document.getElementsByTagName("canvas")[1];
        // when in doubt, force it.  :)
        vjcanvas.style.position = "absolute";
        vjcanvas.style.top = "50px";
        //vjcanvas.style.left = "25%";

        vjcanvas.style.width = "90%";
        vjcanvas.style.height = "85%";

        vjcanvas.style.border = "red 2pt dashed"
      });
      scene.registerBeforeRender(function () {

      })

      return scene;

    };

    var scene = createScene();

    engine.runRenderLoop(function () {
      scene.render();
    });

    // Resize
    window.addEventListener("resize", function () {
      engine.resize();
    });
  }

}
