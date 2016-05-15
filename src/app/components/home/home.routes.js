import templateUrl from 'home/home.html';

export default function routes ($stateProvider) {
  // a little magic configured at build for production
  // this allows for any dependencies to be injected
  // propery for minification
  'ngInject';
  $stateProvider
    .state('base', {
      // set base state url
      url: '/',
      views: {
        'body@': {
          // ES6 Object Literal Property Value Shorthand
          templateUrl,
          // Set controller for view
          controller: 'HomeController',
          // Set controller as for view
          controllerAs: '$ctrl',
          // treats Controllers as Class-like Objects, instantiating them as 
          // constructors and allowing us to namespace them once instantiated,
          bindToController: true
        }
      }
    });
};
