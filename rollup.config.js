import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

const prod = process.env.BUILD === 'prod';
const format = process.env.FORMAT || 'umd';

const input = `src/index.js`;
const suffix = prod ? `.min` : '';
const suffixFormat = format !== 'umd' ? `.${format}` : '';
const file = `bin/pixi-tween${suffixFormat}${suffix}.js`;

const plugins = [
    resolve(),
    babel({
        exclude: 'node_modules/**',
    }),
];

if (prod) {
    plugins.push(uglify({
        mangle: true,
        compress: true,
    }, minify));
}

const compiled = (new Date()).toUTCString().replace(/GMT/g, 'UTC');

const banner = `/*!
 * ${pkg.name} - v${pkg.version}
 * Compiled ${compiled}
 *
 * pixi-tween is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */\n`;

export default {
    banner,
    globals: `PIXI`,
    intro: `if (typeof PIXI === 'undefined') { throw 'PixiJS is required'; }`,
    input,
    output: {
        file,
        format,
    },
    sourcemap: true,
    name: `__pixiTween`,
    plugins,
};
