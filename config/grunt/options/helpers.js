module.exports = {
	watch: {
		sass: {
			files: "<%= paths.src.allFiles.scss %>",
			tasks: [
				"manage:sass"
			]
		},
		js: {
			files: "<%= paths.src.folder.assets.jss %>/*.js",
			tasks: [
				"manage:js:own"
			]
		},
		oldBrowserCss: {
			files: [
				"<%= paths.src.folder.assets.scss %>/browser.*/**/*.scss",
			],
			tasks: [
				"manageScssFolders",
				"postcss"
			]
		},
		copy: {
			files: [
				"<%= paths.src.base %>/**/*.html",
				"<%= paths.src.base %>/**/*.php"
			],
			tasks: [
				"copy:dev"
			]
		},
		vendorFolder: {
			files: "<%= paths.vendor.base %>/**/*",
			tasks: [
				"concat:js"
			]
		}
	},
	php: {
		reports: {
			options: {
				base: "<%= paths.reports.coverage %>",
				port: 8001,
				keepalive: true,
				open: true
			}
		},
		docs: {
			options: {
				base: "<%= paths.dev.folder.docs.base %>",
				port: 8002,
				keepalive: true,
				open: true
			}
		},
		dev: {
			options: {
				hostname: "127.0.0.1",
				port: 1337,
				base: "<%= names.dev %>"
			}
		}
	},
	browserSync: {
		dev: {
			bsFiles: {
				src: [
					"<%= paths.dev.base %>/**/*.html",
					"<%= paths.dev.base %>/**/*.css",
					"<%= paths.dev.base %>/**/*.js"
				]
			},
			options: {
				proxy: "<%= php.dev.options.hostname %>:<%= php.dev.options.port %>",
				port: 1338,
				open: true,
				watchTask: true,
				notify: true
			}
		},
		test: {

		}
	}
};