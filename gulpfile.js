/** ----------------------------------------------------------------------------
 * @author  Avin Cheng
 * @desc    Build and zip theme flat-ghost.
 * @license MIT
 ** --------------------------------------------------------------------------*/
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const { src, dest, series, parallel } = require('gulp');

/**
 * Gulp Plugins
 */
const concat = require('gulp-concat');
const processHtml = require('gulp-processhtml');
const postCss = require('gulp-postcss');
const minifyJs = require('gulp-uglify');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite')
const zip = require('gulp-zip');

/**
 * PostCSS Plugins
 */
const autoPreFixer = require('autoprefixer');
const url = require('postcss-url');
const cssNano = require('cssnano');

/**
 * Global Variables
 */
const DIST_DIR = './dist/';
const BUILD_DIR = './dist/build/';
const ASSETS_DIR = './dist/build/assets/';
const MANIFEST_FILE = path.join('./dist/rev-manifest.json');

/**
 * Clean Files
 */
function cleanFiles(cb) {
  rimraf(DIST_DIR, cb);
}

/**
 * Copy Files
 */
function copyFiles() {
  return src([
    './*.md',
    './*.json',
    './LICENSE',

    // assets
    './assets/images/*.*',
    './assets/screenshots/*.*',

    // handlebars
    './*.hbs',
    './partials/*.hbs',
    '!./default.hbs'
  ], { base: './' })
    .pipe(dest(BUILD_DIR));
}

/**
 * Process Handlebars
 */
function processHbs() {
  return src('./default.hbs')
    .pipe(processHtml())
    .pipe(dest(BUILD_DIR));
}

/**
 * Process CSS
 */
function processCss() {
  const urlOptions = {
    url: 'inline',
    encodeType: 'base64',
    maxSize: 8 * 1024
  }

  const postCssPlugins = [
    autoPreFixer(),
    url(urlOptions),
    cssNano()
  ];

  return src([
    './assets/libraries/prism/prism.css',
    './assets/css/basic.css',
    './assets/css/global.css',
    './assets/css/screen.css',
    './assets/css/widgets.css',
    './assets/css/mobile.css',
  ], { base: './assets/' })
    .pipe(concat('css/bundle.css'))
    .pipe(postCss(postCssPlugins))
    .pipe(rev())
    .pipe(dest(ASSETS_DIR))
    .pipe(rev.manifest(MANIFEST_FILE, { base: DIST_DIR, merge: true }))
    .pipe(dest(DIST_DIR));
}

/**
 * Process JS
 */
function processJs() {
  return src('./assets/js/*.js', { base: './assets/' })
    .pipe(concat('js/bundle.js'))
    .pipe(minifyJs())
    .pipe(rev())
    .pipe(dest(ASSETS_DIR))
    .pipe(rev.manifest(MANIFEST_FILE, { base: DIST_DIR, merge: true }))
    .pipe(dest(DIST_DIR));
}

/**
 * Rewrite references to assets revisioned by `gulp-rev`
 */
function reWriteRefs() {
  return src(path.join(BUILD_DIR, 'default.hbs'))
    .pipe(revRewrite({ manifest: src(MANIFEST_FILE) }))
    .pipe(dest(BUILD_DIR));
}

/**
 * Zip Theme
 */
// require(./package.json) can run into caching issues
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const filename = packageJson.name + '_v' + packageJson.version + '.zip';

function zipper() {
  return src('./dist/build/**/*.*')
    .pipe(zip(filename))
    .pipe(dest(DIST_DIR));
}

/**
 * Exports
 */
exports.build = series(
  cleanFiles,
  processHbs,
  parallel(copyFiles, processCss, processJs),
  reWriteRefs
);

exports.zip = series(
  cleanFiles,
  processHbs,
  parallel(copyFiles, processCss, processJs),
  zipper
);
