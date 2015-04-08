var fs        = require('fs');
var gulp      = require('gulp');
var pkg       = require('./package.json');
var server    = require('./test/server');
gulp.util     = require('gulp-util');

var scripts = ['*.js', 'test/*.js'];

gulp.task( 'lint', function(){
  return gulp.src( scripts )
    .pipe( require('gulp-jshint')( pkg.jshint || {} ) )
    .pipe( require('gulp-jshint').reporter('default') );
});

gulp.task( 'build-lib', function(){
  return require('browserify')({
      debug: true
    })
    .add('./index.js')
    .bundle()
    .pipe( fs.createWriteStream('./dist/resource.js') );
});

gulp.task( 'build-test', function(){
  return require('browserify')({
      debug: true
    })
    .add('./test/test.js')
    .bundle()
    .pipe( fs.createWriteStream('./dist/test.js') );
});

gulp.task( 'start-test-server', function( done ){
  server.listen( 3011, function( error ){
    if ( error ) throw error;

    gulp.util.log('Server is listening');
    done();
  });
});

gulp.task( 'connect', function(){
  require('gulp-connect').server({
    root: ''
  });
});

gulp.task( 'watch', function(){
  gulp.watch( scripts, ['lint'] );
});

gulp.task( 'default', [ 'lint', 'watch' ] );
gulp.task( 'test', [ 'lint', 'build-test', 'start-test-server', 'connect' ] );