const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;
const del = require("del");
const sync = require("browser-sync").create();
const ghPages = require('gh-pages');
const path = require('path');

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;


// Images

const images = () => {
  return gulp.src([
    "source/img/**/*.{jpg,png,svg}",
    "!source/img/**/s-*.svg"])
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
}

exports.images = images;


const webpImg = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
}

exports.webpImg = webpImg;


// Sprite

const sprite = () => {
  return gulp.src("source/img/**/s-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;


//Copy

const copy = () => {
  return gulp.src("source/fonts/**/*.{woff,woff2}", {base: "source"})
  .pipe(gulp.dest("build"));
}

exports.copy = copy;


//Clean

const clean = () => {
  return del("build");
}

exports.clean = clean;


//Html

const html = () => {
  return gulp.src("source/*.html")
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest("build"));
}

exports.html = html;


// JS
const compress = () => {
  return pipeline(
    gulp.src("source/js/*.js"),
    uglify(),
    rename({suffix: ".min"}),
    gulp.dest("build/js")
  );
}

exports.compress = compress;


//Deploy

const deploy = (cb) => {
  ghPages.publish(path.join(process.cwd(), './build'), cb);
}

exports.deploy = deploy;


//Build

const build = gulp.series (
  clean,
  html,
  copy,
  styles,
  images,
  webpImg,
  sprite,
  compress,
  deploy
)

exports.build = build;


// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;


// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html", gulp.series("html"));
  gulp.watch("build/*.html").on("change", sync.reload);
  gulp.watch("source/js/**/*.js", gulp.series("compress"));
  gulp.watch("source/img/**/*.svg", gulp.series("sprite"));
}

exports.default = gulp.series(
  build, server, watcher
);
