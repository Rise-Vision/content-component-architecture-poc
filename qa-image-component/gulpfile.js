const gulp = require( "gulp" ),
  sass = require( "gulp-sass" ),
  plumber = require( "gulp-plumber" ),
  autoprefixer = require( "gulp-autoprefixer" );

gulp.task( "styles", () => {
  return gulp.src( "scss/main.scss" )
    .pipe( plumber())
    .pipe( sass().on( "error", sass.logError ))
    .pipe( autoprefixer())
    .pipe( gulp.dest( "src/css" ))
});
