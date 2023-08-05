var prodLoad = false;
Vue.component("section-domainsvariants", {
    template: "#section-domainsvariants-template",
    data() {
        return {
            domainListByOrg: [],
            domainList: [],
            domainConditions: [],
            domains: [],
            productId: '',
            domainConditionLoaded: false,
            launchDateToUpdate: "",
            selectedDomainforLaunchDate: "",
            stockCode: '',
            sku: '',
            status: 0,
            applyOnAllDomain: true,
            domainforLaunchDate: [],
            itemisVisible: true,
            item1isVisible: true,
            itemenableNotifyMe: false,
            item1enableNotifyMe: false,
            itemsellWithoutInventory: false,
            item1sellWithoutInventory: false,
            itemexcludeFromShoppingFeed: false,
            item1excludeFromShoppingFeed: false,
            itempreOrder: false,
            item1preOrder: false,
            itempreOrdermaxStock: false,
            item1preOrdermaxStock: false,
            formModel: {
                domainName: '',
                isActive: false,
                isVisible: false,
                sellWithoutInventory: false,
                excludeFromShoppingFeed: true,
                warehouse: false,
                inStore: false,
                sortOrder: '',
                availabilityText: '',
                condition: '-1',
                showConditionOnStoreFront: false,
                enabled: false,
                shortMessage: "",
                launchDate: "",
                maxStock: "",
            }
        }
    },
    props: ['message'],
    async beforeCreate() {
        var self = this;
        //if (self.domainList == null || self.domainList == undefined || self.domainList.length == 0 && !prodLoad) {
        //    axiosInstance()
        //        .get('ProductEditor/GetDomains') //Domain Conditions
        //        .then(function (response) {
        //            if (self.domainList == null || self.domainList == undefined || self.domainList.length == 0 && !prodLoad) {
        //                self.domainList = response.data;

        //            }
        //            if (self.domainList != null) {
        //                setTimeout(function () {
        //                    if (self.domainList[0].groupedDomainsJson != null) {
        //                        self.domainforLaunchDate = JSON.parse(self.domainList[0].groupedDomainsJson);
        //                        self.resetdata();
        //                        self.domains = JSON.parse(self.domainList[0].groupedDomainsJson);
        //                        self.domains.sort(function (a, b) {
        //                            return a.displayOrder - b.displayOrder;
        //                        });
        //                        var domainwiselaunchdate = self.domains[0];
        //                        self.launchDateToUpdate = (domainwiselaunchdate[0].launchDate != null && domainwiselaunchdate[0].launchDate != "1900-01-01T00:00:00") ? moment(String(domainwiselaunchdate[0].launchDate.split('T')[0])).format('DD-MMM-YYYYTh:mm:ss') :"";

        //                    }
        //                }, 1000);
        //                axiosInstance()
        //                    .get('ProductEditor/GetMasterData?type=25&did=' + domainid) //Domain Conditions
        //                    .then(function (response) {
        //                        var data = response.data.itemType;
        //                        self.domainConditions = [];
        //                        for (var i = 0; i < data.length; i++) {
        //                            var domainConditionObj = new Object();
        //                            domainConditionObj.name = data[i].name;
        //                            domainConditionObj.value = data[i].value;
        //                            self.domainConditions.push(domainConditionObj);
        //                        }
        //                        self.domainConditionLoaded = true;
        //                    });

        //            }
        //        });

        //}
    },
    mounted() {
        var self = this;
        if (this.message != undefined && this.message != null) {
            this.formModel = this.message;
        }
        EventBus.$on("masterData.loaded", function (masterData) {
            var info = masterData;
            if (self.domainList == null || self.domainList == undefined || self.domainList.length == 0 && !prodLoad) {
                self.domainList = info.domains;
            }
        });
        EventBus.$on("preOrder", function (purchasabilityType) {
            if (purchasabilityType != null) {
                if (self.domains != null) {
                    for (var i = 0; i < self.domains.length; i++) {
                        var currobj = self.domains[i]
                        for (var j = 0; j < currobj.length; j++) {
                            if (purchasabilityType == 1) {
                                currobj[j].enabled = true;
                            } else {
                                currobj[j].enabled = false;
                            }
                        }
                        self.domains[i] = currobj;
                    }
                }
            }
        });
        EventBus.$on("product.loaded", function (product) {
            var prodLoad = true;
            self.productId = product.id;
            self.stockCode = product.basicInfo.stockCode;
            self.sku = product.identifiers.sku;
            self.domainListByOrg = product.domains;
            self.domainList = product.productVariantDomain;
            self.domainVariantList = product.productVariantDomain;
            
            self.status = product.basicInfo.status;
             
            if (self.domainList != null) {
                setTimeout(function () {
                    var currentDomain = self.domainVariantList.filter(x => { if (x.domainId == domainid) { return x; } });

                    self.domainforLaunchDate = JSON.parse(currentDomain[0].groupedDomainsJson);
                    self.resetdata();
                    self.domains = JSON.parse(currentDomain[0].groupedDomainsJson);
                    var domainwiselaunchdate = currentDomain;
                    self.launchDateToUpdate = (domainwiselaunchdate[0].launchDate != null && domainwiselaunchdate[0].launchDate != "1900-01-01T00:00:00") ? moment(String(domainwiselaunchdate[0].launchDate)).format('DD-MMM-YYYY @ HH:mm') : "";

                    //below code is for selecting the SelectAll checkbox when alll item is already selected
                    var dom = self.domains[0];
                    if (dom.filter(e => e.isVisible === false).length > 0) {
                        self.itemisVisible = false;
                    }
                    if (dom.filter(e => e.enableNotifyMe === false).length > 0) {
                        self.itemenableNotifyMe = false;
                    }
                    if (dom.filter(e => e.sellWithoutInventory === false).length > 0) {
                        self.itemsellWithoutInventory = false;
                    }
                    if (dom.filter(e => e.enabled === false).length > 0) {
                        self.itempreOrder = false;
                    }
                    if (dom.filter(e => e.excludeFromShoppingFeed === false).length > 0) {
                        self.itemexcludeFromShoppingFeed = false;
                    }
                    if (self.domains.length > 1) {
                        var dom1 = self.domains[1];
                        if (dom1.filter(e => e.isVisible === false).length > 0) {
                            self.item1isVisible = false;
                        }
                        if (dom1.filter(e => e.enableNotifyMe === false).length > 0) {
                            self.item1enableNotifyMe = false;
                        }
                        if (dom1.filter(e => e.sellWithoutInventory === false).length > 0) {
                            self.item1sellWithoutInventory = false;
                        }
                        if (dom1.filter(e => e.enabled === false).length > 0) {
                            self.item1preOrder = false;
                        }
                        if (dom1.filter(e => e.excludeFromShoppingFeed === false).length > 0) {
                            self.item1excludeFromShoppingFeed = false;
                        }
                    }
                    }, 1000);
                for (var i = 0; i < self.domainList.length; i++) { 
                    if (self.domainList[i].isActive == false) {
                        self.domainList[i].sellWithoutInventory = false;
                        self.domainList[i].isVisible = false;
                        self.domainList[i].excludeFromShoppingFeed = false;
                    } 
                }
            }
        });
    },
    methods: {
        getModel: function () {
            var self = this;
            var res = [];
            for (var i = 0; i < self.domains.length; i++) {
                var curr = self.domains[i];
                for (var j = 0; j < curr.length; j++) {
                    var currobj = curr[j];
                    res.push(currobj);
                }
            }
            self.domainList = res;
            return self.domainList;
        },
        modifyshoppingfeed: function () {
            var self = this;
        },
        launchDateUpdateModel() {
            var self = this;
            var domainwiselaunchdate = self.domainforLaunchDate;
            self.launchDateToUpdate = (domainwiselaunchdate[0].launchDate != null && domainwiselaunchdate[0].launchDate != "1900-01-01T00:00:00") ? moment(String(domainwiselaunchdate[0].launchDate)).format('YYYY-MM-DDTHH:mm') : moment().format('YYYY-MM-DDTHH:mm');
            //self.launchDateToUpdate = (domainwiselaunchdate[0].launchDate != null) ? moment(String(domainwiselaunchdate[0].launchDate.split('T')[0])).format('YYYY-MM-DDTh:MM:SS') : "";
            
             self.$modal.show('launchDateUpdateModel');
        },
        changeFlagUpdate: function (model) {
            model.isChanged = true;
            setTimeout(function () {
                if (!model.isActive) {
                    model.isVisible = false;
                }
            }, 500);
           
        },
        setAllPreOrdermaxStock: function (model, completeModel) { 
            completeModel = completeModel.map(function (x) {
                x.maxStock = model;
                return x
            }); 
        },
        setAllExcludeFromShoppingFeed: function (model, completeModel) {
                if (model) {
                    completeModel = completeModel.map(function (x) {
                        x.excludeFromShoppingFeed = false;
                        return x
                    });
                } else if (!model) {
                    completeModel = completeModel.map(function (x) {
                        x.excludeFromShoppingFeed = true;
                        return x
                    });
                }
        },
        setAllPreOrder: function (model, completeModel) { 
                if (model) {
                    completeModel = completeModel.map(function (x) {
                        x.enabled = false;
                        return x
                    });
                } else if (!model) {
                    completeModel = completeModel.map(function (x) {
                        x.enabled = true;
                        return x
                    });
                } 
        },
        setAllEnableNotifyMe: function (model, completeModel) { 
                if (model) {
                    completeModel = completeModel.map(function (x) {
                        x.enableNotifyMe = false;
                        return x
                    });
                } else if (!model) {
                    completeModel = completeModel.map(function (x) {
                        x.enableNotifyMe = true;
                        return x
                    });
                } 
        },
        setAllSellWithoutInventory: function (model, completeModel) { 
                if (model) {
                    completeModel = completeModel.map(function (x) {
                        x.sellWithoutInventory = false;
                        return x
                    });
                } else if (!model) {
                    completeModel = completeModel.map(function (x) {
                        x.sellWithoutInventory = true;
                        return x
                    });
                } 
        },
        setAllVisible: function (model, completeModel) {
            var self = this;
            if (model) {
                completeModel = completeModel.map(function (x) {
                    x.isVisible = false;
                    return x
                });
            } else if (!model) {
                completeModel = completeModel.map(function (x) {
                    if (self.status == 2) {
                        x.isVisible = true;
                        x.isActive = true;
                    } else {
                        setTimeout(function () {
                            model = false;
                            self.itemisVisible = false;
                            self.item1isVisible = false;
                        }, 500);
                    }
                    return x
                });
            }
        },
        setPreOrder: function (model) {
            setTimeout(function () {
                if (model.enabled) {
                    model.sellWithoutInventory = false;
                }
            }, 500);
        },
        hide() {
            var self = this;
            self.setdata();
            self.resetdata()
            self.$modal.hide('launchDateUpdateModel');
        },
        beforeClose() {
            var self = this;
            //if (!successed) {
            //    self.setdata();
            //}
        },
        resetdata() {
            var self = this;
            self.applyOnAllDomain = true;
            for (var i = 0; i < self.domainforLaunchDate.length; i++) {
                var curr = self.domainforLaunchDate[i];
                for (var j = 0; j < curr.length; j++) {
                    var currobj = curr[j];
                    currobj.isActive = false;
                }
            }
        },
        setdata() {
            var self = this;
            var domainwiselaunchdate = self.domains[0];
            self.launchDateToUpdate = (domainwiselaunchdate[0].launchDate != null && domainwiselaunchdate[0].launchDate != "1900-01-01T00:00:00") ? moment(String(domainwiselaunchdate[0].launchDate)).format('DD-MMM-YYYY @ HH:mm') : "";

            //self.launchDateToUpdate = (domainwiselaunchdate[0].launchDate != null && domainwiselaunchdate[0].launchDate != "1900-01-01T00:00:00") ? moment(String(domainwiselaunchdate[0].launchDate.split('T')[0])).format('DD-MMM-YYYYTh:mm:ss') : "";
        },
        updateLaunchdate() {
            var self = this; 
            if (self.launchDateToUpdate == null || self.launchDateToUpdate == "") {
                alert('Launch date should not be empty')
                return false;
            }
            var res = [];
            for (var i = 0; i < self.domainforLaunchDate.length; i++) {
                var curr = self.domainforLaunchDate[i];
                for (var j = 0; j < curr.length; j++) {
                    var currobj = curr[j];
                    if (j == 0) {
                        if (self.applyOnAllDomain) {
                            currobj.isActive = true;
                        }
                    } else {
                        currobj.isActive = false;
                    }
                    currobj.launchDate = self.launchDateToUpdate;
                    res.push(currobj);
                }
            }
            var productModel = {
                id: self.productId,
                basicInfo: {
                    stockCode: self.stockCode
                },
                identifiers: {
                    sku: self.sku
                },
                productVariantDomain: res
            };

            axiosInstancePost()
                .post('ProductEditor/UpdateLaunchDate', productModel, axiosConfig)
                .then(function (response) {
                    var data = response.data;
                    successed = true;
                    self.$modal.hide('launchDateUpdateModel');
                    if (data.isValid) {
                        Vue.toasted.show(data.message, { type: 'success', duration: 3000, dismissible: true });
                        self.resetdata();
                        for (var i = 0; i < self.domains.length; i++) {
                            var curr = self.domains[i];
                            for (var j = 0; j < curr.length; j++) {
                                var currobj = curr[j];
                                currobj.launchDate = self.launchDateToUpdate;
                            }
                        }
                    }
                    else {
                        Vue.toasted.show(data.message + ' !!!', { type: 'error', duration: 3000, dismissible: true });
                    }
                })
                .catch(function (error) {
                    var errorMessage = error;
                    self.$modal.hide('launchDateUpdateModel');
                });
        }
    }
})