const fs = require('fs-extra');
const CWD = process.cwd();

module.exports = async function main() {
  await fs.mkdirp(`${CWD}/vendor/packages/@ember/routing`);
  await fs.writeFile(`${CWD}/vendor/packages/@ember/routing/index.js`, `
    import Router from '@ember/-internals/routing/lib/system/router';
    import Route from '@ember/-internals/routing/lib/system/route'; 

    export default { Router, Route };
  `);
  await fs.writeFile(`${CWD}/vendor/packages/@ember/routing/router.js`, `
    import Router from '@ember/-internals/routing/lib/system/router';
    export default Router;
  `);
  await fs.writeFile(`${CWD}/vendor/packages/@ember/routing/route.js`, `
    import Route from '@ember/-internals/routing/lib/system/route'; 
    export default Route;
  `);
  await fs.writeFile(`${CWD}/vendor/packages/@ember/routing/package.json`, JSON.stringify({
    name: '@ember/routing',
    version: '0.0.1',
    main: './index.js'
  }));
};
