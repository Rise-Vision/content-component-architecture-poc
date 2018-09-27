# Component Architecture poc

## Build & run instructions - demos

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

## Update SASS code

SASS changes can be manually updated using:

`
npm run compile-sass
`

I did not invest more time to try to integrate this into the regular build
process.

## Build & run instructions - page with staged component

Run:

`
polymer build
`

Which outputs to build/es5 directory. Then run a web server from that directory.

`
cd build/es5
python -m SimpleHTTPServer 8999
`

Then open http://localhost:8999/src/image-remote-transpiled.html in a browser.
The image referenced as the file attribute in the rise-image tag should appear
after 5 seconds.

## Run in Player Electron instructions

Install player-electron with a valid display id, but do not run it.

Edit RiseDisplayNetworkII.ini and add a new line with a reference to the
previous page:

`
viewerurl=http://localhost:8999/src/image-remote-transpiled.html
`

Run player-electron. The component should run OK, even though the player will
restart every 3 minutes as there is no viewer available.
