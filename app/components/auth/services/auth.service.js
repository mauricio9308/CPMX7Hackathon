/**
 * Created by mauriciolara on 6/30/16.
 */
(function () {
    'use strict';

    angular.module('myApp').factory('AuthService', AuthService);

    //Setting the dependencies for the service
    AuthService.$inject = ['$localStorage', '$firebaseAuth', '$rootScope', '$q'];

    /**
     * Service in charge of the authentication process of the application
     * */
    function AuthService($localStorage, $firebaseAuth, $rootScope, $q) {


        //Public API
        return {
            loginWithGoogle: loginWithGoogle,
            loginWithFacebook: loginWithFacebook
        };

        /**
         * Login with facebook function
         * */
        function loginWithFacebook() {

        }

        /**
         * Login with google function
         * */
        function loginWithGoogle() {
            // Creation of the google login defer object
            var googleLoginDefer = $q.defer();

            //Creation for the Google Auth Provider
            var provider = new firebase.auth.GoogleAuthProvider();

            /* provider for the firebase authentication */
            firebase.auth().signInWithPopup(provider)
                .then(function (authData) {
                    //We save the google access token from the Firebase API
                    $localStorage.accessToken = authData.credential.accessToken;

                    //We store the user information for the display in the main view
                    $localStorage.user = {
                        displayName: authData.user.displayName,
                        email: authData.user.email,
                        photoURL: authData.user.photoURL,
                        uid: authData.user.uid
                    };

                    /* we proceed with the store of the user information */
                    var ref = firebase.database().ref('/users/' + $localStorage.user.uid);
                    ref.on("value", function (snapshot) {
                        var values = {};
                        if (snapshot.val() != null) {
                            values = snapshot.val();
                        }

                        values.displayName = $localStorage.user.displayName;
                        values.email = $localStorage.user.email;
                        values.photoURL = $localStorage.user.photoURL;

                        firebase.database().ref("/users/" + $localStorage.user.uid).set(values);

                        /* broadcast the user update */
                        $rootScope.$emit('UserAuthenticationChanged');

                        //Setting the
                        googleLoginDefer.resolve( true );
                    }, function (errorObject) {


                        console.log("FATAL: The read failed: " + errorObject.code);
                    });

                    return authData;
                }).catch(function (error) {


                console.log("Authentication failed:", error);
                throw error;
            });

            //Returning the promise for the handling
            return googleLoginDefer.promise;
        }

        /**
         * Just log outs the user of the API
         * */
        function logout() {
            fbAuth.$signOut();
            var logoutDefer = $q.defer();

            /* we destroy any reference of the user */
            $localStorage.$reset();

            /* we delete any firebase reference */
            firebase.auth().signOut().then(function () {
                // Sign-out successful.

                /* broadcast the user update */
                $rootScope.$emit('UserAuthenticationChanged');

                //Resolving the promise
                logoutDefer.resolve();
            }, function (error) {

                // An error happened.
                logoutDefer.reject();
            });

            return logoutDefer.promise;
        }
    }

}(firebase));