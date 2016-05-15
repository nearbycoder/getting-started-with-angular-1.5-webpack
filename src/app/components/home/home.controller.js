export default class HomeController {
  constructor (githubService) {
    // a little magic configured at build for production
    // this allows for any dependencies to be injected
    // propery for minification
    'ngInject';
    // setup githubService to be used on class
    this.githubService = githubService;
  }

  updateGithub () {
    // update repo list with username provided
    this.githubService.getRepos({username: this.user}).$promise.then((results) => {
      this.repos = results;
    });
  }
}
