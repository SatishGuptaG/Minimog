var prodLoad = false;
Vue.component("section-domains", {
    template: "#section-domains-template",
    data() {
        return {
            domainList: [],
            domainListStatic: [],
            domainListPopUp: [],
            domainConditions: [],
            domainConditionLoaded: false, 
            hasVariant: false,
            productId: '',
            stockCode: '',
            launchDateToUpdate: "",
            selectedDomainforLaunchDate: "",
            domainforLaunchDate: [],
            sku: '',
            applyOnAllDomain: true,
            formModel: {
                domainName: '',
                isActive: false,
                isVisible: false,
                sellWithoutInventory: false,
                excludeFromShoppingFeed: true,
                warehouse: false,
                inStore: false,
                sortOrder: '',
                launchDate: "",
                availabilityText: '',
                condition: '-1',
                showConditionOnStoreFront: false,
                enableNotifyMe: false
            },
            isDomainsEditDisabled: hasDomainsEditPermission
        }
    },
    props: ['message'],
    async beforeCreate() {
        var self = this;
        if (self.domainList == null || self.domainList == undefined || self.domainList.length == 0 && !prodLoad) {
            //axiosInstance()
            //    .get('ProductEditor/GetDomains') //Domain Conditions
            //    .then(function (response) {
            //        if (self.domainList == null || self.domainList == undefined || self.domainList.length == 0 && !prodLoad) {
            //            self.domainList = response.data;
            //            self.domainListPopUp = response.data; 
            //        }
            //        if (self.domainList != null) {
            //            //Commented for pageload Optimization
            //            ////axiosInstance()
            //            ////    .get('ProductEditor/GetMasterData?type=25&did=' + domainid) //Domain Conditions
            //            ////    .then(function (response) {
            //            ////        var data = response.data.itemType;
            //            ////        self.domainConditions = [];
            //            ////        for (var i = 0; i < data.length; i++) {
            //            ////            var domainConditionObj = new Object();
            //            ////            domainConditionObj.name = data[i].name;
            //            ////            domainConditionObj.value = data[i].value;
            //            ////            self.domainConditions.push(domainConditionObj);
            //            ////        }
            //            ////        self.domainConditionLoaded = true;
            //            ////    });
            //        }
            //    });

        }
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
        EventBus.$on("product.loaded", function (product) {
            var prodLoad = true;
            self.productId = product.id;
            self.stockCode = product.basicInfo.stockCode;
            self.sku = product.identifiers.sku;
            self.domainList = product.domains;
            self.domainVariantList = product.productVariantDomain;

            self.hasVariant = product.basicInfo.hasVariant;
            if (self.domainList != null) {
                var currentDomain = self.domainVariantList.filter(x => { if (x.domainId == domainid) { return x; } });
                 
                self.domainforLaunchDate = JSON.parse(currentDomain[0].groupedDomainsJson);
                self.domains = JSON.parse(currentDomain[0].groupedDomainsJson);
                var domainwiselaunchdate = currentDomain;
                self.launchDateToUpdate = (domainwiselaunchdate[0].launchDate != null && domainwiselaunchdate[0].launchDate != "1900-01-01T00:00:00") ? moment(String(domainwiselaunchdate[0].launchDate)).format('DD-MMM-YYYY @ HH:mm') : "";
                
               // self.domainListStatic = self.domainList;
                self.domainListPopUp = JSON.parse(JSON.stringify(product.domains));
                
                //Commented for pageload Optimization
                ////axiosInstance()
                ////    .get('ProductEditor/GetMasterData?type=25&did=' + domainid) //Domain Conditions
                ////    .then(function (response) {
                ////        var data = response.data.itemType;
                ////        self.domainConditions = [];
                ////        for (var i = 0; i < data.length; i++) {
                ////            var domainConditionObj = new Object();
                ////            domainConditionObj.name = data[i].name;
                ////            domainConditionObj.value = data[i].value;
                ////            self.domainConditions.push(domainConditionObj);
                ////        }
                ////        self.domainConditionLoaded = true;
                ////    });
            }
        });
    },
    methods: {
        getModel: function () {
            var self = this;
            return self.domainList;
        },
        domainDataUpdateModel() {
            var self = this;
            self.$modal.show('domainDataUpdateModel');
        },
        launchDateUpdateModel() {
            var self = this;
            var currentDomain = self.domainVariantList.filter(x => { if (x.domainId == domainid) { return x; } });
             
            self.domains = JSON.parse(currentDomain[0].groupedDomainsJson);
            var domainwiselaunchdate = currentDomain;
            if (domainwiselaunchdate != null && domainwiselaunchdate.length>0) {
                self.launchDateToUpdate = (domainwiselaunchdate[0].launchDate != null && domainwiselaunchdate[0].launchDate != "1900-01-01T00:00:00") ? moment(String(domainwiselaunchdate[0].launchDate)).format('YYYY-MM-DDTHH:mm') : moment().format('YYYY-MM-DDTHH:mm');
            }
            //self.launchDateToUpdate = (domainwiselaunchdate[0].launchDate != null) ? moment(String(domainwiselaunchdate[0].launchDate.split('T')[0])).format('YYYY-MM-DDTh:MM:SS') : "";

            self.$modal.show('launchDateUpdateModel');
        },
        hide() {
            var self = this;
            self.setdata(false);
            self.$modal.hide('domainDataUpdateModel');
        }, 
        hidelaunchDate() {
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
        setdata(updated) {
            var self = this;
            if (updated == false) {
                self.domainListPopUp = JSON.parse(JSON.stringify(self.domainList));
            } else {
                self.domainList = self.domainListPopUp;
            }

            var currentDomain = self.domainVariantList.filter(x => { if (x.domainId == domainid) { return x; } });

            self.domainforLaunchDate = JSON.parse(currentDomain[0].groupedDomainsJson);
            var domainwiselaunchdate = currentDomain;
            if (domainwiselaunchdate != null && domainwiselaunchdate.length > 0) {
                self.launchDateToUpdate = (domainwiselaunchdate[0].launchDate != null && domainwiselaunchdate[0].launchDate != "1900-01-01T00:00:00") ? moment(String(domainwiselaunchdate[0].launchDate)).format('DD-MMM-YYYY @ HH:mm') : "";
            }
        },
        modifyshoppingfeed: function () {
            var self = this; 
        },
        updateDomaindata() {
            var self = this; 
            var productModel = {
                id: self.productId,
                basicInfo: {
                    stockCode: self.stockCode
                }, 
                identifiers: {
                    sku: self.sku
                },
                domains: self.domainListPopUp
            };

            axiosInstancePost()
                .post('ProductEditor/UpdateDomaindata', productModel, axiosConfig)
                .then(function (response) {
                    var data = response.data;
                    successed = true;
                    self.$modal.hide('domainDataUpdateModel');
                    if (data.isValid) {
                        self.setdata(true);
                        Vue.toasted.show(data.message, { type: 'success', duration: 3000, dismissible: true }); 
                    }
                    else {
                        Vue.toasted.show(data.message + ' !!!', { type: 'error', duration: 3000, dismissible: true });
                    }
                })
                .catch(function (error) {
                    var errorMessage = error;
                    self.$modal.hide('domainDataUpdateModel');
                });
        }, updateLaunchdate() {
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