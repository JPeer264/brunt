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