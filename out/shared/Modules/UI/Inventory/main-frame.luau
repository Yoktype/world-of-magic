-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _react = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "react")
local React = _react
local useState = _react.useState
local function MainFrame(props)
	local mainFrameVisible, changeMainFrameVisible = useState(false)
	local mainFrameChangeVisible = function()
		return changeMainFrameVisible(function(v)
			return not v
		end)
	end
	return React.createElement("screengui", nil, React.createElement("frame", {
		Size = UDim2.fromScale(0.6, 0.6),
		Position = UDim2.fromScale(0.2, 0.2),
		BackgroundColor3 = Color3.fromRGB(35, 35, 35),
		Visible = mainFrameVisible,
	}, React.createElement("uicorner", {
		CornerRadius = UDim.new(0, 25),
	}), React.createElement("imagebutton", {
		Size = UDim2.fromScale(0.1, 0.1),
		Position = UDim2.fromScale(0.9, 0),
	}, React.createElement("uistroke", {
		Thickness = 1,
	}), React.createElement("textlabel", {
		Size = UDim2.fromScale(1, 1),
		Position = UDim2.fromScale(0, 0),
		BackgroundTransparency = 1,
		Text = "close",
		Font = "Highway",
		FontSize = "Size12",
	}))), React.createElement("frame", {
		Size = UDim2.fromScale(0.05, 0.05),
		Position = UDim2.fromScale(0, 0.5),
		Visible = true,
	}, React.createElement("uistroke", {
		Thickness = 1,
	}), React.createElement("imagebutton", {
		Size = UDim2.fromScale(1, 1),
		Position = UDim2.fromScale(0, 0),
		Event = {
			MouseButton1Click = function()
				mainFrameChangeVisible()
			end,
		},
	}, React.createElement("textlabel", {
		Size = UDim2.fromScale(1, 1),
		Position = UDim2.fromScale(0, 0),
		BackgroundTransparency = 1,
		Text = "open",
		Font = "Highway",
		FontSize = "Size12",
	}))))
end
return {
	default = MainFrame,
}
