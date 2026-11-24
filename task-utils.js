export function parseTasks(serializedTasks) {
  if (typeof serializedTasks !== "string" || serializedTasks.trim() === "") {
    return [];
  }

  try {
    const parsed = JSON.parse(serializedTasks);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((task) => (
        task &&
        typeof task === "object" &&
        typeof task.id === "string" &&
        typeof task.text === "string" &&
        task.text.trim().length > 0 &&
        typeof task.completed === "boolean"
      ))
      .map((task) => ({
        id: task.id,
        text: task.text.trim(),
        completed: task.completed,
      }));
  } catch {
    return [];
  }
}

export function serializeTasks(tasks) {
  if (!Array.isArray(tasks)) {
    throw new TypeError("Tasks must be an array");
  }
  return JSON.stringify(tasks);
}
