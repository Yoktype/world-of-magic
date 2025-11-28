// shared config

import { ReplicatedStorage } from "@rbxts/services";
import GameConfig from "../GameConfig";

// constants
const Assets = ReplicatedStorage.WaitForChild("Assets") as Folder;
const Weapons = Assets.FindFirstChild("Weapons") as Folder;

const baseWeapon = Weapons.FindFirstChild(GameConfig.BASE_WEAPON) as Tool;
const baseBullet = Weapons.FindFirstChild(GameConfig.BASE_BULLET) as BasePart;

export default {
    model: baseWeapon,
    bullet: baseBullet,

    bulletSpeed: 50,
    damage: 20,
    cooldown: 1,

    attackAnimation: "", // string | Instance ?
    equipAnimation: "", // string | Instance ?
    unequipAnimation: "", // string | Instance ?
}