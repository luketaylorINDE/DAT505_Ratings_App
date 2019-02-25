angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('nAv.rateACar', {
    url: '//page2',
    views: {
      'tab1': {
        templateUrl: 'templates/rateACar.html',
        controller: 'rateACarCtrl'
      }
    }
  })

  .state('nAv.home', {
    url: '//page3',
    views: {
      'tab2': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('nAv.previousRatings', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/previousRatings.html',
        controller: 'previousRatingsCtrl'
      }
    }
  })

  .state('nAv', {
    url: '/page1',
    templateUrl: 'templates/nAv.html',
    abstract:true
  })

  .state('vroomsy', {
    url: '/page6',
    templateUrl: 'templates/vroomsy.html',
    controller: 'vroomsyCtrl'
  })

$urlRouterProvider.otherwise('/page6')

  

});