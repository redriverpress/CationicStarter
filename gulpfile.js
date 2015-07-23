var gulp      = require('gulp'),
    gutil     = require('gulp-util'),
    bower     = require('bower'),
    concat    = require('gulp-concat'),
    sass      = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    coffee    = require('gulp-coffee'),
    minifyJs  = require('gulp-uglify'),
    path      = require('path'),
    key       = require('keypress'),
    karma     = require('karma'),
    rename    = require('gulp-rename'),
    sh        = require('shelljs');

var paths = {
  sass:   ['./scss/**/*.scss'],
  coffee: ['./coffee/**/*.coffee'],
  app:    ['./www/js/**/*.js'],
  spec:   {
    coffee: './spec/**/*_spec.coffee',
    js:     './spec/**/*_spec.js'
  }
};

gulp.task('default', ['assets', 'spec']);

gulp.task('assets', ['sass', 'coffee']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('coffee', function(done) {
  gulp.src(paths.coffee)
    .pipe(coffee({
        bare: true
      }).on(
        'error', gutil.log.bind(gutil, '[gulp-coffee]')
    ))
    .pipe(concat('ionic.app.js'))
    .pipe(gulp.dest('./www/js'))
    .pipe(minifyJs({
      mangle: false
    }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./www/js'))
    .on('end', done);
});

gulp.task('spec', function(done) {
  gulp.src(paths.spec.coffee)
    .pipe(coffee({
        bare: true
      }).on(
        'error', gutil.log.bind(gutil, '[gulp-coffee]')
    ))
    .pipe(concat('coffees_spec.js'))
    .pipe(gulp.dest('./spec/tmp'))
    .on('end', function() {
      new karma.Server({
        configFile: path.resolve('./spec/karma.conf.js'),
        singleRun: true
      }, function() {
        sh.rm('-rf', './spec/tmp');
        done();
      }).start();
    });
});

gulp.task('watch', function() {
  gulp.watch(paths.sass,   ['sass']);
  gulp.watch(paths.coffee, ['coffee']);
});

gulp.task('guard', function() {
  key(process.stdin);
  process.stdin.on('keypress', function (ch, key) {
    console.log();
    if (key.name == 'return') {
      console.log('Running all specs...');
      gulp.start('spec');
    } else if (key.name == 'c' && key.ctrl) {
      console.log('Bye bye...');
      process.stdin.pause();
      process.exit();
    }
  });
  process.stdin.setRawMode(true);
  process.stdin.resume();
  gulp.watch([paths.spec.coffee, paths.spec.js, paths.app], ['spec']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (! sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
