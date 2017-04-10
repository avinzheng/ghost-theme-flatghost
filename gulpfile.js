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

    // css 雪碧图
    spriter = require('gulp-css-spriter'),

    // css 压缩
    minifyCSS = require('gulp-clean-css'),

    // js 压缩
    minifyJS = require('gulp-uglify'),

    // 文件加 md5 后缀
    rev = require('gulp-rev'),

    // 配合 rev，文件引用路径替换
    revCollector = require('gulp-rev-collector'),

    // html 文件引用合并、删除、替换
    processhtml = require('gulp-processhtml'),

    // 打包 zip
    zip = require('gulp-zip')


// 静态资源复制
gulp.task('copy', function() {
    return gulp.src([
            './assets/img/*.*',
            './assets/screenshot/*.*',
            './partials/*.hbs',
            './*.hbs',
            '!./default.hbs',
            './*.md',
            './*.json',
            './LICENSE*'
        ], {base: './'})
        .pipe(gulp.dest('./build'))
})

// css 雪碧图，使用以下标记排除
/* @meta {"spritesheet": {"include": false}} */
gulp.task('sprite', function() {
    return gulp.src('./assets/css/style.css')
        .pipe(spriter({
            includeMode: 'implicit',
            spriteSheet: './build/assets/img/icos.png',
            pathToSpriteSheetFromCSS: '../img/icos.png'
        }))
        .pipe(gulp.dest('./temp/assets/css'))
})

// css 压缩合并
gulp.task('css', function() {
    return gulp.src([
            './assets/css/neat/neat.css',
            './assets/css/base.css',
            './temp/assets/css/style.css'
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

// js 压缩合并
gulp.task('js', function() {
    return gulp.src('./assets/js/*.js')
        .pipe(minifyJS())
        .pipe(concat('min.js'))
        .pipe(gulp.dest('./temp/assets/js'))
})

// hbs 处理
gulp.task('hbs', function() {
    return gulp.src('./default.hbs')
        .pipe(processhtml())
        .pipe(gulp.dest('./temp'))
})

// 文件加 md5
gulp.task('md5', function() {
    return gulp.src([
            './temp/assets/css/min.css',
            './temp/assets/js/min.js'
        ], {base: './temp/assets'})
        .pipe(rev())
        .pipe(gulp.dest('./build/assets'))
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
gulp.task('clean', function() {
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
    'clean',
    ['copy', 'sprite'],
    ['css', 'hbs', 'js'],
    'md5',
    'changePath',
    'cleanTemp'
))

// 将 build 后的文件打包成 zip 文件
gulp.task('zip', function() {
    return gulp.src('./build/**/*.*')
        .pipe(zip('ghost-theme-flatghost.zip'))
        .pipe(gulp.dest('./'))
})
