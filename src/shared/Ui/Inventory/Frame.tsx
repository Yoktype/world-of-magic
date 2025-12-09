import React, { useState } from "@rbxts/react";

interface Porps {

}

// main frame visible
const [mainFrameVisible, changeMainFrameVisible] = useState(true);
const mainFrameChangeVisible = () => changeMainFrameVisible((v) => !v);

// weapon list visible
const [weaponListVisible, changeWeaponListVisible] = useState(true);
const changeVisibleWeaponList = () => changeWeaponListVisible((v) => !v);

export default function MainFrame(props: Porps): React.Element {
	return (
		<screengui>
			<frame // main frame
				Size={ UDim2.fromScale(0.6, 0.6) }
				Position={ UDim2.fromScale(0.2, 0.2) }
				BackgroundColor3={ Color3.fromRGB(35, 35, 35) }
				Visible={ mainFrameVisible }
			>

				<uicorner CornerRadius={ new UDim(0, 25) } />

				<imagebutton // close button
					Size={ UDim2.fromScale(0.1, 0.1) }
					Position={ UDim2.fromScale(0.9, 0) }
					Event={ { MouseButton1Click: () => { mainFrameChangeVisible() } } }
				>
					<uistroke Thickness={ 1 } />

					<textlabel
						Size={ UDim2.fromScale(1, 1) }
						Position={ UDim2.fromScale(0, 0) }
						BackgroundTransparency={ 1 }
						Text={ "close" }
						Font={ "Highway" }
						TextScaled={ true }
					>

					</textlabel>
				</imagebutton>

				<imagebutton // weapon button list
					Size={ UDim2.fromScale(0.15, 0.1) }
					Position={ UDim2.fromScale(0.05, 0) }
					Event={ {  } }
				>

					<uistroke Thickness={ 1 } Color={ Color3.fromRGB(255, 255, 255) } />

					<textlabel
						Size={ UDim2.fromScale(1, 0.7) }
						Position={ UDim2.fromScale(0, 0.15) }
						Text={ "Weapon" }
						Font={ "Highway" }
						TextScaled={ true }
					>
					</textlabel>

				</imagebutton>

				<imagebutton // armore button list
					Size={ UDim2.fromScale(0.15, 0.1) }
					Position={ UDim2.fromScale(0.2, 0) }
					Event={ {  } }
				>

					<uistroke Thickness={ 1 } Color={ Color3.fromRGB(255, 255, 255) } />

					<textlabel
						Size={ UDim2.fromScale(1, 0.7) }
						Position={ UDim2.fromScale(0, 0.15) }
						Text={ "Armore" }
						Font={ "Highway" }
						TextScaled={ true }
					>
					</textlabel>

				</imagebutton>

				<frame // weapon list
					Size={ UDim2.fromScale(0.85, 0.85) }
					Position={ UDim2.fromScale(0.05, 0.11) }
					BackgroundColor3={ Color3.fromRGB(35, 35, 35) }
					Visible={ true }
				>

					<folder
					
					>
						<uigridlayout CellSize={ UDim2.fromScale(0.2, 0.25) }/>

					</folder>
				</frame>
			</frame>
			<frame // openButton
				Size={ UDim2.fromScale(0.05, 0.05) }
				Position={ UDim2.fromScale(0, 0.5) }
				Visible={ true }
			>
				<uistroke Thickness={ 1 } />

				<imagebutton
					Size={ UDim2.fromScale(1, 1) }
					Position={ UDim2.fromScale(0, 0) }
					Event={ { MouseButton1Click: () => { mainFrameChangeVisible() } } }
				>
					<textlabel
						Size={ UDim2.fromScale(1, 1) }
						Position={ UDim2.fromScale(0, 0) }
						BackgroundTransparency={ 1 }
						Text={ "open" }
						Font={ "Highway" }
						TextScaled={ true }
					>
					</textlabel>	
				</imagebutton>
			</frame>
		</screengui>
	);
}