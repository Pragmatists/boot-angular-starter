module.exports = function (config, shared) {

    var gulp = require('gulp');
    var path = require('path');
    var runSequence = require('run-sequence');
    var proxyMiddleware = require('http-proxy-middleware');
    var _ = require('lodash');

    var paths = require('../paths')();

    gulp.task('serve', done => {
        runSequence(
            'build',
            'browserSync',
            'watch',
            done
        );
    });

    gulp.task('browserSync', () => {
        var apiProxy = proxyMiddleware(['/api', '/health'], {target : 'http://localhost:8080'});
        shared.browserSync.init({
            server : {
                baseDir : path.join(paths.buildDir, 'dist')
            },
            middleware : apiProxy
        });
    });

    gulp.task('watch', () => {
        rebuildAppOnEverySourceChange();
        reloadAppOnEveryRebuild();
    });

    function rebuildAppOnEverySourceChange() {
        gulp.watch(path.join(paths.sourcesDir, 'index.html'), () => {
            runSequence(
                'build:index'
            );
        });
        gulp.watch(paths.templates, () => {
            runSequence(
                'templates'
            );
        });
        gulp.watch(paths.appJsSources, () => {
            runSequence(
                'scripts:app',
                'build:index'
            );
        });
        gulp.watch([
            path.join(paths.sourcesDir, '**/*.less'),
            path.join(paths.sourcesDir, '**/*.css')
        ], () => {
            runSequence(
                'less'
            );
        });
    }

    function reloadAppOnEveryRebuild() {
        gulp.watch(path.join(paths.buildDir, 'dist/**/*.js'), _.debounce(shared.browserSync.reload));
        gulp.watch(path.join(paths.buildDir, 'dist/index.html'), _.debounce(shared.browserSync.reload));
    }

};
