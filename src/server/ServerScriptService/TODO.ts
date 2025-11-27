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
    [X] Networking
    [X] Weapon: BaseWeapon, attack, signals
        - Weapon has inf range attack
    !!! MAYBE change weapon config -> class {
        config - constant settings
        class - keep state, methods, logic
        default - game logic
    }

    Data: 
        - {
            leaderstat / Cash
            
        }

    - Data ProfileStore : OOP?
        - profile tamplate
        - updater function
            - network use
        
    - Kill rewards : 
        - money
        - level?


    - Game-store : how i will buy items? without moneys
        - client :
            - UI
                - react?
        - server :
            - take event in ProfileStore and save there that and remote another remote for given;


    - Inventory : 
    - Armore : 
    - Robux-store : 
    - Level-system :

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