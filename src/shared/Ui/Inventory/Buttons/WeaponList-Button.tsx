import React from "@rbxts/react";

interface Props {

}

export default function OpenWeaponListButton(props: Props): React.Element {
    return (
        <imagebutton
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
    )
}