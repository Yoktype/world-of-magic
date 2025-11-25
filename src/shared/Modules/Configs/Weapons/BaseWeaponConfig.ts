import { RunService, ReplicatedStorage, Players, Workspace } from "@rbxts/services";
import GameConfig from "../GameConfig";

// constants
const Assets = ReplicatedStorage.WaitForChild("Assets") as Folder;
const Weapons = Assets.FindFirstChild("Weapons") as Folder;
const baseWeapon = Weapons.FindFirstChild(GameConfig.BASE_WEAPON) as Tool;
const baseBullet = Weapons.FindFirstChild(GameConfig.BASE_BULLET) as BasePart;

const fireballSpeed = 20

// private funcitons
function spawnHitBox(pos: Vector3) {

    return
}

function Attack(player: Player): [ Player, Player ] | [ Player, undefined ] {
    if ( RunService.IsClient() === true ) return [ player, undefined ];

    let victim!: Player;

    const fireball = baseBullet.Clone();
    fireball.Anchored = true;
    fireball.CanCollide = false;
    fireball.Parent = Workspace;

    const mouseHitPosition = GameConfig.getMouseHitInWolrdEvent.InvokeClient(player) as Vector3 | undefined;
    if ( mouseHitPosition === undefined ) return [ player, undefined ];

    const character = player.Character ?? player.CharacterAdded.Wait()[1];
    const humanoidRootPart = character.FindFirstChild("HumanoidRootPart") as BasePart;

    const startPosition = humanoidRootPart.CFrame.Position.mul(new Vector3(1, 2, 0));
    fireball.Position = startPosition;
    const fireballPosition = fireball.Position as Vector3;

    const distance = (startPosition.sub(mouseHitPosition)).Magnitude;
    const travelTime = distance / fireballSpeed;
    const smoothPath = travelTime / task.wait();

    // if touche then .Parent = undefined 
    let connection = fireball.Touched.Connect(otherPart => {
        fireball.Destroy();

        const otherPlayer  = Players.GetPlayerFromCharacter(otherPart.Parent);
        if ( otherPlayer === undefined ) return;

        victim = otherPlayer;
    })
    
    for (let i = 1; i < smoothPath; i += 1) {
        if ( fireball.Parent !== Workspace ) break;

        const fireballMove = fireballPosition.Lerp(mouseHitPosition, i/smoothPath);
        // inf range?
        fireball.Position = fireballMove;
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
/*
    const distance = (character - endPos).Magnitude 
    const travelTime = distance / fireballConfig.Speed

    const increments = travelTime / RunService.Heartbeat.Wait()
    for i = 1, increments do 
        const part = p1.Lerp(endPos, i/increments)
    end
*/

