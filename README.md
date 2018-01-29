# grunt-reg-viz

[![NPM version](https://badge.fury.io/js/grunt-reg-viz.png)](http://badge.fury.io/js/grunt-reg-viz) [![Build Status](https://travis-ci.org/prantlf/grunt-reg-viz.svg?branch=master)](https://travis-ci.org/prantlf/grunt-reg-viz) [![Coverage Status](https://coveralls.io/repos/github/prantlf/grunt-reg-viz/badge.svg?branch=master)](https://coveralls.io/github/prantlf/grunt-reg-viz?branch=master) [![Dependency Status](https://david-dm.org/prantlf/grunt-reg-viz.svg)](https://david-dm.org/prantlf/grunt-reg-viz) [![devDependency Status](https://david-dm.org/prantlf/grunt-reg-viz/dev-status.svg)](https://david-dm.org/prantlf/grunt-reg-viz#info=devDependencies) [![Greenkeeper badge](https://badges.greenkeeper.io/prantlf/grunt-reg-viz.svg)](https://greenkeeper.io/) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) 

[![NPM Downloads](https://nodei.co/npm/grunt-reg-viz.png?downloads=true&stars=true)](https://www.npmjs.com/package/grunt-reg-viz)

Compares pictures and shows their differences for visual regression test automation.

# Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
  - [Task Options](#task-options)
  - [Task Data](#task-data)
  - [Loading](#loading)
- [Build](#build)
- [Contributing](#contributing)
- [Release History](#release-history)
- [License](#license)

## Installation

You need [node >= 4][node], [npm] and [grunt >= 0.4.5][Grunt] installed
and your project build managed by a [Gruntfile] with the necessary modules
listed in [package.json]. If you haven't used Grunt before, be sure to check out the [Getting Started] guide, as it
explains how to create a Gruntfile as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this
command:

```shell
$ npm install grunt-reg-viz --save-dev
```

## Configuration

Add the `reg-viz` entry with the task configuration to the options of the `grunt.initConfig` method:

```js
grunt.initConfig({
  'reg-viz': {
    all: {
      expected: screenshots/expected',
      actual: 'screenshots/actual',
      different: 'screenshots/different',
      report: 'screenshots/report.html'
    }
  }
});
```

Default options support the most usual usage scenario:

```js
'reg-viz': {
  options: {
    thresholdRate: null,
    thresholdPixel: null,
    concurrency: null,
    enableAntialiasing: false,
    additionalDetection: 'none',
    force: false
  },
  ...
}
```

### Task Options

#### force
Type: `Boolean`
Default value: false

If set to `true`, it suppresses failures, which result from different images, or from other errors. Instead of making the Grunt fail, the errors will be written only to the console.

#### thresholdRate
Type: `Number`
Default value: null

Rate threshold for detecting change. When the difference ratio of the image is larger than the set rate detects the change.

#### thresholdPixel
Type: `Number`
Default value: null

Pixel threshold for detecting change. When the difference pixel of the image is larger than the set pixel detects the change. This value takes precedence over `thresholdRate`.

#### concurrency
Type: `Number`
Default value: CPU count

How many processes launches in parallel. If omitted, the count of installed CPUs.

#### enableAntialiasing
Type: `Boolean`
Default value: false

Enable antialiasing. If omitted `false`.

#### additionalDetection
Type: `String`
Default value: 'none'

Enable additional difference detection(highly experimental). Select "none" or "client" (default: "none").

### Task Data

#### expected
Type: `String`
Default value: './expected'

Path to the directory with expected images, which will be used as baseline in comparisons.

#### actual
Type: `String`
Default value: './actual'

Path to the directory with actual images, which will be used as new ones to compare against.

#### different
Type: `String`
Default value: './different'

Path to the directory with images showing the differences between the baseline and the new images.

#### report
Type: `String`
Default value: './report.html'

Path to the HTML report file, which will be written after performing all comparisons. One more file will be written to the same directory; the JSON report file. It will share the same name as the HTML report file, just the extension ".json" wil be different.

### Loading

Load the plugin in `Gruntfile.js`:

```javascript
grunt.loadNpmTasks('grunt-reg-viz');
```

## Build

Call the `reg-viz` task:

```shell
$ grunt reg-viz
```

or integrate it to your build sequence in `Gruntfile.js`:

```js
grunt.registerTask('default', ['reg-viz', ...]);
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding
style. Add unit tests for any new or changed functionality. Lint and test
your code using Grunt.

## Release History

 * 2018-01-27  v0.0.1  Initial release

## License

Copyright (c) 2018 Ferdinand Prantl

Licensed under the MIT license.

[node]: https://nodejs.org
[npm]: https://npmjs.org
[package.json]: https://docs.npmjs.com/files/package.json
[Grunt]: https://gruntjs.com
[Gruntfile]: https://gruntjs.com/sample-gruntfile
[Getting Gtarted]: https://github.com/gruntjs/grunt/wiki/Getting-started
[v0.0.1]: https://github.com/prantlf/grunt-reg-viz/releases/tag/v0.0.1
