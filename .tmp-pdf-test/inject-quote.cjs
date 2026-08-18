const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const tag = '<script src="/wp-content/uploads/2026/08/era-quote.js" defer></script>';

function walk(dir, files = []) {
	for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
		if (name.name === "node_modules" || name.name === ".git" || name.name === ".tmp-pdf-test") continue;
		const full = path.join(dir, name.name);
		if (name.isDirectory()) walk(full, files);
		else if (name.name.endsWith(".html")) files.push(full);
	}
	return files;
}

let updated = 0;
for (const file of walk(root)) {
	let html = fs.readFileSync(file, "utf8");
	if (!html.includes("era-wa-float-css")) continue;
	if (html.includes("era-quote.js")) continue;
	if (!html.includes("</body>")) continue;
	html = html.replace("</body>", tag + "\n</body>");
	fs.writeFileSync(file, html, "utf8");
	updated++;
	console.log("updated", path.relative(root, file));
}
console.log("done", updated);
