module.exports = {
  src: [
    './dist/src/index.d.ts',
    './node_modules/@types/shelljs/index.d.ts',
    './node_modules/@types/p-queue/index.d.ts'
  ],
  "mode": 'file',
  'includeDeclarations': true,
  'tsconfig': 'tsconfig.json',
  'out': './docs',
  'excludePrivate': true,
  'excludeProtected': true,
  'excludeExternals': true,
  'readme': 'README.md',
  'name': 'cli-driver'
}
