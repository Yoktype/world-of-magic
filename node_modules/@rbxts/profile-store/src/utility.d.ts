export type JSONAcceptable =
	| JSONAcceptable[]
	| {
			[key: string]: JSONAcceptable;
	  }
	| number
	| string
	| boolean
	| buffer;
