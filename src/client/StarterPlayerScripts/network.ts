import GameConfig from "shared/Modules/Configs/GameConfig";
import { getMousePositionOnScreen, getMousePositionInWorld, getMouseHitInWolrd } from "./Utils/Mouse";


// setup
// mouse
GameConfig.getMousePositionOnScreenEvent.OnClientInvoke = () => {
    return getMousePositionOnScreen();
}
GameConfig.getMouseHitInWolrdEvent.OnClientInvoke = () => {
    return getMouseHitInWolrd();
}
GameConfig.getMousePositionInWorldEvent.OnClientInvoke = () => {
    return getMousePositionInWorld();
}