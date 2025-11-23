interface Weapon {
    model: Tool,
    cooldown: number,
    damage: number,
    attack: (player: Player) => [Player, Player] | [Player, undefined],
}