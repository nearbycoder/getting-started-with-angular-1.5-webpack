export default class esCapitalize {
  constructor () {
    // setup directive to attribute only
    this.restrict = 'A';
  }

  link (scope, element) {
    // title case the text of the element
    element.text(toTitleCase(element.text()));
  }
}

// googled function to uppercase the first letter of all words in a string sentence.
function toTitleCase (str) {
  return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};
