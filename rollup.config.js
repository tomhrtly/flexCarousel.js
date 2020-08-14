import babel from 'rollup-plugin-babel';

export default {
    input: 'src/FlexCarousel.js',
    output: {
        file: 'dist/FlexCarousel.js',
        name: 'FlexCarousel',
        format: 'iife',
        sourceMap: 'inline',
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
    ],
};
