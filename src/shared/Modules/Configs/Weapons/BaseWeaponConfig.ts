import { RunService, ReplicatedStorage } from "@rbxts/services";
import GameConfig from "../GameConfig";

// constants
const Assets = ReplicatedStorage.WaitForChild("Assets") as Folder;
const Weapons = Assets.FindFirstChild("Weapons") as Folder;
const baseWeapon = Weapons.FindFirstChild(GameConfig.BASE_WEAPON) as Tool;

if ( RunService.IsClient() ) {
    /* TODO
        if this client then can't take model
    */
}

export default {
    model: baseWeapon,
    cooldown: 2,
    damage: 10,

    attack: (player: Player): [Player, Player] => {


        return [player, player]
    },
}