/**
 * @author  Avin Cheng
 * @desc    Build and package theme flat-ghost.
 * @license MIT
 */
const gulp = require('gulp');
const fs = require('fs');

/**
 * Gulp Plugins
 */
const rm = require('gulp-rimraf');
const sequence = require('gulp-sequence');
const concat = require("gulp-concat");
const autoprefixer = require('gulp-autoprefixer');
const spriter = require('gulp-css-spriter');
const processhtml = require('gulp-processhtml');
const zip = require('gulp-zip');


/**
 * Desc Files Processing
 */
gulp.task('DESC_FILES', () => {
  return gulp.src([
    './*.md',
    './*.json',
    './LICENSE*'
  ]).pipe(gulp.dest('./dist'));
});


/**
 * IMG Processing
 */
gulp.task('IMG', () => {
  return gulp.src([
    './assets/img/*.*',
    '!./assets/img/*.psd',
    './assets/screenshot/*.*',
  ], {base: './'})
    .pipe(gulp.dest('./dist'));
});


/**
 * CSS Processing
 */
// Css Spriter
// Add exception using: /* @meta {"spritesheet": {"include": false}} */
gulp.task('sprite', () => {
  return gulp.src('./assets/css/style.css')
    .pipe(spriter({
      includeMode: 'implicit',
      spriteSheet: './dist/assets/img/_icos.png',
      pathToSpriteSheetFromCSS: '../img/_icos.png'
    }))
    .pipe(gulp.dest('./temp/assets/css'));
});

gulp.task('css:process', () => {
  return gulp.src([
    './assets/css/neat/neat.min.css',
    './assets/css/basic.css',
    './temp/assets/css/style.css'
  ])
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false,
      remove: false
    }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('CSS', sequence('sprite', 'css:process'));


/**
 * JS Processing
 */
gulp.task('JS', () => {
  return gulp.src('./assets/js/*.js')
    .pipe(gulp.dest('./dist/assets/js'));
});


/**
 * HBS Processing
 */
gulp.task('hbs:copy', () => {
  return gulp.src([
    './partials/*.hbs',
    './*.hbs',
    '!./default.hbs',
  ], {base: './'})
    .pipe(gulp.dest('./dist'));
});

gulp.task('hbs:process', () => {
  return gulp.src('./default.hbs')
    .pipe(processhtml())
    .pipe(gulp.dest('./dist'));
});

gulp.task('HBS', sequence(['hbs:copy', 'hbs:process']));

/**
 * Clean
 */
gulp.task('clean:temp', () => {
  return gulp.src('./temp')
    .pipe(rm());
});

gulp.task('clean:dist', () => {
  return gulp.src('./dist')
    .pipe(rm());
});


/**
 * Package
 */
const config = JSON.parse(fs.readFileSync('./package.json'));

gulp.task('zip', () => {
  return gulp.src('./dist/**/*.*')
    .pipe(zip(`${config.name}-v${config.version}.zip`))
    .pipe(gulp.dest('./'));
});


/**
 * Final Tasks
 */
gulp.task('build', sequence(
  'clean:dist',
  ['DESC_FILES', 'IMG', 'CSS', 'JS', 'HBS'],
  'clean:temp'
));

gulp.task('pkg', sequence(
  'build',
  'zip',
  'clean:dist'
));
