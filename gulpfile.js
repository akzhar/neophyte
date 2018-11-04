"use strict";

var gulp = require("gulp"), //задаем переменные
sass = require("gulp-sass"),
plumber = require("gulp-plumber"),
postcss = require("gulp-postcss"),
jsmin = require("gulp-jsmin"),
autoprefixer = require("gulp-autoprefixer"),
cleanCSS = require("gulp-clean-css"),
imagemin = require("gulp-imagemin"),
imageminSvgo = require('imagemin-svgo'),
imageminJpegRecompress = require('imagemin-jpeg-recompress'),
imageminPngquant = require("imagemin-pngquant"),
cwebp = require('gulp-cwebp'),
rigger = require("gulp-rigger"),
rimraf = require("rimraf"),
gulpStylelint = require('gulp-stylelint'),
server = require("browser-sync").create(),
devip = require('dev-ip'),
rename = require("gulp-rename");

var path = {
    build: { // пути куда складывать готовые после сборки файлы
      html: "docs/", // имя docs для GH pages
      style: "docs/css/",
      js: "docs/js/",
      fonts: "docs/fonts/",
      image: "docs/img/"
    },
    source: { // пути откуда брать исходники для сборки
      html: "src/blocks/*.html", // 1 уровень вложенности - только основные файлы
      style: "src/blocks/*.{scss, sass}", // 1 уровень вложенности - только основной файл
      js: "src/js/**/*.js",
      image: "src/img/**/*.*",
      fonts: "src/fonts/**/*.*"
    },
    clean: "docs" // адрес папки build
  };

devip(); // [ "192.168.1.76", "192.168.1.80" ] or false if nothing found (ie, offline user)

gulp.task("fonts", function () { // задача - вызывается как скрипт из package.json
  gulp.src(path.source.fonts) // источник
  .pipe(gulp.dest(path.build.fonts)) // класть результат сюда
  .pipe(server.stream()) // перезагрузка сборки в браузере
});

gulp.task('lint', function lintCssTask() { // задача - вызывается как скрипт из package.json
  return gulp
    .src(path.source.style) // источник
    .pipe(gulpStylelint({
      reporters: [
      {formatter: 'string', console: true}
      ]
    }));
  });

gulp.task("style", function () { // задача - вызывается как скрипт из package.json
  gulp.src(path.source.style) // источник
    .pipe(plumber()) // отслеживание ошибок - вывод в консоль, не дает прервать процесс
    .pipe(sass().on('error', sass.logError)) // компиляция из препроцессорного кода sass --> css кода
    .pipe(autoprefixer()) // расставление автопрефиксов
    .pipe(gulp.dest(path.build.style)) // класть результат сюда
    .pipe(cleanCSS()) // минификация
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest(path.build.style)) // класть результат сюда
    .pipe(server.stream()) // обновление браузера
  });

gulp.task('js', function () { //задача - вызывается как скрипт из package.json
  gulp.src(path.source.js) // источник
      .pipe(rigger()) // сборка из разных файлов
      .pipe(jsmin()) // минификация
      .pipe(gulp.dest(path.build.js)) // класть результат сюда
      .pipe(server.stream()) // обновление браузера
    });

gulp.task("image", function () { // задача - вызывается как скрипт из package.json
  gulp.src(path.source.image) // источник
  .pipe(imagemin([
    imageminPngquant({ // сжатие png
      quality: '80'
    }),
    imageminJpegRecompress({ // сжатие jpeg
      progressive: true,
      method: 'ms-ssim'
    }),
    imageminSvgo({ // сжатие svg
      plugins: [
      {removeDimensions: true},
      {removeAttrs: true},
      {removeElementsByAttr: true},
      {removeStyleElement: true},
      {removeViewBox: false}
      ]
    })
    ]))
    .pipe(gulp.dest(path.build.image)) // класть результат сюда
    .pipe(server.stream()) // обновление браузера
  });

gulp.task("cwebp", function () { // задача - вызывается как скрипт из package.json
  gulp.src(path.source.image) // источник
  .pipe(cwebp())
  .pipe(gulp.dest(path.build.image)); // класть результат сюда
});

gulp.task("html", function () { // задача - вызывается как скрипт из package.json
  gulp.src(path.source.html) // источник
    .pipe(rigger()) // сборка из разных файлов
    .pipe(gulp.dest(path.build.html)) // класть результат сюда
    .pipe(server.stream()) // обновление браузера
  });

gulp.task("watch", function () { // задача - вызывается как скрипт из package.json
    gulp.watch([path.source.style], function(event, cb) { // отслеживание изменений файлов scss
       gulp.start("style"); // в случае изменений - запуск задачи
     });
    gulp.watch([path.source.image], function(event, cb) { // отслеживание изменений файлов image
        gulp.start("image"); // в случае изменений - запуск задачи
      });
    gulp.watch([path.source.js], function(event, cb) { // отслеживание изменений файлов js
        gulp.start("js"); // в случае изменений - запуск задачи
      });
    gulp.watch([path.source.fonts], function(event, cb) { // отслеживание изменений файлов js
        gulp.start("fonts"); // в случае изменений - запуск задачи
      });
    gulp.watch([path.source.html], function(event, cb) { // отслеживание изменений файлов html
        gulp.start("html"); // в случае изменений - запуск задачи
      });
  });

gulp.task('clean', function (cb) { // задача - вызывается как скрипт из package.json
    rimraf(path.clean, cb); // удаление папки build (предыдущая сборка)
  });

gulp.task ("start",["style", "fonts", "image", "js", "html", "cwebp", "watch"], function() { //задача - вызывается как скрипт из package.json
    server.init({ // перед запуском start запускается рад задач, затем запускается локальный сервер
      server:"docs", // адрес к папке где лежит сборка
      notify: false,
      open: true,
      cors: true,
      host: "192.168.0.91", // дефолтный ip занят virtualbox, задача devip определила запасной ip
      ui: false
    });
  });

