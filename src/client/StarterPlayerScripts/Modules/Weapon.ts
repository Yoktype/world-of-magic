import GameConfig from "shared/Modules/Configs/game-config";
import BaseWeaponConfig from "shared/Modules/Configs/Weapons/base-weapon-config";

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
    tool.Activated.Connect(() => { GameConfig.attackEvent.FireServer(tool); });
}

// setup
GameConfig.newWeaponEvent.OnClientEvent.Connect((args: Tool) => {
    if ( args === undefined ) return;

    const tool = args as Tool;
    if ( tool.IsA("Tool") === false ) return; // only tool

    newWeapon(tool);
});