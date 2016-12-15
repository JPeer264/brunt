module.exports = {
	instrument: {
		files: [
			"<%= paths.src.files.js %>",
			"<%= paths.src.ignore.tests %>",
			"<%= paths.src.ignore.couldBeVendor %>"
		],
		options: {
			lazy: true,
			basePath: "<%= paths.dev.folder.tests.instrumented %>"
		}
	},
	mocha: {
		options: {
			reporter: "Spec",
			log: true,
			logErrors: true,
			run: true
		},
		report: {
			src: "<%= paths.dev.folder.tests.base %>/**/*.html",
			options: {
				coverage: {
					coberturaReport: "<%= paths.reports.coverage %>",
					htmlReport: "<%= paths.reports.coverage %>"
				}
			}
		}
	},
	karma: {
		unit: {
			options: {
				configFile: './config/karma.js'
			},
			port: 2323,
			singleRun: true
		}
	}
};