import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/index.js',
    output: {
        format: 'umd',
        name: 'SVELTE_COLOR_SWITCH',
        file: 'dist/bundle.js',
        globals: {
            'svelte': 'Svelte'
        }
    },
    plugins: [
        svelte(),
        resolve(),
        commonjs(),
        // terser()
    ],
    external: ['svelte']
};