# Corsarial

[![Build Status][build-image]][build-url]
[![CoverageStatus][coverage-image]][coverage-url]
[![daviddep][david-dep-image]][david-dep-url]
[![standardjs][standardjs-image]][standardjs-url]

[build-url]: https://travis-ci.org/benitogf/corsarial
[build-image]: https://img.shields.io/travis/benitogf/corsarial/master.svg?style=flat-square
[coverage-image]: https://coveralls.io/repos/github/benitogf/corsarial/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/benitogf/corsarial?branch=master
[standardjs-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standardjs-url]: http://standardjs.com/
[david-dep-image]: https://david-dm.org/benitogf/corsarial/master/dev-status.svg
[david-dep-url]: https://david-dm.org/benitogf/corsarial/master?type=dev

[Cor](http://cordova.apache.org/) `s`ample `a`ngular mate`rial`

## installation

Set [NODE_PATH](http://nodejs.org/api/modules.html#modules_loading_from_the_global_folders) environment variable

```bash
npm install -g cordova
npm install -g hotpot
git clone https://github.com/benitogf/corsarial.git <your app name>
cd <your app name>
npm install
npm run platform browser
npm run build browser
```

## configuration

The config.xml file contains a client object where you can define:
- host/port
- GA params
- app name

And a server object with the host and port to allow an external connection.

## dev server

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

## android

See Requirements [here](http://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#installing-the-requirements) after installing them:

```bash
npm run platform android
```

```bash
npm run build android
```

This should generate an APK if all the requirements where properly installed.

## [nwjs](http://nwjs.io/)

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

## [docker](https://docs.docker.com/)

install locally

Follow the installation and configuration steps to build the browser platform.

build the image

In the installation folder

```bash
docker build -t <your username>/<your app name> .
```

verify

```bash
docker images
```

Run the image

```bash
docker run -p 9001:9000 -d <your username>/<your app name>
```

And the app should be running on port 9001
