
class StaffController implements IClientStaff {

    readonly instance: Tool;

    constructor(instance: Tool) {
        this.instance = instance

        this.setupInput();
    };

    onStart() {

        // create serverStaff class

    }

    setupInput() {
        if (this.instance === undefined) return;

        this.instance.Equipped.Connect(() => {});
        this.instance.Unequipped.Connect(() => {});
        this.instance.Activated.Connect(() => {});

        return;
    };
}