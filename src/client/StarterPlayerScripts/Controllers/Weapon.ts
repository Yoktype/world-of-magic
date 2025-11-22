import { ReplicatedStorage } from "@rbxts/services";
import BaseWeaponConfig from "shared/Modules/Configs/Weapons/BaseWeaponConfig";

// constants
const Events = ReplicatedStorage.WaitForChild("Events") as  Folder;
const WeaponEvents = Events.FindFirstChild("WeaponEvents") as Folder;

// events
const newWeaponEvent = WeaponEvents.FindFirstChild("NewWeapon") as RemoteEvent;
const attackEvent = WeaponEvents.FindFirstChild("Attack") as RemoteEvent;

// private functions
function unequipAnimationPlay(): void {

    return undefined;
}

function equipAnimationPlay(): void {

    return undefined;
}

function newWeapon(tool: Tool) {
    if (tool === undefined) return;

    tool.Equipped.Connect(() => { equipAnimationPlay(); });
    tool.Unequipped.Connect(() => { unequipAnimationPlay(); });
    tool.Activated.Connect(() => { attackEvent.FireServer(); });
}

// setup
newWeaponEvent.OnClientEvent.Connect((args) => {
    if ( args === undefined ) return;

    const tool = args as Tool;
    newWeapon(tool);
});