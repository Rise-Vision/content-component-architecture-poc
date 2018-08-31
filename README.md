# Component Architecture poc

## Build & run instructions

Frist clone and change into this project directory.

Then run:

`
npm install
npm install -g polymer-cli
polymer serve
`

Then open http://127.0.0.1:8081/ in browser.

## Test instructions

Reference: https://www.polymer-project.org/3.0/docs/tools/tests

Run using the NPM flag:

`
polymer test --npm
`

## Build instructions

Run:

`
polymer build --name prod
`

Which outputs to build/ directory.

The build can be customized in the polymer.json file.

Reference: https://www.polymer-project.org/3.0/docs/tools/polymer-json

## Update SASS code

SASS changes can be manually updated using:

`
npm run compile-sass
`

I did not invest more time to try to integrate this into the regular build
process.
