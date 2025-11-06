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

    - Staff Logic

                {Staff
                    - Attacking
                    - (z, x) abilitys

                    - BaseStaff
                        - Client
                            - new Staff
                                - CollectionService get Staff tag and bind
                                    - connect Look on Events (input)
                                        - fire Events / no params? or 1 param send THIS instance(Tool/Staff)
                        - Server
                            - take Events
                            - Get Instance and StaffType
                            - Attack and ablitys from staffType

                        ? Where i can keep Abilitys logic
                            - 1 method
                                - Script where Function(Attack) have name StaffType'a
                                - Script for Z ability find for Name "StaffType"
                                - Script for X ability find for Name "StaffType"
                            - Class Conststants

                        Server-side
                        Take Events
                        Info from Instance (Attributes)
                        Info ->> Logic / How i can keep a logic of Abilitys and Attacks

                        Client-side
                        new Staff start look events
                        fire remotes and send this is instance(Tool)
                }
*/