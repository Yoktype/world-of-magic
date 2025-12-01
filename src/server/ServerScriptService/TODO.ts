/*
world-of-magic
    GAME:
        - Magic weapons (Base, Fire, Ice, and more) : { attack, abilityZ, abilityX }
        - Data saving { ProfileStore } 
        - Reward system
        - Inventory
        - Store
        - Level system


    TODO :
        - Base weapon attack logic
            - smooth move, for fireball
            - touching detect
            - hit handler? 
        
        - Mouse module
            -  if raycast instance undefined then return click direction + position ViewportPointToRay




    Create :
        - ReplicatedStorage
            - Events
                - WeaponEvents / Folder
                    - NewWeapon / RemoteEvent
                    - Attack / RemoteEvent
                - MouseEvents / Folder
                    - GetMousePositionOnScreenEvent / RemoteFunction
                    - GetMouseHitInWolrdEvent / RemoteFunction
                    - GetMousePositionInWorldEvent / RemoteFunction

            - Assets / folder
                - Weapons / folder
                    - BaseWeapon / tool
                    - BaseBullet / BasePart

    ROJO :
        - ignore
            init.meta.json
                {
                    "ignoreUnknownInstances": true
                }

*/