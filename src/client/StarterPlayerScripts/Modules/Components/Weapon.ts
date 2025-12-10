import GameConfig from "shared/Modules/Configs/GameConfig";
import BaseWeaponConfig from "shared/Modules/Configs/Weapons/BaseWeaponConfig";

// private functions
function useUnequipAnimation(): void {

    return undefined;
}

function useEquipAnimation(): void {

    return undefined;
}

function loadWeapon(tool: Tool) {
    if (tool === undefined) return;

    tool.Equipped.Connect(() => { useEquipAnimation(); });
    tool.Unequipped.Connect(() => { useUnequipAnimation(); });
    tool.Activated.Connect(() => { GameConfig.attackEvent.FireServer(tool); });
}

// setup
GameConfig.newWeaponEvent.OnClientEvent.Connect((args: Tool) => {
    if ( args === undefined ) return;

    const tool = args as Tool;
    if ( tool.IsA("Tool") === false ) return; // only tool

    loadWeapon(tool);
});