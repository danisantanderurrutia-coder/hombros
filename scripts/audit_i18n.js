import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOCALES_DIR = path.resolve(__dirname, '../src/locales');

function getKeys(obj, prefix = '') {
  let keys = [];
  for (const k of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      keys = keys.concat(getKeys(obj[k], fullKey));
    } else {
      keys.push({ key: fullKey, value: obj[k] });
    }
  }
  return keys;
}

function audit() {
  const esDir = path.join(LOCALES_DIR, 'es');
  const enDir = path.join(LOCALES_DIR, 'en');

  if (!fs.existsSync(esDir) || !fs.existsSync(enDir)) {
    console.error('❌ Locales directory missing');
    process.exit(1);
  }

  const esFiles = fs.readdirSync(esDir).filter(f => f.endsWith('.json'));
  let hasErrors = false;
  let totalKeysChecked = 0;

  console.log(`\n🔍 Starting i18n Parity Audit (${esFiles.length} namespaces found)...\n`);

  for (const file of esFiles) {
    const esFilePath = path.join(esDir, file);
    const enFilePath = path.join(enDir, file);

    if (!fs.existsSync(enFilePath)) {
      console.error(`❌ [MISSING FILE] ${file} exists in /es but NOT in /en`);
      hasErrors = true;
      continue;
    }

    const esJson = JSON.parse(fs.readFileSync(esFilePath, 'utf-8'));
    const enJson = JSON.parse(fs.readFileSync(enFilePath, 'utf-8'));

    const esKeys = getKeys(esJson);
    const enKeys = getKeys(enJson);
    const enKeyMap = new Map(enKeys.map(item => [item.key, item.value]));

    for (const { key, value } of esKeys) {
      totalKeysChecked++;
      if (!enKeyMap.has(key)) {
        console.error(`❌ [MISSING KEY in EN] namespace "${file}": key "${key}"`);
        hasErrors = true;
      } else {
        const enVal = enKeyMap.get(key);
        if (typeof enVal === 'string') {
          if (enVal.trim() === '') {
            console.error(`⚠️ [EMPTY VALUE] namespace "${file}": key "${key}" is empty in EN`);
            hasErrors = true;
          }
          // Check for accidental Spanish inverted marks in English
          if (/[¿¡]/.test(enVal)) {
            console.error(`⚠️ [SPANISH PUNCTUATION IN EN] namespace "${file}": key "${key}" has '¿' or '¡' -> "${enVal}"`);
            hasErrors = true;
          }
        }
      }
    }

    // Check for keys in EN that don't exist in ES
    const esKeySet = new Set(esKeys.map(i => i.key));
    for (const { key } of enKeys) {
      if (!esKeySet.has(key)) {
        console.warn(`⚠️ [EXTRA KEY IN EN] namespace "${file}": key "${key}" not in ES`);
      }
    }

    console.log(`✓ Namespace "${file}": ${esKeys.length} keys verified.`);
  }

  console.log(`\n📊 Audit Summary: ${totalKeysChecked} total keys verified across all locales.`);

  if (hasErrors) {
    console.error(`\n❌ i18n Audit FAILED. Missing or invalid translations detected.`);
    process.exit(1);
  } else {
    console.log(`\n✅ 100% Translation Parity! All keys matched with 0 errors.\n`);
    process.exit(0);
  }
}

audit();
