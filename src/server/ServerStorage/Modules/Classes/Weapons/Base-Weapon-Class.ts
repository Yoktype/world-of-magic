// server class

import WeaponClass from "../Weapon";
import BaseWeaponConfig from "shared/Modules/Configs/Weapons/Base-Weapon-Config";

class BaseWeaponClass extends WeaponClass {

    attack(player: Player): [Player, Player] | [Player, undefined] {

        // this.

        let victim!: Player
        let fireball!: BasePart



        return [player, undefined]
    }

}

export default {
    weapon: new BaseWeaponClass(
        BaseWeaponConfig.model,
        BaseWeaponConfig.bullet,
        BaseWeaponConfig.bulletSpeed,
        BaseWeaponConfig.damage,
        BaseWeaponConfig.cooldown,
    ),
}