module.exports = function (config, shared) {

    var gulp = require('gulp');
    var path = require('path');
    var less = require('gulp-less');
    var rename = require('gulp-rename');
    var combiner = require('stream-combiner2');
    var cssnano = require('gulp-cssnano');

    var paths = require('../paths')();

    gulp.task('less', function () {
        return gulp
            .src(path.join(paths.sourcesDir, 'index.less'))
            .pipe(less())
            .pipe(processCss())
            .pipe(gulp.dest(path.join(paths.buildDir, 'dist')))
            .pipe(shared.browserSync.stream());

        function processCss() {
            return config.isProdProfileActive()
                ? minifyAndRename()
                : rename('styles.css');

            function minifyAndRename() {
                return combiner(
                    cssnano(),
                    rename('styles.min.css')
                );
            }
        }
    });

};