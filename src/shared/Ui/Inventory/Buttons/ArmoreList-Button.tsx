import React from "@rbxts/react";

interface Props {

}

export default function OpenArmoreListButton(props: Props): React.Element {
    return (
        <imagebutton
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
    )
}