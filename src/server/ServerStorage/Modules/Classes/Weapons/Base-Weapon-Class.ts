// server class

import { Players, RunService, Workspace } from "@rbxts/services";
import WeaponClass from "../Weapon";
import BaseWeaponConfig from "shared/Modules/Configs/Weapons/Base-Weapon-Config";
import GameConfig from "shared/Modules/Configs/GameConfig";

class BaseWeaponClass extends WeaponClass {
    private victim!: Player | undefined;

    private getBullet(): BasePart {
        const bulletModel = GameConfig.ObjectPoolBullets.FindFirstChild(this.bullet.Name) as BasePart;
        if ( bulletModel !== undefined ) {

            return bulletModel;
        }
        const bullet = this.bullet.Clone();
        bullet.CanCollide = false;
        bullet.Anchored = true;

        return bullet;
    }

    private bindTouchSignal(bullet: BasePart, playerCharacter: Model) {
        if ( bullet === undefined ) return;

        let conneciton = bullet.Touched.Connect(otherPart => {
            if ( 
                otherPart.IsDescendantOf(playerCharacter) ||
                otherPart.Name === this.model.Name
            ) return;

            // print(otherPart)

            bullet.Parent = GameConfig.ObjectPoolBullets;

            const victim = Players.GetPlayerFromCharacter(otherPart.Parent);

            this.victim = victim;
        });

        return conneciton;
    }

    private startBulletMove(bullet: BasePart, bulletPostion: Vector3,distance: number, speed: number, travelTime: number, endPosition: Vector3) {
        print(distance)
        print(speed)
        print(travelTime)
        for (let i = 0; i <= distance; i += i += (speed)) {
            if ( bullet.Parent !== Workspace ) break;

            print("move")
            const alpha = i / distance;
            const newPostion = bulletPostion.Lerp(endPosition, alpha);

            const newCFrame = CFrame.lookAlong(newPostion, newPostion.sub(endPosition));
            bullet.PivotTo(newCFrame);

            task.wait(.1)
        }

    }

    attack(player: Player): [Player, Player] | [Player, undefined] {
        if (  RunService.IsServer() === false  ) return [player, undefined];

        const fireball = this.getBullet();
        
        const mouseHitPosition = GameConfig.getMousePositionInWorldEvent.InvokeClient(player) as  Vector3 | undefined;
        if ( mouseHitPosition === undefined ) return [player, undefined];
        
        const playerCharacter: Model = player.Character ?? player.CharacterAdded.Wait()[1];
        const humanoidRootPart = playerCharacter.FindFirstChild("HumanoidRootPart") as BasePart;
        
        const lookVector: Vector3 = humanoidRootPart.CFrame.LookVector;
        const startPosition = CFrame.lookAlong(humanoidRootPart.CFrame.Position, lookVector)
        
        const distance = (startPosition.Position.sub(mouseHitPosition)).Magnitude;
        const travelTime = distance / this.bulletSpeed;
        const smoothPath = travelTime * task.wait();

        
        // start loop
        this.victim = undefined;
        fireball.PivotTo(startPosition);
        fireball.Parent = Workspace;
        
        const conneciton = this.bindTouchSignal(fireball, playerCharacter);
        this.startBulletMove(
            fireball,
            fireball.Position,
            distance,
            this.bulletSpeed,
            travelTime,
            mouseHitPosition
        );
    
        conneciton?.Disconnect();
        return [player, this.victim];
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