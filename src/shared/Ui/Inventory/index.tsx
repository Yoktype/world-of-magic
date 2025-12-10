import React, { useState } from "@rbxts/react";
import OpenMainFrameButton from "./Buttons/Open-MainFrame-Button";
import CloseMainFrameButton from "./Buttons/Close-MainFrame-Button";
import OpenWeaponListButton from "./Buttons/WeaponList-Button";
import OpenArmoreListButton from "./Buttons/ArmoreList-Button";
import WeaponListFrame from "./Frames/WeaponList-Frame";

interface Porps {

}

// main frame visible
const [mainFrameVisible, changeMainFrameVisible] = useState(true);
const mainFrameChangeVisible = () => changeMainFrameVisible((v) => !v);


export default function MainFrame(props: Porps): React.Element {
	return (
		<screengui ResetOnSpawn={ false } >
			<frame
				Size={ UDim2.fromScale(0.6, 0.6) }
				Position={ UDim2.fromScale(0.2, 0.2) }
				BackgroundColor3={ Color3.fromRGB(35, 35, 35) }
				Visible={ mainFrameVisible }
			>
				<uicorner CornerRadius={ new UDim(0, 25) } />

				<CloseMainFrameButton onClick={ mainFrameChangeVisible } />
				<OpenWeaponListButton />
				<OpenArmoreListButton />

				<WeaponListFrame />
			</frame>
			
			<OpenMainFrameButton onClick={ mainFrameChangeVisible } />
		</screengui>
	);
}