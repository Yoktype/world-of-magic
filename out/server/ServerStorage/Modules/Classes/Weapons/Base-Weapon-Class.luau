-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
-- server class
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local Players = _services.Players
local RunService = _services.RunService
local Workspace = _services.Workspace
local WeaponClass = TS.import(script, game:GetService("ServerStorage"), "Modules", "Classes", "Weapon").default
local BaseWeaponConfig = TS.import(script, game:GetService("ReplicatedStorage"), "Modules", "Configs", "Weapons", "Base-Weapon-Config").default
local GameConfig = TS.import(script, game:GetService("ReplicatedStorage"), "Modules", "Configs", "GameConfig").default
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
	function BaseWeaponClass:getBullet()
		local bulletModel = GameConfig.ObjectPoolBullets:FindFirstChild(self.bullet.Name)
		if bulletModel ~= nil then
			return bulletModel
		end
		local bullet = self.bullet:Clone()
		bullet.CanCollide = false
		bullet.Anchored = true
		return bullet
	end
	function BaseWeaponClass:bindTouchSignal(bullet, playerCharacter)
		if bullet == nil then
			return nil
		end
		local conneciton = bullet.Touched:Connect(function(otherPart)
			if otherPart:IsDescendantOf(playerCharacter) or otherPart.Name == self.model.Name then
				return nil
			end
			-- print(otherPart)
			bullet.Parent = GameConfig.ObjectPoolBullets
			local victim = Players:GetPlayerFromCharacter(otherPart.Parent)
			self.victim = victim
		end)
		return conneciton
	end
	function BaseWeaponClass:startBulletMove(bullet, bulletPostion, distance, speed, travelTime, endPosition)
		print(distance)
		print(speed)
		print(travelTime)
		do
			local i = 0
			local _shouldIncrement = false
			while true do
				if _shouldIncrement then
					i += speed
					i += i
				else
					_shouldIncrement = true
				end
				if not (i <= distance) then
					break
				end
				if bullet.Parent ~= Workspace then
					break
				end
				print("move")
				local alpha = i / distance
				local newPostion = bulletPostion:Lerp(endPosition, alpha)
				local _endPosition = endPosition
				local newCFrame = CFrame.lookAlong(newPostion, newPostion - _endPosition)
				bullet:PivotTo(newCFrame)
				task.wait(.1)
			end
		end
	end
	function BaseWeaponClass:attack(player)
		if RunService:IsServer() == false then
			return { player, nil }
		end
		local fireball = self:getBullet()
		local mouseHitPosition = GameConfig.getMousePositionInWorldEvent:InvokeClient(player)
		if mouseHitPosition == nil then
			return { player, nil }
		end
		local playerCharacter = player.Character or (select(2, player.CharacterAdded:Wait()))
		local humanoidRootPart = playerCharacter:FindFirstChild("HumanoidRootPart")
		local lookVector = humanoidRootPart.CFrame.LookVector
		local startPosition = CFrame.lookAlong(humanoidRootPart.CFrame.Position, lookVector)
		local distance = (startPosition.Position - mouseHitPosition).Magnitude
		local travelTime = distance / self.bulletSpeed
		local smoothPath = travelTime * task.wait()
		-- start loop
		self.victim = nil
		fireball:PivotTo(startPosition)
		fireball.Parent = Workspace
		local conneciton = self:bindTouchSignal(fireball, playerCharacter)
		self:startBulletMove(fireball, fireball.Position, distance, self.bulletSpeed, travelTime, mouseHitPosition)
		local _result = conneciton
		if _result ~= nil then
			_result:Disconnect()
		end
		return { player, self.victim }
	end
end
local default = {
	weapon = BaseWeaponClass.new(BaseWeaponConfig.model, BaseWeaponConfig.bullet, BaseWeaponConfig.bulletSpeed, BaseWeaponConfig.damage, BaseWeaponConfig.cooldown),
}
return {
	default = default,
}
