import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['ts/index.ts'], // Einstiegspunkt(e)
	format: ['esm', 'cjs'],  // Ausgabeformate
	dts: true,               // .d.ts-Dateien generieren
	sourcemap: true,         // Source Maps erzeugen
	clean: true,             // "dist"-Verzeichnis vor Build löschen
	minify: false,            // Kein Minify im Development
	esbuildOptions(options) {
		options.bundle = true; // bundeln für saubere Imports
	},
});
