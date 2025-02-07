import type { Opaque } from "opaque-type";

export type Serializable<T, Allowed, Forbidden> = unknown extends T
	? never
	: T extends Forbidden
		? never
		: T extends Allowed
			? T
			: {
					[P in keyof T]: Serializable<T[P], Allowed, Forbidden>;
				};

declare const type: unique symbol;
export type Stringified<T> = Opaque<string, { readonly [type]: T }>;

export type Stringifier<Allowed, Forbidden> = <T>(
	value: Serializable<T, Allowed, Forbidden>,
) => Stringified<T>;

export const stringifier = <Allowed, Forbidden = never>(
	fn: (value: Allowed) => string,
): Stringifier<Allowed, Forbidden> => {
	return <T>(value: Serializable<T, Allowed, Forbidden>) => {
		// @ts-expect-error - we know that the value is allowed
		return fn(value) as Stringified<T>;
	};
};
