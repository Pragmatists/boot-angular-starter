module.exports = function () {

    var path = require('path');

    var sourcesDir = './src';
    var vendorDir = './vendor';
    var buildDir = './build';
    var gulpConfigurationDir = './gulp';

    var rootLevelJsFiles = './*.js';

    return {
        'sourcesDir' : sourcesDir,
        'buildDir' : buildDir,
        'testCoverageDir' : path.join(buildDir, 'reports/coverage'),
        'assets' : [
            path.join(sourcesDir, 'assets/*')
        ],
        'templates' : [
            path.join(sourcesDir, 'app/**/*.jade')
        ],
        'appJsSources' : [
            path.join(sourcesDir, 'app/**/*.module.js'),
            path.join(sourcesDir, 'app/**/*.js'),
            '!' + path.join(sourcesDir, 'app/test/**'),
            '!' + path.join(sourcesDir, 'app/**/*.spec.js')
        ],
        'vendorJsSources' : [
            path.join(vendorDir, 'jquery/dist/jquery.js'),
            path.join(vendorDir, 'angular/angular.js'),
            path.join(vendorDir, 'angular-mocks/angular-mocks.js'),
            path.join(vendorDir, 'angular-ui-router/release/angular-ui-router.js'),
            path.join(vendorDir, 'lodash/dist/lodash.js'),
            path.join(vendorDir, 'ngstorage/ngStorage.js'),
            path.join(vendorDir, 'angular-messages/angular-messages.js'),
            path.join(vendorDir, 'ng-dialog/js/ngDialog.js'),
            path.join(vendorDir, 'angular-animate/angular-animate.js'),
            path.join(vendorDir, 'offline/offline.js')
        ],
        'jsSourcesToBeLinted' : [
            path.join(sourcesDir, '**/*.js'),
            path.join(gulpConfigurationDir, '**/*.js'),
            rootLevelJsFiles
        ]
    };
};
