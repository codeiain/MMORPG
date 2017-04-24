import BABYLON from 'babylonjs'

export class Tree extends BABYLON.Mesh {

    public trunk;

    constructor(public sizeBranch: number, public sizeTrunk: number, public radius: number, public scene: BABYLON.Scene, public sd: BABYLON.ShadowGenerator) {
        super("tree", scene);
        this._init(sizeBranch);
        var branchColor = ""
        var trunkColor = "";

        let material: BABYLON.StandardMaterial = new BABYLON.StandardMaterial("mat", scene);
        material.diffuseColor = BABYLON.Color3.Green();
        material.specularColor = BABYLON.Color3.Black();
        this.position.y = sizeTrunk + sizeBranch / 2 - 2;

        var trunk = BABYLON.Mesh.CreateCylinder("trunk", sizeTrunk, radius - 2 < 1 ? 1 : radius - 2, radius, 7, 2, scene);
        trunk.parent = this;
        trunk.position.y = (-sizeBranch / 2 + 2) - sizeTrunk / 2;

        let trunkMaterial = new BABYLON.StandardMaterial("trunk", scene);
        trunkMaterial.diffuseColor = BABYLON.Color3.FromInts(139, 69, 19);
        trunkMaterial.specularColor = BABYLON.Color3.Black();
        trunk.convertToFlatShadedMesh();

        this.trunk = trunk;

        sd.getShadowMap().renderList.push(this);
        sd.getShadowMap().renderList.push(this.trunk);
    }

    private randomNumber(min, max) {
        if (min == max) {
            return (min);
        }
        var random = Math.random();
        return ((random * (max - min)) + min);
    };

    private _init(sizeBranch: number): void {
        let vertexData = BABYLON.VertexData.CreateSphere(sizeBranch);
        vertexData.applyToMesh(this, false)

        let positions = this.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        let indices = this.getIndices();
        let numberOfPoints = positions.length / 3;

        let map = [];

        let v3 = BABYLON.Vector3;
        var max = []

        for (let i = 0; i < numberOfPoints; i++) {
            let p = new v3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
            if (p.y >= sizeBranch / 2) {
                max.push(p);
            }
            var array;
            let found = false;
            for (let index = 0; index < map.length && !found; index++) {
                array = map[index];
                let p0 = array[0];
                if (p0.equals(p) || (p0.substract(p)).lengthSquared() < 0.01) {
                    array.push(i * 3);
                    found = true;
                }
            }
            if (!found) {
                array = []
                array.push(p, i * 3);
                map.push(array);
            }
        }
        map.forEach((array) => {
            var index, min = -sizeBranch / 10, max = sizeBranch / 10;
            var rx = this.randomNumber(min, max);
            var ry = this.randomNumber(min, max);
            var rz = this.randomNumber(min, max);

            for (index = 1; index < array.length; index++) {
                var i = array[index];
                positions[i] += rx;
                positions[i + 1] += ry;
                positions[i + 2] += rz;
            }
        })

        this.setVerticesData(BABYLON.VertexBuffer.PositionKind, positions);
        var normals = [];
        BABYLON.VertexData.ComputeNormals(positions, indices, normals);
        this.setVerticesData(BABYLON.VertexBuffer.NormalKind, normals);
        this.convertToFlatShadedMesh();
    }


}