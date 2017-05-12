import { Injectable } from '@angular/core';
import { iCharcter } from '../../interfaces/iCharacter'
@Injectable()
export class CharacterProvider {

    currentCharacter: iCharcter;
    CreateEmptyCharacter(): iCharcter {
        return {
            name: null,
            playerId: null,
            cha: 0,
            con: 0,
            dex: 0,
            int: 0,
            str: 0,
            wis: 0,
            Inventory: [],
            hp: 100,
            maxhp: 100,
            xp: 10,
            maxXp: 100
        }
    }

    setCurrentCharacter(character: iCharcter) {
        this.currentCharacter = character;
        this.getSkills();
    }
    getCurrentCharacter(): iCharcter {
        return this.currentCharacter;
    }


    calculateModifier(value: number): string {
        let calc = value;
        let mod = Math.floor((calc - 10) / 2)
        if (mod > 0) {
            return "+" + mod;
        }
        return mod.toString();
    }


    statsAsArray() {
        let stats = [
            {
                key: 'str',
                value: this.currentCharacter.str
            }, {
                key: 'dex',
                value: this.currentCharacter.dex
            }, {
                key: 'con',
                value: this.currentCharacter.con
            }, {
                key: 'int',
                value: this.currentCharacter.int
            }, {
                key: 'wis',
                value: this.currentCharacter.wis
            }, {
                key: 'cha',
                value: this.currentCharacter.cha
            }
        ]
    }

