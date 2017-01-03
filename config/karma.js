const gruntfile = require('../Gruntfile');

// karma.conf.js
module.exports = config => {
    config.set({
        basePath: '../',
        files: [
            'dev/assets/js/vendor.js',

            'src/**/*.js',
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

        babelPreprocessor: {
            options: {
                presets: ['es2015'],
                sourceMap: 'inline'
            },
            filename: file => {
                return file.originalPath.replace(/\.js$/, '.es5.js');
            },
            sourceFileName: file => {
                return file.originalPath;
            }
        },

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'src/**/*.js': ['babel'],
            'src/**/!(*.spec).js': ['coverage']
        },

        // optionally, configure the reporter
        coverageReporter: {
            dir : 'coverage/',
            reporters: [
                { type: 'html' },
                { type: 'cobertura', subdir: 'reports' },
            ]
        }
    });
};