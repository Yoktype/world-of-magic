// shared config

import GameConfig from "../game-config";

// constants
const baseWeapon = GameConfig.Weapons.FindFirstChild(GameConfig.BASE_WEAPON) as Tool;
const baseBullet = GameConfig.Weapons.FindFirstChild(GameConfig.BASE_BULLET) as BasePart;

export default {

    model: baseWeapon,
    bullet: baseBullet,

    bulletSpeed: 100,
    damage: 20,
    cooldown: 1,
    range: 20,

    attackAnimation: "", // string | Instance ?
    equipAnimation: "", // string | Instance ?
    unequipAnimation: "", // string | Instance ?
    
}