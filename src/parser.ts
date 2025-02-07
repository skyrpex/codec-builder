import type { Stringified } from "./stringifier.ts";

export type Parser<Allowed> = <T>(value: Stringified<T>) => T;

export const parser = <Allowed>(
	fn: (value: Stringified<Allowed>) => Allowed,
): Parser<Allowed> => {
	return <T>(value: Stringified<T>) => {
		// @ts-expect-error - we know that the value is allowed
		return fn(value) as T;
	};
};
