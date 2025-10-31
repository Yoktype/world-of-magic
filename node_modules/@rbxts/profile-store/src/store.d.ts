import { Profile } from "./profile";
import { JSONAcceptable } from "./utility";
import { VersionQuery } from "./version";

export interface Store<Template extends object, RobloxMetadata extends object = object> {
	/**
	 * `ProfileStore.Mock` is a reflection of methods available in the `ProfileStore`, but said methods will now operate on profiles stored on a separate "fake" DataStore that will be forgotten when the game server shuts down.
	 *
	 * Profiles loaded using the same key from `ProfileStore` and `ProfileStore.Mock` will be different profiles because the regular and mock versions of a `ProfileStore` are isolated from each other.
	 */
	readonly Mock: Omit<Store<Template, RobloxMetadata>, "Mock">;

	/**
	 * The name of the DataStore that was defined as the first argument of ProfileStore.New().
	 */
	readonly Name: string;

	/**
	 * Starts a session for a profile. If other servers call this method using the same profile_key they would notify the server that currently owns the session to make a final save before letting another server acquire the session.
	 *
	 * While a session is active you can expect any changes to Profile.Data to be saved. You can find out whether a session has ended by checking Profile:IsActive() == true or by listening to Profile.OnSessionEnd.
	 *
	 * You must always call Profile:EndSession() after you're done working with a profile as failing to do so will make the game perform more and more DataStore requests.
	 */
	StartSessionAsync(
		profileKey: string,
		params?: {
			Cancel?: () => boolean;
			Steal?: boolean;
		},
	): Profile<Template, RobloxMetadata>;

	/**
	 * Sends a message to a profile regardless of whether a server has started a session for it.
	 *
	 * Each ProfileStore:MessageAsync() call will use one :UpdateAsync() call for sending the message and another :UpdateAsync() call on the server that currently has a session started for the profile - This means that ProfileStore:MessageAsync() is only to be used for when handling critical data like gifting paid items to in-game friends that may or may not be online at the moment.
	 *
	 * If you don't mind the possibility of your messages failing to deliver, use MessagingService instead. See Profile:MessageHandler() to learn how to receive messages.
	 */
	MessageAsync(profileKey: string, message: JSONAcceptable): boolean;

	/**
	 * Attempts to load the latest profile version (or a specified version via the version argument) from the DataStore without starting a session.
	 *
	 * Returned Profile will not auto-save and you won't have to call :EndSession() for it. Data in the returned Profile can be edited to create a payload which can be saved via Profile:SetAsync(). If there's no data saved in the DataStore under a provided profile_key, ProfileStore:GetAsync() will return nil.
	 *
	 * :GetAsync() is the the preferred way of reading player data without editing it.
	 */
	GetAsync(profileKey: string, version?: string): Profile<Template, RobloxMetadata> | undefined;

	/**
	 * Creates a profile version query using DataStore:ListVersionsAsync() (Official documentation).
	 *
	 * Results are retrieved through VersionQuery:NextAsync(). Date definitions are easier with the DateTime (Official documentation) library.
	 *
	 * User defined day and time will have to be converted to Unix time (Wikipedia) while taking their timezone into account to expect the most precise results, though you can be rough and just set the date and time in the UTC timezone and expect a maximum margin of error of 24 hours for your query results.
	 */
	VersionQuery(
		profileKey: string,
		sortDirection?: Enum.SortDirection,
		minDate?: DateTime | number,
		maxDate?: DateTime | number,
	): VersionQuery<Template, RobloxMetadata>;

	/**
	 * You can use :RemoveAsync() to erase data from the DataStore.
	 *
	 * In live Roblox servers :RemoveAsync() must be used on profiles created through ProfileStore.Mock after Profile:EndSession() and it's known that the Profile will no longer be loaded again.
	 */
	RemoveAsync(profileKey: string): boolean;
}
