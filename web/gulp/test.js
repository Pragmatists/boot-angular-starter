module.exports = function () {

    var gulp = require('gulp');
    var path = require('path');
    var runSequence = require('run-sequence');
    var inject = require('gulp-inject');

    var paths = require('../paths')();

    var karmaConfig = {
        configFile : path.join(__dirname, '../karma.conf.js'),
        autoWatch : false,
        singleRun : true,
        reporters : [
            'spec',
            'coverage'
        ],
        coverageReporter : {
            dir : paths.testCoverageDir,
            includeAllSources : true,
            watermarks : {
                statements : [80, 90],
                functions : [80, 90],
                branches : [80, 90],
                lines : [80, 90]
            },
            reporters : [
                {type : 'html', subdir : 'html'},
                {type : 'json-summary', subdir : '.', file : 'coverage.json'},
                {type : 'cobertura', subdir : '.', file : 'coverage.xml'},
                {type : 'text-summary'}
            ]
        }
    };

    gulp.task('test', done => {
        runSequence(
            'lint',
            'karma:inject',
            'karma:run',
            done
        );
    });

    gulp.task('karma:inject', () => {
        var vendorJsStream = gulp.src(paths.vendorJsSources);
        return gulp
            .src('./karma.conf.js')
            .pipe(inject(vendorJsStream, {
                addRootSlash : false,
                transform : filepath => '\'' + filepath + '\','
            }))
            .pipe(gulp.dest('./'));
    });

    gulp.task('karma:run', done => {
        var Server = require('karma').Server;
        var server = new Server(karmaConfig, done);
        server.start();
    });

};