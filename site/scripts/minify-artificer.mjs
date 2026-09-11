import { readdir, readFile, writeFile } from 'node:fs/promises'
import { transform } from 'esbuild'

// Vite copies public/ verbatim. Minify only the published copies so development
// keeps the readable upstream sources and relative font URLs remain intact.
const directory = new URL('../dist/artificer/', import.meta.url)
for (const name of await readdir(directory)) {
  if (!/\.(css|js)$/.test(name)) continue
  const file = new URL(name, directory)
  const source = await readFile(file, 'utf8')
  const { code, warnings } = await transform(source, {
    loader: name.endsWith('.css') ? 'css' : 'js',
    minify: true,
    // These are classic scripts exposing window globals, not module entries.
    // Leave format unset so esbuild preserves their scope and public names.
    legalComments: 'eof',
  })
  if (warnings.length) throw new Error(`${name}: ${warnings.map((w) => w.text).join('; ')}`)
  await writeFile(file, code)
  console.log(`${name}: ${Buffer.byteLength(source)} → ${Buffer.byteLength(code)} bytes`)
}
