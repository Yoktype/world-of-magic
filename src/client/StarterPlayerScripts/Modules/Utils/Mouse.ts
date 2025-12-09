import { UserInputService, Workspace } from "@rbxts/services";

// constants
const Camera = Workspace.CurrentCamera as Camera;

// private functions
export function getMousePositionOnScreen(): Vector2 {
    return UserInputService.GetMouseLocation();
}

export function getCameraRay(): Ray {
    const location = getMousePositionOnScreen();
    return Camera.ViewportPointToRay(location.X, location.Y);
}

export function getMouseInWorld(): [ BasePart, Vector3 ] | [ undefined ,Vector3 ] {
    const ray = getCameraRay();

    const origin = ray.Origin;
    const direction = ray.Direction.mul(999);

    const anotherEndPoint = origin.add(direction);
    
    const result = Workspace.Raycast(origin, anotherEndPoint);

    if ( result === undefined ) return [ undefined, anotherEndPoint ];
    
    const instance = result.Instance;
    const position = result.Position;

    return [ instance, position ];
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