(function () {
    'use strict';
    /* Service: ReportData
     * Defines the methods related to Reporting data 
     */
    btAppAdmin.factory('ReportData', function ($http, $q, BASE_URL) {
        return {
            getSearchStatistics: function (filter) {
                var deferred = $q.defer();
                $http.post(BASE_URL + '/Search/GetSearchStatistic/', filter).success(deferred.resolve).error(deferred.reject);
                return deferred.promise;
            },
            getLiveStatistics: function (recordId, type) {
                var deferred = $q.defer();
                $http.post(BASE_URL + '/LiveData/GetLiveStatistic/', { recordId: recordId, type: type }).success(deferred.resolve).error(deferred.reject);
                return deferred.promise;
            }
        };
    });


}());