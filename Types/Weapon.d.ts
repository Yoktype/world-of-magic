interface Weapon {
    damage: number,
    cooldown: number,
    range: number, 

    model: Tool | BasePart,
    
    attack: (player: Player) => void
}