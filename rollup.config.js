import babel from 'rollup-plugin-babel';

export default {
  input: 'src/flexCarousel.js',
  output: {
    file: 'dist/flexCarousel.js',
    name: 'flexCarousel',
    format: 'iife',
    sourceMap: 'inline'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};