/*================================================
 * @description: 	Build and package
 * @author: 		  Avin Cheng
 *===============================================*/
/*
 * Gulp with Plugins
 */
const gulp = require('gulp');
const rm = require('gulp-rimraf');
const concat = require("gulp-concat");
const sequence = require('gulp-sequence');
const autoprefixer = require('gulp-autoprefixer');
const spriter = require('gulp-css-spriter');
const processhtml = require('gulp-processhtml');
const zip = require('gulp-zip');


/*
 * Pipe
 */
// 文件复制
gulp.task('copy', () => {
    return gulp.src([
            './assets/img/*.*',
            './assets/screenshot/*.*',
            './assets/js/*.js',
            './partials/*.hbs',
            './*.hbs',
            '!./default.hbs',
            './*.md',
            './*.json',
            './LICENSE*'
        ], {base: './'})
        .pipe(gulp.dest('./build'));
});

// css 雪碧图，使用以下标记排除
/* @meta {"spritesheet": {"include": false}} */
gulp.task('sprite', () => {
    return gulp.src('./assets/css/style.css')
        .pipe(spriter({
            includeMode: 'implicit',
            spriteSheet: './build/assets/img/icos.png',
            pathToSpriteSheetFromCSS: '../img/icos.png'
        }))
        .pipe(gulp.dest('./temp/assets/css'));
});

// css 预处理、合并
gulp.task('css', () => {
    return gulp.src([
            './assets/css/neat/neat.min.css',
            './assets/css/base.css',
            './temp/assets/css/style.css'
        ])
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false,
            remove: false
        }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./build/assets/css'));
});

// hbs 处理
gulp.task('hbs', () => {
    return gulp.src('./default.hbs')
        .pipe(processhtml())
        .pipe(gulp.dest('./build'));
});

// clean temp folder
gulp.task('clean:temp', () => {
  return gulp.src('./temp')
    .pipe(rm());
});

// clean build folder
gulp.task('clean:build', () => {
  return gulp.src('./build')
    .pipe(rm());
});

// zip
gulp.task('zip', () => {
  return gulp.src('./build/**/*.*')
    .pipe(zip('flat-ghost.zip'))
    .pipe(gulp.dest('./'));
});


/*
 * Task
 */
// build
gulp.task('build', sequence(['copy', 'sprite'], ['css', 'hbs'], 'clean:temp'));

// pacakge
gulp.task('pkg', sequence('zip', 'clean:temp', 'clean:build'));
