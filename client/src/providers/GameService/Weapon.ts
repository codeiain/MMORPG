import BABYLON from 'babylonjs'
import { Injectable } from '@angular/core'
import { Game } from './Game'
import { Player } from './Player'

@Injectable()
export class Weapon {

    constructor(game: Game, player: Player) {

    }

    fire(pickInfo:BABYLON.PickingInfo){
        
    }
}