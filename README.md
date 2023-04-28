# PlayWright E2E Framework to test the BBC Website
It contains 5 tests: 4 happy paths and 1 error path.

## PlayWright Framework Setup
* `Step 1`: Create a folder playwright-bbc-e2e and enter “code .”
* `Step 2`: On VSCode, search for the extension “PlayWright Test for VSCode–Microsoft” and then install
* `Step 3`: On VSCode, press Cntrl+Shift+P in Windows, and then enter “Install PlayWright on palette.” Choose: Chromium, Firefox, WebKit, and JavaScript.
* `Step 4`:  Install a prettier npm install -D prettier
* `Step 5`: Update playwright.config.js, rename the tests folder to e2e, add a timeout, Only for Chrome: Update headless to be false.
* `Step 6`: Update the package.json. Add commands under scripts.

## Test File
There is one spec file in the e2e folder:
* `bbc.spec.js` : This spec file contains the scenarios to test the BBC website.

In order to execute scripts, simply run:

* Gitbash
```
npm install
npm run test (produce an HTML report in playwright-report/index.html)
npm run test:chrome (To run tests only on the Chrome browser)
```

## Future
* Develop many helpers.
* Consider a modular approach.
* Consider page object models to keep common locators.
* Consider PlayWright's best practises.

