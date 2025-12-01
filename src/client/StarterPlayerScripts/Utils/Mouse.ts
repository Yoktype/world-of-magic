import { UserInputService, Workspace } from "@rbxts/services";

// constants
const Camera = Workspace.CurrentCamera as Camera;

// private functions
export function getMousePositionOnScreen(): Vector2 {
    return UserInputService.GetMouseLocation();
}

export function getMouseInWorld(): [ BasePart, Vector3 ] | [ undefined ,Vector3 ] {
    const mousePositionOnScreen = getMousePositionOnScreen();
    const ray = Camera.ViewportPointToRay(mousePositionOnScreen.X, mousePositionOnScreen.Y);
    
    const origin = ray.Origin;
    const direction = ray.Direction.mul(200);
    
    const result = Workspace.Raycast(origin, direction);

    if ( result === undefined ) return [ undefined, direction ]
    
    const instance = result.Instance;
    const position = result.Position;

    return [ instance, position ]
}

export function getMousePositionInWorld(): Vector3 | undefined {
    const [ instance, position ] = getMouseInWorld();
    if ( position === undefined ) return undefined;
    return position;
}

export function getMouseHitInWolrd(): BasePart | undefined {
    const [ instance, position ] = getMouseInWorld();
    if ( instance === undefined ) return undefined;
    return instance;
}