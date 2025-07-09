const fs = require("fs");
const path = require("path");

function createIndex(dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, entries) => {
    if (err) throw err;

    let exports = [];

    // Alle Unterordner zuerst rekursiv bearbeiten
    const folders = entries.filter((e) => e.isDirectory());
    folders.forEach((folder) => createIndex(path.join(dir, folder.name)));

    // Alle ts-Dateien im aktuellen Ordner sammeln (außer index.ts)
    const files = entries.filter(
      (e) => e.isFile() && e.name.endsWith(".ts") && e.name !== "index.ts",
    );

    // Export-Zeilen für Dateien
    exports.push(
      ...files.map((f) => `export * from './${path.basename(f.name, ".ts")}';`),
    );

    // Export-Zeilen für Unterordner (index.ts wird angenommen)
    exports.push(...folders.map((f) => `export * from './${f.name}/index';`));

    // index.ts schreiben
    fs.writeFile(path.join(dir, "index.ts"), exports.join("\n"), (err) => {
      if (err) throw err;
      console.log(`index.ts erstellt in ${dir}`);
    });
  });
}

createIndex("./ts"); // Pfad anpassen
