'use strict'

const compare = require('reg-cli/dist')
const os = require('os')

module.exports = function (grunt) {
  grunt.registerMultiTask('reg-viz',
      'Compares pictures and shows their differences for visual regression test automation.',
      function () {
        const done = this.async()
        const options = this.options({
          thresholdRate: null,
          thresholdPixel: null,
          concurrency: null,
          enableAntialiasing: false,
          additionalDetection: 'none',
          force: false
        })
        const data = Object.assign({}, {
          expected: 'expected',
          actual: 'actual',
          different: 'different',
          report: 'report.html'
        }, this.data)
        const report = data.report
        const force = options.force
        const warn = force ? grunt.log.warn : grunt.fail.warn
        let compared = 0
        const observer = compare({
          actualDir: data.actual,
          expectedDir: data.expected,
          diffDir: data.different,
          report: report,
          json: report.replace(/\.html$/, '.json'),
          update: false,
          urlPrefix: './',
          thresholdRate: Number(options.thresholdRate),
          thresholdPixel: Number(options.thresholdPixel),
          concurrency: Number(options.concurrency) || os.cpus().length,
          enableAntialias: !!options.enableAntialiasing,
          enableClientAdditionalDetection: options.additionalDetection === 'client'
        })

        observer.once('start', function () {
          grunt.verbose.writeln('Comparison started.')
        })

        observer.on('compare', function (result) {
          const path = options.actual + result.path
          ++compared
          switch (result.type) {
            case 'pass': return grunt.verbose.writeln(path + ' matched.')
            case 'fail': return grunt.verbose.writeln(path + ' differed.')
            case 'delete': return grunt.verbose.writeln(path + ' removed.')
            case 'new': return grunt.verbose.writeln(path + ' added.')
          }
        })

        observer.once('complete', function (result) {
          const matched = result.passedItems.length
          const differed = result.failedItems.length
          const removed = result.deletedItems.length
          const added = result.newItems.length
          const ok = differed ? force ? grunt.log.warn : grunt.fail.warn
                            : grunt.log.ok
          grunt.verbose.writeln('Comparison finished.')
          ok(compared + ' ' + grunt.util.pluralize(compared,
             'image/images') + ' compared, ' + matched + ' matched, ' +
             differed + ' differed, ' + removed + ' removed, ' + added +
             ' added.')
          done()
        })

        observer.once('error', function (error) {
          grunt.verbose.error(error.stack)
          grunt.log.error(error)
          warn('Comparing images failed.')
          done()
        })
      })
}
