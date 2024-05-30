import { expect, test } from "vitest";
import Main from "../src/index.js";

test("main.hello equals world", () => {
	expect(Main.hello).toBe("world");
});
