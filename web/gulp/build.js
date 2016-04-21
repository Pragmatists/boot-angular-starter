module.exports = function (config, shared) {

    var gulp = require('gulp');
    var path = require('path');
    var runSequence = require('run-sequence');
    var inject = require('gulp-inject');

    var paths = require('../paths')();

    gulp.task('build', done => {
        runSequence(
            'test',
            'scripts',
            'templates',
            'less',
            'assets',
            'build:index',
            done
        );
    });

    gulp.task('build:index', () => {
        var distCss = gulp.src([
            path.join(paths.buildDir, 'dist/**/*.css')
        ]);
        var distJs = gulp.src([
            path.join(paths.buildDir, 'dist/vendor/jquery.js'),
            path.join(paths.buildDir, 'dist/vendor/angular.js'),
            path.join(paths.buildDir, 'dist/vendor/**/*.js'),
            path.join(paths.buildDir, 'dist/app/**/*.module.js'),
            path.join(paths.buildDir, 'dist/**/*.js')
        ]);

        return gulp
            .src(path.join(paths.sourcesDir, 'index.html'))
            .pipe(gulp.dest(path.join(paths.buildDir, 'dist')))
            .pipe(inject(distJs, {
                relative : true,
                transform : antiCacheTransform
            }))
            .pipe(inject(distCss, {
                relative : true,
                transform : antiCacheTransform
            }))
            .pipe(gulp.dest(path.join(paths.buildDir, 'dist')));

        function antiCacheTransform(filepath, i, length, sourceFile, targetFile) {
            if (config.isProdProfileActive()) {
                filepath += '?t=' + shared.jsTimestamp;
            }
            return inject.transform.apply(inject.transform, [filepath, i, length, sourceFile, targetFile]);
        }
    });

};
