import { ServerStorage } from "@rbxts/services";

const Assets = ServerStorage.WaitForChild("Assets");
const Weapons = Assets.FindFirstChild("Weapons");
const baseWeapon = Weapons?.FindFirstChild("Base") as Tool;


export default {

    damage: 10,
    cooldown: 1,
    range: 20,

    model: baseWeapon,

    // как у дерпа логика типа в конфиге функция этого 
    attack: (player: Player) => {
        // do logic attack for base 
    }
}