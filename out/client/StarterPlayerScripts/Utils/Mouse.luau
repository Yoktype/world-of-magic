-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local UserInputService = _services.UserInputService
local Workspace = _services.Workspace
-- constants
local Camera = Workspace.CurrentCamera
-- private functions
local function getMousePositionOnScreen()
	return UserInputService:GetMouseLocation()
end
local function getMouseInWorld()
	local mousePositionOnScreen = getMousePositionOnScreen()
	local ray = Camera:ViewportPointToRay(mousePositionOnScreen.X, mousePositionOnScreen.Y)
	local origin = ray.Origin
	local direction = ray.Direction * 200
	-- const params = new RaycastParams();
	-- params.FilterType = Enum.RaycastFilterType.Exclude;
	-- params.FilterDescendantsInstances = [  ];
	local result = Workspace:Raycast(origin, direction)
	if result == nil then
		return { nil }
	end
	local instance = result.Instance
	local position = result.Position
	return { instance, position }
end
local function getMousePositionInWorld()
	local _binding = getMouseInWorld()
	local instance = _binding[1]
	local position = _binding[2]
	if position == nil then
		return nil
	end
	return position
end
local function getMouseHitInWolrd()
	local _binding = getMouseInWorld()
	local instance = _binding[1]
	local position = _binding[2]
	if instance == nil or position == nil then
		return nil
	end
	return instance
end
return {
	getMousePositionOnScreen = getMousePositionOnScreen,
	getMouseInWorld = getMouseInWorld,
	getMousePositionInWorld = getMousePositionInWorld,
	getMouseHitInWolrd = getMouseHitInWolrd,
}
