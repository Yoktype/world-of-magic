/*
world-of-magic
GAME:
    - Staff w. Abilitys (diff. staffs); (z, x)?
    - Armore (give: Health, Walkspeed);
    - Inventory;
    - Store (buy Staffs and Armores);
    - Level-system;
    - Money-take, Money and exp for kill;
    - Data save;

TODO:
    [X] Game config
    [X] Mouse module

    - network // KEEP REMOTES in GameConfig
        - client
            - take from GameConfig remote event
            - change all
        - server
            - in GameConfig

    - Weapon : 
            - BaseWeapon attack logic
        
    - Kill rewards : 
    - Game-store : 
    - Armore : 
    - Inventory : 
    - Robux-store : 
    - Level-system :
    - Data ProfileStore :

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

ROJO :
    - ignore
        init.meta.json
            {
                "ignoreUnknownInstances": true
            }

*/