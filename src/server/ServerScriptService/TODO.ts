/*
world-of-magic
GAME:
    - Staff w. Abilitys (diff. staffs); (z, x, c, v)?
    - Armore (give: Health, Walkspeed);
    - Inventory;
    - Store (buy Staffs and Armores);
    - Level-system;
    - Money-take, Money and exp for kill;
    - Data save;

TODO:
    [X] data handler (ProfileStore);
    [X] base init progect (folders, base utils);


    - Staff
        - Client side;
            - StaffController
                - getEvent when player got tool?
                    - setup input;
                        - Equip;
                        - Unequip;
                        - Activated;
                - Attack use animated
                - where i can handle cooldown
        - Server side;
            - Staff Handler
                - get staffType
                    - use Class from type
        - Staff class
            - 1 Class have
                - instance Tool
                - Attack
                - Cooldown
*/