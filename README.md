# Component Architecture poc

## Build & run instructions - demos

Frist clone and change into this project directory.

Then run:

```bash
npm install
npm install -g polymer-cli
polymer serve
```

Then open http://127.0.0.1:8081/ in browser.

## Test instructions

Reference: https://www.polymer-project.org/3.0/docs/tools/tests

Run using the NPM flag:

```
polymer test --npm
```

## Update SASS code

SASS changes can be manually updated using:

```bash
npm run compile-sass
```

I did not invest more time to try to integrate this into the regular build
process.

## Build & run instructions - Player Electron

Run:

```bash
polymer build
```

Which outputs to build/es5 directory. Then run a web server from that directory.

```bash
cd build/es5
python -m SimpleHTTPServer 8999
```

Then configure a schedule pointing to the URL:
http://localhost:8999/src/image-remote-transpiled.html

Add a display id to that schedule, and open a local electron player for that
display id.

The image referenced as the file attribute in the rise-image tag should appear
after a few seconds. Status messages related to GCS download may appear also
in the meantime.

Alternatively, all build/es5 may be uploaded to GCS, with public permissions
and no caching; and the schedule may point to the published file.

## Build & run instructions - ChromeOS Player

Currently, the image-remote-transpiled.html is fixed for Player Electron.
To build the test page for ChromeOS player one should use the provided file
image-remote-transpiled-chromeos.html. The procedure is the same that the
one that was described above for Player Electron, but before building the page
it's necessary to change the following line in polymer.json:

```
  "entrypoint": "src/image-remote-transpiled-chromeos.html",
```
