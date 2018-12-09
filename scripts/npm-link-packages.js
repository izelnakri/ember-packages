const fs = require('fs-extra');
const buildEmberObjectPackage = require('./build-ember-object');
const buildEmberArrayPackage = require('./build-ember-array');
const buildEmberRoutingPackage = require('./build-ember-routing');
const buildEmberUtilsPackage = require('./build-ember-utils');

const CWD = process.cwd();
const PACKAGES_PATH = `${CWD}/vendor/packages`;

async function main() {
  if (await fs.exists(`${PACKAGES_PATH}/`)) {
    await fs.remove(`${PACKAGES_PATH}`);
  }

  await fs.copy(`${CWD}/vendor/ember.js/dist/es`, `${PACKAGES_PATH}`); 
  await fs.writeFile(`${PACKAGES_PATH}/@ember/deprecated-features/index.js`, `  
    export const SEND_ACTION = false; 
    export const EMBER_EXTEND_PROTOTYPES = false; 
    export const RUN_SYNC = false;
    export const LOGGER = false; 
    export const POSITIONAL_PARAM_CONFLICT = false;
    export const PROPERTY_WILL_CHANGE = false;
    export const PROPERTY_DID_CHANGE = false;
    export const ROUTER_ROUTER = false;
    export const ARRAY_AT_EACH = false;
    export const TARGET_OBJECT = false;
    export const MAP = false;
    export const ORDERED_SET = false;
    export const MERGE = false;
    export const HANDLER_INFOS = !!'3.9.0';
    export const ROUTER_EVENTS = !!'3.9.0';
    export const TRANSITION_STATE = !!'3.9.0';
  `);
  await Promise.all([
    buildEmberObjectPackage(), buildEmberArrayPackage(), buildEmberRoutingPackage(),
    buildEmberUtilsPackage()
  ]);

  const basePackages = [
    '@ember/string', '@ember/application', '@ember/deprecated-features', '@ember/runloop', 
    '@ember/controller', '@ember/service', '@ember/-internals', '@ember/debug', '@ember/error',
    '@ember/canary-features', 'ember', '@ember/polyfills', '@ember/engine', '@ember/object',
    '@ember/instrumentation', '@ember/array', '@ember/routing', '@ember/utils'
  ];

  basePackages.forEach(async (packageName) => await writePackageJSONForLinking(packageName));

  await moveFileToPackage(`${PACKAGES_PATH}/backburner.js`, 'backburner');
  await moveFileToPackage(`${PACKAGES_PATH}/dag-map.js`, 'dag-map');
  await moveFileToPackage(`${PACKAGES_PATH}/router_js.js`, 'router_js');

  const currentPackageJSON = JSON.parse(await fs.readFile(`${CWD}/package.json`));
  const targetLinkPackages = basePackages.concat([
    'backburner', 'dag-map', 'router_js'
  ]).reduce((result, packageName) => {
    return Object.assign({}, result, { 
      [packageName]: `file:./vendor/packages/${packageName}`
    });
  }, currentPackageJSON.dependencies);

  await fs.writeFile(`${CWD}/package.json`, JSON.stringify(
    Object.assign(currentPackageJSON, { dependencies: targetLinkPackages }), null, 2
  ));
  console.log('package.json written:');
  console.log(JSON.stringify(
    Object.assign(currentPackageJSON, { dependencies: targetLinkPackages }), null, 2
  ));
}

main().then(() => console.log('done'));

async function moveFileToPackage(filePath, packageName) {
  const packageFolder = `${PACKAGES_PATH}/${packageName}`;

  await fs.mkdirp(packageFolder);
  await fs.move(filePath, `${packageFolder}/index.js`);
  await fs.writeFile(`${packageFolder}/package.json`, JSON.stringify({
    name: packageName,
    version: "0.0.1",
    main: './index.js',
    module: './index.js'
  }, null, 2));
}

async function writePackageJSONForLinking(packageName) {
  const packageJSONPath = `${PACKAGES_PATH}/${packageName}/package.json`;
  const formerPackageJSON = JSON.parse(await fs.readFile(packageJSONPath));

  await fs.writeFile(packageJSONPath, JSON.stringify(Object.assign(formerPackageJSON, {
    name: packageName,
    version: '0.0.1',
    main: './index.js'
  }), null, 2));
}
