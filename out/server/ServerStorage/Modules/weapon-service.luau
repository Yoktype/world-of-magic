-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Players = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Players
local GameConfig = TS.import(script, game:GetService("ReplicatedStorage"), "Modules", "Configs", "Game-Config").default
local BaseWeaponClass = TS.import(script, game:GetService("ServerStorage"), "Modules", "Classes", "Weapons", "Base-Weapon-Class").default
local killReward = TS.import(script, game:GetService("ServerStorage"), "Modules", "Reward-Service").killReward
-- only server scope
if GameConfig.server == nil then
	error("")
end
-- init configs
local WeaponsConfigs = {}
local _bASE_WEAPON = GameConfig.BASE_WEAPON
local _weapon = BaseWeaponClass.weapon
WeaponsConfigs[_bASE_WEAPON] = _weapon
-- private functions
-- activated this function from ProfileStore only by bindable
local function newWeaponForPlayer(player, WeaponName)
	if GameConfig.server == nil then
		error("")
	end
	local _weaponName = WeaponName
	local config = WeaponsConfigs[_weaponName]
	if config == nil then
		local _bASE_WEAPON_1 = GameConfig.BASE_WEAPON
		config = WeaponsConfigs[_bASE_WEAPON_1]
	end
	local weapon = config.model:Clone()
	weapon:SetAttribute(GameConfig.WEAPON_STATE, GameConfig.BASE_WEAPON)
	weapon:SetAttribute(GameConfig.COOLDOWN, 0)
	-- TODO: keep tool in folder/inventory
	weapon.Parent = player:FindFirstChild("Backpack")
	GameConfig.newWeaponEvent:FireClient(player, weapon)
end
local function getWeaponState(tool)
	if GameConfig.server == nil then
		error("")
	end
	local _condition = tool:GetAttribute(GameConfig.WEAPON_STATE)
	if _condition == nil then
		_condition = GameConfig.BASE_WEAPON
	end
	return _condition
end
local function killFeed(attacker, victim)
	print(`{attacker}, killed {victim}`)
end
--[[
	 TODO
	    killfeed UI
	
]]
local function reward(player)
	killReward(player)
end
--[[
	
	    ProfileStore reward take and save, upd UI
	
]]
local function hit(victim, config)
	local damage = config.damage
	local humanoid = victim:FindFirstChild("Humanoid")
	local health = math.max(0, humanoid.Health - damage)
	print(`health, in hit function : {health}`)
	humanoid.Health = health
	if health <= 0 then
		return true
	end
	return false
end
local function isCooldown(tool)
	if GameConfig.server == nil then
		error("")
	end
	local weaponState = getWeaponState(tool)
	local weaponConfig = WeaponsConfigs[weaponState]
	local t = os.time()
	local _condition = tool:GetAttribute(GameConfig.COOLDOWN)
	if _condition == nil then
		_condition = 0
	end
	local toolCooldown = _condition
	local configCooldown = weaponConfig.cooldown
	local diff = t - toolCooldown
	if diff > configCooldown then
		tool:SetAttribute(GameConfig.COOLDOWN, t)
		return false
	end
	return true
end
local function attack(player, tool)
	local weaponState = getWeaponState(tool)
	local weaponConfig = WeaponsConfigs[weaponState]
	local cooldown = isCooldown(tool)
	if cooldown == true then
		return nil
	end
	local _binding = weaponConfig.attack(player)
	local attacker = _binding[1]
	local victim = _binding[2]
	if victim == nil then
		return nil
	end
	local isKill = hit(victim, weaponConfig)
	local playerVictim = Players:GetPlayerFromCharacter(victim)
	if isKill == true then
		reward(attacker)
		killFeed(attacker, playerVictim)
	end
end
-- setup
Players.PlayerAdded:Connect(function(player)
	task.wait(5)
	print(`give weapon for : {player.DisplayName}`)
	newWeaponForPlayer(player, GameConfig.BASE_WEAPON)
end)
GameConfig.attackEvent.OnServerEvent:Connect(function(player, args)
	if player == nil or args == nil then
		return nil
	end
	local tool = args
	attack(player, tool)
end)
return nil
