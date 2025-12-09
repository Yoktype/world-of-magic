import GameConfig from "shared/Modules/Configs/Game-Config";
import { getMousePositionOnScreen, getMousePositionInWorld, getMouseHitInWolrd, getCameraRay } from "./Modules/Utils/mouse";


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

/* inventory
    Equip
    Unequip
    NewItem
    DeletItem
    UpdateInventory
    EquippedItems
*/