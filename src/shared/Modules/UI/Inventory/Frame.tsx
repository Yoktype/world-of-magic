import React, { useState } from "@rbxts/react";

interface Porps {

}

const [mainFrameVisible, changeMainFrameVisible] = useState(false);
const mainFrameChangeVisible = () => changeMainFrameVisible((v) => !v);

function changeVisible() {} // for use in another module

function closeFrame() {
	// Tween

	// Close -> EquipButton, SellButton
}

function openFrame() {
	// Tween
}

function selectItem() {
	// Open -> EquipButton, SellButton
}

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
						FontSize={ "Size18" }
					>

					</textlabel>
				</imagebutton>
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
						FontSize={ "Size18" }
					>
					</textlabel>	
				</imagebutton>
			</frame>
		</screengui>
	);
}