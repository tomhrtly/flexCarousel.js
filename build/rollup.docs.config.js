import babel from 'rollup-plugin-babel';

export default {
  input: 'docs/assets/src/js/script.js',
  output: {
    file: 'docs/assets/dist/js/script.js',
    name: 'flexCarousel_docs',
    format: 'iife',
    sourceMap: 'inline'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};