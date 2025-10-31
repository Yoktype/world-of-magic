import { Profile } from "./profile";

export interface VersionQuery<Template extends object, RobloxMetaData extends object = object> {
	NextAsync(): Profile<Template, RobloxMetaData> | undefined;
}
