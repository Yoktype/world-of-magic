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
    TODO:
        - fix:
            - give tool again while player die ()

        - new:
            - Inventory
                - UI
                    - items list
                        - when mouse focus on item
                            - Show item property (damage, cooldown)
                    - Sell mode
                    - Select mode
                    - 




           
                        

    Hooks :

	useRef -> link on Instanse or bind Instanse on Ref variable
	useEffect -> work once when mount 





           
    






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