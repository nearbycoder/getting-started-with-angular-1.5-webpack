import templateUrl from 'home/counter.html';

class controller {
  constructor ($scope) {
    // a little magic configured at build for production
    // this allows for any dependencies to be injected
    // propery for minification
    'ngInject';
    // Get the count from all repos
    // Probably not the best approach for larger github user
    // repo lists as they are paginated.

    // watch is needed to update results after ajax request
    // through github service
    $scope.$watch(angular.bind(this, function () {
      return this.repos;
    }), (newValue, oldValue) => {
      if (newValue) {
        this.count = newValue.length;
      }
    });
  }
}

// Angular 1.5 component requires returning object
// ES6 Object Literal Property Value Shorthand
export default {
  controller,
  templateUrl,
  bindings: {
    repos: '=repos'
  }
};
