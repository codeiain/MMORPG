
export interface iCharcter {

    playerId: string;
    name: string;
    class: string;
    level: number;
    race: string;
    gender: string;
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
    Inventory: any[];
    speed: number;
    size: string;
    ac: number;
    touchAc:number;
    flatfootAc:number;
    hitPoints:number;
    skills: [
        {
            name: string,
            modifer: number,
            ranks: number,
            abilityModifer: number,
            miscModifer: number,
            untrained:boolean,
            armorPenalty:boolean
        }
    ];
    worn:{
        head:string,
        eyes:string,
        neck:string,
        shoulders:string,
        ring1:string,
        ring2:string,
        hands:string,
        arms:string,
        body:string,
        torso:string,
        waist:string,
        feet:string
    }
}