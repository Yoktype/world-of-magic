export default abstract class WeaponClass implements Weapon {
    public model: Tool;
    public bullet: BasePart;
    public bulletSpeed: number;
    public damage: number;
    public cooldown: number;

    constructor(
        model: Tool,
        bullet: BasePart,
        bulletSpeed: number,
        damage: number,
        cooldown: number,
    ) {
        this.model = model;
        this.bullet = bullet;
        this.bulletSpeed = bulletSpeed;
        this.damage = damage;
        this.cooldown = cooldown;
    }

    attack(player: Player): [Player, Player] | [Player, undefined] {

        return [player, player]
    }
}