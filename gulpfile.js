/** ----------------------------------------------------------------------------
 * @author  Avin Cheng
 * @desc    Build and package theme flat-ghost.
 * @license MIT
 ** --------------------------------------------------------------------------*/
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
const minifyCSS = require('gulp-clean-css');
const minifyJS = require('gulp-uglify');
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
    './assets/img/avatars/*.*',
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
  return gulp.src('./assets/css/global.css')
    .pipe(spriter({
      includeMode: 'implicit',
      spriteSheet: './dist/assets/img/_icons.png',
      pathToSpriteSheetFromCSS: '../img/_icons.png'
    }))
    .pipe(gulp.dest('./temp/assets/css'));
});

gulp.task('css:bundle', () => {
  return gulp.src([
    './assets/libs/neat/neat.css',
    './assets/libs/prism/prism.css',
    './temp/assets/css/global.css',
    './assets/css/styles.css',
    './assets/css/widgets.css',
    './assets/css/mobile.css'
  ])
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false,
      remove: false
    }))
    .pipe(concat('bundle.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('CSS', sequence('sprite', 'css:bundle'));

/**
 * JS Processing
 */
gulp.task('JS', () => {
  return gulp.src([
    './assets/js/*.js',
    './assets/libs/prism/*.js'
  ])
    .pipe(concat('bundle.js'))
    .pipe(minifyJS())
    .pipe(gulp.dest('./dist/assets/js'));
});

/**
 * HBS Processing
 */
gulp.task('hbs:copy', () => {
  return gulp.src([
    './partials/*.hbs',
    './*.hbs',
    '!./default.hbs'
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
