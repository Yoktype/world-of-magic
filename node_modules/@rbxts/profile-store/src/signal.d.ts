interface Connection {
	Disconnect(): void;
}

export interface Signal<T extends unknown[] = []> {
	Connect(listener: (...parameters: T) => void): Connection;
	GetListenerCount(): number;
	Wait(): LuaTuple<T>;
}
