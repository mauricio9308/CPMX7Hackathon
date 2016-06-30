/**
 * Created by mauriciolara on 6/30/16.
 */
(function(){
    'use strict';

    angular.module('myApp').controller('HeaderController', HeaderController);

    //Adding the dependencies
    HeaderController.$inject = ['$scope', '$mdSidenav'];

    /**
     * Controller in charge of the handling of the Header bar
     * */
    function HeaderController( $scope, $mdSidenav ){
        //Setting the reference for the controller
        var vm = this;

        //Flag for the logged in user
        vm.isUserLoggedIn = false;

        //We listen to the state changes for collapsing the sidebar
        $scope.$on('$stateChangeSuccess', function () {
            vm.toggleSidebar();
        });

        /**
         * Opens the login window for the application
         * */
        vm.goToLogin = function(){
            //TODO
        };

        /**
         * Toggles the main sidebar
         * */
        vm.toggleSidebar = function(){
            $mdSidenav('main-sidebar').toggle();
        }

    }

}());