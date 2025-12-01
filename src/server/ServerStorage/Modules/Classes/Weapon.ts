export default class WeaponClass {
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

    /*
        how work oop, classes

        i can't create here a methods because i created
        at another class where i use this class
    */

}