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
					cwd: "<%= paths.tmp.folder.assets.css %>",
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
				annotation: '<%= paths.tmp.folder.assets.css %>'
			},
			processors: [
				require('autoprefixer')({ browsers: 'last 2 versions' })
			]
		},
		all: {
			src: '<%= paths.tmp.files.css %>'
		}
	},
	uglify: {
		nonvendor: {
			files: [
				{
					expand: true,
					cwd: "<%= paths.tmp.folder.assets.js %>",
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