import GameConfig from "shared/Modules/Configs/game-config";
import { getMousePositionOnScreen, getMousePositionInWorld, getMouseHitInWolrd, getCameraRay } from "./Utils/mouse";


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
GameConfig.getCameraRay.OnClientInvoke = () => {
    return getCameraRay();
}