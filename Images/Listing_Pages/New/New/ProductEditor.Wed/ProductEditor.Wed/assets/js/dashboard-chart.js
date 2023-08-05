$(function () {
    var chart = $("#channelActivityChart").dxChart({
        palette: "Blue",
        dataSource: dataSource,
        commonSeriesSettings: {
            type: types[0],
            argumentField: "year"
        },
        commonAxisSettings: {
            grid: {
                visible: false
            }
        },
        margin: {
            bottom: 20
        },
        series: [
            { valueField: "Connection", name: "Connection" },
            { valueField: "Items", name: "Items" },
            { valueField: "MBytes", name: "MBytes" }
        ],
        tooltip: {
            enabled: true
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        "export": {
            enabled: false
        },
        argumentAxis: {
            label: {
                format: {
                    type: "decimal"
                }
            },
            allowDecimals: false,
            axisDivisionFactor: 60
        }       
    }).dxChart("instance");

    $("#types").dxSelectBox({
        dataSource: types,
        value: types[0],
        onValueChanged: function (e) {
            chart.option("commonSeriesSettings.type", e.value);
        }
    });
});

$(function () {
    $("#categoryPie").dxPieChart({
        type: "doughnut",
        palette: "Dark",
        dataSource: category,
        size: {
            height: 100,
            width: 100
        },
        tooltip: {
            enabled: true,
            customizeTooltip: function () {
                return { text: "<strong>" + this.argumentText + "</strong> " + this.seriesName + ": " + this.valueText };
            }
        },
        legend: {
            visible: false,
            horizontalAlignment: "center",
            verticalAlignment: "bottom",
            margin: 0
        },
        "export": {
            enabled: false
        },
        series: [{
            name: "Category",
            argumentField: "region",
            valueField: "val",
            label: {
                visible: false,
                format: "millions",
                connector: {
                    visible: false
                }
            }
        }]
    });
});

$(function () {
    $("#productPie").dxPieChart({
        type: "doughnut",
        palette: "Dark",
        dataSource: products,
        size: {
            height: 100,
            width: 100
        },
        tooltip: {
            enabled: true,
            customizeTooltip: function () {
                return { text: "<strong>" + this.argumentText + "</strong> " + this.seriesName + ": " + this.valueText };
            }
        },
        legend: {
            visible: false,
            horizontalAlignment: "center",
            verticalAlignment: "bottom",
            margin: 0
        },
        "export": {
            enabled: false
        },
        series: [{
            name: "Products",
            argumentField: "region",
            valueField: "val",
            label: {
                visible: false,
                format: "millions",
                connector: {
                    visible: false
                }
            }
        }]
    });
});

$(function () {
    $("#posPie").dxPieChart({
        type: "doughnut",
        palette: "Dark",
        dataSource: pos,
        size: {
            height: 100,
            width: 100
        },
        tooltip: {
            enabled: true,
            customizeTooltip: function () {
                return { text: "<strong>" + this.argumentText + "</strong> " + this.seriesName + ": " + this.valueText };
            }
        },
        legend: {
            visible: false,
            horizontalAlignment: "center",
            verticalAlignment: "bottom",
            margin: 0
        },
        "export": {
            enabled: false
        },
        series: [{
            name: "POS",
            argumentField: "region",
            valueField: "val",
            label: {
                visible: false,
                format: "millions",
                connector: {
                    visible: false
                }
            }
        }]
    });
});

$(function () {
    $("#imagePie").dxPieChart({
        type: "doughnut",
        palette: "Dark",
        dataSource: images,
        size: {
            height: 100,
            width: 100
        },
        tooltip: {
            enabled: true,
            customizeTooltip: function () {
                return { text: "<strong>" + this.argumentText + "</strong> " + this.seriesName + ": " + this.valueText };
            }
        },
        legend: {
            visible: false,
            horizontalAlignment: "center",
            verticalAlignment: "bottom",
            margin: 0
        },
        "export": {
            enabled: false
        },
        series: [{
            name: "Images",
            argumentField: "region",
            valueField: "val",
            label: {
                visible: false,
                format: "millions",
                connector: {
                    visible: false
                }
            }
        }]
    });
});

$(function () {
    $("#filePie").dxPieChart({
        type: "doughnut",
        palette: "Dark",
        dataSource: files,
        size: {
            height: 100,
            width: 100
        },
        tooltip: {
            enabled: true,
            customizeTooltip: function () {
                return { text: "<strong>" + this.argumentText + "</strong> " + this.seriesName + ": " + this.valueText };
            }
        },
        legend: {
            visible: false,
            horizontalAlignment: "center",
            verticalAlignment: "bottom",
            margin: 0
        },
        "export": {
            enabled: false
        },
        series: [{
            name: "File Library",
            argumentField: "region",
            valueField: "val",
            label: {
                visible: false,
                format: "millions",
                connector: {
                    visible: false
                }
            }
        }]
    });
});

var category = [{
    region: "Inactive",
    val: 2
}, {
    region: "Active",
    val: 10
}];

var products = [{
    region: "Draft",
    val: 6
}, {
    region: "Published",
    val: 0
}];

var pos = [{
    region: "POS",
    val: 1
}];

var images = [{
    region: "Inactive",
    val: 43
}, {
    region: "Active",
    val: 124
}];

var files = [{
    region: "Folders",
    val: 1
}];

var dataSource = [{
    year: 1997,
    Connection: 263,
    Items: 226,
    MBytes: 10
}, {
    year: 1999,
    Connection: 169,
    Items: 256,
    MBytes: 66
}, {
    year: 2001,
    Connection: 57,
    Items: 257,
    MBytes: 143
}, {
    year: 2003,
    Connection: 0,
    Items: 163,
    MBytes: 127
}, {
    year: 2005,
    Connection: 0,
    Items: 103,
    MBytes: 36
}, {
    year: 2007,
    Connection: 0,
    Items: 91,
    MBytes: 3
}];

var types = ["spline", "stackedspline", "fullstackedspline"];