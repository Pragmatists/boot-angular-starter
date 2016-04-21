angular.module('st.app')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('app', {
            url : '/',
            templateUrl : 'app/app/app.tpl.html'
        });

        $urlRouterProvider.otherwise('/');
    });
