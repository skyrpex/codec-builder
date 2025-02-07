export type Serializable<T, Allowed> = T extends Allowed
	? T
	: T extends { [key: string]: unknown }
		? {
				[P in keyof T]: Serializable<T[P], Allowed>;
			}
		: never;

declare const symbol: unique symbol;
export type Stringified<T> = string & { readonly [symbol]: T };

export type Stringifier<Allowed> = <T>(
	value: Serializable<T, Allowed>,
) => Stringified<T>;

export const stringifier = <Allowed>(
	fn: (value: Allowed) => string,
): Stringifier<Allowed> => {
	return <T>(value: Serializable<T, Allowed>) => {
		// @ts-expect-error - we know that the value is allowed
		return fn(value) as Stringified<T>;
	};
};
