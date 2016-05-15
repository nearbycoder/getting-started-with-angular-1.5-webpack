// import base sass file
import '../style/app.scss';
// import angular dependency
import angular from 'angular';
// import angular ui router dependency
import uirouter from 'angular-ui-router';
// import base routing config
import routing from './app.config';
// import home component
import home from './components/home';

// configure base module app and inject dependencies
angular.module('app', [uirouter, home])
  .config(routing);

