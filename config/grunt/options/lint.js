module.exports = {
	eslint: {
		options: {
			configFile: "config/eslint.json"
		},
		dev: {
			src: [
				"<%= paths.src.files.js %>",
				"<%= paths.src.ignore.tests %>",
				"<%= paths.src.ignore.couldBeVendor %>"
			]
		},
		report: {
			options: {
				format: "checkstyle",
				outputFile: "<%= paths.coverage.checkstyle %>"
			},
			src: "<%= eslint.dev.src %>"
		}
	},
	jsinspect: {
		report: {
			options: {
				reporter: "pmd",
				reportFile: "<%= paths.coverage.pmd %>"
			},
			src: [
				"<%= paths.src.allFiles.js %>",
				"<%= paths.src.ignore.tests %>"
			]
		}
	},
	csslint: {
		options: {
			csslintrc: "config/csslint.json"
		},
		dev: {
			src: "<%= paths.dev.files.css %>"
		},
		report: {
			options: {
				formatters: [
					{
						id: "lint-xml",
						dest: "<%= paths.coverage.csslint %>"
					}
				]
			},
			src: "<%= csslint.dev.src %>"
		}
	},
	validation: {
		options: {
			failHard: true,
			stoponerror: false,
			reset: true,
			serverUrl: "https://validator.w3.org/check",
			path: "<%= paths.coverage.html %>",
			reportpath: "<%=paths.coverage.html2 %>",
			relaxerror: [
				"Any button descendant of a label element with a for attribute must have an ID value that matches that for attribute.",
				"Element [-a-zA-Z]+ not allowed as child of element [-a-zA-Z]+ in this context",
				"The Content-Type was text/html. Using the HTML parser.",
				"Using the schema for HTML with SVG 1.1, MathML 3.0, RDFa 1.1, and ITS 2.0 support."
			]
		},
		noapp: {
			src: [
				"<%= paths.src.allFiles.html %>"
			]
		}
	}
};