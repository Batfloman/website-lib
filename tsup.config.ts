import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['ts/index.ts'], // Dein Einstiegspunkt
	format: ['esm', "cjs"],         // ES Module für Browser
	dts: true,
	splitting: false,        // Kein Code-Splitting (optional)
	sourcemap: true,
	clean: true,
	outDir: 'dist',
	// Automatically fix import paths to add `.js` extensions for browser compatibility
	esbuildOptions(options) {
		options.bundle = true; // bundeln für saubere Imports
	},
});

