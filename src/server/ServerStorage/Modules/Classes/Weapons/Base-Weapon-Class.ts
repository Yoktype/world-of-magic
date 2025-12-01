// server class

import { Players, RunService, Workspace } from "@rbxts/services";
import WeaponClass from "../Weapon";
import BaseWeaponConfig from "shared/Modules/Configs/Weapons/Base-Weapon-Config";
import GameConfig from "shared/Modules/Configs/GameConfig";

interface PlayerSetup {
    mouseHitPosition: Vector3,
    playerCharacter: Model,
    humanoidRootPart: BasePart
}


class BaseWeaponClass extends WeaponClass {

    private victim!: Player | undefined;


    private getRender(): BasePart {
        const bulletModel = GameConfig.ObjectPoolBullets.FindFirstChild(this.bullet.Name) as BasePart;
        if ( bulletModel !== undefined ) return bulletModel;
    
        const bullet = this.bullet.Clone();
        bullet.CanCollide = false;
        bullet.Anchored = true;

        return bullet;
    }

    private getSetup(player: Player): PlayerSetup | undefined {

        function Setup(): [boolean, PlayerSetup] | [boolean, undefined] {
            const mouseHitPosition = GameConfig.getMousePositionInWorldEvent.InvokeClient(player) as  Vector3 | undefined;
            if ( mouseHitPosition === undefined ) return [false, undefined];
            
            const playerCharacter: Model = player.Character ?? player.CharacterAdded.Wait()[1];
            const humanoidRootPart = playerCharacter.FindFirstChild("HumanoidRootPart") as BasePart;

            const setup = {
                mouseHitPosition: mouseHitPosition,
                playerCharacter: playerCharacter,
                humanoidRootPart: humanoidRootPart,
            }

            return [true, setup];
        }

        const [bool, playerSetup] = Setup();
        if ( bool === true ) {
            return playerSetup;
        }

        return undefined;
    }

    private getStartCframe(cf: CFrame): CFrame {
        const lookVector: Vector3 = cf.LookVector;
        const startPosition = CFrame.lookAlong(
            cf.Position,
            lookVector
        )

        return startPosition;
    }

    private move(
        bullet: BasePart,
        bulletPostion: Vector3,
        distance: number,
        move: number,
        endPosition: Vector3,
    ) {
        for (let i = 0; i <= distance; i += move) {
            if ( bullet.Parent !== Workspace ) break;

            const alpha = i / distance;
            const newPostion = bulletPostion.Lerp(endPosition, alpha);
            bullet.Position = newPostion;

            RunService.Heartbeat.Wait();
        }
        // distance = travelTime, i += travelTime / 240

    }

    attack(player: Player): [Player, Model] | [Player, undefined] {
        if (  RunService.IsServer() === false  ) return [player, undefined];

        let victim!: Model | undefined;
        const fireball = this.getRender();

        const playerSetup = this.getSetup(player) as PlayerSetup | undefined;
        if ( playerSetup === undefined ) return [player, undefined];

        const startPosition = this.getStartCframe(playerSetup.humanoidRootPart.CFrame);

        const distance = math.max( 0, (( startPosition.Position.sub(playerSetup.mouseHitPosition)).Magnitude + 1 ));
        const travelTime = distance / this.bulletSpeed;
        const move = (this.bulletSpeed / 144); // 144 - steps

        print(`loop settings travelTime: ${travelTime}, move: ${move}`)

        // start loop
        victim = undefined;
        fireball.PivotTo(startPosition);
        fireball.Parent = Workspace;
        
        // property don't work how i would like
        fireball.Touched.Connect((otherPart) => {
            const character = otherPart.Parent as Model;
            const humanoid = character.FindFirstChild("Humanoid") as Humanoid;
            const plr = Players.GetPlayerFromCharacter(otherPart.Parent);
            if ( humanoid === undefined || plr === player ) return;

            fireball.Parent = GameConfig.ObjectPoolBullets;
            victim = character;
        })

        this.move(
            fireball,
            fireball.Position,
            distance,
            move,
            playerSetup.mouseHitPosition,
        );
    
        if ( fireball.Parent === Workspace ) fireball.Parent = GameConfig.ObjectPoolBullets;

        print(`loop stoping return values: player: ${player.Name}, victim: ${victim}`)
        return [player, victim];
    }
}

export default {

    weapon: new BaseWeaponClass(
        BaseWeaponConfig.model,
        BaseWeaponConfig.bullet,
        BaseWeaponConfig.bulletSpeed,
        BaseWeaponConfig.damage,
        BaseWeaponConfig.cooldown,
    ),

}