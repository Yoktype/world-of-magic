interface IClientStaff {
    instance: Tool,

    onStart: () => void,
    setupInput: () => void,
}

interface IServerStaff {
    instanece: BasePart,
    staffType: string,

    Attack: () => void,
    Cooldown: () => void,
}