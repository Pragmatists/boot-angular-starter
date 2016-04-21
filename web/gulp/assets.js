module.exports = function () {

    var gulp = require('gulp');
    var path = require('path');

    var paths = require('../paths')();

    gulp.task('assets', function () {
        return gulp
            .src(paths.assets)
            .pipe(gulp.dest(path.join(paths.buildDir, 'dist/assets')));
    });

};