# v.thirsty

## A better vegan beer app

More information coming soon...


### Getting started

Pull in npm and bower packages:

- `npm install`

Then add platforms to taste:

- `./node_modules/.bin/cordova platform add ios`
- `./node_modules/.bin/cordova platform add android`

Now you can run it:

- `grunt debug:ios` - runs default grunt tasks then builds and deploys to the iOS Simulator
- `grunt debug:android` - runs default grunt tasks, then builds and deploys to an Android device or VM

The Grunt commands are pretty simple:

- `grunt` - the default, runs 'jshint', 'copy', 'concat', 'handlebars', and 'min'
- `grunt jshint` - lints the js files
- `grunt copy` - copys bower components into `www`
- `grunt concat` - concatenates the files in `./src/**/*.js` to `www/js/v.thirsty.js`
- `grunt min` - minifies the above to `www/js/v.thirsty.min.js`
- `grunt handlebars` - precompiles the handlebars templates in `tpl/*.hbs` to `www/js/templates.js`

