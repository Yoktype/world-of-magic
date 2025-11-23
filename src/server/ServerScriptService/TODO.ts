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

    - Weapon : 
            - BaseWeapon attack logic
                - hit detect :
                    - Touched ?
                    - GetBoundsInBox ?
                - Movement :
                    - RunService.Stepped ?
                    - BodyVelocity ?
                    - attachment :
                        - LinearVelocity ?
                
            
    
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