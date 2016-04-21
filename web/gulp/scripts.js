module.exports = function (config, shared) {

    var gulp = require('gulp');
    var path = require('path');
    var babel = require('gulp-babel');
    var ngAnnotate = require('gulp-ng-annotate');
    var wrap = require('gulp-wrap');
    var empty = require('gulp-empty');
    var combiner = require('stream-combiner2');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');

    var paths = require('../paths')();

    gulp.task('scripts', [
        'scripts:app',
        'scripts:vendor'
    ]);

    gulp.task('scripts:app', () => {
        shared.jsTimestamp = Date.now();
        return gulp
            .src(paths.appJsSources)
            .pipe(babel({
                presets : ['es2015']
            }))
            .pipe(ngAnnotate())
            .pipe(wrap(';(function(){\n<%= contents %>\n})();'))
            .pipe(processJs('app.min.js'))
            .pipe(gulp.dest(path.join(paths.buildDir, 'dist/app')));
    });

    gulp.task('scripts:vendor', () => {
        return gulp.src(paths.vendorJsSources)
            .pipe(processJs('vendor.min.js'))
            .pipe(gulp.dest(path.join(paths.buildDir, 'dist/vendor')));
    });

    function processJs(finalName) {
        return config.isProdProfileActive()
            ? concatAndUglify()
            : empty();

        function concatAndUglify() {
            return combiner(
                concat(finalName),
                uglify()
            )
        }
    }

};