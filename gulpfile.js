var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    gls = require('gulp-live-server');

gulp.task('default', [
    'sass_btsp',
    'sass_font-aws',
    'sass',
    'js_btsp',
    'js',
    'image',
    'watch',
    'serve'
]);

gulp.task('sass_btsp', function () {
    return gulp.src('public_html/src/vendors/_bootstrap.scss')
            .pipe(concat('bootstrap.min.css'))
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(gulp.dest('public_html/assets/vendors/bootstrap/css'));
});

gulp.task('sass_font-aws', function () {
    return gulp.src('public_html/src/vendors/font-awesome.scss')
            .pipe(concat('font-awesome.min.css'))
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(gulp.dest('public_html/assets/vendors/font-awesome'));
});

gulp.task('sass', function () {
    return gulp.src('public_html/src/sass/**/*.scss')
            .pipe(concat('main.min.css'))
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(gulp.dest('public_html/assets/css'));
});

gulp.task('js_btsp', function () {
    return gulp.src('public_html/src/vendors/bootstrap-js/*.js')
            .pipe(concat('bootstrap.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('public_html/assets/vendors/bootstrap/js'));
});

gulp.task('js', function () {
    return gulp.src('public_html/src/js/**/*.js')
            .pipe(concat('main.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('public_html/assets/js'));
});

gulp.task('image', function () {
    return gulp.src('public_html/src/img/*')
            .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            }))
            .pipe(gulp.dest('public_html/assets/img'));
});

gulp.task('watch', function () {
    
    gulp.watch('public_html/src/vendors/_bootstrap.scss', ['sass_btsp']);
    
    gulp.watch('public_html/src/vendors/font-awesome.scss', ['sass_font-aws']);
    
    gulp.watch('public_html/src/sass/**/*.scss', ['sass']);
    
    gulp.watch('public_html/src/vendors/bootstrap-js/*.js', ['js_btsp']);
    
    gulp.watch('public_html/src/js/**/*.js', ['js']);
    
    gulp.watch('public_html/src/img/*', ['image']);
    
});
gulp.task('serve', function () {
    
    var server = gls.static('./', 8000);
    
    server.start();
    
    gulp.watch('public_html/assets/css/**/*.css', function (file) {
        gls.notify.apply(server, [file]);
    });
    
    gulp.watch('public_html/assets/js/**/*.js', function (file) {
        gls.notify.apply(server, [file]);
    });
    
    gulp.watch('public_html/assets/img/*', function (file) {
        gls.notify.apply(server, [file]);
    });

});
