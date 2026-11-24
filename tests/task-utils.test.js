import test from "node:test";
import assert from "node:assert/strict";
import { parseTasks, serializeTasks } from "../task-utils.js";

test("returns an empty list for missing or malformed storage", () => {
  assert.deepEqual(parseTasks(null), []);
  assert.deepEqual(parseTasks(""), []);
  assert.deepEqual(parseTasks("{not json"), []);
});

test("keeps only valid structured tasks", () => {
  const raw = JSON.stringify([
    { id: "1", text: " Buy milk ", completed: false },
    { id: "2", text: "Done", completed: true },
    { id: "3", text: "<img src=x onerror=alert(1)>", completed: false },
    { id: 4, text: "Invalid ID", completed: false },
    { id: "5", text: "Invalid state", completed: "false" },
    null,
  ]);

  assert.deepEqual(parseTasks(raw), [
    { id: "1", text: "Buy milk", completed: false },
    { id: "2", text: "Done", completed: true },
    { id: "3", text: "<img src=x onerror=alert(1)>", completed: false },
  ]);
});

test("serializes task arrays as JSON", () => {
  const tasks = [{ id: "1", text: "Read", completed: false }];
  assert.equal(serializeTasks(tasks), JSON.stringify(tasks));
});

test("rejects non-array values during serialization", () => {
  assert.throws(() => serializeTasks({}), TypeError);
});
