-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
-- server class
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local Players = _services.Players
local RunService = _services.RunService
local Workspace = _services.Workspace
local WeaponClass = TS.import(script, game:GetService("ServerStorage"), "Modules", "Classes", "Weapon").default
local BaseWeaponConfig = TS.import(script, game:GetService("ReplicatedStorage"), "Modules", "Configs", "Weapons", "Base-Weapon-Config").default
<<<<<<< HEAD
local GameConfig = TS.import(script, game:GetService("ReplicatedStorage"), "Modules", "Configs", "GameConfig").default
=======
local GameConfig = TS.import(script, game:GetService("ReplicatedStorage"), "Modules", "Configs", "Game-Config").default
>>>>>>> b3d315b (new: react UI: Inventory frame)
local BaseWeaponClass
do
	local super = WeaponClass
	BaseWeaponClass = setmetatable({}, {
		__tostring = function()
			return "BaseWeaponClass"
		end,
		__index = super,
	})
	BaseWeaponClass.__index = BaseWeaponClass
	function BaseWeaponClass.new(...)
		local self = setmetatable({}, BaseWeaponClass)
		return self:constructor(...) or self
	end
	function BaseWeaponClass:constructor(...)
		super.constructor(self, ...)
	end
	function BaseWeaponClass:getRender()
		local bulletModel = GameConfig.ObjectPoolBullets:FindFirstChild(self.bullet.Name)
		if bulletModel ~= nil then
			return bulletModel
		end
		local bullet = self.bullet:Clone()
		bullet.CanCollide = false
		bullet.Anchored = true
		return bullet
	end
	function BaseWeaponClass:getSetup(player)
		local function Setup()
			local mouseHitPosition = GameConfig.getMousePositionInWorldEvent:InvokeClient(player)
			if mouseHitPosition == nil then
				return { false, nil }
			end
			local playerCharacter = player.Character or (select(2, player.CharacterAdded:Wait()))
			local humanoidRootPart = playerCharacter:FindFirstChild("HumanoidRootPart")
			local setup = {
				mouseHitPosition = mouseHitPosition,
				playerCharacter = playerCharacter,
				humanoidRootPart = humanoidRootPart,
			}
			return { true, setup }
		end
		local _binding = Setup()
		local bool = _binding[1]
		local playerSetup = _binding[2]
		if bool == true then
			return playerSetup
		end
		return nil
	end
	function BaseWeaponClass:getStartCframe(cf)
		local lookVector = cf.LookVector
		local startPosition = CFrame.lookAlong(cf.Position, lookVector)
		return startPosition
	end
	function BaseWeaponClass:move(bullet, bulletPostion, distance, move, endPosition)
		do
			local i = 0
			local _shouldIncrement = false
			while true do
				if _shouldIncrement then
					i += move
				else
					_shouldIncrement = true
				end
				if not (i <= distance) then
					break
				end
				if bullet.Parent ~= Workspace then
					break
				end
				local alpha = i / distance
				local newPostion = bulletPostion:Lerp(endPosition, alpha)
				bullet.Position = newPostion
				RunService.Heartbeat:Wait()
			end
		end
	end
	function BaseWeaponClass:attack(player)
		if RunService:IsServer() == false then
			return { player, nil }
		end
		local victim
		local fireball = self:getRender()
		local playerSetup = self:getSetup(player)
		if playerSetup == nil then
			return { player, nil }
		end
		local startPosition = self:getStartCframe(playerSetup.humanoidRootPart.CFrame)
		local _position = startPosition.Position
		local _mouseHitPosition = playerSetup.mouseHitPosition
		local distance = math.max(0, ((_position - _mouseHitPosition).Magnitude + 1))
		local travelTime = distance / self.bulletSpeed
		local move = (self.bulletSpeed / 144)
		-- start loop
		victim = nil
		fireball:PivotTo(startPosition)
		fireball.Parent = Workspace
		-- property don't work how i would like
		fireball.Touched:Connect(function(otherPart)
			local character = otherPart.Parent
			local humanoid = character:FindFirstChild("Humanoid")
			local plr = Players:GetPlayerFromCharacter(otherPart.Parent)
			if humanoid == nil or plr == player then
				return nil
			end
			fireball.Parent = GameConfig.ObjectPoolBullets
			victim = character
		end)
		self:move(fireball, fireball.Position, distance, move, playerSetup.mouseHitPosition)
		if fireball.Parent == Workspace then
			fireball.Parent = GameConfig.ObjectPoolBullets
		end
		return { player, victim }
	end
end
local default = {
	weapon = BaseWeaponClass.new(BaseWeaponConfig.model, BaseWeaponConfig.bullet, BaseWeaponConfig.bulletSpeed, BaseWeaponConfig.damage, BaseWeaponConfig.cooldown),
}
return {
	default = default,
}
