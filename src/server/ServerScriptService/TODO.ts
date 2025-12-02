/*
world-of-magic
    GAME:
        - Magic weapons (Base, Fire, Ice, and more) : { attack, abilityZ, abilityX }
        - Data saving { ProfileStore } 
        - Reward system
        - Inventory
        - Store
        - Level system


    TODO:
        - fix:
            [X] weapon inf range
            [X] mouse hit Position has offset direction

        - new:
            - reward-service
            - profile-store








    Create:
        - ReplicatedStorage
            - Events
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

    ROJO:
        - ignore
            init.meta.json
                {
                    "ignoreUnknownInstances": true
                }


    BUGS:
        - WeaponHandler
            - attack function, .attack => :attack
    
*/