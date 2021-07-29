const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('gulp-cssnano')
const rev = require('gulp-rev')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin') 
const del = require('del')

gulp.task('css',function(done){
    console.log('minifying css ......')
    gulp.src('./asserts/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('./asserts.css'))

    return gulp.src('./asserts/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/asserts'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/asserts'))
    done()
})

gulp.task('js',function(done){
    console.log('minifying js .......')
    gulp.src('./asserts/**/*.js')
    // .pipe(terser())
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/asserts'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/asserts'))
    done()
})

gulp.task('images',function(done){
    console.log('compressing images .......')
    gulp.src('./asserts/**/*.+(png | jpg | jpeg | svg | gif ')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/asserts'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/asserts'))
    done()
})

//empty the public/asserts directory
gulp.task('clean:asserts',function(done){
    del.sync('./public/asserts')
    done()
})

gulp.task('build',gulp.series('clean:asserts' , 'css' , 'js' , 'images'),function(done){
    console.log('building asserts');
    done();
})