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

                Hooks :
                    useRef -> link on Instanse or bind Instanse on Ref variable
                    useEffect -> work once when mount




/ / /   todo   / / /
    TODO:
        - fix:
            - [BUG] when i compily roblox-ts -> luau
                - Weapon-Service .attack -> :attack()






        - new:
            - Inventory
                - UI (client) 
                    - 2 item lists
                        - weapons list
                        - armores list
                    - select item
                        - create buttons
                            - Equip/Unequip, Sell
                        - tween?
                    - create new item logic







    Create:
        - ReplicatedStorage
            - Events
                - NotificationEvents / Folder
                - InventoryEvents / Folder
                    - 
                - WeaponEvents / Folder
                    - NewWeapon / RemoteEvent
                    - Attack / RemoteEvent
                - MouseEvents / Folder
                    - GetMousePositionOnScreenEvent / RemoteFunction
                    - GetMouseHitInWolrdEvent / RemoteFunction
                    - GetMousePositionInWorldEvent / RemoteFunction
                    - GetCameraRayEvent / RemoteFunction 

            - Assets / folder
                - Weapons / folder
                    - BaseWeapon / tool
                    - BaseBullet / BasePart

        - ServerStorage
            - Events / folder


    ROJO:
        - ignore
            init.meta.json
                {
                    "ignoreUnknownInstances": true
                }
*/