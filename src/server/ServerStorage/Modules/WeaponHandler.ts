import { ReplicatedStorage } from "@rbxts/services";
import GameConfig from "shared/Modules/Configs/GameConfig";
import BaseWeaponConfig from "shared/Modules/Configs/Weapons/BaseWeaponConfig";

// only server scope
if (GameConfig.server === undefined) throw"";

// constants
const Events = ReplicatedStorage.WaitForChild("Events") as  Folder;
const WeaponEvents = Events.FindFirstChild("WeaponEvents") as Folder;

// events
const newWeaponEvent = WeaponEvents.FindFirstChild("NewWeapon") as RemoteEvent;
const attackEvent = WeaponEvents.FindFirstChild("Attack") as RemoteEvent;

// init configs
const WeaponsConfigs = new Map<string, Weapon>()
WeaponsConfigs.set(GameConfig.BASE_WEAPON, BaseWeaponConfig)

// private functions
function newWeaponForPlayer(player: Player, WeaponName: string): void {
    if (GameConfig.server === undefined) throw""; // yandere code

    let config = WeaponsConfigs.get(WeaponName);
    if ( config === undefined ) config = WeaponsConfigs.get(GameConfig.BASE_WEAPON) as Weapon;

    const weapon = config.model.Clone();
    weapon.SetAttribute(GameConfig.WEAPON_STATE, GameConfig.BASE_WEAPON);
    weapon.SetAttribute(GameConfig.COOLDOWN, 0);

    // TODO: keep tool in folder/inventory
    weapon.Parent = player.FindFirstChild("Backpack");
    newWeaponEvent.FireClient(player, weapon);
}
/* debug
    Players.PlayerAdded.Connect(player => {
        newWeaponForPlayer(player, GameConfig.server.BASE_WEAPON)
    })
*/

function getWeaponState(tool: Tool | BasePart): string {
    if (GameConfig.server === undefined) throw""; // yandere code
    return tool.GetAttribute(GameConfig.WEAPON_STATE) as string ?? GameConfig.BASE_WEAPON as string;
}

function killFeed() {}
/* TODO
    типа справа иконки появляются кто кого если килл
*/

function hit(attacker: Player, victim: Player) {}
/*
    attack function returns attacker and victim, here validate hit
*/

function isCooldown(tool: Tool | BasePart): boolean {
    if (GameConfig.server === undefined) throw""; // yandere code

    const weaponState = getWeaponState(tool) as string;
    const weaponConfig = WeaponsConfigs.get(weaponState) as Weapon;

    const t = os.time();

    const toolCooldown = tool.GetAttribute(GameConfig.COOLDOWN) as number ?? 0;
    const configCooldown = weaponConfig.cooldown as number;

    const diff = t - toolCooldown;

    if ( diff > configCooldown ) { 
        tool.SetAttribute(GameConfig.COOLDOWN, t);
        return false; 
    }

    return true;
}

function attack(player: Player, tool: Tool | BasePart): void {
    const weaponState = getWeaponState(tool) as string;
    const weaponConfig = WeaponsConfigs.get(weaponState) as Weapon;

    const cooldown = isCooldown(tool);
    if ( cooldown === true ) return;

    const [attacker, victim] = weaponConfig.attack(player);
    hit(attacker, victim);
}

// setup
attackEvent.OnServerEvent.Connect((player: Player, args) => {
    if ( player === undefined || args === undefined ) return;

    const tool = args as Tool;

    attack(player, tool);
})
