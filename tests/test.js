'use strict'

const fs = require('fs')
const path = require('path')

exports['htmllint-html-report-converter'] = {
  matching: function (test) {
    test.expect(2)
    const different = fs.existsSync(path.join(__dirname,
      'matching/different/todos-1.png'))
    const report = fs.existsSync(path.join(__dirname,
      'matching/report.html'))
    test.ok(!different)
    test.ok(report)
    test.done()
  },

  differing: function (test) {
    test.expect(2)
    const different = fs.existsSync(path.join(__dirname,
      'differing/different/todos-2.png'))
    const report = fs.existsSync(path.join(__dirname,
      'differing/report.html'))
    test.ok(different)
    test.ok(report)
    test.done()
  }
}
