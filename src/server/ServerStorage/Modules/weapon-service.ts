import { ReplicatedStorage, Players } from "@rbxts/services";
import GameConfig from "shared/Modules/Configs/Game-Config";
import BaseWeaponClass from "./Classes/Weapons/Base-Weapon-Class";
import { killReward } from "./Reward-Service";

// only server scope
if (GameConfig.server === undefined) throw"";

// init configs
const WeaponsConfigs = new Map<string, Weapon>();
WeaponsConfigs.set(GameConfig.BASE_WEAPON, BaseWeaponClass.weapon);

// private functions
// activated this function from ProfileStore only by bindable
function newWeaponForPlayer(player: Player, WeaponName: string): void {
    if (GameConfig.server === undefined) throw""; // yandere code


    let config = WeaponsConfigs.get(WeaponName);
    if ( config === undefined ) config = WeaponsConfigs.get(GameConfig.BASE_WEAPON) as Weapon;

    const weapon = config.model.Clone();
    weapon.SetAttribute(GameConfig.WEAPON_STATE, GameConfig.BASE_WEAPON);
    weapon.SetAttribute(GameConfig.COOLDOWN, 0);

    // TODO: keep tool in folder/inventory
    weapon.Parent = player.FindFirstChild("Backpack");
    GameConfig.newWeaponEvent.FireClient(player, weapon);
}

function getWeaponState(tool: Tool | BasePart): string {
    if (GameConfig.server === undefined) throw""; // yandere code
    return tool.GetAttribute(GameConfig.WEAPON_STATE) as string ?? GameConfig.BASE_WEAPON as string;
}

function killFeed(attacker: Player, victim: Player | undefined): void {
    print(`${attacker}, killed ${victim}`);
}
/* TODO
    killfeed UI
*/

function reward(player: Player): void {
    killReward(player);
}
/*
    ProfileStore reward take and save, upd UI
*/

function hit(victim: Model, config: Weapon): boolean {
    const damage = config.damage;

    const humanoid = victim.FindFirstChild("Humanoid") as Humanoid;

    const health = math.max(0, humanoid.Health - damage);
    print(`health, in hit function : ${health}`);
    humanoid.Health = health;

    if ( health <= 0 ) return true;

    return false;
}

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
    if ( victim === undefined ) return;
    const isKill = hit(victim, weaponConfig);
    
    const playerVictim = Players.GetPlayerFromCharacter(victim);
    
    if ( isKill === true ) {
        reward(attacker);
        killFeed(attacker, playerVictim);
    }
}

// setup
Players.PlayerAdded.Connect(player => {
    task.wait(5);
    print(`give weapon for : ${player.DisplayName}`);
    newWeaponForPlayer(player, GameConfig.BASE_WEAPON);
})

GameConfig.attackEvent.OnServerEvent.Connect((player: Player, args) => {
    if ( player === undefined || args === undefined ) return;

    const tool = args as Tool;

    attack(player, tool);
})