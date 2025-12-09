// server class

import { Players, RunService, Workspace } from "@rbxts/services";
import WeaponClass from "../Weapon";
import BaseWeaponConfig from "shared/Modules/Configs/Weapons/Base-Weapon-Config";
import GameConfig from "shared/Modules/Configs/Game-Config";

interface PlayerSetup {
    endPosition: Vector3,
    playerCharacter: Model,
    humanoidRootPart: BasePart
}

class BaseWeaponClass extends WeaponClass {

    private getRender(): BasePart {
        const bulletModel = GameConfig.ObjectPoolBullets.FindFirstChild(this.bullet.Name) as BasePart;
        if ( bulletModel !== undefined ) return bulletModel;
    
        const bullet = this.bullet.Clone();
        bullet.CanCollide = false;
        bullet.Anchored = true;

        return bullet;
    }

    private getEndPosition(player: Player): Vector3 | undefined {
        const ray = GameConfig.getCameraRay.InvokeClient(player) as Ray | undefined;
        if ( ray === undefined ) return;

        const direction = ray.Direction.mul(this.range);
        const endPosition = ray.Origin.add(direction);
        print(endPosition)

        return endPosition;
    }

    private getSetup(player: Player): PlayerSetup | undefined {

        const endPosition = this.getEndPosition(player);
        if ( endPosition === undefined ) return undefined;
        
        const playerCharacter: Model = player.Character ?? player.CharacterAdded.Wait()[1];
        const humanoidRootPart = playerCharacter.FindFirstChild("HumanoidRootPart") as BasePart;
        if ( humanoidRootPart === undefined ) return undefined;


        const setup = {
            endPosition: endPosition,
            playerCharacter: playerCharacter,
            humanoidRootPart: humanoidRootPart,
        }

    

        return setup;
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
    }

    public attack(player: Player): [Player, Model] | [Player, undefined] {
        if (  RunService.IsServer() === false  ) return [player, undefined];

        let victim!: Model | undefined;
        const fireball = this.getRender();

        const playerSetup = this.getSetup(player) as PlayerSetup | undefined;
        if ( playerSetup === undefined ) return [player, undefined];

        const startPosition = this.getStartCframe(playerSetup.humanoidRootPart.CFrame);

        const distance = math.max( 0, (( startPosition.Position.sub(playerSetup.endPosition)).Magnitude + 1 ));
        const move = ( this.bulletSpeed / 144 ); // 144 - steps

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
            playerSetup.endPosition,
        );
    
        if ( fireball.Parent === Workspace ) fireball.Parent = GameConfig.ObjectPoolBullets;

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
        BaseWeaponConfig.range,
    ),

}