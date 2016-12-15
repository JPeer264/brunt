const gruntfile = require('../Gruntfile');

// karma.conf.js
module.exports = function(config) {
    config.set({
        basePath: '../',
        files: [
            'dev/assets/js/vendor.js',
            'dev/assets/js/main.js',

            '.cache/**/*.spec.js'
        ],
        browsers: ['PhantomJS'],
        frameworks: ['mocha', 'chai'],
        autoWatch: false,
        client: {
            mocha: {
                opts: './config/mocha.opts'
            }
        },

        // coverage reporter generates the coverage
        reporters: ['progress', 'coverage'],

        // optionally, configure the reporter
        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        }
    });
};