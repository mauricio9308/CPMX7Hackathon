(function () {
    'use strict';

    // Declare app level module which depends on views, and components
    var app = angular.module('myApp', [
        'ui.router',
        'ngMaterial'
    ]);

    // Setting the configuration function for the application
    app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', AppConfiguration]);

    /**
     * Configuration function for the Application
     * */
    function AppConfiguration($locationProvider, $stateProvider, $urlRouterProvider) {
        //Setting the application to the html5 mode
        //$locationProvider.html5Mode({
        //    enabled: true
        //});

        $stateProvider.state('home', {
            url: "/",
            templateUrl: "components/core/views/home.html"
        }).state('budget', {
            url: "/budget?userId",
            controller: 'BudgetController as vm',
            templateUrl: "components/core/views/budget.html"
        });

        //Setting the default route for the application
        $urlRouterProvider.otherwise("/");
    }

}());