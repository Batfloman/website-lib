const fs = require("fs");
const path = require("path");

const AUTO_GEN_FLAG = "// AUTO-GENERATED";

function createIndex(dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, entries) => {
    if (err) throw err;

    let exports = [];

    const folders = entries.filter((e) => e.isDirectory());
    folders.forEach((folder) => createIndex(path.join(dir, folder.name)));

    const files = entries.filter(
      (e) => e.isFile() && e.name.endsWith(".ts") && e.name !== "index.ts",
    );

    exports.push(
      ...files.map((f) => `export * from './${path.basename(f.name, ".ts")}';`),
    );
    exports.push(...folders.map((f) => `export * from './${f.name}/index';`));

    const indexPath = path.join(dir, "index.ts");

    // Prüfen, ob index.ts existiert und das Flag enthält
    fs.readFile(indexPath, "utf8", (err, data) => {
      if (!err && !data.startsWith(AUTO_GEN_FLAG)) {
        console.log(
          `skipped index.ts in ${dir} wurde übersprungen (kein AUTO-GENERATED-Flag)`,
        );
        return;
      }

      const content = [AUTO_GEN_FLAG, ...exports].join("\n");

      fs.writeFile(indexPath, content, (err) => {
        if (err) throw err;
        console.log(`index.ts erstellt in ${dir}`);
      });
    });
  });
}

createIndex("./ts");
