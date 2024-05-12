const { src, dest, watch } = require("gulp")
const sass = require("gulp-sass")(require("sass"))

function styleSheet() {
	return (
		src("./src/scss/index.scss")
			.pipe(sass())
			.pipe(dest("./src/css/"))
	)
}

exports.buildCss = styleSheet

exports.watch = () => watch("./src/scss/index.scss", styleSheet)
