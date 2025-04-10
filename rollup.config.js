import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import copy from 'rollup-plugin-copy'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import { terser } from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace'

const isProd = !process.env.ROLLUP_WATCH
const isDev = !isProd

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      sourceMap: !isProd,
      inlineSources: !isProd,
    }),
    copy({
      targets: [{ src: 'public/*', dest: 'dist' }],
    }),
    isDev &&
      serve({
        open: true,
        contentBase: 'dist',
        port: 3000,
      }),
    isDev && livereload('dist'),
    isProd && terser(),
  ],
}
