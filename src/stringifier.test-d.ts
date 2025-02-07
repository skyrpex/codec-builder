import { assertType, it } from "vitest";
import { type Stringified, stringifier } from "./stringifier.ts";

it("forbids stringifying invalid types", () => {
	const stringifyURL = stringifier<URL, string>((value) => value.toString());

	// @ts-expect-error
	stringifyURL();

	// @ts-expect-error
	stringifyURL("not a url");
});

it("forbids mixing types", () => {
	const stringifyURL = stringifier<URL>((value) => value.toString());
	const stringifyBigInt = stringifier<bigint>((value) => value.toString());
	const url = stringifyURL(new URL("https://acme.com"));
	const bigInt = stringifyBigInt(7777n);

	// @ts-expect-error
	const check: Stringified<bigint> = url;
});

it("narrows the type", () => {
	type BrandedBigInt = bigint & { readonly __brand: "BigInt" };

	const stringifyBigInt = stringifier<bigint>((value) => value.toString());

	const brandedBigInt = stringifyBigInt(7777n as BrandedBigInt);
	assertType<Stringified<BrandedBigInt>>(brandedBigInt);
});

it("allows using interfaces", () => {
	type Allowed = string;
	type Forbidden = number;
	const stringify = stringifier<Allowed, Forbidden>((value) =>
		value.toString(),
	);

	interface Value {
		foo: string;
	}
	const value: Value = {
		foo: "value",
	};
	const result = stringify(value);
	assertType<Stringified<Value>>(result);
});

it("forbids stringifying invalid interfaces", () => {
	type Allowed = string;
	type Forbidden = number;
	const stringify = stringifier<Allowed, Forbidden>((value) =>
		value.toString(),
	);

	interface Value {
		foo: string;
		bar: number;
	}
	const value: Value = {
		foo: "value",
		bar: 7777,
	};
	// @ts-expect-error
	const result = stringify(value);
	assertType<Stringified<Value>>(result);
});
