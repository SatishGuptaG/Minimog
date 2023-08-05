(function () {
    'use strict';
    /* Controller: globalCtrl
     * The global controller to manage global features across the site */
    window.app.controller('globalCtrl', function ($scope, $http) {
        //ToDo need to change jquery code to angular js
        $scope.showSurveyResponse = function (answer) {
         
            var surveyAns = [];           
            surveyAns.push(JSON.parse(answer));
            // console.log(am.surveyAns);
            return surveyAns;
        }
     
    });

}());