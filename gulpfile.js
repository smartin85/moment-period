const { series } = require('gulp');
var gulp = require('gulp'),
    KarmaServer = require('karma').Server,
    uglify = require('gulp-uglifyjs'),
    path = require('path');

function runKarma(singleRun, done) {
    return new KarmaServer({
        configFile: path.join(__dirname, '/karma.conf.js'),
        singleRun: singleRun
    }, done).start();
}

/**
 * Run test once and exit
 */
function runTests (done) {
    runKarma(true, done);
}

/**
 * Run test continually
 */
function runTdd(done) {
    runKarma(false, done);
};

/**
 * Minify the source file
 */
function minify(done) {
    return gulp
        .src('moment-period.js')
        .pipe(uglify('moment-period.min.js'))
        .pipe(gulp.dest('./'));
};

exports.runTdd = runTdd;
exports.minify = minify;
exports.default = series(runTests, minify);
