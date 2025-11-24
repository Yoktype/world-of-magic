import { UserInputService, Players, ReplicatedStorage, Workspace } from "@rbxts/services";

// constants
const LOCAL_PLAYER = Players.LocalPlayer as Player;
const Camera = Workspace.WaitForChild("CurrentCamera") as Camera;

const Events = ReplicatedStorage.WaitForChild("Events") as Folder;
const MouseEvents = Events.FindFirstChild("MouseEvents") as Folder;

// events
const getMousePositionOnScreenEvent = MouseEvents.FindFirstChild("GetMousePositionOnScreenEvent") as RemoteFunction;
const getMouseHitInWolrdEvent = MouseEvents.FindFirstChild("GetMouseHitInWolrdEvent") as RemoteFunction;
const getMousePositionInWorldEvent = MouseEvents.FindFirstChild("GetMousePositionInWorldEvent") as RemoteFunction;

// private functions
export function getMousePositionOnScreen(): Vector2 {
    return UserInputService.GetMouseLocation();
}

export function getMouseInWorld(): [ BasePart, Vector3 ] | [ undefined ] {
    const mousePositionOnScreen = getMousePositionOnScreen();
    const ray = Camera.ViewportPointToRay(mousePositionOnScreen.X, mousePositionOnScreen.Y);

    const origin = ray.Origin;
    const direction = ray.Direction.mul(math.huge);

    const params = new RaycastParams();
    params.FilterType = Enum.RaycastFilterType.Exclude;
    params.FilterDescendantsInstances = [  ];
    
    const result = Workspace.Raycast(origin, direction, params);

    if ( result === undefined ) return [ undefined ];

    const instance = result.Instance;
    const position = result.Position;

    return [ instance, position ]
}

export function getMousePositionInWorld(): Vector3 | undefined {
    const [ instance, position ] = getMouseInWorld();
    if ( instance === undefined || position === undefined ) return undefined;
    return position;
}

export function getMouseHitInWolrd(): BasePart | undefined {
    const [ instance, position ] = getMouseInWorld();
    if ( instance === undefined || position === undefined ) return undefined;
    return instance;
}

// setup
getMousePositionOnScreenEvent.OnClientInvoke = () => {
    return getMousePositionOnScreen();
}

getMouseHitInWolrdEvent.OnClientInvoke = () => {
    return getMouseHitInWolrd();
}

getMousePositionInWorldEvent.OnClientInvoke = () => {
    return getMousePositionInWorld();
}