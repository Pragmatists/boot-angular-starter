var gulp = require('gulp');
var path = require('path');
var _ = require('lodash');
var minimist = require('minimist');
var wrench = require('wrench');

var args = require('yargs')
    .strict()
    .string('profile')
    .choices('profile', ['dev', 'prod'])
    .default('profile', 'dev')
    .alias('p', 'profile')
    .argv;

var config = {
    isProdProfileActive : () => args['profile'] === 'prod'
};

var shared = {
    browserSync : require('browser-sync').create(),
    jsTimestamp : Date.now()
};


loadModulesFromDirectory('./gulp');


function loadModulesFromDirectory(directory) {
    return wrench
        .readdirSyncRecursive(directory)
        .filter(fileName => hasJsExtension(fileName))
        .forEach(fileName => loadNodeModuleFromFile(directory + '/' + fileName));
}

function hasJsExtension(fileName) {
    return (/\.js$/i).test(fileName);
}

function loadNodeModuleFromFile(filePath) {
    require(filePath)(config, shared);
}
