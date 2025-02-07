import { it } from "vitest";
import { parser } from "./parser.ts";

it("forbids parsing invalid types", () => {
	const parse = parser<number>((value) => Number(value));

	// @ts-expect-error
	parse("not a number");
});
