// server class

import { Players, RunService, Workspace } from "@rbxts/services";
import WeaponClass from "../Weapon";
import BaseWeaponConfig from "shared/Modules/Configs/Weapons/Base-Weapon-Config";
import GameConfig from "shared/Modules/Configs/GameConfig";


class BaseWeaponClass extends WeaponClass {

    private victim!: Player | undefined

    private getBullet(): BasePart {
        const bulletModel = GameConfig.ObjectPoolBullets.FindFirstChild(this.bullet.Name) as BasePart;
        if ( bulletModel !== undefined ) {

            return bulletModel;
        }

        return this.bullet.Clone();
    }

    private bindTouchSignal(bullet: BasePart, playerCharacter: Model) {
        if ( bullet === undefined ) return;

        let conneciton = bullet.Touched.Connect(otherPart => {
            if ( otherPart.IsDescendantOf(playerCharacter) ) return;

            bullet.Parent = GameConfig.ObjectPoolBullets;

            const victim = Players.GetPlayerFromCharacter(otherPart.Parent);
            if ( victim === undefined ) return;

            // need return player
            this.victim = victim;
        });

        return conneciton;
    }

    private startBulletMove(bullet: BasePart, bulletPostion: Vector3, path: number, endPosition: Vector3) {
        for (let i = 1; i < path; i += 1) {
            if ( bullet.Parent !== Workspace ) break;

            const alpha = i/path;
            const newPostion = bulletPostion.Lerp(endPosition, alpha);

            const newCFrame = CFrame.lookAlong(newPostion, endPosition);
            bullet.PivotTo(newCFrame);
        }
    }


    attack(player: Player): [Player, Player] | [Player, undefined] {
        if (RunService.IsServer() === undefined) return [player, undefined];

        const fireball = this.getBullet();

        const mouseHitPosition = GameConfig.getMousePositionInWorldEvent.InvokeClient(player) as  Vector3 | undefined;
        if ( mouseHitPosition === undefined ) return [player, undefined];
 
        const playerCharacter: Model = player.Character ?? player.CharacterAdded.Wait()[1];
        const humanoidRootPart = playerCharacter.FindFirstChild("HumanoidRootPart") as BasePart;

        const startPosition: Vector3 = humanoidRootPart.CFrame.LookVector.mul( new Vector3(1, 2, 0) );
        
        const distance = (startPosition.sub(mouseHitPosition)).Magnitude;
        const travelTime = distance / this.bulletSpeed;
        const smoothPath = travelTime / task.wait();

        // start loop
        this.victim = undefined;
        fireball.Position = startPosition;

        const conneciton = this.bindTouchSignal(fireball, playerCharacter);
        this.startBulletMove(
            fireball,
            fireball.Position,
            smoothPath,
            mouseHitPosition
        );
    
        conneciton?.Disconnect()
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