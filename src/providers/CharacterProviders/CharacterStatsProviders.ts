import { Injectable } from '@angular/core';
import BABYLON from 'babylonjs';


@Injectable()
export class CharacterStatsProviders {

    constructor(){}

    public getStats():Array<number> {
        let stats = []

        for (var x = 0; x != 6; x++) {
            stats.push(this.generateStat());
        }

        return stats;
    }

    private generateStat():number {
        let stats = [
            this.getRandomIntInclusive(1, 6),
            this.getRandomIntInclusive(1, 6),
            this.getRandomIntInclusive(1, 6),
            this.getRandomIntInclusive(1, 6)
        ];

        stats = this.removeSmallest(stats);

        return stats.reduceRight(function (a, b) { return a + b; })
    }

    private removeSmallest(arr):Array<number> {
        var min = Math.min.apply(null, arr);
        return arr.filter((e) => { return e != min });
    }

    private getRandomIntInclusive(min, max):number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}