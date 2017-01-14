/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, $httpProvider, KeepaliveProvider) {

    // Configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds

    $httpProvider.defaults.headers.common['Authorization'] = "Basic c3RlZmFuQHRyYXZlbGNvaW4uY29tOnBhc3N3b3Jk"

    $urlRouterProvider.otherwise("/prepare/food-mixer");



    $ocLazyLoadProvider.config({
        // Set to true if you w/ant to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

        .state('assets', {
            abstract: true,
            url: "/prepare",
            templateUrl: "views/common/content.html",
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/footable/footable.all.min.js', 'css/plugins/footable/footable.core.css']
                        },
                        {
                            name: 'ui.footable',
                            files: ['js/plugins/footable/angular-footable.js']
                        }
                    ]);
                }
            }
        })
        .state('assets.assets_grid', {
            url: "/food-mixer",
            templateUrl: "views/food-mixer.html",
            data: { pageTitle: 'Mixer' },
            controller: 'AssetController'
        })

        .state('assets.assets_grid_market', {
            url: "/food-mixer-enhanced",
            templateUrl: "views/food-mixer-enhanced.html",
            data: { pageTitle: 'Spicy Up' },
            controller: 'MarketController'
        })

        .state('login', {
            url: "/login",
            templateUrl: "views/responsive-login.html",
            data: { pageTitle: 'Please authenticate', specialClass: 'gray-bg' }
        })

        .state('landing', {
            url: "/landing",
            templateUrl: "views/landing.html",
            data: { pageTitle: 'Landing page', specialClass: 'landing-page' }
        });

}
angular
    .module('inspinia')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
