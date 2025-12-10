import React from "@rbxts/react"

interface Props{
    onClick: () => void
}

export default function CloseMainFrameButton(props: Props): React.Element {
    return (
        <imagebutton // close button
            Size={ UDim2.fromScale(0.1, 0.1) }
            Position={ UDim2.fromScale(0.9, 0) }
            Event={ { MouseButton1Click: () => { props.onClick() } } }
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
    )
}