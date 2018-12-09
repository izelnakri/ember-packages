const fs = require('fs-extra');
const CWD = process.cwd();

module.exports = async function main() {
  await fs.mkdirp(`${CWD}/vendor/packages/@ember/array`);
  await fs.writeFile(`${CWD}/vendor/packages/@ember/array/index.js`, `
  export {
    default as Array,
    isEmberArray,
    NativeArray,
    A,
    MutableArray,
    removeAt,
    uniqBy,
    isArray,
  } from '@ember/-internals/runtime/lib/mixins/array';
  `);
  await fs.writeFile(`${CWD}/vendor/packages/@ember/array/package.json`, JSON.stringify({
    name: '@ember/array',
    version: '0.0.1',
    main: './index.js'
  }));
};
