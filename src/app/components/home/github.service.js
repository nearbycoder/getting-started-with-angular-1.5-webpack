export default class GitHubService {
  constructor ($resource) {
    // a little magic configured at build for production
    // this allows for any dependencies to be injected
    // propery for minification
    'ngInject';

    // create $resource
    var githubService = $resource(
      // endpoint
      'https://api.github.com/users/:username/repos',
      // defaultParam object
      {username: '@username'},
      {
        // The name of action. This name becomes the name of the method 
        // on your resource object.
        'getRepos': {
          // Case insensitive HTTP method (e.g. GET, POST, PUT, DELETE, JSONP, etc).
          method: 'GET',
          // If true then the returned object for this action is an array, see returns section.
          isArray: true
        }
      }
    );
    return githubService;
  }
};
