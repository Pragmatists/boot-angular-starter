module.exports = function (config) {
    config.set({
        // root folder of the project
        basePath : '',

        files : [
            // vendor
            <!-- inject:js -->
            'vendor/jquery/dist/jquery.js',
            'vendor/angular/angular.js',
            'vendor/angular-mocks/angular-mocks.js',
            'vendor/angular-ui-router/release/angular-ui-router.js',
            'vendor/lodash/dist/lodash.js',
            'vendor/ngstorage/ngStorage.js',
            'vendor/angular-messages/angular-messages.js',
            'vendor/ng-dialog/js/ngDialog.js',
            'vendor/angular-animate/angular-animate.js',
            <!-- endinject -->
            'node_modules/jasmine-promise-matchers/dist/jasmine-promise-matchers.js',
            // src:app
            'src/app/**/*.module.js',
            'src/app/**/*.js',
            'src/app/**/*.jade'
        ],

        port : 9018,

        runnerPort : 9100,

        colors : true,

        browsers : ['PhantomJS'],

        frameworks : ['jasmine'],

        plugins : [
            'karma-jasmine-jquery',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-spec-reporter',
            'karma-coverage',
            'karma-ng-html2js-preprocessor',
            'karma-babel-preprocessor',
            'karma-ng-jade2js-preprocessor'
        ],

        urlRoot : '/',

        autoWatch : false,
        singleRun : true,

        captureTimeout : 60000,

        preprocessors : {
            'src/app/**/*.js' : ['babel'],
            'src/app/**/!(*spec).js' : ['coverage'],
            'src/app/**/*.jade' : ['ng-jade2js']
        },

        ngJade2JsPreprocessor : {
            moduleName : 'st.templates',
            cacheIdFromPath : filepath => {
                return filepath
                    .substr('src/'.length)
                    .replace('.jade', '.tpl.html');
            }
        }
    });
};

