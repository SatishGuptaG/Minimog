(function () {
    'use strict';
    /* Controller: reportCtrl
     * The global controller to manage global features across the site */
    btAppAdmin.controller('reportCtrl', function ($scope, $window, $http, $location, ReportData, $filter, $timeout, $interval, $element) {

        $scope.reportFilter = {};
        $scope.reportFilter.currentPage = 1;
        $scope.visitorsTrendChart = null;
        $scope.revenueTrendChart = null;
        $scope.conversionTrendChart = null;


        $scope.getSearchStatistics = function (intervalType) {
            $scope.reportFilter.intervalType = intervalType;
            
            ReportData.getSearchStatistics($scope.reportFilter).then(function (resp) {
                $scope.searchStats = resp;
                
                $scope.wordCloudData = "";
                angular.forEach(resp.searchedKeywords, function (k) {
                    $scope.wordCloudData = $scope.wordCloudData + (k.keyword + " ").repeat(k.totalSearch);
                });
             
                var myConfig = {
                    type: 'wordcloud',
                    options: {
                        text: $scope.wordCloudData
                    }
                };

                zingchart.render({
                    id: 'wordCloud',
                    data: myConfig,
                    height: 400,
                    width: '100%'
                });
                $scope.showChartStats("chart-area", resp.topSearchedKeywords);
                $scope.showChartStats("keywordsResult", resp.keywordsWithResults);
                $scope.showChartStats("keywordsNoResult", resp.keywordsWithoutResults);
                //$scope.showChartStats("keywordsBest", resp.bestPerformingKeywords);
                //$scope.showChartStats("keywordsWorst", resp.worstPerformingKeywords);
            });
        }
        $scope.showChartStats = function (elementId, statsData) {
            var labels = [], data = [];
            if (statsData) {
                statsData.forEach(k => { labels.push(k.keyword); data.push(k.totalSearch) });
                $scope.renderChart(elementId, labels, data);
            }
        }
        $scope.getLiveStatistics = function (domainId) {
            ReportData.getLiveStatistics().then(function (resp) {
                $scope.liveStats = resp;

                $scope.showLiveChartGraph("content", resp.contents);
                $scope.renderLineChart($scope.visitorsTrendChart, "chartjs-session", '', resp.visitorsGraph);
                $scope.renderLineChart($scope.revenueTrendChart, "chartjs-revenue", '', resp.revenueGraph);
                $scope.renderLineChart($scope.conversionTrendChart, "chartjs-conversion", '', resp.conversionGraph);

            });

        }
        $scope.renderLineChart = function (chart,elementId,label,data) {
                var ctx = document.getElementById(elementId);
                if (chart = null) {
                    //chart.destroy();
                    chart.data.labels = $scope.formatIntervals(1, Object.keys(data.currentTrend))
                    chart.datasets[0].data = Object.values(data.currentTrend);
                    chart.update();
                } else {
                    chart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: $scope.formatIntervals(1, Object.keys(data.currentTrend)),
                            datasets: [
                                {
                                    label: "Today "+label,
                                    data: Object.values(data.currentTrend),
                                    borderColor: "rgb(66, 197, 113)",
                                    lineTension: 0.25,
                                    fill: false

                                }, {
                                    label: "Yesterday"+label,
                                    data: Object.values(data.previousTrend),
                                    borderColor: "rgb(211, 211, 211)",
                                    lineTension: 0.25,
                                    fill: false

                                }
                            ],

                        },
                        options: {
                            maintainAspectRatio: false, responsive: true,
                            animation:null,
                            scales: { yAxes: [{ ticks: { display: true, beginAtZero: true } }] }
                        }
                    });
                }
        }

        $scope.initLiveStatistics = function (domainId) {
            $scope.getLiveStatistics(null);
            $interval($scope.getLiveStatistics, 10000);
        }

        //$scope.showLineChartGraph = function (elementId, statsData) {
        //    var labels = [], data = [];
        //    if (statsData) {
        //        statsData.forEach(k => { labels.push(k.country); data.push(k.totalSession) });
        //        $scope.renderLineChart(elementId, labels, data);
        //    }
        //}
        $scope.showLiveChartGraph = function (elementId, statsData) {
            var labels = [], data = [];
            if (statsData) {
                statsData.forEach(k => { labels.push(k.pageTitle); data.push(k.totalViews) });
                $scope.renderChart(elementId, labels, data);
            }
        }
        //$scope.showBasketStatistic = function (elementId, statsData) {
        //    var labels = ['Active', 'Inactive', 'Abandonded'], data = [];
        //    data.push(statsData.activeBaskets);
        //    data.push(statsData.inactiveBaskets);
        //    data.push(statsData.abandondedBaskets);
        //    //$scope.renderPieChart(elementId, labels, data);
        //    new Chart(document.getElementById(elementId), {
        //        type: "doughnut",
        //        data: {
        //            labels: labels,
        //            datasets: [{
        //                label: "Basket",
        //                data: data,
        //                backgroundColor: ["#b3e4c7", "#dddddd", "#FF0000"]
        //            }]
        //        },
        //        options: {
        //            maintainAspectRatio: false,
        //            responsive: true,
        //            legend: {
        //                position: 'bottom',
        //            },
        //            title: {
        //                display: false,
        //                text: 'Basket'
        //            },
        //            animation: {
        //                animateScale: false,
        //                animateRotate: false 
        //            }
        //        }
        //    });
        //}
        //$scope.renderLineChart = function (elementId, labels, data) {

        //    new Chart(document.getElementById(elementId), {
        //        type: "line",
        //        data: {
        //            labels: labels,
        //            datasets: [{
        //                label: "Region",
        //                data: data,
        //                fill: false,
        //                linetension: 0,
        //                backgroundColor: ["#b3e4c7"]
        //            }]
        //        },
        //        options: {
        //            maintainAspectRatio: false,
        //            responsive: true,
        //            legend: {
        //                display: false,
        //                position: 'bottom',
        //            },
        //            title: {
        //                display: false,
        //                text: 'Region'
        //            },
        //            animation: false
        //        }
        //    });


        //}
        $scope.renderChart = function (elementId, labels, data) {
            if ($scope[elementId] != null)
                $scope[elementId].destroy();
            $scope[elementId] = new Chart(document.getElementById(elementId), {
                type: "horizontalBar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "",
                        data: data,
                        backgroundColor: ["#b3e4c7", "#b3e4c7", "#b3e4c7", "#b3e4c7", "#b3e4c7", "#b3e4c7", "#b3e4c7", "#b3e4c7", "#b3e4c7", "#b3e4c7"]
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    legend: {
                        position: 'bottom',
                        display: false,
                    },
                    title: {
                        display: false,
                        text: 'Top Search Keywords'
                    },
                    animation: false,
                    elements: {
                        rectangle: {
                            borderWidth: 1,
                            borderColor: "rgba(0,0,0,0.5)",
                        }
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                min: 0
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                    }
                }
            });


        }
        $scope.renderPieChart = function (elementId, labels, data) {
            if ($scope[elementId] != null)
                $scope[elementId].destroy();
            $scope[elementId] = new Chart(document.getElementById(elementId), {
                type: "doughnut",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "",
                        data: data,
                        backgroundColor: ["#b3e4c7", "#b3e4c7", "#b3e4c7", "#b3e4c7", "#b3e4c7", "#b3e4c7", "#b3e4c7", "#b3e4c7", "#b3e4c7", "#b3e4c7"]
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: false,
                        text: 'Top Search Keywords'
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    },
                    elements: {
                        rectangle: {
                            borderWidth: 1,
                            borderColor: "rgba(0,0,0,0.5)",
                        }
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                min: 0
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                    }
                }
            });


        }

        $scope.formatIntervals = function (intervalType, intervals) {
            var result = []; var DATE_FORMAT = "YYYY-MM-DD"; var DATETIME_FORMAT = "YYYY-MM-DD HH:mm";
            switch (intervalType) {
                case 1:
                    angular.forEach(intervals, function (item) {
                        if (moment(item, DATETIME_FORMAT).format('HH') == "00") {
                            result.push(moment(item, DATETIME_FORMAT).format('DD MMM HH:00'));
                        }
                        else {
                            result.push(moment(item, DATETIME_FORMAT).format('HH:00'));
                        }
                    });
                    break;
                case 2:
                    angular.forEach(intervals, function (item) {
                        if (item === moment().format(DATE_FORMAT)) {
                            result.push("Today");
                        }
                        else {
                            result.push(moment(item, DATE_FORMAT).format("DD MMM"));
                        }
                    });
                    break;
                case 3:
                    angular.forEach(intervals, function (item) {
                        if (moment(moment().format(DATE_FORMAT)).diff(moment(item, DATE_FORMAT), "days") < 7) {
                            result.push("This Week");
                        }
                        else if (moment(moment().format(DATE_FORMAT)).diff(moment(item, DATE_FORMAT), "days") == 7) {
                            result.push("Last Week");
                        }
                        else {
                            result.push(moment(item, DATE_FORMAT).format("DD MMM"));
                        }
                    });
                    break;
                case 4:
                    angular.forEach(intervals, function (item) {
                        result.push(moment(item, DATE_FORMAT).format("MMM"));
                    });
                    break;
                case 5:
                    angular.forEach(intervals, function (item) {
                        if (moment(item, DATE_FORMAT).format("YYYY") === moment().format("YYYY")) {
                            result.push("This Year");
                        }
                        else if (moment(moment().format("YYYY")).diff(moment(item, DATE_FORMAT).format("YYYY"), "years") == 1) {
                            result.push("Last Year");
                        }
                        else {
                            result.push(moment(item, DATE_FORMAT).format("YYYY"));
                        }
                    });
                    break;
            }
            return result;
        }
    });
}());