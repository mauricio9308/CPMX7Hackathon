/**
 * Created by mauriciolara on 7/1/16.
 */
(function () {
    'use strict';

    angular.module('myApp').factory('BudgetService', BudgetService);

    //Declaring the module dependencies
    BudgetService.$inject = ['$q'];

    function BudgetService($q) {

        //Public API
        return {
            obtainUserBudget: obtainUserBudget
        };

        /**
         * Rounds a number to only two decimal places
         * */
        function roundNumber( number ){
            var round = Math.round( number  * 100) / 100;
            return round;
        }

        /**
         * Recovers the user budget
         * */
        function obtainUserBudget(userId) {
            var userBudgetDefer = $q.defer();

            /* we just make a single fetch of the user information */
            firebase.database().ref('/users/' + userId + '/stateInfo').once('value')
                .then(function (snapshot) {
                    //Success obtaining the values of the current user
                    var values = snapshot.val();

                    console.log( values );

                    //Result budget values
                    var buildingSqMeter = values.roomSize.height * values.roomSize.width;

                    var resultValues = {
                        'castles': { count: 4, price: 596 },
                        'roof': { price: roundNumber( 250 * buildingSqMeter ) },
                        'blocks': { price: roundNumber( 110 * buildingSqMeter ) },
                        'floor': { price: roundNumber( 710.49 * buildingSqMeter ) },
                        'sqMeters' : buildingSqMeter,
                        'weeklyIncome': values.weeklyIncome
                    };

                    //Calculating the total price
                    var total = resultValues.castles.price + resultValues.roof.price +
                        resultValues.blocks.price + resultValues.floor.price;

                    //We add the price of the paint to the budget if its considered
                    if( values.isPainted ){
                        resultValues.paint = { price : roundNumber( 1200 * buildingSqMeter ) };
                        total += resultValues.paint.price;
                    }

                    //Setting the total values to the result
                    resultValues.total = total;

                    //We return the values
                    userBudgetDefer.resolve( resultValues );
                }).catch(function () {
                //Error fetching the user information
                userBudgetDefer.reject();
            });

            // Returning the promise for obtaining the budget
            return userBudgetDefer.promise;
        }

    }

}(firebase));