const semver = require('semver');
const path = require('path');
const fs = require('fs');

const parentDir = process.cwd(); // gets the directory where command was executed
const { engines } = JSON.parse(fs.readFileSync(path.join(parentDir, 'package.json'), 'utf8'));

// Quick tool to double check node version while running npm ci and npm install
// This script runs during postinstall and errors if package.engines.node is violated
if (engines && engines.node) {
  const version = engines.node;
  if (!semver.satisfies(process.version, version)) {
    console.log(`
  >  Node version requirements '${version}' are NOT satisfied with current version ${process.version}.
     Please update your node version and try again.
    `);
    process.exit(1);
  } else {
    console.log(`
  >  Node version requirements '${version}' are satisfied by the current version: ${process.version};
    `);
    process.exit(0);
  }
} else {
  console.log(`
  >  Node ${process.version} is currently installed.
     You have no desired versions specified in your package.json.
     Please add "{ engines: { node: '<semver expression>' } }" to your package.json and try again.

     See https://docs.npmjs.com/files/package.json#engines
  `);
}
