/**
 * Created by mauriciolara on 7/1/16.
 */
(function(){
    'use strict';

    angular.module('myApp').controller('BudgetController', BudgetController);

    //Adding the dependencies
    BudgetController.$inject = ['$stateParams', '$state', 'BudgetService'];

    /**
     * Controller in charge of the handling of the budget view
     * */
    function BudgetController( $stateParams, $state, BudgetService){
        //Setting the reference for the controller context
        var vm = this;

        //Flag for the loading state
        vm.isLoading = true;

        //Getting the reference for the user id
        vm.userId = $stateParams.userId;

        //We first check if the information provided is valid
        if( !vm.userId ){
            alert('¡Debes proporcionar un identificador válido de usuario!');
            return $state.go('home'); //We redirect to the home state
        }

        /**
         * Function in charge of the loading of the budget information
         * */
        vm.requestBudgetLoading = function(){
            /* setting the loading flag for the information */
            vm.isLoading = true;

            /* requesting the budget information */
            BudgetService.obtainUserBudget( vm.userId).then(function( budgetInfo ){
                vm.budget = budgetInfo;
            }).catch(function(){
                alert('Hubo un error al obtener la información de tu presupuesto :C');
            });
        };

        //Requesting the budget the first time
        vm.requestBudgetLoading();

        /**
         * Rounds a number to only two decimal places
         * */
        vm.roundNumber = function( number ){
            return Math.round( number  * 100) / 100;
        }
    }

}());