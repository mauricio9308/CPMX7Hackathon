/**
 * Created by mauriciolara on 7/2/16.
 */
(function(){
    'use strict';

    angular.module('myApp').factory('GeocoderService', GeocoderService);

    //Injection
    GeocoderService.$inject = ['$q'];

    function GeocoderService($q){

        //Public API
        return {
            getUserCity : getUserCity
        };

        /**
         * Obtains the actual location of the user
         * */
        function getUserCity(){
            //Creating the defer object
            var geocoderDefer = $q.defer();

            /* we request the actual location of the device*/
            navigator.geolocation.getCurrentPosition(function( position ){

            }, function( error ){
                // In error case we still resolve to Guadalajara just in case
                geocoderDefer.resolve('Guadalajara, Jalisco');
            });

            // Returning the promise
            return geocoderDefer.promise;
        }
    }

}());