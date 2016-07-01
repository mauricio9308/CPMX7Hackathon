/**
 * Created by mauriciolara on 6/30/16.
 */
(function(){
    'use strict';

    angular.module('myApp').controller('LoginDialogController', LoginDialogController);

    //Setting the dependencies for the given dialog
    LoginDialogController.$inject = ['$scope', '$mdDialog'];

    /**
     * Setting the Login Controller function
     * */
    function LoginDialogController( $scope, $mdDialog ){
        //Setting the reference for the controller
        var vm = this;


        /**
         * Cancel the login button
         * */
        vm.cancel = function(){
            $mdDialog.cancel();
        };

        /**
         * Login with google button click
         * */
        vm.loginWithGoogle = function(){
            alert('google');
        };

        /**
         * Login with facebook button
         * */
        vm.loginWithFacebook = function(){
            alert('facebook');
        };

    }

}(firebase));