module.exports = function () {

    var gulp = require('gulp');
    var path = require('path');
    var jade = require('gulp-jade');
    var rename = require('gulp-rename');
    var ngHtml2Js = require('gulp-ng-html2js');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');

    var paths = require('../paths')();

    gulp.task('templates', function () {
        return gulp
            .src(paths.templates)
            .pipe(jade())
            .pipe(rename(path => path.basename += '.tpl'))
            .pipe(ngHtml2Js({
                moduleName : 'st.templates',
                rename : url => 'app/' + url
            }))
            .pipe(concat('templates.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(path.join(paths.buildDir, 'dist/app')));
    });

};
