module.exports = {
	removelogging: {
		prod: {
			src: "<%= paths.dest.allFiles.js %>"
		}
	},
	cssmin: {
		target: {
			files: [
				{
					expand: true,
					cwd: "<%= paths.dev.folder.assets.css %>",
					src: [
						"**/*.css",
						"!**/*.min.css"
					],
					dest: "<%= paths.dest.folder.assets.css %>",
					ext: ".min.css"
				}
			]
		}
	},
	postcss: {
		options: {
			map: {
				inline: false,
				annotation: '<%= paths.dev.folder.assets.css %>'
			},
			processors: [
				require('autoprefixer')({ browsers: 'last 2 versions' })
			]
		},
		all: {
			src: '<%= paths.dev.files.css %>'
		}
	},
	uglify: {
		nonvendor: {
			files: [
				{
					expand: true,
					cwd: "<%= paths.dev.folder.assets.js %>",
					src: [
						"*.js",
						"!vendor.js"
					],
					dest: "<%= paths.dest.folder.assets.js %>",
					ext: ".min.js"
				}
			]
		}
	}
};