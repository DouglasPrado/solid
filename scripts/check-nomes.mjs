/**
 * Confere se os arquivos seguem o padrão do projeto:
 *   - um arquivo exporta UMA coisa só (classe, interface ou tipo)
 *   - interface -> nome-interface.ts
 *   - tipo      -> nome-type.ts
 *   - classe    -> nome-da-classe.ts (kebab-case do nome da classe)
 *   - nomes de arquivos e pastas em kebab-case
 *
 * Uso: npm run lint:nomes
 */
import fs from 'node:fs';
import path from 'node:path';

const RAIZ = path.resolve('src');
// Nomes próprios que viram uma palavra só no arquivo (WhatsApp -> whatsapp, não whats-app)
const PALAVRAS_INTEIRAS = { WhatsApp: 'Whatsapp', QRCode: 'Qrcode' };

const kebab = (nome) =>
  Object.entries(PALAVRAS_INTEIRAS)
    .reduce((n, [de, para]) => n.replaceAll(de, para), nome)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
const listar = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? [p, ...listar(p)] : [p];
  });

const erros = [];
for (const arquivo of listar(RAIZ)) {
  const rel = path.relative(process.cwd(), arquivo);
  const nome = path.basename(arquivo);

  if (!/^[a-z0-9]+(-[a-z0-9]+)*(\.ts|\.md)?$/.test(nome) && nome !== 'README.md') {
    erros.push(`${rel}: o nome precisa estar em kebab-case (ex.: meu-arquivo.ts)`);
  }
  if (!nome.endsWith('.ts')) continue;

  const codigo = fs.readFileSync(arquivo, 'utf8');
  const exports = [...codigo.matchAll(/^export (class|interface|type|function|const) (\w+)/gm)];
  const base = nome.replace(/\.ts$/, '');

  if (exports.length > 1) {
    erros.push(
      `${rel}: exporta ${exports.length} itens (${exports.map((e) => e[2]).join(', ')}). Deixe um por arquivo.`,
    );
    continue;
  }
  if (exports.length === 0) continue; // ex.: index.ts

  const [, tipo, item] = exports[0];
  const esperado = {
    interface: `${kebab(item)}-interface`,
    type: `${kebab(item)}-type`,
    class: kebab(item),
  }[tipo];

  if (esperado && base !== esperado) {
    erros.push(`${rel}: ${tipo} "${item}" deveria estar em "${esperado}.ts"`);
  }
}

if (erros.length) {
  console.error(`❌ ${erros.length} arquivo(s) fora do padrão:\n  - ${erros.join('\n  - ')}`);
  process.exit(1);
}
console.log('✅ Todos os arquivos seguem o padrão de nomes.');
