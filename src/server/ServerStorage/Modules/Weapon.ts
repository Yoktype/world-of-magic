import { ReplicatedStorage } from "@rbxts/services";
import BaseWeaponConfig from "../Assets/Weapons/Configs/BaseWeaponConfig";
import GameConfig from "./GameConfig";

// events 
const Events = ReplicatedStorage.WaitForChild("Events");
const newWeaponEvent = Events.FindFirstChild("NewWeapon") as RemoteEvent;

// init weapons configs
const WeaponsConfigs = new Map<string, Weapon>();
WeaponsConfigs.set(GameConfig.BaseState, BaseWeaponConfig);


// private functions
function newWeaponForClient(player: Player, weapon: Tool) {
    if ( player === undefined || weapon === undefined ) return;
    newWeaponEvent.FireClient(player, weapon);
}

function newWeapon() {}

function getWeponConfig(weapon: Tool | BasePart) {
    const name = weapon.GetAttribute(GameConfig.WeaponState) as string
    return WeaponsConfigs.get(name);
}

// setup
// attack | equip? | unequip?