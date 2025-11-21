import { RunService } from "@rbxts/services"


let server!: object;
let client!: object;

const isServer: boolean = RunService.IsServer();
const isClient: boolean = RunService.IsClient();

if ( isServer === true ) {
    const object = {

    };

    server = object;
} else { server = {}; }

if ( isClient === true ) {
    const object = {

    };

    client = object;
} else { client = {}; }

export default {
    server,
    client,

}