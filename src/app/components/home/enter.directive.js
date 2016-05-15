export default class esEnter {
  constructor () {
    this.restrict = 'A';
  }

  // directive used to evaluate es-enter attribute on enter keypress
  link (scope, element, attrs) {
    element.bind('keydown keypress', function (event) {
      if (event.which === 13) {
        scope.$apply(function () {
          scope.$eval(attrs.esEnter);
        });

        event.preventDefault();
      }
    });
  }
}