    getSkills() {
        let skills = [
            {
                name: "Appraise",
                proficent: false,
                baseSkill: "int",
                value: this.calculateModifier(this.currentCharacter.int)
            },
            {
                name: "Autohypnosis",
                proficent: false,
                baseSkill: "wis",
                value: this.calculateModifier(this.currentCharacter.wis)
            },
            {
                name: "Balance",
                proficent: false,
                baseSkill: "dex",
                value: this.calculateModifier(this.currentCharacter.dex)
            },
            {
                name: "Climb",
                proficent: false,
                baseSkill: "str",
                value: this.calculateModifier(this.currentCharacter.str)
            },
            {
                name: "Concentration",
                proficent: false,
                baseSkill: "con",
                value: this.calculateModifier(this.currentCharacter.con)
            },
            {
                name: "Craft",
                proficent: false,
                baseSkill: "int",
                value: this.calculateModifier(this.currentCharacter.int)
            },
            {
                name: "Decipher Script",
                proficent: false,
                baseSkill: "int",
                value: this.calculateModifier(this.currentCharacter.int)
            },
            {
                name: "Diplomacy",
                proficent: false,
                baseSkill: "cha",
                value: this.calculateModifier(this.currentCharacter.cha)
            },
            {
                name: "Disable Device",
                proficent: false,
                baseSkill: "int",
                value: this.calculateModifier(this.currentCharacter.int)
            },
            {
                name: "Disguise",
                proficent: false,
                baseSkill: "cha",
                value: this.calculateModifier(this.currentCharacter.cha)
            },
            {
                name: "Escape Artist",
                proficent: false,
                baseSkill: "dex",
                value: this.calculateModifier(this.currentCharacter.dex)
            },
            {
                name: "Forgery",
                proficent: false,
                baseSkill: "int",
                value: this.calculateModifier(this.currentCharacter.int)
            },
            {
                name: "Gather Information",
                proficent: false,
                baseSkill: "cha",
                value: this.calculateModifier(this.currentCharacter.cha)
            },
            {
                name: "Handle Animal",
                proficent: false,
                baseSkill: "cha",
                value: this.calculateModifier(this.currentCharacter.cha)
            },
            {
                name: "Heal",
                proficent: false,
                baseSkill: "wis",
                value: this.calculateModifier(this.currentCharacter.wis)
            },
            {
                name: "Hide",
                proficent: false,
                baseSkill: "dex",
                value: this.calculateModifier(this.currentCharacter.dex)
            },
            {
                name: "Intimidate",
                proficent: false,
                baseSkill: "cha",
                value: this.calculateModifier(this.currentCharacter.cha)
            },
            {
                name: "Jump",
                proficent: false,
                baseSkill: "str",
                value: this.calculateModifier(this.currentCharacter.str)
            },
            {
                name: "Knowledge Arcana",
                proficent: false,
                baseSkill: "int",
                value: this.calculateModifier(this.currentCharacter.int)
            },
            {
                name: "Knowledge Dungeoneering",
                proficent: false,
                baseSkill: "int",
                value: this.calculateModifier(this.currentCharacter.int)
            },
            {
                name: "Knowledge Geography",
                proficent: false,
                baseSkill: "int",
                value: this.calculateModifier(this.currentCharacter.int)
            },
            {
                name: "Knowledge History",
                proficent: false,
                baseSkill: "int",
                value: this.calculateModifier(this.currentCharacter.int)
            },
            {
                name: "Knowledge Local",
                proficent: false,
                baseSkill: "int",
                value: this.calculateModifier(this.currentCharacter.int)
            },
            {
                name: "Knowledge Nature",
                proficent: false,
                baseSkill: "int",
                value: this.calculateModifier(this.currentCharacter.int)
            },
            {
                name: "Knowledge Nobility",
                proficent: false,
                baseSkill: "int",
                value: this.calculateModifier(this.currentCharacter.int)
            },
            {
                name: "Knowledge Planes",
                proficent: false,
                baseSkill: "int",
                value: this.calculateModifier(this.currentCharacter.int)
            },
            {
                name: "Knowledge Psionics",
                proficent: false,
                baseSkill: "int",
                value: this.calculateModifier(this.currentCharacter.int)
            },
            {
                name: "Knowledge Religion",
                proficent: false,
                baseSkill: "int",
                value: this.calculateModifier(this.currentCharacter.int)
            },
            {
                name: "Listen",
                proficent: false,
                baseSkill: "wis",
                value: this.calculateModifier(this.currentCharacter.wis)
            },
            {
                name: "Move Silently",
                proficent: false,
                baseSkill: "dex",
                value: this.calculateModifier(this.currentCharacter.dex)
            },
            {
                name: "Open Lock",
                proficent: false,
                baseSkill: "dex",
                value: this.calculateModifier(this.currentCharacter.dex)
            },
            {
                name: "Perform Act",
                proficent: false,
                baseSkill: "cha",
                value: this.calculateModifier(this.currentCharacter.cha)
            },
            {
                name: "Perform Comedy",
                proficent: false,
                baseSkill: "cha",
                value: this.calculateModifier(this.currentCharacter.cha)
            },
            {
                name: "Perform Dance",
                proficent: false,
                baseSkill: "cha",
                value: this.calculateModifier(this.currentCharacter.cha)
            },
            {
                name: "Perform Keyboard",
                proficent: false,
                baseSkill: "cha",
                value: this.calculateModifier(this.currentCharacter.cha)
            },
            {
                name: "Perform Oratory",
                proficent: false,
                baseSkill: "cha",
                value: this.calculateModifier(this.currentCharacter.cha)
            },
            {
                name: "Perform Percession",
                proficent: false,
                baseSkill: "cha",
                value: this.calculateModifier(this.currentCharacter.cha)
            },
            {
                name: "Preform String Instrument",
                proficent: false,
                baseSkill: "cha",
                value: this.calculateModifier(this.currentCharacter.cha)
            },
            {
                name: "Preform Wind Instrument",
                proficent: false,
                baseSkill: "cha",
                value: this.calculateModifier(this.currentCharacter.cha)
            },
            {
                name: "Preform Sing",
                proficent: false,
                baseSkill: "cha",
                value: this.calculateModifier(this.currentCharacter.cha)
            },
            {
                name: "Profession",
                proficent: false,
                baseSkill: "wis",
                value: this.calculateModifier(this.currentCharacter.wis)
            },
            {
                name: "Psicraft",
                proficent: false,
                baseSkill: "int",
                value: this.calculateModifier(this.currentCharacter.int)
            },
            {
                name: "Ride",
                proficent: false,
                baseSkill: "dex",
                value: this.calculateModifier(this.currentCharacter.dex)
            },
            {
                name: "Search",
                proficent: false,
                baseSkill: "int",
                value: this.calculateModifier(this.currentCharacter.int)
            },
            {
                name: "Sense Motive",
                proficent: false,
                baseSkill: "wis",
                value: this.calculateModifier(this.currentCharacter.wis)
            },
            {
                name: "Sleight of Hand",
                proficent: false,
                baseSkill: "dex",
                value: this.calculateModifier(this.currentCharacter.dex)
            },
            {
                name: "Spellcraft",
                proficent: false,
                baseSkill: "int",
                value: this.calculateModifier(this.currentCharacter.int)
            },
            {
                name: "Spot",
                proficent: false,
                baseSkill: "wis",
                value: this.calculateModifier(this.currentCharacter.wis)
            },
            {
                name: "Survival",
                proficent: false,
                baseSkill: "wis",
                value: this.calculateModifier(this.currentCharacter.wis)
            },
            {
                name: "Swim",
                proficent: false,
                baseSkill: "str",
                value: this.calculateModifier(this.currentCharacter.str)
            },
            {
                name: "Tumble",
                proficent: false,
                baseSkill: "dex",
                value: this.calculateModifier(this.currentCharacter.dex)
            },
            {
                name: "Use Magic Device",
                proficent: false,
                baseSkill: "cha",
                value: this.calculateModifier(this.currentCharacter.cha)
            },
            {
                name: "Use Psionic Device",
                proficent: false,
                baseSkill: "cha",
                value: this.calculateModifier(this.currentCharacter.cha)
            },
            {
                name: "Use Rope",
                proficent: false,
                baseSkill: "dex",
                value: this.calculateModifier(this.currentCharacter.dex)
            }
        ]
        return skills;
    }




}