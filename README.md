# To-Do List

A small browser-based task list built with HTML, CSS, and vanilla JavaScript.

## Features

- Add tasks and mark them as complete
- Delete tasks
- Persist structured task data in browser local storage
- Keyboard-accessible task toggling and accessible delete controls

## Run locally

Open `index.html` in a modern browser. The JavaScript is loaded as an ES module, so use a local static server if your browser blocks modules from `file://` URLs:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Quality checks

Node.js 22 or newer:

```bash
npm test
npm run check
```

## Security and data limitations

Task text is rendered with DOM text nodes rather than HTML parsing, which prevents task input from being interpreted as markup or script. Stored tasks use validated JSON records instead of storing serialized HTML.

Tasks remain only in the current browser's local storage. They are not synchronized, backed up, encrypted, or linked to user accounts. Do not store passwords, financial information, or other sensitive data in this app. Clearing browser storage removes the tasks.
