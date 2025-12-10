import React from "@rbxts/react"

interface Props{
    onClick: () => void
}

export default function OpenMainFrameButton(props: Props): React.Element {
    return (
        <frame
            Size={ UDim2.fromScale(0.05, 0.05) }
            Position={ UDim2.fromScale(0, 0.5) }
            Visible={ true }
        >
            <uistroke Thickness={ 1 } />

            <imagebutton
                Size={ UDim2.fromScale(1, 1) }
                Position={ UDim2.fromScale(0, 0) }
                Event={ { MouseButton1Click: () => { props.onClick() } } }
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
    )
}