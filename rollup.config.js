import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import copy from 'rollup-plugin-copy'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import { terser } from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace'
import esbuild from 'rollup-plugin-esbuild'

const isProd = !process.env.ROLLUP_WATCH
const isDev = !isProd

/** @type {import('rollup').RollupOptions} */
const config = {
  input: 'src/main.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: isDev,
  },
  plugins: [
    resolve(),
    commonjs(),
    isDev ? getEsbuildPlugin() : getTypescriptPlugin(),
    copy({
      targets: [{ src: 'public/*', dest: 'dist' }],
    }),
    replace({
      IS_DEV: JSON.stringify(isDev),
      IS_PROD: JSON.stringify(isProd),
    }),
    isDev &&
      serve({
        open: false,
        contentBase: 'dist',
        port: 3000,
      }),
    isDev && livereload('dist'),
    isProd && terser(),
  ],
}

function getTypescriptPlugin() {
  return typescript({
    sourceMap: isDev,
    inlineSources: isDev,
  })
}

function getEsbuildPlugin() {
  return esbuild({
    sourceMap: isDev,
  })
}

export default config
