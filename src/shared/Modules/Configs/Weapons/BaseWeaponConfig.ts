import { RunService, ReplicatedStorage } from "@rbxts/services";
import GameConfig from "../GameConfig";

// constants
const Assets = ReplicatedStorage.WaitForChild("Assets") as Folder;
const Weapons = Assets.FindFirstChild("Weapons") as Folder;
const baseWeapon = Weapons.FindFirstChild(GameConfig.BASE_WEAPON) as Tool;
const baseBullet = Weapons.FindFirstChild(GameConfig.BASE_BULLET) as BasePart;

if ( RunService.IsClient() ) {
    /* TODO
        if this client then can't take model
    */
}

export default {
    model: baseWeapon,
    cooldown: 1,
    damage: 20,

    attack: (player: Player): [Player, Player] | [Player, undefined] => {

        let victim!: Player

        

        return [player, victim]
    },
}
/*
    const distance = (character - endPos).Magnitude 
    const travelTime = distance / fireballConfig.Speed

    const increments = travelTime / RunService.Heartbeat.Wait()
    for i = 1, increments do 
        const part = p1.Lerp(endPos, i/increments)
    end
*/