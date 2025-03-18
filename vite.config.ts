import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: '/test-port/',
	css: {
		modules: {
			localsConvention: 'camelCase',
		},
	},
	resolve: {
		alias: {
			'@styles': path.resolve(__dirname, './src/assets'),
		},
	},
});
