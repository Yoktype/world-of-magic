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

            - Hooks :
                - useRef -> link on Instanse or bind Instanse on Ref variable
                - useEffect -> work once when mount 



/ / /     todo      / / /
    TODO:
        - fix:
            - Weapon-Service
                - .attack -> :attack (when compile on luau)
            - screenGui reset per death
            [X] delete old commits


            - soon
                - rework fireball
                    - Movement -> Tween
                    - + VFX
                - rework weapon (client)
                    - tool -> inventory item

        - new:
            - Inventory
                - UI
                    - items list
                        - when mouse focus on item
                            - Show item property (damage, cooldown)
                    - Sell mode
                    - Select mode
                - buttons work (need function for got 1 weapon)
                - function / remote for create new item
                - 2parts
                    - 1 part / Weapons (default)
                    - 2 part / Armore
                - bind
                    - keycode "T"
                        - open inventory frame
                - limit slots



           
    






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