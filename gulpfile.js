var gulp   = require('gulp'), 
	uglify = require('gulp-uglify');

gulp.task('default', function() {
	gulp.src('src/jquery.carousel.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	gulp.watch('src/**/*.js', ['default']);
});