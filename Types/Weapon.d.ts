interface Weapon {
    model: Tool,
    bullet: BasePart,
    bulletSpeed: number,
    cooldown: number,
    damage: number,
    range: number,
    attack: (player: Player) => [Player, Model] | [Player, undefined],
}