# engine-preflight
Simple tool to enforce local node version compatibility with your app.

---

## Installation & Use

**In your project directory**
```bash
npm install engine-preflight
```

Then add this script to your `package.json`:
```json
"postinstall": "check-engine"
```

And if you haven't already, define your node version requirements, like so:
```json
"engines": {
  "node": ">=12.13.0 <13"
}
```
[npm engine documentation](https://docs.npmjs.com/files/package.json#engines)

Using the engine settings and the postinstall script above, running `npm install` or `npm ci` to install modules will throw an error (after installation).

### For example
Say you have node **10.16.3** installed and tried to run `npm install` for the project running `"postinstall": "check-engine"`, here's the error output you'd receive:

```bash
> CoolApp@2.10.3 postinstall /ProjectDir/coolApp
> check-engine

> Node version requirements ">=12.13.0 <13" are NOT satisfied with the current version of node: "v10.16.3"

  Please update your node version and try again.

npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! CoolApp@2.10.3 postinstall: `check-engine`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the CoolApp@2.10.3 postinstall script.
```

---

### Cautionary notes
* Placing the `engine-preflight` module in **devDependencies** may sound like a good idea, however, if you project is ever install as a module or via methods like `npm install git+ssh://...`, the installation will fail on postinstall because devDependencies are not installed when installing as a module.

* It may seem like a good idea to place the `check-engine` call in a `preinstall` script, it is not\*. The command relies on the **engine-preflight** module being installed, which means the check-engine preflight script would only pass if running `npm install` or `npm ci` on a repo that already has `engine-preflight` installed.

\* Of course you could install **engine-preflight** globally to get around that problem.
