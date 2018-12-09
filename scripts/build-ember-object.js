const fs = require('fs-extra');
const CWD = process.cwd();

module.exports = async function main() {
  await fs.writeFile(`${CWD}/vendor/packages/@ember/object/index.js`, `
    export { Object as default } from '@ember/-internals/runtime';
    export {
      aliasMethod,
      computed,
      // create
      defineProperty,
      // extend
      get,
      getProperties,
      getWithDefault,
      observer,
      // reopen,
      // reopenClass,
      set,
      setProperties,
      trySet
    } from '@ember/-internals/metal';
  `);
  await fs.writeFile(`${CWD}/vendor/packages/@ember/object/mixin.js`, `
    import { Mixin } from '@ember/-internals/metal';
    export default Mixin;
  `);
}




