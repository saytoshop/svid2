var gulp = require('gulp');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
cache = require('gulp-cache'); // Подключаем библиотеку кеширования
var imageminJpegoptim = require('imagemin-jpegoptim');
gulp.task('mytask', function() {
    console.log('Привет, я таск!');
});
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});
gulp.task('img', function() {
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin(['app/img/*.jpg'], 'build/images', {
                use: [
                    imageminJpegoptim()
                ]
              })))
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});



gulp.task('autopref', function() {
    return gulp.src('app/css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'));
});
gulp.task('watch', ['browser-sync', 'autopref', 'img'], function() {
    gulp.watch('app/css/*.css', ['autopref', browserSync.reload]); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});
gulp.task('default', ['watch']);

gulp.task('build', [ 'img'], function() {

    var buildCss = gulp.src([ // Переносим библиотеки в продакшен
            'app/css/*.css'
        ])
        .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
        .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));

});
