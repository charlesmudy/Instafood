/**
 * ngGridCtrl - Controller for code ngGrid
 */
function ngGridCtrl($scope) {
    $scope.ngData = [
        {Name: "Moroni", Age: 50, Position: 'PR Menager', Status: 'active', Date: '12.12.2014'},
        {Name: "Teancum", Age: 43, Position: 'CEO/CFO', Status: 'deactive', Date: '10.10.2014'},
        {Name: "Jacob", Age: 27, Position: 'UI Designer', Status: 'active', Date: '09.11.2013'},
        {Name: "Nephi", Age: 29, Position: 'Java programmer', Status: 'deactive', Date: '22.10.2014'},
        {Name: "Joseph", Age: 22, Position: 'Marketing manager', Status: 'active', Date: '24.08.2013'},
        {Name: "Monica", Age: 43, Position: 'President', Status: 'active', Date: '11.12.2014'},
        {Name: "Arnold", Age: 12, Position: 'CEO', Status: 'active', Date: '07.10.2013'},
        {Name: "Mark", Age: 54, Position: 'Analyst', Status: 'deactive', Date: '03.03.2014'},
        {Name: "Amelia", Age: 33, Position: 'Sales manager', Status: 'deactive', Date: '26.09.2013'},
        {Name: "Jesica", Age: 41, Position: 'Ruby programmer', Status: 'active', Date: '22.12.2013'},
        {Name: "John", Age: 48, Position: 'Marketing manager', Status: 'deactive', Date: '09.10.2014'},
        {Name: "Berg", Age: 19, Position: 'UI/UX Designer', Status: 'active', Date: '12.11.2013'}
    ];

    $scope.ngOptions = {data: 'ngData'};
    $scope.ngOptions2 = {
        data: 'ngData',
        showGroupPanel: true,
        jqueryUIDraggable: true
    };
}

/**
 * translateCtrl - Controller for translate
 */
function translateCtrl($translate, $scope) {
    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
    };
}


function UserService($log, sessionFactory) {
    var userService = this;
    var user = {name: ''};
    this.user = {name: ''}
}

var mainController = function AssetController($scope, userService) {
    $scope.userService = userService;
    $scope.username = "stefan@travelcoin.com";
    $scope.password = "password";

    $scope.loginUser = function () {
        var user = sessionFactory.retrieveUserAssets($scope.username, $scope.password);
        $scope.user = user;
        $scope.userService.user = user;
        console.log($scope.userService.user)
    }

}

angular
    .module('inspinia')
    .controller('MainController', mainController)
    .controller('AssetController', function AssetController($scope, userService, sessionFactory) {
        'use strict';
        $scope.userService = userService;

        $scope.assetdata = []


        $scope.loginUser = function () {
            var user = sessionFactory.retrieveUserAssets($scope.username, $scope.password);
            $scope.user = user;
            $scope.userService.user = user;
            console.log($scope.userService.user)
        }

        $scope.assetData = function () {
            sessionFactory.retrieveUserAssets($scope.username, $scope.password).success(function (data) {
                $scope.assetdata = data;
                var total = 0;
                for (var i = 0; i < $scope.assetdata.assets.length; i++) {
                    total = total + $scope.assetdata.assets[i].amount;
                }

                $scope.assetdata.total = total;
            })
        }
        $scope.assetData()

    })
    .controller('ngGridCtrl', ngGridCtrl)
    .controller('translateCtrl', translateCtrl)
    .controller('MarketController', function MarketController($scope, sessionFactory) {
        'use strict';

        $scope.marketdata = []

        $scope.marketData = function () {
            $scope.marketdata = sessionFactory.getMarketData().success(function (data) {
                $scope.marketdata = data
            })
        }

        $scope.marketData()

    })
    .controller('ClaimController', function ClaimController($scope, $state, $http) {
        $scope.providers = [];

        this.init = function () {
            console.log('ClaimController.init()');
            $http({
                method: 'GET',
                url: 'data/providers.js'
            }).then(function (response) {
                $scope.providers = response.data;
            });
        }

        this.init();
    })
    .service('userService', UserService)
    .factory('sessionFactory', function ($http) {

        var factory = {};
        $http.defaults.useXDomain = true;
        $http.defaults.useXDomain = true;

        function genericError(data) {
            console.log(data || "Closing session failed")
        }

        factory.retrieveUserAssets = function (username, password) {
            return $http({
                method: 'GET',
                // url: 'http://travelcoin-api.herokuapp.com/authenticate',
                url: 'data/food.json',
                //url: 'http://localhost:8080/authenticate',
                //data: $.param({email: username}),
                //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });

        };


        factory.getMarketData = function () {
            return $http({
                method: 'GET',
                url: 'data/ingredients.json'
                //url: 'http://localhost:8080/products'
            });
        };

        return factory;
    })
;
