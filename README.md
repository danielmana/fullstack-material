# kedb

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.3.0.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.

## Publish on heroku

1. Ensure you have a remote to heroku on `dist` folder: `heroku https://git.heroku.com/kedb.git`

2. Run `gulp build` to update the `dist`

3. Run `cd dist` to be on the folder

4. Commit changes and run `git push heroku master`.

## Run mobile app

1. Run `npm install -g cordova` to install [Cordova](https://cordova.apache.org/)

2. On the folder `cordova` run `cordova prepare` to install required platforms and plugins.

3. Build the last version of the app with `gulp build` and open the emulator for Android: `cordova run android`

## Build APK

1. Bump up version on `config.xml` file.

2. Run `cordova build android --release` to create an APK release. You'll need to have generated a `.keystore` file on the same folder to sign Android releases.
