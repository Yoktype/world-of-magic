interface Weapon {
    model: Tool,
    cooldown: number,
    damage: number,
    attack: (player: Player) => void,
}