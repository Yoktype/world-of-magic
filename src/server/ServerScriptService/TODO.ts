/*
world-of-magic
    GAME:
        - Magic weapons (Base, Fire, Ice, and more) : { attack, abilityZ, abilityX }
        - Data saving { ProfileStore } 
        - Reward system
        - Inventory
        - Store
        - Armore system
        - Level system
        - Monetization


        - flex inf 
            - HttpService.GenerateGUID(false) -> unique id

            - react Hooks :
                - useRef -> link on Instanse or bind Instanse on Ref variable
                - useEffect -> work once when mount for bind exapmle




/ / /   todo   / / /
    TODO:
        fix:
            [bug] : 
                - Weapon-Service .attack -> :attack()
                - screengui reset per respawn

            [rework] :
                [X] react companents



                - 🚀 Weapon-Service [w. derpmonster83 paintball and phantom forces review]
                - 🚀 Base-Weapon-Class rework logic


        new:
            - Inventory
                UI (client) :
                    [X] main frame
                    [X] open frame button
                    [X] close frame button
                    [X] weapon list frame

                    - armore list frame
                    - open weapon list button
                    - open armore list button
                    - item template
                        - selectable
                        - focus data (item property)
                    - select item
                        - equip / unequip button
                        - sell button

                UI network (client) :
                    - event create new item
                    - event sell item
                    - event equip / unequip item
                    - event update states

            - React structure 
                - hooks.ts -> all hooks


























    ROJO:
        - ignore
            init.meta.json
                {
                    "ignoreUnknownInstances": true
                }
*/