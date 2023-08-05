
/* Initialize the main module */
//var btAppAdmin = angular.module('btAppAdmin', ['ui.ace', 'ngAnimate', 'md5', 'ngRoute', 'ngTable', 'multi-select', 'btAutoComplete', 'ngTagsInput', 'ui.sortable', 'ngSanitize', 'colorpicker.module', 'bw.paging', 'angular-timeline', 'ngBootbox', 'ngFileUpload', 'infinite-scroll', 'angularTreeview', 'ngBootstrap', 'ui.select', 'ckeditor', 'capturePlus']);

var btAppAdmin = angular.module('btAppAdmin', ['ngRoute']);
window.app = btAppAdmin;
(function () {
    'use strict';
    /* Initialize the main module */ 
    window.app.constant('BASE_URL', window.location.origin);
    window.app.config(function ($httpProvider) {
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        $httpProvider.interceptors.push(function ($q) {
            return {
                request: function (config) {
                    return config || $q.when(config);
                },
                response: function (response) {
                    return response;
                },
                responseError: function (response) {
                    var responseInfo = {
                        status: response.status,
                        statusText: response.statusText,
                        headers: response.headers && response.headers(),
                        data: response.data,
                        config: response.config
                    };

                    if (response.status === 500) {
                       // alert("Error processing the request. Please try again!\n Error: " + response.statusText)
                       // window.location.href = window.location.origin + '/Common/Error500?eid=' + response.statusText;
                    }
                    return $q.reject(response);
                }
            };
        });
    });
})();