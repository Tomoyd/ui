// @ts-ignore
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import less from 'rollup-plugin-less';
// import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import dts from 'rollup-plugin-dts';
import path from 'path';
import fs from 'fs';

const packageJson = require('./package.json');
// // 忽略文件
const externalConfig = [
  'react',
  'react-dom',
  'classnames',
  '**/node_modules/**',
];
const componentsDir = 'src/components';
const componentsName = fs.readdirSync(path.resolve(componentsDir));
const componentsEntry = componentsName
  .filter((name) => name !== 'index.ts')
  .map((name) => `${componentsDir}/${name}/${name}.tsx`);

/**
 * @type {import("rollup").RollupOptions[]}
 */
const config = [
  {
    // @ts-ignore
    external: externalConfig,
    input: ['src/components/index.ts', ...componentsEntry],
    output: [
      {
        preserveModules: true,
        assetFileNames: ({ name }) => {
          console.log(name);
          const { ext, dir, base } = path.parse(name || '');
          return `${dir}/${base}`;
        },
        dir: 'dist/',
        format: 'esm',
      },
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.build.json' }),
      babel({ configFile: './.babelrc' }),
      // dts(),
      postcss({
        extensions: ['.less'],
        minimize: true,
        // modules: true,

        use: {
          sass: null,
          stylus: null,
          less: { javascriptEnabled: true },
        },
        extract: true,
      }),
      terser(),
    ],
  },
];

export default config;
