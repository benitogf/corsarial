# Corsarial

`Cor`dova `s`ample `a`ngular mate`rial`

## Requirements

Install [cordova](http://cordova.apache.org/)

```bash
npm install -g cordova
```

## Installation

```bash
git clone https://github.com/benitogf/corsarial.git
cd corsarial
npm install
cordova platform add browser
cordova build browser
```
## Start dev server

```bash
npm start
```
Or click on the start.bat for windows, it will load unit tests on {host}:{port}/specs

## Start static server

```bash
cordova build browser
npm run server
```

## Test

```bash
npm start
```

while dev server is running

```bash
npm test
```

## nwjs

Some scripts to build for [nwjs](http://nwjs.io/) are included, be sure to change the path in those to your nw installation, and also to install/add to your path [7zip](http://www.7-zip.org/) for windows builds
