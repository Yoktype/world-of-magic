export default class WeaponClass {
    public model: Tool;
    public bullet: BasePart;
    public bulletSpeed: number;
    public damage: number;
    public cooldown: number;
    public range: number;

    constructor(
        model: Tool,
        bullet: BasePart,
        bulletSpeed: number,
        damage: number,
        cooldown: number,
        range: number,
    ) {
        this.model = model;
        this.bullet = bullet;
        this.bulletSpeed = bulletSpeed;
        this.damage = damage;
        this.cooldown = cooldown;
        this.range = range;
    }

    /*
        how work oop, classes

        i can't create here a methods because i created
        at another class where i use this class
    */

}