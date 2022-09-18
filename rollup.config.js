// @ts-ignore
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
// import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
// import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
// import dts from 'rollup-plugin-dts';
import path from 'path';
import fs from 'fs';

const packageJson = require('./package.json');
// // 忽略文件
const externalConfig = [
  'react',
  'react-dom',
  'classnames',
  '*.css',
  '*.less',
  '**/node_modules/**',
];
const componentsDir = 'src/components';
const componentsName = fs.readdirSync(path.resolve(componentsDir));
const componentsEntries = componentsName
  .filter((name) => name !== 'index.ts')
  .map((name) => `${name}/${name}`);
/**
 * @type {import("rollup").RollupOptions}
 */
const commonItem = {
  // @ts-ignore
  external: externalConfig,
  input: '',

  output: [
    {
      // preserveModules: true,
      // // assetFileNames: ({ name }) => {
      // //   console.log(name);
      // //   const { ext, dir, base } = path.parse(name || '');
      // //   return `${dir}/${base}`;
      // // },
      // dir: 'dist/',
      format: 'es',
      globals: {
        react: 'React',
      },
    },
  ],
  plugins: [
    // external(),
    nodeResolve(),
    typescript({
      tsconfig: './tsconfig.build.json',
      declarationDir: 'dist/types',
    }),
    babel({ configFile: './.babelrc' }),
    // dts(),
    // postcss({
    //   extensions: ['.less', '.css'],
    //   minimize: true,
    //   include: '',
    //   // modules: true,
    //   namedExports: true,
    //   // use: {
    //   //   sass: null,
    //   //   stylus: null,
    //   //   less: { javascriptEnabled: true },
    //   // },
    //   extract: true,
    // }),
    commonjs(),
    terser(),
  ],
};

/**
 * @type {import("rollup").RollupOptions[]}
 */
const config = [
  {
    // @ts-ignore
    external: externalConfig,
    input: 'src/components/index.ts',

    output: [
      {
        preserveModules: true,
        // // assetFileNames: ({ name }) => {
        // //   console.log(name);
        // //   const { ext, dir, base } = path.parse(name || '');
        // //   return `${dir}/${base}`;
        // // },
        dir: 'dist/',
        format: 'es',
        globals: {
          react: 'React',
        },
      },
    ],
    plugins: [
      // external(),
      nodeResolve(),
      typescript({
        tsconfig: './tsconfig.build.json',
        declarationDir: 'dist/types',
        exclude: ['*.less'],
      }),
      babel({ configFile: './.babelrc' }),
      // dts(),
      ...componentsEntries.map((entry) => {
        return postcss({
          extensions: ['.less', '.css'],
          minimize: true,
          include: `${componentsDir}/${entry}.less`,
          // modules: true,
          namedExports: true,
          // use: {
          //   sass: null,
          //   stylus: null,
          //   less: { javascriptEnabled: true },
          // },
          extract: `${entry}.css`,
        });
      }),

      commonjs(),
      terser(),
    ],
  },
];

export default config;
