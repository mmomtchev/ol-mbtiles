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
        declaration: true,
        outDir: './dist',
        rootDir: './src'
      })
    ]
  }
];
