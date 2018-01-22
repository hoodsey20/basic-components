// dev
var gulp = require('gulp'),
gutil = require('gulp-util'),
ftp = require('vinyl-ftp'),
fs = require('fs');

// project data
var sitepath = 'appsweb.styleguide',
ftpData = fs.readFileSync('ftp_access.json', 'utf8'),
parseFtpData = JSON.parse(ftpData);

gulp.task('default', () => {
  console.log(parseFtpData.host, parseFtpData.user, parseFtpData.password);
});

gulp.task('deploy', function () {
  var conn = ftp.create( {
    host: parseFtpData.host,
    user: parseFtpData.user,
    password: parseFtpData.password,
    parallel: 10,
    log: gutil.log
  });

  var globs = [
    'dev/**/*'
  ];

  return gulp.src( globs, { base: '.', buffer: false } )
    // only upload newer files
    // .pipe( conn.newer( sitepath ) ) 
    .pipe( conn.dest( sitepath ) )
    .on('end', function(){ 
      gutil.log('http://frontend.devtbox.ru/'+sitepath+'/dev/index.html') 
    })
});