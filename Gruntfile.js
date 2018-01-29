'use strict'

module.exports = function (grunt) {
  const coverage = process.env.GRUNT_REG_VIZ_COVERAGE

  grunt.initConfig({
    standard: {
      all: {
        src: [
          'Gruntfile.js',
          'tasks/*.js',
          'tests/*.js'
        ]
      }
    },

    instrument: {
      files: 'tasks/*.js',
      options: {
        lazy: true,
        basePath: 'coverage/'
      }
    },

    storeCoverage: {
      options: {
        dir: 'coverage'
      }
    },

    makeReport: {
      src: 'coverage/coverage.json',
      options: {
        type: 'lcov',
        dir: 'coverage',
        print: 'detail'
      }
    },

    coveralls: {
      tests: {
        src: 'coverage/lcov.info'
      }
    },

    'reg-viz': {
      matching: {
        expected: 'tests/matching/expected',
        actual: 'tests/matching/actual',
        different: 'tests/matching/different',
        report: 'tests/matching/report.html'
      },
      differing: {
        options: {
          force: true
        },
        expected: 'tests/differing/expected',
        actual: 'tests/differing/actual',
        different: 'tests/differing/different',
        report: 'tests/differing/report.html'
      }
    },

    nodeunit: {
      tests: ['tests/*.js']
    },

    clean: {
      differences: ['tests/*/different/*'],
      report: ['tests/*/report.*']
    }
  })

  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-nodeunit')
  grunt.loadNpmTasks('grunt-coveralls')
  grunt.loadNpmTasks('grunt-istanbul')
  grunt.loadNpmTasks('grunt-standard')
  grunt.loadTasks(coverage ? 'coverage/tasks' : 'tasks')

  const test = ['standard', 'clean', 'reg-viz', 'nodeunit']
  const report = coverage ? ['storeCoverage', 'makeReport'] : []
  grunt.registerTask('default', test.concat(report))
}
