var slantApp = angular.module('slantApp', ['ngMaterial'])
    .config(function($mdThemingProvider) {

        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('teal');
    });
