import GameConfig from "shared/Modules/Configs/GameConfig";


function getMousePositionOnScreen(player: Player,) {
    return GameConfig.getMousePositionOnScreenEvent.InvokeClient(player);
}

function getMouseHitInWolrd(player: Player) {
    return
}

function getMousePositionInWorld(player: Player) {
    return
}


export default {

    getMousePositionOnScreenEvent: getMousePositionOnScreen,
    getMouseHitInWolrdEvent: getMouseHitInWolrd,
    getMousePositionInWorldEvent: getMousePositionInWorld,

}