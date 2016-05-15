// import angular dependency
import angular from 'angular';
// import angular ui router dependency
import uirouter from 'angular-ui-router';
// import ng-resource
import ngResource from 'angular-resource';
// import routing
import routing from './home.routes.js';
// import home controller
import HomeController from './home.controller.js';
// import es-enter directive
import esEnter from './enter.directive.js';
// import es capitalize directive
import esCapitalize from './capitalize.directive.js';
// import es-counter component
import esCounter from './counter.component.js';
// import GithubService
import GithubService from './github.service.js';

export default angular.module('app.home', [uirouter, ngResource])
  //set routes
  .config(routing)
  // instantiate HomeController
  .controller('HomeController', HomeController)
  // instantiate esCapitalize Directive
  .directive('esCapitalize', () => new esCapitalize())
  // instantiate esEnter Directive
  .directive('esEnter', () => new esEnter())
  // instantiate esCounter Component
  .component('esCounter', esCounter)
  // instantiate Github Service
  .service('githubService', GithubService)
  // export the module’s name
  .name;
