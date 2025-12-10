import React from "@rbxts/react";

interface Props {

}

export default function WeaponListFrame(props: Props): React.Element {
    return (
        <frame
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
    )
}