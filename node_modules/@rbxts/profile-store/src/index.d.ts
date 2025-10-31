import { Signal } from "./signal";
import { Store } from "./store";
import { Profile } from "./profile";
import { VersionQuery } from "./version";
import { JSONAcceptable } from "./utility";

type ProfileStoreConstant =
	| "AUTO_SAVE_PERIOD"
	| "LOAD_REPEAT_PERIOD"
	| "FIRST_LOAD_REPEAT"
	| "SESSION_STEAL"
	| "ASSUME_DEAD"
	| "START_SESSION_TIMEOUT"
	| "CRITICAL_STATE_ERROR_COUNT"
	| "CRITICAL_STATE_ERROR_EXPIRE"
	| "CRITICAL_STATE_EXPIRE"
	| "MAX_MESSAGE_QUEUE";

export = ProfileStore;
export as namespace ProfileStore;

declare namespace ProfileStore {
	// Types
	export { Profile, VersionQuery, Store, JSONAcceptable };

	/**
	 * When the Roblox is shutting down this value will be set to true and most methods will silently fail.
	 */
	export const IsClosing: boolean;

	/**
	 * After an excessive amount of DataStore calls fail this value will temporarily be set to true until the DataStore starts operating normally again.
	 *
	 * Might be useful for analytics or notifying players in-game of possible service disturbances.
	 */
	export const IsCriticalState: boolean;

	/**
	 * A signal for DataStore error logging
	 */
	export const OnError: Signal<[message: string, storeName: string, profileKey: string]>;

	/**
	 * A signal for events when a DataStore key returns a value that has all or some of it's profile components set to invalid data types.
	 *
	 * E.g., accidentally setting Profile.Data to a non table value.
	 */
	export const OnOverwrite: Signal<[storeName: string, profileKey: string]>;

	/**
	 * A signal that is called whenever ProfileStore.IsCriticalState changes.
	 */
	export const OnCriticalToggle: Signal<[isCritical: boolean]>;

	/**
	 * Indicates ProfileStore's access to the DataStore. If at first check ProfileStore.DataStoreState is "NotReady",
	 *
	 * it will eventually change to one of the other 3 possible values (NoInternet, NoAccess or Access) and never change again.
	 *
	 * "Access" means ProfileStore can write to the DataStore.
	 */
	export const DataStoreState: "NotReady" | "NoInternet" | "NoAccess" | "Access";

	/**
	 * ProfileStore objects expose methods for reading and writing to profiles. Equivalent of :GetDataStore() in Roblox DataStoreService API.
	 */
	export function New<Template extends object, RobloxMetadata extends object = object>(
		storeName: string,
		template?: Template,
	): Store<Template, RobloxMetadata>;

	/**
	 * A feature for experienced developers who understand how ProfileStore works for changing internal constants without having to fork the ProfileStore project.
	 */
	export function SetConstant(name: ProfileStoreConstant, value: number): void;
}
