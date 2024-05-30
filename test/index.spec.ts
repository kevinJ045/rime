import { describe, it, expect } from "vitest";
import Main from "../src/index.js";

describe("main", () => {
	it("hello", () => {
		expect(Main.hello).toBe("world");
	});
});
