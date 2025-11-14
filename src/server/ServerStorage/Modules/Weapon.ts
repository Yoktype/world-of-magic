import { ReplicatedStorage } from "@rbxts/services";
import BaseWeaponConfig from "../Assets/Weapons/Configs/BaseWeaponConfig";

// events 
const Events = ReplicatedStorage.WaitForChild("Events");
const newWeaponEvent = Events.FindFirstChild("NewWeapon") as RemoteEvent;



const WeaponsConfigs = new Map<string, Weapon>();
WeaponsConfigs.set("base", BaseWeaponConfig);


// private functions
function newWeaponForClient(player: Player, weapon: Tool) {
    if ( player === undefined || weapon === undefined ) return;

    newWeaponEvent.FireClient(player, weapon)
}

function getWeponConfig(name: string) {
    return WeaponsConfigs.get(name);
}

