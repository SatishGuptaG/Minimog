var treeData = [];
var categorySelectCount = 0;
 

Vue.component("section-variantbasicinfo", {
    template: "#section-variantbasicinfo-template",
    props: ['message'],
    data() {
        return { 
            formModel: { 
                name: "",
                colorName: "",
                colorCode: "",
                productStatus: "1",
                customFields: [],
                selectedType: emptyChoice, 
                survey: [],
                customFieldData: null,
                productSku: '',
                extendedDescription: null,
                subStatusName: "",
                subStatusId: null,
                lifecycleId: "00000000-0000-0000-0000-000000000000",
            },
            checkforPublish: false,
            domainList: [],
            domainList1: [],
            editStatus: false,
            selectedColorList: [],
            statuses: [],
            custumAttributeId: '',
            attributesGroup: [], 
            allowUpdate: false,
            pimUrl: "",
            setName: "",
            loaded: false,
            useForVariantOnly: false,
            hasVariant: false,
            masterProductId: "",
            masterProductStockCode: "",
            stockCode: '',
            sku: '',
            productBasicInfo: [],
            tagList: [],
            productTags: [],
            tagquery: '',
            productId: '',
            changeLogList: [],
            changeLogfetchInProgress: false,
            changePriceLogList: [],
            lifecycleChangeLogList: [],
            logDataLoaded: false,
            logDataList: [],
            productLifecycleStep: {},
            productChangeLogList: [],
            productLifecycle: {},
            productChangeLog: "",
        };
    },
   
    mounted() {
        if (this.message != null && this.message != undefined) {
            this.formModel = this.message;
        }
        var self = this; 
        EventBus.$on("masterData.loaded", function (masterData) {
            var info = masterData;
                
            var statuses = info.productStatus.itemType;
            self.statuses = [];
            if (statuses.length > 0)
                self.statuses = statuses;
           
            if (self.domainList == null || self.domainList == undefined || self.domainList.length == 0) {
                self.domainList = info.domains;
            }
            if (info.customFields != null) {
                self.formModel.customfields = info.customFields;
                self.formModel.showcustomfields = true;
            }

        });
        self.loadSurvey();
        EventBus.$on("product.loaded", function (product) {
            var info = product.basicInfo; 
            self.productBasicInfo = product.basicInfo;
            self.sku = product.identifiers.sku;
            self.domainList = product.domains;
            self.domainList1 = JSON.parse(JSON.stringify(product.domains));
            self.pimUrl = PimUri;
            self.isProductLoaded = true;
            self.formModel.name = info.name; 
            self.formModel.colorName = info.colorName;
            self.formModel.colorCode = info.colorCode;
            self.productId = product.id;
            self.stockCode = info.stockCode;
            self.formModel.productStatus = info.status;
            self.formModel.productStatusValue = info.status;
            self.formModel.subStatusName = info.subStatusName;
            self.formModel.lifecycleId = product.productLifecycleStep != null ? product.productLifecycleStep.lifecycleId : null;
            if (enableProductFamily && self.formModel.productFamily != '') {
                self.productFamilyLoaded = true;
            }
            if (product.productLifecycleStep != null) {
                self.productLifecycleStep = product.productLifecycleStep

                self.productChangeLog = JSON.stringify(product);
            }

            self.formModel.extendedDescription = info.extendedDescription;
            self.selectedColorList.push({ value: self.formModel.colorCode, text: self.formModel.colorName });
            self.formModel.productSku = (product.identifiers != null) ? product.identifiers.sku : "";
            self.getProductTags();
            if (product.variants != null) {
                for (var i = 0; i < product.variants.length; i++) {
                    var current = product.variants[i];
                    if (current.variantProduct != null) {
                        if (current.variantProduct.isDefault == true) {
                            self.masterProductId = current.variantProduct.id;
                            self.masterProductStockCode = current.variantProduct.stockCode;
                        }
                    }
                }
            }
        });

    },
    async beforeCreate() {
        var self = this; 
        //if (self.domainList == null || self.domainList == undefined || self.domainList.length == 0 && !prodLoad) {

        //    axiosInstance()
        //        .get('ProductEditor/GetDomains') //Domain Conditions
        //        .then(function (response) {
        //             self.domainList = response.data; 
        //        });
        //}
        ////Status
        //var statuses = await axiosInstance()
        //    .get('ProductEditor/GetMasterData?type=36&did=' + domainid)
        //    .then(function (response) {
        //        return response.data.itemType;
        //    });
        //self.statuses = [];
        //if (statuses.length > 0)
        //    self.statuses = statuses;
       
    },
    methods: {
        colorHref: function (id, index) {
            return "#" + id + index.toString();
        },
        collapseNext: function (event) {
            var el = $(event.currentTarget);
            $(el).next().toggleClass("collapse");
        },  
        selectColor: function (question, choice, event) {
            var self = this;
            question.selected = choice.value;
            self.selectedColorList = []
            var el = $(event.currentTarget);
            var panel = el.parent().parent().parent().parent();
            var prev = panel.prev();
            $(".selected-color", prev).css("background-color", choice.value);
            $(".color-widget-text", prev).html("Selected"); 
            self.formModel.colorName = choice.text;
            self.formModel.colorCode = choice.value;
            self.selectedColorList.push({ value: choice.value, text: choice.text }); 
        },
        loadSurvey: function () {
            var self = this; 
            directAxios()
                .get("/MasterData/GetProductColorAttributeInfo")
                .then(function (response) {
                    if (response.data.pages && response.data.pages.length && response.data.pages[0].elements) {
                        //response.data.pages[0].elements.push(mockElement);
                    }
                    if (response.data &&
                        response.data.pages &&
                        response.data.pages.length &&
                        response.data.pages[0] &&
                        response.data.pages[0].elements &&
                        response.data.pages[0].elements.length) {

                        self.formModel.survey = response.data.pages[0].elements;
                    } else {
                        self.formModel.survey = [];
                    }
                    //self.formModel.survey = self.formModel.survey.filter((item) => item.choices != null);
                    if (self.formModel.survey != []) {
                        self.formModel.survey.map((obj, index) => {
                            if (obj.choices != null) {
                                obj.choices.map((choice, index) => {
                                    choice.id = choice.value;
                                    return choice;
                                });
                                obj.selected = [];
                                return obj;
                            }
                        });
                    }
                    if (self.formModel.customFieldData) {
                        self.selectedColorList = [];
                        for (var i = 0; i < self.formModel.customFieldData.length; i++) {
                            var currentValue = self.formModel.customFieldData[i];
                            for (var j = 0; j < self.formModel.survey.length; j++) {
                                var currentSurvey = self.formModel.survey[j];
                                if (currentSurvey.name === currentValue.key) {
                                    if (currentSurvey.type === "color" || currentSurvey.type === "colour") {
                                        for (var k = 0; k < currentSurvey.choices.length; k++) {
                                            var col1 = currentSurvey.choices[k];
                                            var selectedColors = currentValue.value == null ? [] : currentValue.value.split(',');
                                            for (var x = 0; x < selectedColors.length; x++) {
                                                if (col1.value.toLowerCase() === selectedColors[x].toLowerCase()) {
                                                    col1.selected = true;
                                                    currentSurvey.selected.push(col1.value);
                                                    self.selectedColorList.push({ value: col1.value, text: col1.text })
                                                    //break;
                                                }
                                                var colorFound = false;
                                                if (col1.colors) {
                                                    for (var l = 0; l < col1.colors.length; l++) {
                                                        var col2 = col1.colors[l];
                                                        if (col2.value.toLowerCase() === selectedColors[x].toLowerCase()) {
                                                            col2.selected = true;
                                                            colorFound = true;
                                                            currentSurvey.selected.push(col2.value);
                                                            self.selectedColorList.push({ value: col2.value, text: col2.text })
                                                            //break;
                                                        }
                                                    }
                                                }
                                                if (colorFound) {
                                                    break;
                                                }
                                            }
                                        }
                                    } 
                                }
                            }
                        }
                    }
                    self.selectedColorList = self.selectedColorList.splice(-1, 1);
                });
        }, openstatusUpdateModel: function () {
            var self = this;
            for (var i = 0; i < self.domainList.length; i++) {
                if (self.formModel.productStatus == 2 && self.domainList[i].isVisible == true) {
                    self.checkforPublish = true;
                }
            }
            self.$modal.show('statusUpdateModel');
        }, calcelUpdateStatus() {
            var self = this;
            this.$validator.pause();
            self.formModel.productStatus = self.productBasicInfo.status;
            self.checkforPublish = false;
            for (var i = 0; i < self.domainList.length; i++) {
                self.domainList[i].isVisible = self.domainList1[i].isVisible;
            }
            self.$modal.hide('statusUpdateModel');
        }, beforeClose() {
            var self = this;
            this.$validator.pause();
            self.formModel.productStatus = self.productBasicInfo.status;
            self.checkforPublish = false;
            for (var i = 0; i < self.domainList.length; i++) {
                self.domainList[i].isVisible = self.domainList1[i].isVisible;
            }
          //  self.$modal.hide('statusUpdateModel');
        },
        updateStatus: function () {
            var self = this;
            if (self.checkforPublish == false) {
                for (var i = 0; i < self.domainList.length; i++) {
                    self.domainList[i].isVisible = false;
                }
            }

            //Code added for lifecyclestages
            if (self.formModel.subStatusName != "") {
                if (self.productLifecycleStep.toStatus) {
                    const filteredSteps = self.productLifecycleStep.toStatus.filter(x => x.statusName == self.formModel.subStatusName);
                    if (filteredSteps.length > 0) {
                        self.formModel.subStatusId = filteredSteps[0].statusId;
                    }
                }
                else {
                    self.formModel.subStatusId = self.formModel.productStatus;
                    var mainStatus = self.statuses.filter(x => x.value == self.formModel.productStatus)
                    if (mainStatus.length > 0) {
                        self.formModel.subStatusName = mainStatus[0].name;
                    }
                }
            }
            //Code added for lifecyclestages

            var productModel = {
                id: self.productId,
                basicInfo: {
                    stockCode: self.stockCode,
                    status: self.formModel.productStatus,
                    subStatusName: self.formModel.subStatusName,
                    subStatusId: self.formModel.subStatusId,
                    lifecycleId: self.formModel.lifecycleId,
                },
                identifiers: {
                    SKU: self.sku
                }, domains: self.domainList,
                productLifecycleStep: self.productLifecycleStep,        
            };


            //Lifecycle changes
            if (enableLifecycle) {
                try {
                    var oldProdModel = JSON.parse(self.productChangeLog);

                    if (self.productChangeLog != null || self.productChangeLog != '') {
                        const statusChangeJson = {
                            "oldStatusId": oldProdModel.basicInfo.status,
                            "oldSubStatusId": oldProdModel.basicInfo.subStatusId,
                            "oldSubStatusName": oldProdModel.basicInfo.subStatusName,
                            "newStatusId": productModel.basicInfo.status,
                            "newSubStatusId": productModel.basicInfo.subStatusId,
                            "newSubStatusName": productModel.basicInfo.subStatusName,
                        };
                        productModel.StatusChangeLog = JSON.stringify(statusChangeJson);

                        var changelogdetails = compareJSONObjects(oldProdModel, productModel);
                        if (changelogdetails != null || changelogdetails != 'undefined') {
                            productModel.productChangeLog = JSON.stringify(changelogdetails);
                        }
                    }
                }
                catch (ex) {
                    // debugger;
                    // console.log(ex.error);
                }
            }
            //Lifecycle changes

            axiosInstancePost()
                .post('ProductEditor/UpdateStatus', productModel, axiosConfig)
                .then(function (response) {
                    var data = response.data;
                    successed = true;
                    if (data.isValid) {
                        self.editStatus = false;
                        Vue.toasted.show(data.message, { type: 'success', duration: 3000, dismissible: true });
                        window.location.reload();
                    }
                    else {
                        Vue.toasted.show(data.message + ' !!!', { type: 'error', duration: 3000, dismissible: true });
                    }
                })
                .catch(function (error) {
                    var errorMessage = error;
                });
        }, getProductTags: function () {
            var self = this;
            //get tags
            axiosInstance()
                .get('ProductEditor/GetProductTags?productId=' + encodeURIComponent(self.productId))
                .then(function (response) {
                    if (response.data != null && response.data.result != null) {
                        for (var i = 0; i < response.data.result.length; i++) {
                            self.productTags.push(response.data.result[i].tag);
                        }
                    }
                });
        }, getTagsbyFreetext: function (freetext) {
            var self = this;
            //get tags
            axiosInstance()
                .get('ProductEditor/GetTagsbyFreetext?freetext=' + freetext)
                .then(function (response) {
                    if (self.tagquery != '' && response.data.result!=null) {
                        self.tagList = response.data.result;
                    }
                });
        }, addNewTags: function (tag) {
            var self = this;
            self.addTags(tag);
            self.tagquery = '';
            self.tagList = []; 
        }, addTags: function (tag) {
            var self = this;
            self.tagquery = '';
            self.tagList = [];
            axiosInstance()
                .get('ProductEditor/AddProductTag?tag=' + tag + "&productId=" + encodeURIComponent(self.productId))
                .then(function (response) {
                    self.productTags.push(tag);
                });
        },
        removeTag(tag) {
            var self = this;
            var index = self.productTags.indexOf(
                self.productTags.find(item => item == tag)
            );
            axiosInstance()
                .get('ProductEditor/RemoveProductTag?tag=' + tag + "&stockCode=" + self.formModel.stockCode + "&productId=" + encodeURIComponent(self.productId))
                .then(function (response) {
                    self.productTags.splice(index, 1);
                });
        },
        showlogActive() {
            $('body').toggleClass('filter-bar-enabled');
        },
        showlifecyclechangelog() {
            var self = this;
            self.productFormFilterModel = { recordId: self.productId };
            //self.productFormFilterModel.recordId = self.productId;

            if (self.productId != null && self.productId != "" && self.productId != "00000000-0000-0000-0000-000000000000") {
                axiosInstance()
                    .post('ProductEditor/GetProductLifecycleChangeLog', self.productFormFilterModel)
                    .then(function (response) {
                        
                        //self.changeLogfetchInProgress = false;
                        self.lifecycleChangeLogList = response.data;
                    });
            }
        },    
        showlog(logLevel) {
            var self = this;
            $('body').toggleClass('filter-bar-enabled');
            self.productFormFilterModel = { recordId: self.productId, logLevel: logLevel };
            //self.productFormFilterModel.recordId = self.productId;
            //$('body').toggleClass('filter-bar-enabled');
            $('.filter-bar .nav-link').removeClass('active');
            $('.filter-bar .nav-link:eq(0)').addClass('active');
            self.changeLogfetchInProgress = true;
            if (self.productId != null && self.productId != "" && self.productId != "00000000-0000-0000-0000-000000000000") {
                axiosInstance()
                    .post('ProductEditor/GetProductChangeLog', self.productFormFilterModel)
                    .then(function (response) {
                        console.log(response.data);
                        self.changeLogfetchInProgress = false;
                        if (logLevel === 2) {
                            var changeLog = [];
                            for (var i = 0; i < response.data.length; i++) {
                                if (response.data[i].stockCode == self.stockCode) {
                                    changeLog.push(response.data[i]);
                                }
                            }
                            self.changeLogList = changeLog;
                        } else {
                            self.changeLogList = response.data;
                        }
                        
                        self.loadfilters = true;
                        self.showlogdata = true;

                        self.showPriceChangeLogs(logLevel);
                        self.showlifecyclechangelog();
                    });
            }
            else {
                self.showlogdata = false;
            }
        },
        showPriceChangeLogs: function (logLevel) {
            var self = this;
            axiosInstance()
                .post('ProductEditor/GetProductPriceChangeLog', self.productFormFilterModel)
                .then(function (response) {
                    if (logLevel === 2) {
                        var priceLog = [];
                        for (var i = 0; i < response.data.length; i++) {
                            if (response.data[i].stockCode == self.stockCode) {
                                priceLog.push(response.data[i]);
                            }
                        }
                        self.changePriceLogList = priceLog;
                    } else {
                        self.changePriceLogList = response.data;
                    }
                    
                    if (self.changePriceLogList.length > 0) {
                        if (decimalvalues == null || decimalvalues == undefined) {
                            decimalvalues = 0;
                        }
                        self.changePriceLogList.forEach(function (log, index) {
                            var pricingData = JSON.parse(log.pricing);
                            if (Array.isArray(pricingData))
                                log.SellPrice = parseFloat(pricingData[0].SellPrice).toFixed(decimalvalues);
                            else
                                log.SellPrice = parseFloat(pricingData.SellPrice).toFixed(decimalvalues);
                            log.CurrencySymbol = self.currencySymbol;
                            log.ChangeType = log.changeType;
                        });
                    }
                    console.log(self.changePriceLogList);
                });
        },
        showLogModal: function (logData) {
            var self = this;
            self.logDataLoaded = true;
            self.logDataList = logData;
            if (logData.pricing != null) {
                self.logDataList.pricingDetails = JSON.parse(logData.pricing);
            }
            if (logData.attributes != null) {
                self.logDataList.attributesDetails = JSON.parse(logData.attributes);
            } else {
                self.logDataList.attributesDetails = null;
            }
            if (logData.images != null) {
                if (self.isValidJSONString(logData.images)) {
                    self.logDataList.images = JSON.parse(logData.images);

                    for (var i = 0; i < self.logDataList.images.length; i++) {
                        if (!(self.logDataList.images[0].Url.includes('http'))) {
                            self.logDataList.images[0].Url = imageFullUrl + self.logDataList.images[0].Url;
                        }
                    }
                } else if (logData.images.length > 0) {
                    self.logDataList.images = logData.images;
                    for (var i = 0; i < self.logDataList.images.length; i++) {
                        if (!(self.logDataList.images[0].Url.includes('http'))) {
                            self.logDataList.images[0].Url = imageFullUrl + self.logDataList.images[0].Url;
                        }
                    }
                }

                else {
                    self.logDataList.images = null;
                }
            } else {
                self.logDataList.images = null;
            }
            if (logData.comments != null) {
                self.logDataList.comments = logData.comments;
            }
            self.logDataLoaded = true;
            if (self.logDataList.productJson != null && self.logDataList.productJson.SEO != null) {
                self.logDataList.url = self.logDataList.productJson.SEO.url;
            }
            self.$modal.show('showChangeLogsData');
        },
        hideLogModal: function () {
            var self = this;
            self.$modal.hide('showChangeLogsData');
        },
        showLifecycleLogModal: function (logData) {
            var self = this;
            self.productChangeLogList = logData;
            self.$modal.show('showLifecycleLogsData');
        },
        hidelifecycleLogModal: function () {
            var self = this;
            self.$modal.hide('showLifecycleLogsData');
        },
        isValidJSONString: function (str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }
    }
});

//var randomId = function () {
//    var id = Math.random().toString().substring(2, 25);
//    return "temp_" + id;
//};