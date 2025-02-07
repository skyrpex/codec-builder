import { expect, it } from "vitest";
import { stringifier } from "./stringifier.ts";

it("can create simple stringifiers", () => {
	const stringify = stringifier<URL>((value) => value.toString());
	expect(stringify(new URL("https://acme.com"))).toEqual("https://acme.com/");
});

it("can create more advanced stringifiers", () => {
	const stringify = stringifier<number | bigint>((value) => value.toString());
	expect(stringify(7777)).toEqual("7777");
	expect(stringify(7777n)).toEqual("7777");
});
