/**
 * Created by mauriciolara on 6/30/16.
 */
(function(){
    'use strict';

    angular.module('myApp').controller('HeaderController', HeaderController);

    //Adding the dependencies
    HeaderController.$inject = ['$scope', '$mdSidenav', '$mdMedia', '$mdDialog'];

    /**
     * Controller in charge of the handling of the Header bar
     * */
    function HeaderController( $scope, $mdSidenav, $mdMedia, $mdDialog ){
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
        vm.login = function( ev ){
            //We check if we are going to show the dialog as full screen
            vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

            //Displaying the custom login dialog
            $mdDialog.show({
                    controller: 'LoginDialogController as vm',
                    templateUrl: '/components/auth/views/login.dialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: vm.customFullscreen
                });

            /* we watch to the changes of the resolution for the dialog full screen toggle */
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                vm.customFullscreen = (wantsFullScreen === true);
            });
        };

        /**
         * Toggles the main sidebar
         * */
        vm.toggleSidebar = function(){
            $mdSidenav('main-sidebar').toggle();
        }



    }

}());