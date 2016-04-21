module.exports = function () {

    var gulp = require('gulp');
    var eslint = require('gulp-eslint');

    var paths = require('../paths')();

    gulp.task('lint', function () {
        return gulp.src(paths.jsSourcesToBeLinted)
            .pipe(eslint({
                useEslintrc : true,
                warnFileIgnored : true
            }))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    });

};