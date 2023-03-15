import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    output: {
      format: 'es',
      file: 'dist/index.js',
      sourcemap: true
    },
    plugins: [
      typescript({
        module: 'es6',
        target: 'es6',
        declaration: true,
        outDir: './dist',
        rootDir: './src'
      })
    ]
  }
];
