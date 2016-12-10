module.exports = {
	concat: {
		options: {
			sourceMap: true
		},
		js: {
			files: [
				{
					src: [
						"<%= paths.cache.files.assets.js %>",
						"<%= paths.cache.ignore.couldBeVendor %>"
					],
					dest: "<%= paths.dev.folder.assets.js %>/main.js"
				}
			]
		},
		vendor: {
			files: [
				{
					src: [
						"<%= paths.dev.folder.assets.js %>/bower.js",
						"<%= paths.src.files.couldBeVendor.js %>",
						"<%= paths.vendor.js %>",
						"<%= paths.src.ignore.min %>"
					],
					dest: "<%= paths.dev.folder.assets.js %>/vendor.js"
				}
			]
		},
		tests: {
			files: {
				"<%= paths.dev.folder.tests.base %>/js/tests.js": "<%= paths.src.tests %>",
				"<%= paths.dev.folder.tests.js %>/instrument.js": "<%= paths.dev.files.instrumented %>",
				"<%= paths.dev.folder.tests.js %>/vendor.js": [
					"<%= paths.dev.folder.assets.js %>/bower.js",
					"<%= paths.src.files.couldBeVendor.js %>",
					"<%= paths.vendor.js %>",
					"<%= paths.src.ignore.min %>"
				]
			}
		},
		css: {
			options: {
				process: function (src, filepath) {
					return '/* Source: ' + filepath + '*/\n' + src
				},
				sourceMap: true
			},
			files: [
				{
					src: [
						"<%= paths.vendor.css %>",
						"<%= paths.cache.files.assets.scss %>",
						"<%= paths.src.files.css %>"
					],
					dest: "<%= paths.dev.folder.assets.css %>/global.css"
				}
			]
		}
	},
	babel: {
		options: {
			sourceMap: true,
			presets: ['es2015']
		},
		dist: {
			files: [{
				expand: true,
				cwd: "<%= paths.src.folder.assets.js %>",
				src: "**/*.js",
				dest: "<%= paths.cache.folder.assets.js %>"
			}]
		}
	},
	bower_concat: {
		all: {
			dest: "<%= paths.dev.folder.assets.js %>/bower.js",
			bowerOptions: {},
			dependencies: {},
			process: function (src) {
				"\n;(function( window, undefined ){ \n 'use strict';\n\n" +
				src +
				"\n\n}( window ));"
			},
			callback: function (file, comp) {
				return file;
			}
		}
	},
	sass: {
		all: {
			options: {
				sourceMap: true
			},
			files: [{
				expand: true,
				cwd: "<%= paths.src.folder.assets.scss %>",
				src: "**/*.scss",
				dest: "<%= paths.cache.folder.assets.scss %>"
			}]
		}
	},
	clean: {
		dev: {
			src: "<%= paths.dev.base %>"
		},
		dist: {
			src: "<%= paths.dest.base %>"
		},
		cache: {
			src: "<%= paths.cache.base %>"
		},
		bower: {
			src: "<%= paths.dev.folder.assets.js %>/bower.js"
		},
		template: {
			src: "<%= paths.dev.folder.assets.js %>/template.js"
		}
	},
	copy: {
		dev: {
			files: [
				{
					expand: true,
					cwd: "<%= paths.src.folder.assets.base %>",
					src: [
						"img/**",
						"svg/**",
						"json/**",
						"fonts/**"
					],
					dest: "<%= paths.dev.folder.assets.base %>"
				},
				{
					expand: true,
					cwd: "<%= paths.src.base %>",
					src: [
						"**/*.{html,php}",
						"!**/app/**/*.html"
					],
					dest: "<%= paths.dev.base %>/"
				}
			]
		},
		prod: {
			files: [
				{
					expand: true,
					cwd: "<%= paths.src.folder.assets.base %>",
					src: [
						"img/**",
						"svg/**",
						"json/**",
						"fonts/**"
					],
					dest: "<%= paths.dest.folder.assets.base %>"
				},
				{
					expand: true,
					cwd: "<%= paths.dev.base %>",
					src: [
						"**/*.{html,php}",
						"!src/**/*",
					],
					dest: "<%= paths.dest.base %>"
				}
			]
		},
		src: {
			files: [{
				expand: true,
				cwd: "<%= paths.base %>",
				src: "src/**",
				dest: "<%= paths.dev.base %>"
			}]
		},
		vendor: {
			files: [
				{
					expand: true,
					cwd: "<%= paths.dev.folder.assets.js %>",
					src: "vendor.js",
					dest: "<%= paths.dest.folder.assets.js %>",
					ext: ".min.js"
				}
			]
		},
		tests: {
			files: [
				{
					expand: true,
					cwd: "./config/test",
					src: [
						"**"
					],
					dest: "<%= paths.dev.folder.tests.base %>"
				}
			]
		}
	},
	cdnify: {
		prod: {
			options: {
				rewriter: function (url) {
					console.log(url)
					var arr = url.split('.');

					if (arr[arr.length - 2] !== 'min') {
						arr.splice((arr.length - 1), 0, 'min');
					}

					return arr.join('.');
				},
				css: false,
				html: {
					"img[src]": false,
					"video[poster]": false,
					"source[src]": false
				}
			},
			files: [
				{
					expand: true,
					cwd: "<%= paths.dest.base %>",
					src: [
						"**/*.{php,html}"
					],
					dest: "<%= paths.dest.base %>"
				}
			]
		}
	},
	jsdoc: {
		documentation: {
			src: [
				"<%= paths.src.allFiles.js %>",
				"<%= paths.src.ignore.couldBeVendor %>"
			],
			dest: "<%= paths.dev.folder.docs.base %>"
		}
	}
};