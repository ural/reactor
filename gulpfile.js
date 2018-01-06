"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // Runs local dev server
var open = require('gulp-open');  // Open URL in a web browser
var browserify = require('browserify'); // Bundles Js
var reactify = require('reactify'); // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); // Concatinate files
var lint = require('gulp-eslint'); // Lint JS file, including JSX


var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        css: [
	        'node_modules/bootstrap/dist/css/bootstrap.css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.css/bootstrap-theme.min.css'
        ],
        dist: './dist',
        mainJs: './src/main.js'
    }
};

// Start local dev server
gulp.task('connect', function () {
    connect.server({
       root: ['dist'],
       port: config.port,
       base: config.devBaseUrl,
       livereload: true
    });
});

gulp.task('open', ['connect'], function () {
    gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function () {
   gulp.src(config.paths.html)
       .pipe(gulp.dest(config.paths.dist))
       .pipe(connect.reload());
});

gulp.task('js', function () {
   browserify(config.paths.mainJs)
       .transform(reactify)
       .bundle()
       .on('error', console.error.bind(console))
       .pipe(source('bundle.js'))
       .pipe(gulp.dest(config.paths.dist + '/scripts'))
       .pipe(connect.reload());
});

gulp.task('css', function () {
        gulp.src(config.paths.css)
            .pipe(concat('bundle.css'))
            .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('lint', function () {
   return gulp.src(config.paths.js)
       .pipe(lint({configFile: 'eslint.config.json'}))
       .pipe(lint.format());
});

/*
gulp.task('lint', function () {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src([config.paths.js,'!node_modules/!**'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
        .pipe(lint({config: 'eslint.config.json'}))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(lint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(lint.failAfterError());
});
*/

gulp.task('watch', function () {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['html', 'lint', 'css', 'js', 'open', 'watch']);
