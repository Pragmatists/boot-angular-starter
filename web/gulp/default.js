module.exports = function () {

    var gulp = require('gulp');
    var runSequence = require('run-sequence');

    gulp.task('default', function (done) {
        runSequence(
            'clean',
            'serve',
            done
        );
    });

};