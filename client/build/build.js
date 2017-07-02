require('./check-versions')();

process.env.NODE_ENV = 'production';

var shell = require('shelljs');
var ora = require('ora');
var rm = require('rimraf');
var path = require('path');
var chalk = require('chalk');
var webpack = require('webpack');
var config = require('../config');
var webpackConfig = require('./webpack.prod.conf');


/*
*   Added on: 02/07/2017
*
*   This is for downloading google fonts for using fonts with webpack
*   using plugin: https://github.com/gabiseabra/google-fonts-webpack-plugin
*   this plugin download font files (ttf,otf etc) and make a separate css file in the specified path.
*   I can't bundle that css in my final production webpack css file in another easy way! :( .
*   So now before starting production bundle download fonts and css in client side, import that css
*   in main.js file, boom! the default webpack will handle that css and font files.
 */
var fontPath = path.resolve(__dirname+'/../src/assets/fonts');

var spinner = ora('downloading fonts for production...');
spinner.start();

shell.touch( path.join(fontPath,'/null.js') );
shell.exec('webpack --config build/build-font.js');

spinner.succeed();
console.log();

spinner.text = 'building for production...';
spinner.start();


rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {

  if (err) {
    spinner.fail();
    clearFonts();
    throw err;
  }

  webpack(webpackConfig, function (err, stats) {

    if (err) {
      spinner.fail();
      clearFonts();
      throw err;
    }

    spinner.succeed();
    console.log();

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    console.log(chalk.cyan('  Build complete.\n'));
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ));


    clearFonts();

  });
});



/**
 * remove the client side fonts after successfully build
 */
function clearFonts(){

    spinner.text = 'removing fonts...';
    spinner.start();

    shell.rm('-r', path.join(fontPath,'/*')  );
    shell.touch( path.join(fontPath,'/fonts.css') );

    spinner.succeed();
}