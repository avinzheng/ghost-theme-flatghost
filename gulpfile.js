/*================================================
 * @file: 			gulpfile.js
 * @description: 	build
 * @author: 		JeffC
 * @update: 		2017/3/21
 *===============================================*/

var gulp = require('gulp'),

    // 文件删除
    rm = require('gulp-rimraf'),

    // 文件合并
    concat = require("gulp-concat"),

    // 任务队列
    sequence = require('gulp-sequence'),

    // css 属性添加前缀
    autoprefixer = require('gulp-autoprefixer'),

    // css 压缩
    minifyCSS = require('gulp-clean-css'),

    // 文件加 md5 后缀
    rev = require('gulp-rev'),

    // 配合 rev，文件引用路径替换
    revCollector = require('gulp-rev-collector'),

    // html 文件引用合并、删除、替换
    processhtml = require('gulp-processhtml'),

    // 打包 zip
    zip = require('gulp-zip')


// 文件复制
gulp.task('copy', function() {
    return gulp.src([
            './assets/img/*.*',
            './assets/*.*',
            './**/*.hbs',
            '!./default.hbs',
            './*.md',
            './*.json',
            './LICENSE'
        ], {base : './'})
        .pipe(gulp.dest('./build'))
})

// css 处理
gulp.task('css', function() {
    return gulp.src([
            './assets/plugins/neat/neat.css',
            './assets/css/base.css',
            './assets/css/style.css'
        ])
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false,
            remove: false
        }))
        .pipe(minifyCSS())
        .pipe(concat('min.css'))
        .pipe(gulp.dest('./temp/assets/css'))
})

// hbs 处理
gulp.task('hbs', function() {
    return gulp.src('./default.hbs')
        .pipe(processhtml())
        .pipe(gulp.dest('./temp'))
})

// 文件加 md5
gulp.task('md5', function() {
    return gulp.src('./temp/assets/css/min.css')
        .pipe(rev())
        .pipe(gulp.dest('./build/assets/css'))
        .pipe(rev.manifest('manifest.json'))
        .pipe(gulp.dest('./temp'))
})

// 文件路径替换
gulp.task('changePath', function() {
    return gulp.src(['./temp/manifest.json', './temp/default.hbs'])
        .pipe(revCollector())
        .pipe(gulp.dest('./build'))
})

// 清除之前的旧文件
gulp.task('cleanBuild', function() {
    return gulp.src(['./build', './temp'])
        .pipe(rm())
})

// 清除构建时产生的临时文件
gulp.task('cleanTemp', function() {
    return gulp.src('./temp')
        .pipe(rm())
})

// build
gulp.task('default', sequence(
    'cleanBuild',
    ['copy', 'css', 'hbs'],
    'md5',
    'changePath',
    'cleanTemp'
))

// 将 build 后的文件打包成 zip 方便上传从管理后台上传主题
gulp.task('zip', function() {
    return gulp.src('./build/**/*.*')
        .pipe(zip('ghost-theme-flatghost-v0.0.2.zip'))
        .pipe(gulp.dest('./build-zip'))
})
