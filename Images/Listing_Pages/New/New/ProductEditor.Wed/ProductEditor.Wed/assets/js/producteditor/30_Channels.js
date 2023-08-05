Vue.component("section-channels", {
    template: "#section-channels-template",
    data() {
        return {
            apiChannelList: [],
            manualChannelList: [],
            prodChannelAttrList: [],
            prodAllChannelAttrList: [],
            allChannelColumnName: {},
            channelCode: '',
            attrMsg: '',
            completenessList: [],
            completenessFields: [],
            coreCompletenessFields: [],
            customCompletenessFields: [],
            completedCompletenessFields: [],
            seledtedAttributeLastUpdated: ''
        };
    },
    props: ['message'],
    mounted() {
        var self = this;        
        EventBus.$on("product.loaded", function (product) {
            //console.log(product);
            self.productId = product.id;
            self.stockCode = product.basicInfo.stockCode;
            self.productName = product.basicInfo.name;
            self.productCategory = product.basicInfo.defaultCategory.value;
            self.getChannelList();            
            if (product.completeness != null) {
                //self.completenessList = product.completeness.completeness;
                self.completenessList = [];
                if (product.completeness != null && product.completeness.completeness != null) {
                    for (var n = 0; n < product.completeness.completeness.length; n++) {
                        var valueswithFilesInfo = product.completeness.completeness[n].value.split('~');
                        self.completenessList.push({
                            "key": product.completeness.completeness[n].key,
                            "value": valueswithFilesInfo[0],
                            "lastUpdated": valueswithFilesInfo[1]
                        });
                    }
                }
                console.log(self.completenessList);
            }
        });
    },
    methods: {
        getChannelList: function () {
            var self = this;
            //get channel list
            axiosInstance()
                .get('ProductEditor/GetMappedChannelList?productId=' + encodeURIComponent(self.productId) + '&stockCode=' + encodeURIComponent(self.stockCode))
                .then(function (response) {
                    //console.log(response);
                    if (response.data.apiBasedChannels != null && response.data.apiBasedChannels != null && response.data.apiBasedChannels.length > 0) {
                        for (var i = 0; i < response.data.apiBasedChannels.length; i++) {
                            self.apiChannelList.push(response.data.apiBasedChannels[i]);
                        }
                        for (var i = 0; i < self.apiChannelList.length; i++) {
                            self.apiChannelList[i].channelIcon = '/assets/images/channels/' + self.apiChannelList[i].channelIcon;
                            var formatedDate = moment.utc(self.apiChannelList[i].lastSync).format(dateTimeFormat);
                            self.apiChannelList[i].lastSync = (formatedDate == '01-Jan-0001 00:00') ? '-' : formatedDate;
                            self.apiChannelList[i].productCategory = self.productCategory;
                            self.apiChannelList[i].channelProductName = (self.apiChannelList[i].channelProductName == null) ? self.productName : self.apiChannelList[i].channelProductName;
                            self.apiChannelList[i].channelProductImageUrl = (self.apiChannelList[i].channelProductImageUrl == null || self.apiChannelList[i].channelProductImageUrl == '') ? '' : self.apiChannelList[i].channelProductImageUrl;
                            self.apiChannelList[i].completenessAttributeKey = self.apiChannelList[i].completenessAttribute;
                            self.apiChannelList[i].completenessAttribute = '';
                            for (var j = 0; j < self.completenessList.length; j++) {                                
                                if (self.completenessList[j].key == self.apiChannelList[i].completenessAttributeKey) {                                    
                                    self.apiChannelList[i].completenessAttribute = self.completenessList[j].value + '%';
                                    break;
                                }
                            }
                        }
                    }
                    if (response.data.manualChannels != null && response.data.manualChannels != null && response.data.manualChannels.length > 0) {
                        for (var i = 0; i < response.data.manualChannels.length; i++) {
                            self.manualChannelList.push(response.data.manualChannels[i]);
                        }
                        for (var i = 0; i < self.manualChannelList.length; i++) {
                            self.manualChannelList[i].channelIcon = '/assets/images/channels/' + self.manualChannelList[i].channelIcon;
                            var formatedDate = moment.utc(self.manualChannelList[i].lastSync).format(dateTimeFormat);
                            self.manualChannelList[i].lastSync = (formatedDate == '01-Jan-0001 00:00') ? '-' : formatedDate;
                            self.manualChannelList[i].productCategory = self.productCategory;
                            self.manualChannelList[i].channelProductName = (self.manualChannelList[i].channelProductName == null || self.manualChannelList[i].channelProductName == '') ? self.productName : self.manualChannelList[i].channelProductName;
                            self.manualChannelList[i].channelProductImageUrl = (self.manualChannelList[i].channelProductImageUrl == null) ? '/betterstore/products/ctl-01041b.jpg?fm=webp' : self.manualChannelList[i].channelProductImageUrl ;
                            self.manualChannelList[i].completenessAttributeKey = self.manualChannelList[i].completenessAttribute;
                            self.manualChannelList[i].completenessAttribute = ''; 
                            for (var j = 0; j < self.completenessList.length; j++) {                                                                                               
                                if (self.completenessList[j].key == self.manualChannelList[i].completenessAttributeKey) {
                                    self.manualChannelList[i].completenessAttribute = self.completenessList[j].value + '%';
                                    self.manualChannelList[i].completenessLastUpdated = self.completenessList[j].lastUpdated;
                                    break;
                                }
                            }
                        }
                    }
                    //console.log(self.manualChannelList);
                });
        },
        updateProdChannelMapping: function (channel) {
            var self = this;
            //update product channel mapping
            var data = { channelCode: channel.code, productId: self.productId, stockCode: self.stockCode, channelDomainMappingId: channel.channelDomainMappingId, isExcluded: channel.isExcluded }
                
                axiosInstance()
                    .post('ProductEditor/UpsertProductChannelConfiguration', data)
                    .then(function (response) {
                        Vue.toasted.show('Updated successfully.', { type: 'success', duration: 3000, dismissible: true }); 
                    });
        },
        getProdChannelAttrValue: function (channel) {
            var self = this;
            //Get product channel attributes values
            axiosInstance()
                .get('ProductEditor/GetProductChannelAttributeValues?channelMappingId=' + channel.channelDomainMappingId +'&productId=' + encodeURIComponent(self.productId))
                .then(function (response) {
                    if (response.data != null && response.data.result != null && response.data.result.length > 0) {
                        self.prodChannelAttrList = [];
                        for (var i = 0; i < response.data.result.length; i++) {
                            self.prodChannelAttrList.push(response.data.result[i]);
                        }
                        self.attrMsg = '';
                    } else {
                        self.prodChannelAttrList = [];
                        self.attrMsg = response.data.message;
                    }
                    self.channelCode = channel.channelCode;
                    self.$modal.show('prodChannelAttrValueModel');
                });
        },        
        getProdAllChannelAttrValue: function () {
            var self = this;
            //Get product channel attributes values
            axiosInstance()
                .get('ProductEditor/GetProductAllChannelAttributeValues?productId=' + encodeURIComponent(self.productId))
                .then(function (response) {
                    if (response.data != null && response.data.result != null && response.data.result.length > 0) {
                        for (var i = 0; i < response.data.result.length; i++) {
                            self.prodAllChannelAttrList.push(response.data.result[i]);
                            if(i==0)
                                self.allChannelColumnName = response.data.result[i].channelColumnName;
                        }
                        self.attrMsg = '';
                    } else {
                        self.prodAllChannelAttrList = [];
                        self.attrMsg = response.data.message;
                    }
                    self.$modal.show('prodAllChannelAttrValueModel');
                });
        },
        hide() {
            var self = this;
            self.$modal.hide('prodChannelAttrValueModel');
            self.completenessFields = [];
            self.$modal.hide('completenessModelChannels');
        },
        hideAllChanelModel() {
            var self = this;
            self.$modal.hide('prodAllChannelAttrValueModel');
        },
        showcompletednessmodelchannels(completenessKey, productId) {
            var self = this;
            self.completenessFields = [];
            if (self.completenessList != null) {
                self.$modal.show('app_loader');
                axiosInstance()
                    .get('ProductEditor/GetProductCompletenessDetail?CompletenessAttribute=' + completenessKey + '&ProductId=' + productId)
                    .then(function (response) {
                        var result = JSON.parse(response.data);
                        console.log(result.CompletenessJson);
                        self.completenessFields = JSON.parse(result.CompletenessJson);
                        //for (var i = 0; i < self.completenessList.length; i++) {
                        //    if (self.completenessList[i].key == self.seledtedKey) {
                        //        self.completenessFields = self.completenessList[i].fields;
                        //    }
                        //}

                        self.completenessFields = self.completenessFields.sort(function (a, b) {
                            var x = a["IsCore"]; var y = b["IsCore"];
                            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                        });
                        self.completenessFields = self.completenessFields.sort(function (a, b) {
                            var x = a["FieldName"]; var y = b["FieldName"];
                            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                        });

                        self.customCompletenessFields = self.completenessFields.filter(x => { if (x.IsCore == false) { return x; } });

                        self.coreCompletenessFields = self.completenessFields.filter(x => { if (x.IsCore == true) { return x; } });

                        self.completedCompletenessFields = self.completenessFields.filter(x => { if (x.IsCompleted == true) { return x; } });
                        self.$modal.hide('app_loader');
                        self.$modal.show('completenessModelChannels');
                    });
            }
        },
        //hide() {
        //    var self = this;
        //    self.completenessFields = [];
        //    self.$modal.hide('completenessModelChannels');
        //},
        getModel: function () {
            var result = {
                FieldSet: {
                    key: "",
                    value: ""
                }
            };
            return result;
        }
    }
})