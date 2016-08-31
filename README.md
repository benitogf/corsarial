# Corsarial

[![Build Status][build-image]]][build-url]
[![CoverageStatus][coverage-image]][coverage-url]
[![standardjs][standardjs-image]][standardjs-url]

[build-url]: https://travis-ci.org/benitogf/corsarial
[build-image]: https://img.shields.io/travis/benitogf/corsarial/master.svg?style=flat-square
[coverage-image]: https://coveralls.io/repos/github/benitogf/corsarial/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/benitogf/corsarial?branch=master
[standardjs-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standardjs-url]: http://standardjs.com/

[Cor](http://cordova.apache.org/) `s`ample `a`ngular mate`rial`

## Installation

```bash
git clone https://github.com/benitogf/corsarial.git <your app name>
cd <your app name>
npm install
npm run copy-hook
npm run platform browser
npm run build browser
```

## Configuration

The config.xml file contains a server object where you can define host/port and GA params, you can also change the app name in there.

## Dev server

```bash
npm start
```
Or click on the start.bat for windows, will load unit tests on {host}:{port}/specs

## Static server

```bash
npm run build browser
npm run server
```

## unit test

```bash
npm run build-specs
npm run specs
npm run specs-cov
```

Coverage report will be generated on coverage/lcov-report/index.html

## e2e test

while dev or static server is running

```bash
npm test
```

## Android

See Requirements [here](http://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#installing-the-requirements) after installing them:

```bash
npm run platform android
```

```bash
npm run build android
```

This should generate an APK if all the requirements where properly installed.

## [NWJS](http://nwjs.io/)

```bash
npm run build-nw
```

windows:

create NW_HOME environment variable with the path to your nw installation
install/add to your path [7zip](http://www.7-zip.org/)

```bash
nwbuild.bat
```

linux:

```bash
nwbuild.sh
```

## [Docker](https://docs.docker.com/)

### Install locally

Follow the installation and configuration steps to build the browser platform.

### Build the image

In the installation folder

```bash
docker build -t <your username>/<your app name> .
```

### Verify

```bash
docker images
```

### Run the image

```bash
docker run -p 9001:9000 -d <your username>/<your app name>
```

And the app should be running on port 9001
