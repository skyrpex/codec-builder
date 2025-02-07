import { expect, it } from "vitest";
import { parser } from "./parser.ts";
import { stringifier } from "./stringifier.ts";

it("can create single-type parsers", () => {
	const stringify = stringifier<URL>((value) => value.toString());
	const parse = parser<URL>((value) => new URL(value));
	expect(parse(stringify(new URL("https://acme.com")))).toEqual(
		new URL("https://acme.com/"),
	);
});

it("can create multi-type parsers", () => {
	const stringify = stringifier<number | bigint>((value) => value.toString());
	const parse = parser<number | bigint>((value) => BigInt(value));
	expect(parse(stringify(7777))).toEqual(7777n);
	expect(parse(stringify(7777n))).toEqual(7777n);
});
