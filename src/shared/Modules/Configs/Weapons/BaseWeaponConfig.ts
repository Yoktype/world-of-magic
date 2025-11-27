import { RunService, ReplicatedStorage, Players, Workspace } from "@rbxts/services";
import GameConfig from "../GameConfig";

// constants
const Assets = ReplicatedStorage.WaitForChild("Assets") as Folder;
const Weapons = Assets.FindFirstChild("Weapons") as Folder;
const ObjectPoolBullets = Weapons.FindFirstChild("ObjectPoolBullets") as Folder;

const baseWeapon = Weapons.FindFirstChild(GameConfig.BASE_WEAPON) as Tool;
const baseBullet = Weapons.FindFirstChild(GameConfig.BASE_BULLET) as BasePart;

const fireballSpeed = 20

// private funcitons
function spawnHitBox(pos: Vector3): boolean {
    if ( RunService.IsClient() === true ) return false;
    /*
        TODO
        Spawn the part and use method GetDbounds if i get player then return true 
    */

    return false;
}

function Attack(player: Player): [ Player, Player ] | [ Player, undefined ] {
    if ( RunService.IsClient() === true ) return [ player, undefined ];

    let victim!: Player;
    let fireball!: BasePart;

    const isObjectPoolBulets = ObjectPoolBullets.FindFirstChild(baseBullet.Name) as BasePart | undefined;
    if ( isObjectPoolBulets !== undefined ) {
        fireball = isObjectPoolBulets;
        fireball.Parent = Workspace;
    } else {
        fireball = baseBullet.Clone();
        fireball.Anchored = true;
        fireball.CanCollide = false;
        fireball.Parent = Workspace;
    }

    const mouseHitPosition = GameConfig.getMouseHitInWolrdEvent.InvokeClient(player) as Vector3 | undefined;
    if ( mouseHitPosition === undefined ) return [ player, undefined ];

    const character = player.Character ?? player.CharacterAdded.Wait()[1];
    const humanoidRootPart = character.FindFirstChild("HumanoidRootPart") as BasePart;

    const startPosition = humanoidRootPart.CFrame.Position.mul( 
        humanoidRootPart.CFrame.LookVector.mul( new Vector3(1, 2, 0) ) 
    );
    fireball.Position = startPosition;
    const fireballPosition = fireball.Position as Vector3;

    const distance = (startPosition.sub(mouseHitPosition)).Magnitude;
    const travelTime = distance / fireballSpeed;
    const smoothPath = travelTime / task.wait();

    const playerCharacter = player.Character ?? player.CharacterAdded.Wait()[1];
    let connection = fireball.Touched.Connect(otherPart => {
        if ( otherPart.IsDescendantOf(playerCharacter) === true ) return;

        fireball.Parent = ObjectPoolBullets;

        const otherPlayer  = Players.GetPlayerFromCharacter(otherPart.Parent);
        if ( otherPlayer === undefined ) return;

        victim = otherPlayer;
    })
    
    for (let i = 1; i < smoothPath; i += 1) {
        if ( fireball.Parent !== Workspace ) break;

        const fireballMove = fireballPosition.Lerp(mouseHitPosition, i/smoothPath);
        // inf range?
        fireball.Position = fireballMove;
        // brother just use GetPivot, PivotTo, CFrame.lookAlong ( create cframe w. pos, oren)
    }
    
    connection.Disconnect();
    return [ player, victim ];
}

//setup
export default {
    model: baseWeapon,
    cooldown: 1,
    damage: 20,
    speed: fireballSpeed,

    attack: (player: Player): [ Player, Player ] | [ Player, undefined ] => { return Attack(player); },
}