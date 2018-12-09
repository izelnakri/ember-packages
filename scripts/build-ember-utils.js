const fs = require('fs-extra');
const CWD = process.cwd();

module.exports = async function main() {
  await fs.mkdirp(`${CWD}/vendor/packages/@ember/utils`);
  await fs.writeFile(`${CWD}/vendor/packages/@ember/utils/index.js`, `
  import isNone from '@ember/-internals/metal/lib/is_none';
  import isEmpty from '@ember/-internals/metal/lib/is_empty';
  import isBlank from '@ember/-internals/metal/lib/is_blank';
  import isPresent from '@ember/-internals/metal/lib/is_present';
  import compare from '@ember/-internals/runtime/lib/compare';
  import isEqual from '@ember/-internals/runtime/lib/is-equal';
  import typeOf from '@ember/-internals/runtime/lib/type-of';

  export {
    compare,
    isBlank,
    isEmpty,
    isEqual,
    isNone,
    isPresent,
    // tryInvoke,
    typeOf
  };
  `);
  await fs.writeFile(`${CWD}/vendor/packages/@ember/utils/package.json`, JSON.stringify({
    name: '@ember/utils',
    version: '0.0.1',
    main: './index.js'
  }));
};
