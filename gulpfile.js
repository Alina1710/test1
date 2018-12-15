var gulp = require('gulp'), 
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    pug = require('gulp-pug');

gulp.task('sass', function(){ 
    return gulp.src('src/styles/main.scss') 
        .pipe(sass()) 
        .pipe(gulp.dest('src/css')) 
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'src'
            },
        port: 8080,
        notify: false
        });
});    

gulp.task('reload', function(){
    browserSync.reload()
})

gulp.task('pug', function() {
  return gulp.src("src/*.pug")
      .pipe(pug())
      .pipe(gulp.dest("./src"))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('build', [
  'styles', 
  'images',
  'components',
  'modules',
  'pages'

], function() {
    var buildFonts = gulp.src('src/fonts/**/*') 
    .pipe(gulp.dest('build/fonts'))

    var buildJs = gulp.src('src/js/**/*') 
    .pipe(gulp.dest('build/js'));


});

gulp.task('watch', ['browser-sync', 'sass', 'pug'], function() {
   gulp.watch("src/styles/*.scss", ['sass']).on('change', browserSync.reload); 
gulp.watch("src/*.html").on('change', browserSync.reload); 
    gulp.watch('src/js/**/*.js', browserSync.reload);
});