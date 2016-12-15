'use strict';

const jitMappings = {
    removelogging: 'grunt-remove-logging',
    validation: 'grunt-html-validation',
    instrument: 'grunt-istanbul',
    scsslint: 'grunt-scss-lint',
};
const sourcemaps = true;
const names = {
    src: 'src',
    assets: 'assets',
    dest: 'dist',
    dev: 'dev',
    cache: '.cache',
};

module.exports = function(grunt) {
    // see how long each task need
    require('time-grunt')(grunt);

    function loadConfig(path) {
        const glob = require('glob');
        let object = {};
        let key;

        glob.sync('*', {cwd: path}).forEach(function(option) {
            // key = option.replace(/\.js$/,'');
            object = grunt.util._.extend(object, require(path + option));
        });

        return object;
    }

    grunt.config.init({
        // paths for easier maintenance
        pkg: grunt.file.readJSON('package.json'),
        names: names,
        paths: {
            base: ".",
            cache: {
                base: "<%=  paths.base      %>/<%= names.cache %>",
                tests: "<%= paths.cache.base  %>/**/*.spec.js",
                folder: {
                    assets: {
                        base: "<%=  paths.cache.base               %>/<%= names.assets %>",
                        js: "<%=    paths.cache.folder.assets.base %>/js",
                        jss: "<%=   paths.cache.folder.assets.js   %>/**",
                        scss: "<%=  paths.cache.folder.assets.base %>/scss",
                        scsss: "<%= paths.cache.folder.assets.scss %>/**",
                        css: "<%=   paths.cache.folder.assets.base %>/css",
                        csss: "<%=  paths.cache.folder.assets.css  %>/**",
                        img: "<%=   paths.cache.folder.assets.base %>/img",
                        imgs: "<%=  paths.cache.folder.assets.img  %>/**",
                        svg: "<%=   paths.cache.folder.assets.base %>/svg",
                        svgs: "<%=  paths.cache.folder.assets.svg  %>/**",
                        json: "<%=  paths.cache.folder.assets.base %>/json",
                        jsons: "<%= paths.cache.folder.assets.json %>/**"
                    }
                },
                ignore: {
                    modules: [
                        "!<%= paths.cache.base %>/**/node_modules/**/*.js",
                        "!<%= paths.cache.base %>/**/node_modules/**/*.css",
                        "!<%= paths.cache.base %>/**/node_modules/**/*.html"
                    ],
                    tests: [
                        "!<%= paths.cache.tests %>"
                    ],
                    _js: [
                        "!<%=   paths.cache.base   %>/**/_*.js"
                    ],
                    couldBeVendor: [
                        "!<%= paths.cache.base %>/**/*.min.js",
                        "!<%= paths.cache.base %>/**/*jquery*.js",
                        "!<%= paths.cache.base %>/**/*angular*.js",
                        "!<%= paths.cache.base %>/**/*ember*.js",
                        "!<%= paths.cache.base %>/**/*bootstrap*.js",
                        "!<%= paths.cache.base %>/**/*.min.css",
                        "!<%= paths.cache.base %>/**/*bootstrap*.css"
                    ],
                    _scss: "!<%= paths.cache.base %>/**/_*.scss",
                    _css: "!<%= paths.cache.base %>/**/_*.css",
                    _html: "!<%= paths.cache.base %>/**/_*.html",
                    assets: [
                        "!<%= paths.cache.files.assets.js",
                        "!<%= paths.cache.files.assets.css",
                        "!<%= paths.cache.files.assets.scss",
                        "!<%= paths.cache.files.assets.img",
                        "!<%= paths.cache.files.assets.svg",
                        "!<%= paths.cache.files.assets.json"
                    ],
                    min: [
                        "!<%= paths.cache.base %>/**/*.min.*"
                    ]
                },
                allFiles: {
                    js: "<%=   paths.cache.base %>/**/*.js",
                    scss: "<%= paths.cache.base %>/**/*.scss",
                    css: "<%=  paths.cache.base %>/**/*.css",
                    html: "<%= paths.cache.base %>/**/*.html",
                    img: "<%=  paths.cache.base %>/**/*.img",
                    svg: "<%=  paths.cache.base %>/**/*.svg",
                    json: "<%= paths.cache.base %>/**/*.json"
                },
                files: {
                    js: [
                        "<%= paths.cache.allFiles.js %>",
                        "<%= paths.cache.ignore._js %>",
                        "<%= paths.cache.ignore.tests %>"
                    ],
                    scss: [
                        "<%= paths.cache.allFiles.scss %>",
                        "<%= paths.cache.ignore._scss %>"
                    ],
                    css: [
                        "<%= paths.cache.allFiles.css %>",
                        "<%= paths.cache.ignore._css %>"
                    ],
                    html: [
                        "<%= paths.cache.allFiles.html %>",
                        "<%= paths.cache.ignore._scss %>"
                    ],
                    assets: {
                        js: [
                            "<%= paths.cache.folder.assets.jss %>/*.class.js",
                            "<%= paths.cache.folder.assets.jss %>/*.js",
                            "<%= paths.cache.folder.assets.jss %>/*.init.js",
                            "<%= paths.cache.ignore._js %>",
                            "<%= paths.cache.ignore.tests %>"
                        ],
                        scss: [
                            "<%= paths.cache.folder.assets.scss %>/*.scss",
                            "<%= paths.cache.ignore._scss %>",
                            "<%= paths.cache.folder.assets.css %>/*.css",
                            "<%= paths.cache.ignore._css %>"
                        ],
                        oldBrowserScss: [
                            "<%= pahts.cache.folder.assets.scss %>/**/*.scss",
                            "!<%= pahts.cache.folder.assets.scss %>/*.scss"
                        ],
                        img: "<%=  paths.cache.folder.assets.imgs %>/*.img",
                        svg: "<%=  paths.cache.folder.assets.svgs %>/*.svg",
                        json: "<%= paths.cache.folder.assets.jsons %>/*.json"
                    },
                    couldBeVendor: {
                        js: [
                            "<%= paths.cache.base %>/**/*.min.js",
                            "<%= paths.cache.base %>/**/*jquery*.js",
                            "<%= paths.cache.base %>/**/*angular*.js",
                            "<%= paths.cache.base %>/**/*ember*.js",
                            "<%= paths.cache.base %>/**/*bootstrap*.js"
                        ],
                        css: [
                            "<%= paths.cache.base %>/**/*.min.css",
                            "<%= paths.cache.base %>/**/*bootstrap*.css"
                        ]
                    }
                }
            },
            dev: {
                base: "<%= paths.base %>/<%= names.dev %>",
                folder: {
                    assets: {
                        base: "<%=   paths.dev.base %>/<%= names.assets %>",
                        js: "<%=     paths.dev.folder.assets.base %>/js",
                        jss: "<%=    paths.dev.folder.assets.js %>/**",
                        css: "<%=    paths.dev.folder.assets.base %>/css",
                        csss: "<%=   paths.dev.folder.assets.css %>/**",
                        styles: "<%= paths.dev.folder.assets.css %>/global.css"
                    },
                    tests: {
                        base: "<%= paths.dev.base %>/tests",
                        js: "<%=   paths.dev.folder.tests.base   %>/js",
                        instrumented: "<%=   paths.dev.folder.tests.base   %>/instrumented",
                        css: "<%=  paths.dev.folder.tests.base   %>/css"
                    },
                    docs: {
                        base: "<%= paths.dev.base %>/docs"
                    }
                },
                files: {
                    css: "<%= paths.dev.folder.assets.csss %>/*.css",
                    instrumented: [
                        "<%=   paths.dev.folder.tests.instrumented   %>/**/*.class.js",
                        "<%=   paths.dev.folder.tests.instrumented   %>/**/*.js",
                        "!<%=   paths.dev.folder.tests.instrumented   %>/**/*_.js"
                    ]
                }
            },
            vendor: {
                base: "<%= paths.base %>/vendor",
                css: [
                    "<%= paths.vendor.base %>/**/*.css"
                ],
                js: [
                    "<%= paths.vendor.base %>/**/*.js"
                ],
                min: {
                    js: "<%=  paths.vendor.base %>/**/*.min.js",
                    css: "<%= paths.vendor.base %>/**/*.min.css"
                }
            },
            src: {
                base: "<%=  paths.base      %>/<%= names.src %>",
                tests: "<%= paths.src.base  %>/**/*.spec.js",
                folder: {
                    assets: {
                        base: "<%=  paths.src.base               %>/<%= names.assets %>",
                        js: "<%=    paths.src.folder.assets.base %>/js",
                        jss: "<%=   paths.src.folder.assets.js   %>/**",
                        scss: "<%=  paths.src.folder.assets.base %>/scss",
                        scsss: "<%= paths.src.folder.assets.scss %>/**",
                        css: "<%=   paths.src.folder.assets.base %>/css",
                        csss: "<%=  paths.src.folder.assets.css  %>/**",
                        img: "<%=   paths.src.folder.assets.base %>/img",
                        imgs: "<%=  paths.src.folder.assets.img  %>/**",
                        svg: "<%=   paths.src.folder.assets.base %>/svg",
                        svgs: "<%=  paths.src.folder.assets.svg  %>/**",
                        json: "<%=  paths.src.folder.assets.base %>/json",
                        jsons: "<%= paths.src.folder.assets.json %>/**"
                    }
                },
                ignore: {
                    modules: [
                        "!<%= paths.src.base %>/**/node_modules/**/*.js",
                        "!<%= paths.src.base %>/**/node_modules/**/*.css",
                        "!<%= paths.src.base %>/**/node_modules/**/*.html"
                    ],
                    tests: [
                        "!<%= paths.src.tests %>"
                    ],
                    _js: [
                        "!<%=   paths.src.base   %>/**/_*.js"
                    ],
                    couldBeVendor: [
                        "!<%= paths.src.base %>/**/*.min.js",
                        "!<%= paths.src.base %>/**/*jquery*.js",
                        "!<%= paths.src.base %>/**/*angular*.js",
                        "!<%= paths.src.base %>/**/*ember*.js",
                        "!<%= paths.src.base %>/**/*bootstrap*.js",
                        "!<%= paths.src.base %>/**/*.min.css",
                        "!<%= paths.src.base %>/**/*bootstrap*.css"
                    ],
                    _scss: "!<%= paths.src.base %>/**/_*.scss",
                    _css: "!<%= paths.src.base %>/**/_*.css",
                    _html: "!<%= paths.src.base %>/**/_*.html",
                    assets: [
                        "!<%= paths.src.files.assets.js",
                        "!<%= paths.src.files.assets.css",
                        "!<%= paths.src.files.assets.scss",
                        "!<%= paths.src.files.assets.img",
                        "!<%= paths.src.files.assets.svg",
                        "!<%= paths.src.files.assets.json"
                    ],
                    min: [
                        "!<%= paths.src.base %>/**/*.min.*"
                    ]
                },
                allFiles: {
                    js: "<%=   paths.src.base %>/**/*.js",
                    scss: "<%= paths.src.base %>/**/*.scss",
                    css: "<%=  paths.src.base %>/**/*.css",
                    html: "<%= paths.src.base %>/**/*.html",
                    img: "<%=  paths.src.base %>/**/*.img",
                    svg: "<%=  paths.src.base %>/**/*.svg",
                    json: "<%= paths.src.base %>/**/*.json"
                },
                files: {
                    js: [
                        "<%= paths.src.allFiles.js %>",
                        "<%= paths.src.ignore._js %>",
                        "<%= paths.src.ignore.tests %>"
                    ],
                    scss: [
                        "<%= paths.src.allFiles.scss %>",
                        "<%= paths.src.ignore._scss %>"
                    ],
                    css: [
                        "<%= paths.src.allFiles.css %>",
                        "<%= paths.src.ignore._css %>"
                    ],
                    html: [
                        "<%= paths.src.allFiles.html %>",
                        "<%= paths.src.ignore._scss %>"
                    ],
                    assets: {
                        js: [
                            "<%= paths.src.folder.assets.jss %>/*.class.js",
                            "<%= paths.src.folder.assets.jss %>/*.js",
                            "<%= paths.src.folder.assets.jss %>/*.init.js",
                            "<%= paths.src.ignore._js %>",
                            "<%= paths.src.ignore.tests %>"
                        ],
                        scss: [
                            "<%= paths.src.folder.assets.scss %>/*.scss",
                            "<%= paths.src.ignore._scss %>",
                            "<%= paths.src.folder.assets.css %>/*.css",
                            "<%= paths.src.ignore._css %>"
                        ],
                        oldBrowserScss: [
                            "<%= pahts.src.folder.assets.scss %>/**/*.scss",
                            "!<%= pahts.src.folder.assets.scss %>/*.scss"
                        ],
                        img: "<%=  paths.src.folder.assets.imgs %>/*.img",
                        svg: "<%=  paths.src.folder.assets.svgs %>/*.svg",
                        json: "<%= paths.src.folder.assets.jsons %>/*.json"
                    },
                    couldBeVendor: {
                        js: [
                            "<%= paths.src.base %>/**/*.min.js",
                            "<%= paths.src.base %>/**/*jquery*.js",
                            "<%= paths.src.base %>/**/*angular*.js",
                            "<%= paths.src.base %>/**/*ember*.js",
                            "<%= paths.src.base %>/**/*bootstrap*.js"
                        ],
                        css: [
                            "<%= paths.src.base %>/**/*.min.css",
                            "<%= paths.src.base %>/**/*bootstrap*.css"
                        ]
                    }
                }
            },
            dest: {
                base: "<%=  paths.base %>/<%= names.dest %>",
                folder: {
                    html: "<%= paths.dest.base %>/html",
                    htmls: "<%= paths.dest.folder.html %>/**",
                    assets: {
                        base: "<%=  paths.dest.base %>/<%= names.assets %>",
                        js: "<%=    paths.dest.folder.assets.base %>/js",
                        jss: "<%=   paths.dest.folder.assets.base %>/**",
                        css: "<%=   paths.dest.folder.assets.base %>/css",
                        csss: "<%=  paths.dest.folder.assets.base %>/**",
                        html: "<%=  paths.dest.folder.assets.base %>/html",
                        htmls: "<%= paths.dest.folder.assets.base %>/**",
                        img: "<%=   paths.dest.folder.assets.base %>/img",
                        imgs: "<%=  paths.dest.folder.assets.base %>/**",
                        svg: "<%=   paths.dest.folder.assets.base %>/svg",
                        svgs: "<%=  paths.dest.folder.assets.base %>/**",
                        json: "<%=  paths.dest.folder.assets.base %>/json",
                        jsons: "<%= paths.dest.folder.assets.base %>/**"
                    }
                },
                allFiles: {
                    js: "<%=     paths.dest.folder.assets.jss   %>/*.js",
                    css: "<%=    paths.dest.folder.assets.csss  %>/*.css",
                    mincss: "<%= paths.dest.folder.assets.csss  %>/*.min.css",
                    html: "<%=   paths.dest.folder.assets.htmls %>/*.html",
                    img: "<%=   paths.dest.folder.assets.imgs  %>/*.img",
                    svg: "<%=   paths.dest.folder.assets.svgs  %>/*.svg",
                    json: "<%=   paths.dest.folder.assets.jsons %>/*.json"
                }
            },
            reports: {
                base: "<%= paths.dev.base     %>/reports",
                coverage: "<%= paths.reports.base %>/coverage",
                checkstyle: "<%= paths.reports.base %>/checkstyle.xml",
                pmd: "<%=        paths.reports.base %>/pmd.xml",
                html: "<%= paths.reports.base %>/.html-status.json",
                html2: "<%= paths.reports.base %>/app.json",
                csslint: "",
                js: ""
            },
            config: "<%= paths.base %>/config"
        }
    /* pathList end */
    /*
     * @start Code checking
     *
     * @dev
     *
     * @used plugins
     *   ** eslint
     *   ** jsinspector
     *   ** csslint
     **  ** html-validation
     */

    // see ./config/grunt/lint.js


    /*
     * @start Managing Files
     *
     * @prod
     *
     * @used plugins
     *   ** concat   <- merges all files together
     *   ** sass     <- convert from `scss` to `css`
     *   ** clean    <- delete folder and files
     *   ** copy     <- copy files from one dir to another
     *   ** cdnify   <- rewrite HTML files from *.css to *.min.css or *.js
     *   ** html2js  <- 4 angularJS. Make own module for all component
     *   ** jsdoc    <- generates documentation for js-Files
     */

    // see ./config/grunt/management.js


    /*
     * @start Filesize reducing, optimization and remove junk
     *
     * @prod
     *
     * @used plugins
     *   ** autoprefixer   <- add prefixes for every browser
     *   ** removelogging  <- remove `console.*` in all js files
     *   ** imagemin       <- reduces file size of `img` files
     *   ** cssmin         <- minification of `.css` to `.min.css`
     *   ** uglify         <- minification of `.js` to `.min.js`
     */

    // see ./config/grunt/optimization.js


    /*
     * @start Testing
     *
     * @dev
     *
     * @used plugins
     *   ** instrument  <- instrument `js` files for coverage reports
     *   ** mocha       <- runs the tests
     */

    // see ./config/grunt/tests.js


    /*
     * @start Development Helpers
     *
     * @dev
     *
     * @used plugins
     *   ** watch       <- watches tasks for development
     *   ** connect     <- make a HTTP server for developing or test results
     *   ** php         <- make a PHP  server for developing or test results
     *   ** browserSync <- updating server after changing files
     */

    // see ./config/grunt/helpers.js
    }); // grunt.initConfig END

    // merge tasks in config folder with this grunt file
    // all options in the subdirectory are now available
    grunt.config.merge(loadConfig('./config/grunt/options/'));

    /*
     * @start tasks
     *
     * * helpers
     *   ** default
     *   ** force:on
     *   ** force:off
     *   ** manageScssFolder
     *
     * * manage
     *   ** manage
     *   ** manage:js
     *   ** manage:sass
     *
     * * minify
     *   ** minify
     *   ** minify:js
     *   ** minify:app
     *   ** minify:css
     *
     * * lint
     *   ** lint:dev
     *   ** lint:reports
     *   ** lint:ci
     *
     * * tests
     *   ** test:dev
     *   ** test:reports
     *   ** test:ci
     *
     * * reports
     *   ** reports
     *
     * * build
     *   ** build:prod
     *   ** build:dev
     */

    /*
     * @tasks helpers
     * :on, :off
     *
     * enable the force during another tasks
     */
    grunt.registerTask('force:on',
        'force the force option on if needed',
        function() {
            if ( !grunt.option( 'force' ) ) {
                grunt.config.set('usetheforce_set', true);
                grunt.option( 'force', true );
            }
        }
    );

    grunt.registerTask('force:off',
        'turn force option off if we have previously set it',
        function() {
            if ( grunt.config.get('usetheforce_set') ) {
                grunt.option( 'force', false );
            }
        }
    );

    /**
     * Concat every scss file in a subdirectory of src/assets/scss/
     * every folder in scss becomes a own css file. E.g. scss/ie8/* -> css/ie8.css
     */
    grunt.registerTask('manageScssFolders', "Finds and prepares scss files into .dev/css folder for concatenation.", function() {
        // get all module directories
        grunt.file.expand('./' + names.src + '/' + names.assets + '/scss/*').forEach(function (dir) {
            // get the current concat object from initConfig
            const sass   = grunt.config.get('sass')   || {};
            const concat = grunt.config.get('concat') || {};
            const clean  = grunt.config.get('clean')  || {};

            let dirName;
            let newDir;

            // delete if no indexOf browser.
            if (dir.indexOf('browser.') === -1) {
                dir = '';
            }

            dirName = dir.substr(dir.lastIndexOf('.') + 1);


            // create a subtask for each module, find all src files
            // and combine into a single js file per module
            if (dir !== '') {
                newDir = grunt.config.get('paths.cache.folder.assets.scss') + '/browser.' + dirName;

                // all necessary scss files are now in .sass-cache/assets/scss/DIR/*.scss
                sass[dirName] = {
                    options: {
                        sourceMap: true
                    },
                    files: [{
                        expand: true,
                        cwd: grunt.config.get('paths.src.folder.assets.scss'),
                        src: 'browser.*/**/*.scss',
                        dest: grunt.config.get('paths.cache.folder.assets.scss')
                    }]
                };

                concat[dirName] = {
                    options: {
                        sourceMap: true
                    },
                    src:  [
                        newDir + '/**/*.scss',
                        '!' + newDir + '/**/_*.scss',
                    ],
                    dest: grunt.config.get('paths.dev.folder.assets.css') + '/' + dirName + '.css'
                };

                // add module subtasks to the concat task in initConfig
                grunt.config.set('sass', sass);
                grunt.config.set('concat', concat);

                // run all task which are generated before
                grunt.task.run('sass:' + dirName, 'concat:' + dirName);
            }
        });
    });

    require('et-grunt')(grunt, {
        /* taskList start */
        default: [
            "clean",
            "build:prod"
        ],
        manage: {
            default: [
                "manage:sass",
                "manage:js"
            ],
            sass: [
                "sass",
                "concat:css",
                "manageScssFolders",
                "postcss",
                "clean:cache"
            ],
            js: {
                default: [
                    "manage:js:own",
                    "manage:js:vendor",
                    "clean:cache"
                ],
                own: [
                    "babel",
                    "concat:js",
                ],
                vendor: [
                    "bower_concat",
                    "concat:vendor",
                    "clean:bower"
                ]
            }
        },
        minify: {
            default: [
                "minify:css",
                "minify:js",
                "copy:vendor"
            ],
            css: [
                "cssmin"
            ],
            js: [
                "removelogging",
                "uglify:nonvendor"
            ]
        },
        lint: {
            default: [
                "lint:ci"
            ],
            dev: [
                "lint:ci"
            ],
            ci: [
                "manage",
                "eslint:dev",
                "csslint:dev",
                "validation"
            ],
            reports: [
                "force:on",
                "manage",
                "eslint:report",
                "csslint:report",
                "force:off"
            ],
            js: [
                "eslint:dev"
            ],
            css: [
                "csslint:dev"
            ],
            html: [
                "validation"
            ],
        },
        test: {
            default: [
                "test:ci"
            ],
            dev: [
                "test:ci",
                "php:reports"
            ],
            ci: [
                "instrument",
                "karma"
            ],
            reports: [
                "force:on",
                "test:ci",
                "force:off"
            ]
        },
        reports: [
            "lint:reports",
            "test:reports"
        ],
        build: {
            default: [
                "build:prod"
            ],
            prod: [
                "build:dev",
                "rcs",
                "minify",
                "copy:prod",
                "cdnify:prod",
                "clean:dev"
            ],
            dev: [
                "manage",
                "copy:dev",
                "copy:src"
            ],
            ci: [
                "build:prod"
            ]
        },
        serve: {
            default: [
                "serve:dev"
            ],
            dev: [
                "build:dev",
                "php:dev",
                "browserSync:dev",
                "watch"
            ],
            reports: [
                "test:ci",
                "php:reports"
            ],
            docs: [
                "jsdoc",
                "php:docs"
            ]
        }
    }, jitMappings);
}
