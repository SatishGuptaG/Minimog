var relatedProductsData = [];

var productData = [
    {
        categoryId: 1,
        products: [
            { id: 1, name: 'product 1' },
            { id: 2, name: 'product 2' },
            { id: 3, name: 'product 3' }
        ]
    },
    {
        categoryId: 2,
        products: [
            { id: 4, name: 'product 3' }
        ]
    },
    {
        categoryId: 3,
        products: [
            { id: 5, name: 'product 1' },
            { id: 6, name: 'product 2' }
        ]
    },
];

var rAutoConfig = "0";
var rManualConfig = "0";

Vue.component("section-related", {
    template: "#section-related-template",
    data() {
        return {
            //autoShow: true,
            relatedProducts: [],
            categoriesLoaded: false,
            searchResultsLoaded: true,
            productSearchResults: null,
            treeData: relatedProductsData,
            treeMode: 'single',
            showCopytovariantConfig:false,
            formModel: {
                relateProducts: true,
                relatedProductConfig: rAutoConfig,
                relatedProducts: [],
                maxNoOfProducts: 1,
                allRelatedProductList:[],
                label: "",
                sortBy: "1",
                ruleType: "-1",
                rulesCount:0,
                relationTypes: "-1",
                manualConfigList: [],
                relatedStockCode: "",
                exclusionRules: false,
                exclusionRuleType: "-1",
                selectedEntity: [],
                exclusionSelectedEntity: [],
                allProductReplacements: [],
                productReplacements: [],
                productVarintGroupCodeReplacements: [],
                replacementProductLevelTypeList: [],
                replacementProductSearchByList: [],
                productListForReplaced :[]
            },
            sortOptionList: [],
            sortOptionListLoaded: false,
            ruleTypeList: [],
            exclusionRuleTypeList: [],
            exclusionRuleTypeListLoaded: false,
            ruleTypeListLoaded: false,
            relationTypesList: [],
            relationTypesListLoaded: false,
            entityList: [],
            exclusionEntityList: [],
            entityListLoaded: false,
            exclusionEntityListLoaded: false,
            entityType: "",
            exclusionEntityType: "",
            displayOrders: [],
            displayOrdersall: [],
            displayOrdersLoaded: false,
            maxProducts: [],
            maxProductsLoaded: true,
            count: 1,
            groupedManualConfigs: [],
            groupedAllManualConfigs:[],
            searchby: 0,
            stockCodesList: [],
            selectedstockCode: '',
            stockquery: '',
            productId: '',
            stockCode:'',
            stockCodeList: [],
            isRelatedProductsEditDisabled: !hasRelatedProductsEditPermission,
            labelBy: 0,
            totalRelatedGroups: 0,
            productForReplaced:''
        }

    },
    props: ['message'],
    mounted() {
        if (this.message != undefined && this.message != null) {
            this.formModel = this.message;
        }

        var self = this;

        for (var i = 1; i <= 10; i++) {
            self.maxProducts.push({ name: i, value: i });
        }
        self.maxProductsLoaded = true;

        //axiosInstance()
        //    .get('ProductEditor/GetMasterData?type=26&did=' + domainid) //RelatedProductAutoRuleTypes
        //    .then(function (response) {
        //        var data = response.data.itemType;
        //        self.ruleTypeList = [{ name: '- Select -', value: '-1' }];
        //        if (data != null)
        //        {
        //            for (var i = 0; i < data.length; i++) {
        //                self.ruleTypeList.push({ name: data[i].name, value: data[i].value });
        //                self.exclusionRuleTypeList.push({ name: data[i].name, value: data[i].value });
        //            }
        //        }
        //        self.ruleTypeListLoaded = true;
        //        self.exclusionRuleTypeListLoaded = true;
        //    });

        //axiosInstance()
        //    .get('ProductEditor/GetMasterData?type=27&did=' + domainid) //RelatedProductTypeCode
        //    .then(function (response) {
        //        var data = response.data.itemType;
        //        self.relationTypesList = [{ name: '- Select -', value: '-1' }];
        //        if (data != null) {
        //            for (var i = 0; i < data.length; i++) {
        //                self.relationTypesList.push({ name: data[i].name, value: data[i].value });
        //            }
        //        }
        //        self.relationTypesListLoaded = true;
        //    });

        //axiosInstance()
        //    .get('ProductEditor/GetMasterData?type=28&did=' + domainid) //RelatedProductSortBy
        //    .then(function (response) {
        //        var data = response.data.itemType;
        //        self.sortOptionList = [];
        //        if (data != null) {
        //            for (var i = 0; i < data.length; i++) {
        //                self.sortOptionList.push({ name: data[i].name, value: data[i].value });
        //            }
        //        }
        //        self.sortOptionListLoaded = true;
        //    });
        EventBus.$on("masterData.loaded", function (masterData) {
            var info = masterData;
            var relatedProductAutoRuleTypes = info.relatedProductAutoRuleTypes.itemType;
            self.ruleTypeList = [{ name: '- Select -', value: '-1' }];
            if (relatedProductAutoRuleTypes != null) {
                for (var i = 0; i < relatedProductAutoRuleTypes.length; i++) {
                    self.ruleTypeList.push({ name: relatedProductAutoRuleTypes[i].name, value: relatedProductAutoRuleTypes[i].value });
                    self.exclusionRuleTypeList.push({ name: relatedProductAutoRuleTypes[i].name, value: relatedProductAutoRuleTypes[i].value });
                }
            }
            self.ruleTypeListLoaded = true;
            self.exclusionRuleTypeListLoaded = true;


            var relatedProductTypeCode = info.relatedProductTypeCode.itemType;
            self.relationTypesList = [{ name: '- Select -', value: '-1' }];
            if (relatedProductTypeCode != null) {
                for (var i = 0; i < relatedProductTypeCode.length; i++) {
                    self.relationTypesList.push({ name: relatedProductTypeCode[i].name, value: relatedProductTypeCode[i].value });
                }
            }
            self.relationTypesListLoaded = true;

            var relatedProductSortBy = info.relatedProductSortBy.itemType;
            self.sortOptionList = [];
            if (relatedProductSortBy != null) {
                for (var i = 0; i < relatedProductSortBy.length; i++) {
                    self.sortOptionList.push({ name: relatedProductSortBy[i].name, value: relatedProductSortBy[i].value });
                }
            }
            self.sortOptionListLoaded = true;

            self.replacementProductLevelTypeList = [];
            var replacementProductLeveltypes = info.replacementProductLevelTypes.itemType;
            if (replacementProductLeveltypes != null) {
                replacementProductLeveltypes = replacementProductLeveltypes.sort(function (a, b) { return a.value - b.value });
                for (var i = 0; i < replacementProductLeveltypes.length; i++) {
                    self.replacementProductLevelTypeList.push({ name: replacementProductLeveltypes[i].name, value: replacementProductLeveltypes[i].value });
                }
            }
            self.replacementProductSearchByList = [];
            var replacementproductSerachBy = info.replacementProductSearchBy.itemType;
            if (replacementproductSerachBy != null) {
                for (var i = 0; i < replacementproductSerachBy.length; i++) {
                    self.replacementProductSearchByList.push({ name: replacementproductSerachBy[i].name, value: replacementproductSerachBy[i].value });
                }
            }

        });
        EventBus.$on("product.loaded", function (product) {
            self.productId = product.id;
            self.stockCode = product.basicInfo.stockCode;
            self.productForReplaced = product.basicInfo.stockCode;
            self.productCode = product.identifiers.sku;
            var info = product.relatedProducts;
            if (info != null) {
                self.displayOrders = [];
                self.formModel.relateProducts = !info.showRelatedProducts;
                self.formModel.ruleType = (info.isAuto == true) ? info.realtedProductConfig.ruleType : '-1';
                self.formModel.sortBy = (info.sortBy != 0) ? info.sortBy : 1;
                self.formModel.maxNoOfProducts = (info.maxProducts != 0) ? info.maxProducts : 1;
                self.formModel.manualConfigList = (info.relatedProduct != null) ? info.relatedProduct : [];
                self.formModel.rulesCount = (info.realtedProductConfig != null) ? 1 :0;
                //self.formModel.manualConfigList.sort(function (a, b) {
                //    return a.displayOrder - b.displayOrder || a.stockCode.localeCompare(b.stockCode);
                //});
                for (var i = 1; i <= self.formModel.manualConfigList.length; i++) {
                    var obj = self.formModel.manualConfigList[i - 1];
                    var displayIndex = i;
                    if (obj.displayOrder == 0) {
                        self.formModel.manualConfigList[i - 1].displayOrder = displayIndex;
                    }
                    else if (obj.displayOrder > self.formModel.manualConfigList.length) {
                        displayIndex = obj.displayOrder;
                        self.formModel.manualConfigList[i - 1].displayOrder = displayIndex;
                        var missinIndexFrom = obj.displayOrder - self.formModel.manualConfigList.length;
                        for (var i2 = missinIndexFrom; i2 < obj.displayOrder; i2++) {
                            if (self.displayOrders.find(item => item.value == i2) == null) {
                                self.displayOrders.push({ name: i2, value: i2 });
                            }
                            
                        }
                    }
                    self.displayOrders.push({ name: displayIndex, value: displayIndex });
                }
                self.displayOrdersLoaded = true;
                self.count = self.formModel.manualConfigList.length + 1;


                setTimeout(function () {
                    if ((self.formModel.manualConfigList == null || self.formModel.manualConfigList.length == 0) && info.isAuto == true) {
                        self.formModel.relatedProductConfig = 1;
                        var autoConfig = document.getElementById("autoConfig");
                        var manualConfig = document.getElementById("manualConfig");
                        if (autoConfig != null && manualConfig != null) {
                            document.getElementById("manualConfig").className = 'nav-link';
                            document.getElementById("autoConfig").className = 'nav-link active';
                        }
                    }
                }, 3000);
                
                //redo grouping
               // self.groupingManualList();
                self.showAllRelatedproductmodel();
            }
            self.showAllProductReplacementmodel();
            var varints = product.variants;
            if (varints != null) {
                self.formModel.productVarintGroupCodes = [];
                for (var i = 0; i < product.variants.length; i++) {
                    var obj = product.variants[i].variantProduct;
                    if (!obj.isDefault && self.formModel.productVarintGroupCodes.find(item => item.productVariantGroupCode == obj.productVariantGroupCode) == null) {
                        var productVariantObj = {
                            isActive: obj.isActive,
                            isDefault: obj.isDefault,
                            productVariantGroupCode: obj.productVariantGroupCode,
                        };
                        self.formModel.productVarintGroupCodes.push(productVariantObj);
                    }
                }
            }


        });
    },
    methods: {
        addRelatedProduct: function (productId) {
            var self = this;

            if (self.formModel.relatedProducts.find(item => item.id == productId) != null) {
                return;
            }

            var product = self.productSearchResults.find(item => item.recordId == productId);
            if (product != null) {

                self.formModel.relatedProducts.push(product);
            }
        },

        removeRelatedProduct: function (productId) {
            var index = this.formModel.relatedProducts.indexOf(
                this.formModel.relatedProducts.find(item => item.recordId == productId)
            );
            this.formModel.relatedProducts.splice(index, 1);
        },

        doProductSearch: function (categoryId) {
            this.searchResultsLoaded = false;
            //console.log(categoryId);

            var self = this;
            axiosInstance()
                .get('ProductEditor/GetMasterData?type=29&did=' + domainid + '&parentId=' + categoryId)
                .then(function (response) {
                    self.productSearchResults = [];
                    var products = response.data.items;
                    if (products != null) {
                        if (products.length > 0) {
                            for (var i = 0; i < products.length; i++) {
                                var item = products[i];
                                self.productSearchResults.push({
                                    recordId: item.recordId,
                                    fullName: item.name,
                                    stockCode: item.code,
                                    name: item.name.length <= 30 ?
                                        item.name :
                                        item.name.substring(0, 27) + "..."
                                });
                            }
                        }
                        self.searchResultsLoaded = true;
                    }
                    //console.log(self.productSearchResults);
                });
        },

        show() {
            var self = this;
            self.$modal.show('addRelatedItemsModal');
        },

        hide() {
            var self = this;
            self.$modal.hide('addRelatedItemsModal');
        },
        showAllRelatedproductmodel: function () {
            var self = this;
            self.showAllRelatedproducts();
            self.formModel.allRelatedProductList = [];
            self.groupedAllManualConfigs = [];
        },

        hideAllRelatedproduct() {
            var self = this;
            self.$modal.hide('allRelatedItemsModal');
        }, 
        showAllRelatedproducts: function () {
            var self = this; 
            axiosInstance()
                .get('ProductEditor/GetAllRelatedProduct?productId=' + self.productId)
                .then(function (response) {
                    self.formModel.allRelatedProductList = (response.data != null) ? response.data : [];
                    self.displayOrdersAll = [];
                    self.groupingAllManualList(); 
                   // self.$modal.show('allRelatedItemsModal');

                    for (var i = 1; i <= self.formModel.allRelatedProductList.length; i++) {
                        var obj = self.formModel.allRelatedProductList[i - 1];
                        var displayIndex = i;
                        if (obj.displayOrder == 0) {
                            self.formModel.allRelatedProductList[i - 1].displayOrder = displayIndex;
                        }
                        else if (obj.displayOrder > self.formModel.allRelatedProductList.length) {
                            displayIndex = obj.displayOrder;
                            self.formModel.allRelatedProductList[i - 1].displayOrder = displayIndex;
                            var missinIndexFrom = obj.displayOrder - self.formModel.allRelatedProductList.length;
                            for (var i2 = missinIndexFrom; i2 < obj.displayOrder; i2++) {
                                if (self.displayOrdersAll.find(item => item.value == i2) == null) {
                                    self.displayOrdersAll.push({ name: i2, value: i2 });
                                }

                            }
                        }
                        self.displayOrdersAll.push({ name: displayIndex, value: displayIndex });
                    }
                });
        },
        confirmationModalShow(value, text, source) {
            var self = this;
            self.$modal.show('dialog', {
                title: 'Confirmation !',
                text: 'Are you sure you want to delete ' + text + ' from related products?',
                buttons: [
                    {
                        title: 'Yes',
                        class: 'btn btn-danger',
                        handler: () => { 
                            axiosInstance()
                                .post("ProductEditor/RemoveRelatedProduct/?productId=" + encodeURIComponent(self.productId) + "&relatedProductId=" + value.relatedProd.key)
                                .then(function (response) {
                                    if (response.data.isValid) {
                                        Vue.toasted.show(response.data.message, { type: 'success', duration: 3000, dismissible: true });
                                    }
                                    else {
                                        Vue.toasted.show(response.data.message + ' !!!', { type: 'error', duration: 3000, dismissible: true });
                                    }
                                    if (source == 1) {
                                        self.removefromAllManualConfig(value);
                                    }
                                    else {
                                        self.removefromManualConfig(value);
                                    }
                                });
                            self.$modal.hide('dialog')
                        }
                    },
                    {
                        title: 'No'
                    }
                ]
            })
        },

        beforeOpen() {
            var self = this;
            axiosInstance()
                .get('ProductEditor/GetMasterData?type=3&did=' + domainid) //Category
                .then(function (response) {
                    var data = response.data.items;
                    if (data != null) {
                        for (var i = 0; i < data.length; i++) {
                            var item = toCategory(data[i]);
                            relatedProductsData.push(item);
                        }
                    }
                    self.categoriesLoaded = true;
                });
        },

        addRelatedItem() {
            var a = this.$validator.validateAll();
            var self = this;
            //self.formModel.manualConfigList = [];
            self.count = self.formModel.manualConfigList.length + 1;
            for (var i = 0; i < self.formModel.relatedProducts.length; i++) {
                var currRelProd = self.formModel.relatedProducts[i];
                var obj = {
                    relationType: self.formModel.relationTypes,
                    label: self.formModel.label,
                    relatedProd: { key: currRelProd.recordId, value: currRelProd.stockCode },
                    displayOrder: self.count,
                    copyToVariant:true
                };
                self.formModel.manualConfigList.push(obj);
                //self.formModel.relatedproductsToAdd.push(obj);

                var result = self.formModel.manualConfigList.reduce((unique, o) => {
                    if (!unique.some(obj => obj.relationType === o.relationType && obj.relatedProd.key == o.relatedProd.key)) {
                        unique.push(o);
                    }
                    return unique;
                }, []);
                self.displayOrders.push({ name: self.count, value: self.count });
                self.count = self.count + 1;
            }
            //redo grouping
            self.groupingManualList();
            self.displayOrdersLoaded = true;
            self.formModel.relationTypes = '-1';
            self.formModel.label = '';
            self.formModel.relatedProducts = [];
            self.showCopytovariantConfig = true;
            self.hide();
        },
        removefromManualConfig(config) {
            var self = this;
            var index = self.formModel.manualConfigList.indexOf(
                self.formModel.manualConfigList.find(item => item.relationType == config.relationType && item.label == config.label && item.relatedProd.value == config.relatedProd.value && item.displayOrder == config.displayOrder)
            );
            self.formModel.manualConfigList.splice(index, 1); 

            //var indextodelete = self.formModel.relatedproductsToAdd.indexOf(
            //    self.formModel.relatedproductsToAdd.find(item => item.relationType == config.relationType && item.label == config.label && item.relatedStockCode == config.relatedStockCode && item.displayOrder == config.displayOrder)
            //); 
            //self.formModel.relatedproductsToAdd.splice(indextodelete, 1);
            //redo grouping
            self.groupingManualList();
            //Reset display Order
            for (var i = 0; i < self.formModel.manualConfigList.length; i++) {
                var listItem = self.formModel.manualConfigList[i];
                var index = self.formModel.manualConfigList.indexOf(
                    self.formModel.manualConfigList.find(item => item.relationType == listItem.relationType && item.label == listItem.label && item.relatedProd.value == listItem.relatedProd.value && item.displayOrder == listItem.displayOrder)
                );
                listItem.displayOrder = index + 1;
            }

            var indexDO = self.displayOrders.indexOf(
                self.displayOrders.find(item => item.value == config.displayOrder && item.name == config.displayOrder)
            );
            self.displayOrders.splice(indexDO, 1);

            //Reset Display Order
            for (var i = 0; i < self.displayOrders.length; i++) {
                var doItem = self.displayOrders[i];
                var index = self.displayOrders.indexOf(
                    self.displayOrders.find(item => item.name == doItem.name && item.value == doItem.value)
                );
                doItem.name = index + 1;
                doItem.value = index + 1;
            }
            self.count = self.displayOrders.length + 1;
        },

        removefromAllManualConfig(config) {
            var self = this;
            var index = self.formModel.allRelatedProductList.indexOf(
                self.formModel.allRelatedProductList.find(item => item.relationType == config.relationType && item.label == config.label && item.relatedProd.value == config.relatedProd.value && item.displayOrder == config.displayOrder)
            );
            self.formModel.allRelatedProductList.splice(index, 1);
            //redo grouping
            self.groupingAllManualList();
            //Reset display Order
            for (var i = 0; i < self.formModel.allRelatedProductList.length; i++) {
                var listItem = self.formModel.allRelatedProductList[i];
                var index = self.formModel.allRelatedProductList.indexOf(
                    self.formModel.allRelatedProductList.find(item => item.relationType == listItem.relationType && item.label == listItem.label && item.relatedStockCode == listItem.relatedStockCode && item.displayOrder == listItem.displayOrder)
                );
                listItem.displayOrder = index + 1;
            }

            var indexDO = self.displayOrdersall.indexOf(
                self.displayOrdersall.find(item => item.value == config.displayOrder && item.name == config.displayOrder)
            );
            self.displayOrdersall.splice(indexDO, 1);

            //Reset Display Order
            for (var i = 0; i < self.displayOrdersall.length; i++) {
                var doItem = self.displayOrdersall[i];
                var index = self.displayOrdersall.indexOf(
                    self.displayOrdersall.find(item => item.name == doItem.name && item.value == doItem.value)
                );
                doItem.name = index + 1;
                doItem.value = index + 1;
            }
            self.count = self.displayOrdersall.length + 1;
        },

        getEntityDetails(ruleType) {
            var self = this;
            self.entityList = [];
            switch (ruleType) {
                case "5":
                    self.entityType = 'Sub Brand';
                    axiosInstance()
                        .get('ProductEditor/GetMasterData?type=30&did=' + domainid) //Sub Brand
                        .then(function (response) {
                            var data = response.data.items;
                            if (data != null) {
                                for (var i = 0; i < data.length; i++) {
                                    self.entityList.push({ text: data[i].name, id: data[i].recordId });
                                }
                            }
                            self.entityListLoaded = true;
                        });
                    break;
                case "6":
                    self.entityType = 'Brand';
                    axiosInstance()
                        .get('ProductEditor/GetMasterData?type=1&did=' + domainid) //Brand
                        .then(function (response) {
                            var data = response.data.items;
                            if (data != null) {
                                for (var i = 0; i < data.length; i++) {
                                    self.entityList.push({ text: data[i].name, id: data[i].recordId });
                                }
                            }
                            self.entityListLoaded = true;
                        });
                    break;
                case "7":
                    self.entityType = 'Root Category';
                    axiosInstance()
                        .get('ProductEditor/GetMasterData?type=3&did=' + domainid) //Root Category
                        .then(function (response) {
                            var data = response.data.items;

                            for (var i = 0; i < data.length; i++) {
                                self.entityList.push({ text: data[i].name, id: data[i].recordId });
                            }
                            self.entityListLoaded = true;
                        });
                    break;
                case "8":
                    self.entityType = 'Sub Category';
                    axiosInstance()
                        .get('ProductEditor/GetMasterData?type=31&did=' + domainid) //Sub Category
                        .then(function (response) {
                            var data = response.data.items;

                            for (var i = 0; i < data.length; i++) {
                                self.entityList.push({ text: data[i].name, id: data[i].recordId });
                            }
                            self.entityListLoaded = true;
                        });
                    break;
                default:
                    break;
            }
            self.entityListLoaded = true;
        },

        getExclusionEntityDetails(ruleType) {
            var self = this;
            self.exclusionEntityList = [];
            switch (ruleType) {
                case "5":
                    self.exclusionEntityType = 'Sub Brand';
                    axiosInstance()
                        .get('ProductEditor/GetMasterData?type=30&did=' + domainid) //Sub Brand
                        .then(function (response) {
                            var data = response.data.items;
                            if (data != null) {
                                for (var i = 0; i < data.length; i++) {
                                    self.exclusionEntityList.push({ text: data[i].name, id: data[i].recordId });
                                }
                            }
                            self.exclusionEntityListLoaded = true;
                        });
                    break;
                case "6":
                    self.exclusionEntityType = 'Brand';
                    axiosInstance()
                        .get('ProductEditor/GetMasterData?type=1&did=' + domainid) //Brand
                        .then(function (response) {
                            var data = response.data.items;
                            if (data != null) {
                                for (var i = 0; i < data.length; i++) {
                                    self.exclusionEntityList.push({ text: data[i].name, id: data[i].recordId });
                                }
                            }
                            self.exclusionEntityListLoaded = true;
                        });
                    break;
                case "7":
                    self.exclusionEntityType = 'Root Category';
                    axiosInstance()
                        .get('ProductEditor/GetMasterData?type=3&did=' + domainid) //Root Category
                        .then(function (response) {
                            var data = response.data.items;

                            for (var i = 0; i < data.length; i++) {
                                self.exclusionEntityList.push({ text: data[i].name, id: data[i].recordId });
                            }
                            self.exclusionEntityListLoaded = true;
                        });
                    break;
                case "8":
                    self.exclusionEntityType = 'Sub Category';
                    axiosInstance()
                        .get('ProductEditor/GetMasterData?type=31&did=' + domainid) //Sub Category
                        .then(function (response) {
                            var data = response.data.items;

                            for (var i = 0; i < data.length; i++) {
                                self.exclusionEntityList.push({ text: data[i].name, id: data[i].recordId });
                            }
                            self.exclusionEntityListLoaded = true;
                        });
                    break;
                default:
                    break;
            }
        },
        getExclusionRuleTypes() {
            var self = this;
            var list = [{ name: '- Select -', value: '-1' }];
            var value = document.getElementById("exclusionRules").checked
            if (value == true) {
                for (var i = 0; i < self.exclusionRuleTypeList.length; i++) {
                    var current = self.exclusionRuleTypeList[i];
                    if (current.value == "5" || current.value == "6" || current.value == "7" || current.value == "8") {
                        list.push(current);
                    }
                }
                self.exclusionRuleTypeList = list;
            }
        },

        getModel: function () {
            var self = this;
            var relatedProduct = {
                showRelatedProducts: !self.formModel.relateProducts,                                                                        //Checkbox dont relate products
                isAuto: (!self.formModel.relateProducts == true) ? ((self.formModel.relatedProductConfig == "1") ? true : false) : null,    //Radio Button
                sortBy: (!self.formModel.relateProducts == true) ? self.formModel.sortBy : null,                                            //Sort By
                maxProducts: (!self.formModel.relateProducts == true) ? self.formModel.maxNoOfProducts : null,                              //Max Products
                realtedProductConfig: (!self.formModel.relateProducts == true && self.formModel.relatedProductConfig == true) ? {           //In case Is Auto selected 
                    isExclude: self.formModel.exclusionRules,
                    ruleType: self.formModel.ruleType,
                    selectedEnitites: self.formModel.selectedEntity,
                    excludedRuleType: (self.formModel.exclusionRules == true) ? self.formModel.exclusionRuleType : null,
                    excludedEnitites: (self.formModel.exclusionRules == true) ? self.formModel.exclusionSelectedEntity : null
                } : null,
                relatedProduct: (!self.formModel.relateProducts == true && self.formModel.relatedProductConfig == false) ? self.formModel.manualConfigList : null
            }
            return relatedProduct;
        },

        validate: function () {
            var self = this;

            var valid = false;

            if (self.formModel.relatedProductConfig == "1") {
                valid = self.formModel.ruleType != "-1";
                //&& self.formModel.sortBy != "-1";
                if (self.formModel.exclusionRules == true) {
                    valid = self.formModel.ruleType != "-1"
                        && self.formModel.exclusionRuleType != "-1";
                    //&& self.formModel.sortBy != "-1";
                }
            }

            if (self.formModel.relatedProductConfig == "0") {
                valid = self.formModel.relationTypes != "-1";
                //&& self.formModel.sortBy != "-1";
            }

            if (valid == false) {
                self.errorMessages = [];
                //error messages
                if (self.formModel.relatedProductConfig == "1") {
                    if (self.formModel.ruleType == "-1") {
                        self.errorMessages.push("Enter Rule Type");
                    }
                    if (self.formModel.exclusionRules == true) {
                        if (self.formModel.exclusionRuleType == "-1") {
                            self.errorMessages.push("Enter Exclusion Rule Type");
                        }
                    }
                }
                if (self.formModel.relatedProductConfig == "0") {
                    if (self.formModel.relationTypes == "-1") {
                        self.errorMessages.push("Enter Relation Type");
                    }
                }
                //if (self.formModel.sortBy == "-1") {
                //    self.errorMessages.push("Enter Sort By");
                //}
            }

            if (valid) {
                this.$emit('validation-complete', true);
            } else {
                this.$emit('validation-complete', false);
            }
        },

        validateAndAdd: function () {
            var self = this;
            var validationArray = self.$validator.validateAll().then(result => {
                if (!result) {

                    self.errorMessages = self.errors.items.map(e => e.msg);
                }
                else { 
                    self.formModel.relatedproductsToAdd = [];
                    for (var i = 0; i < self.formModel.relatedProducts.length; i++) {
                        var currRelProd = self.formModel.relatedProducts[i];
                        var obj = {
                            relationType: self.formModel.relationTypes,
                            label: self.formModel.label,
                            relatedProd: { key: currRelProd.recordId, value: currRelProd.stockCode },
                            displayOrder: self.count,
                            copyToVariant: true,
                            productId: self.productId
                        };
                        self.formModel.relatedproductsToAdd.push(obj);
                        self.count = self.count + 1;
                        var result = self.formModel.relatedproductsToAdd.reduce((unique, o) => {
                            if (!unique.some(obj => obj.relationType === o.relationType && obj.relatedProd.key == o.relatedProd.key)) {
                                unique.push(o);
                            }
                            return unique;
                        }, []); 
                    }
                    var data = { model: self.formModel.relatedproductsToAdd };

                    axiosInstance()
                        .post("ProductEditor/AddRelatedProduct", data)
                        .then(function (response) { 
                            if (response.data.isValid) {
                                Vue.toasted.show(response.message, { type: 'success', duration: 3000, dismissible: true });

                                self.addRelatedItem();
                            }
                            else {
                                Vue.toasted.show(response.message + ' !!!', { type: 'error', duration: 3000, dismissible: true });
                            }
                        });
                }
            });
        }, 
        getStockCodesList: function (freetext) {
            var self = this;
            //get tags
            axiosInstance()
                .get('ProductEditor/GetProductsbyStockcode?freetext=' + freetext)
                .then(function (response) {
                    self.stockCodeList = response.data;

                    var index = self.stockCodeList.indexOf(
                        self.stockCodeList.find(item => item.recordId.toLowerCase() == self.productId.toLowerCase())
                    );
                    if (index>-1) {
                        self.stockCodeList.splice(index, 1);
                    }
                });
        }, addStockCodes: function (value) {
            var self = this;
            self.stockquery = '';
            self.stockCodeList = [];
            self.selectedStockCode = value;
            var product = {
                recordId: value.recordId,
                fullName: value.name,
                stockCode: value.description,
                name: value.name.length <= 30 ?
                    value.name :
                    value.name.substring(0, 27) + "..."
            };

            if (self.formModel.relatedProducts.find(item => item.recordId == value.recordId) != null) {
                return;
            }
            self.formModel.relatedProducts.push(product);
        },
        groupingManualList: function () {
            var self = this;
            self.groupedManualConfigs = [];
            var groupedList = JSON.parse(JSON.stringify(self.formModel.manualConfigList));
            var groupedData = {};
            groupedList.forEach(item => {
                var relationType = item['relationType'];
                var abcd = Object.keys(groupedData);
                if (abcd.length == 0) {
                    if (!groupedData[item['relationType']]) {
                        groupedData[item['relationType']] = {};
                        if (!groupedData[item['relationType']][item['label']]) {
                            groupedData[item['relationType']][item['label']] = [];
                        }
                        groupedData[item['relationType']][item['label']].push(item);
                    }
                }
                else {
                    abcd.forEach(gd => {
                        if (gd == relationType) {
                            var label = groupedData[item['relationType']][item['label']]
                            if (!groupedData[item['relationType']][item['label']]) {
                                groupedData[item['relationType']][item['label']] = [];
                            }
                            if (groupedData[item['relationType']][item['label']] == label) {

                            }
                            groupedData[item['relationType']][item['label']].push(item);
                        }
                        else {
                            if (!groupedData[item['relationType']]) {
                                groupedData[item['relationType']] = {};
                                if (!groupedData[item['relationType']][item['label']]) {
                                    groupedData[item['relationType']][item['label']] = [];
                                }
                                groupedData[item['relationType']][item['label']].push(item);
                            }
                        }
                    });
                }
            });
            self.groupedManualConfigs = groupedData;
        },

        groupingAllManualList: function () {
            var self = this;
            self.groupedAllManualConfigs = [];
            var groupedList = JSON.parse(JSON.stringify(self.formModel.allRelatedProductList));
            var groupedData = {};
            groupedList.forEach(item => {
                var relationType = item['relationType'];
                var abcd = Object.keys(groupedData);
                if (abcd.length == 0) {
                    if (!groupedData[item['relationType']]) {
                        groupedData[item['relationType']] = {};
                        if (!groupedData[item['relationType']][item['label']]) {
                            groupedData[item['relationType']][item['label']] = [];
                        }
                        groupedData[item['relationType']][item['label']].push(item);
                    }
                }
                else {
                    abcd.forEach(gd => {
                        if (gd == relationType) {
                            var label = groupedData[item['relationType']][item['label']]
                            if (!groupedData[item['relationType']][item['label']]) {
                                groupedData[item['relationType']][item['label']] = [];
                            }
                            if (groupedData[item['relationType']][item['label']] == label) {

                            }
                            groupedData[item['relationType']][item['label']].push(item);
                        }
                        else {
                            if (!groupedData[item['relationType']]) {
                                groupedData[item['relationType']] = {};
                                if (!groupedData[item['relationType']][item['label']]) {
                                    groupedData[item['relationType']][item['label']] = [];
                                }
                                groupedData[item['relationType']][item['label']].push(item);
                            }
                        }
                    });
                }
            });
            var groupArr = Object.keys(groupedData);
            self.totalRelatedGroups = groupArr.length;
            self.groupedAllManualConfigs = groupedData;
        },
        showAddProductReplacement() {
            var self = this;
            self.formModel.productReplacements = [],
            self.formModel.eol = '';
            self.formModel.startDate = '';
            self.searchby = 1;
            self.labelBy = 1;
            self.formModel.productVarintGroupCodeReplacements = [];

            self.formModel.productListForReplaced = [];
            var productObj = {
                stockCode: self.stockCode
            };
            if (self.formModel.productListForReplaced.find(item => item.stockCode == self.stockCode) != null) {
                return;
            }
            self.formModel.productListForReplaced.push(productObj);


            if (self.formModel.allProductReplacements != null && self.formModel.allProductReplacements.length > 0) {
                for (var i = 0; i < self.formModel.allProductReplacements.length; i++) {
                    var obj = self.formModel.allProductReplacements[i];
                    if (self.formModel.productListForReplaced.find(item => item.stockCode == obj.replacementStockCode) != null) {
                        return;
                    }
                    var productObj = {
                        stockCode: obj.replacementStockCode
                    };
                   
                    self.formModel.productListForReplaced.push(productObj);
                }
            }
               

            self.$modal.show('addProductReplacementModal');
        },
        hideProductReplacementModel() {
            var self = this;
            self.$modal.hide('addProductReplacementModal');
        },
        addProductReplacement: function (productId) {
            var self = this;

            if (self.formModel.productReplacements.find(item => item.id == productId) != null) {
                return;
            }

            var product = self.productSearchResults.find(item => item.recordId == productId);
            if (product != null) {

                self.formModel.productReplacements.push(product);
            }
        },
        addProductVarintGroupCodeReplacement: function (productVariantGroupCode) {
            var self = this;
            if (self.formModel.productVarintGroupCodeReplacements.find(item => item.productVariantGroupCode == productVariantGroupCode) != null) {
                return;
            }
            for (var i = 0; i < self.formModel.productVarintGroupCodes.length; i++) {
                var obj = self.formModel.productVarintGroupCodes[i];
                if (obj.productVariantGroupCode == productVariantGroupCode) {
                    self.formModel.productVarintGroupCodeReplacements.push(obj);
                }
            }
        },
        removeProductVarintGroupCodeReplacement: function (productVariantGroupCode) {
            var index = this.formModel.productVarintGroupCodeReplacements.indexOf(
                this.formModel.productVarintGroupCodeReplacements.find(item => item.productVariantGroupCode == productVariantGroupCode)
            );
            this.formModel.productVarintGroupCodeReplacements.splice(index, 1);
        },
        addStockCodesForProductReplacement: function (value) {
            var self = this;
            self.stockquery = '';
            self.stockCodeList = [];
            self.selectedStockCode = value;
            var product = {
                recordId: value.recordId,
                fullName: value.name,
                stockCode: value.description,
                name: value.name.length <= 30 ?
                    value.name :
                    value.name.substring(0, 27) + "..."
            };

            if (self.formModel.productReplacements.find(item => item.recordId == value.recordId) != null) {
                return;
            }
            self.formModel.productReplacements.push(product);
        },

        removeProductReplacement: function (productId) {
            var index = this.formModel.productReplacements.indexOf(
                this.formModel.productReplacements.find(item => item.recordId == productId)
            );
            this.formModel.productReplacements.splice(index, 1);
        },

        showAllProductReplacementmodel: function () {
            var self = this;
            self.showAllProductReplacements();
            self.formModel.allProductReplacements = [];           
        },
        showAllProductReplacements: function () {
            var self = this;
            axiosInstance()
                .get('ProductEditor/GetProductReplacements?productId=' + self.productId)
                .then(function (response) {
                    self.formModel.allProductReplacements = (response.data != null) ? response.data : [];
                    for (var i = 0; i < self.formModel.allProductReplacements.length; i++) {
                        self.formModel.allProductReplacements[i].eol = moment.utc(self.formModel.allProductReplacements[i].eol).format(dateFormat);
                        self.formModel.allProductReplacements[i].startDate = moment.utc(self.formModel.allProductReplacements[i].startDate).format(dateFormat);
                    }
                });
           
        },
        addProductReplacements: function () {
            var self = this;
            var validationArray = self.$validator.validateAll().then(result => {
                if (!result) {

                    self.errorMessages = self.errors.items.map(e => e.msg);
                }
                else {
                    if (!self.formModel.startDate) {
                        Vue.toasted.show('Invalid launch date', { type: 'error', duration: 3000, dismissible: true });
                        return false;
                    }
                    if (!self.formModel.eol) {
                        Vue.toasted.show('Invalid orignal stockCode eol', { type: 'error', duration: 3000, dismissible: true });
                        return false;
                    }
                    self.formModel.productReplacementsToAdd = [];
                    if (self.labelBy == 1) {
                        for (var i = 0; i < self.formModel.productReplacements.length; i++) {
                            var currProd = self.formModel.productReplacements[i];
                            var obj = {
                                productId: self.productId,
                                stockCode: self.productForReplaced,
                                replacementStockCode: currProd.stockCode,
                                replacementProductId: currProd.recordId,
                                eol: self.formModel.eol,
                                startDate: self.formModel.startDate,
                                productCode: self.productCode,
                            };
                            self.formModel.productReplacementsToAdd.push(obj);
                        }
                    }
                    if (self.labelBy == 2) {
                        if (self.formModel.productVarintGroupCodeReplacements == null || self.formModel.productVarintGroupCodeReplacements.length == 0) {
                            Vue.toasted.show('Please select productVariantgroupCode', { type: 'error', duration: 3000, dismissible: true });
                            return false;
                        }
                        for (var i = 0; i < self.formModel.productVarintGroupCodeReplacements.length; i++) {
                            var currVarintGroup = self.formModel.productVarintGroupCodeReplacements[i];
                            for (var j = 0; j < self.formModel.productReplacements.length; j++) {
                                var currProd = self.formModel.productReplacements[j];
                                var obj = {
                                    productVariantGroupCode: currVarintGroup.productVariantGroupCode,
                                    replacementStockCode: currProd.stockCode,
                                    replacementProductId: currProd.recordId,
                                    eol: self.formModel.eol,
                                    startDate: self.formModel.startDate,
                                    productCode: self.productCode,
                                };
                                self.formModel.productReplacementsToAdd.push(obj);
                            }
                        }
                    }
                    if (self.labelBy == 3) {

                        for (var i = 0; i < self.formModel.productReplacements.length; i++) {
                            var currProd = self.formModel.productReplacements[i];
                            var obj = {
                                productCode: self.productCode,
                                replacementStockCode: currProd.stockCode,
                                replacementProductId: currProd.recordId,
                                eol: self.formModel.eol,
                                startDate: self.formModel.startDate
                            };
                            self.formModel.productReplacementsToAdd.push(obj);
                        }
                    }
                    if (self.formModel.productReplacementsToAdd == null || self.formModel.productReplacementsToAdd.length == 0) {
                        Vue.toasted.show('Please add product', { type: 'error', duration: 3000, dismissible: true });
                        return false;
                    }
                    var data = { model: self.formModel.productReplacementsToAdd };
                    axiosInstance()
                        .post("ProductEditor/AddProductReplacement", data)
                        .then(function (response) {
                            if (response.data.isValid) {
                                Vue.toasted.show(response.data.message, { type: 'success', duration: 3000, dismissible: true });
                                self.$modal.hide('addProductReplacementModal');
                                self.showAllProductReplacementmodel();
                            }
                            else {
                                Vue.toasted.show(response.data.message + ' !!!', { type: 'error', duration: 3000, dismissible: true });
                            }
                        });
                }
            });
        }, 
    }
})

var toCategory = function (item) {
    var temp = {
        name: item.name,
        editActive: false,
        id: item.recordId,
        checked: false,
        children: []
    };

    if (item.subCategories != undefined) {
        if (item.subCategories.length > 0) {
            for (var i = 0; i < item.subCategories.length; i++) {
                temp.children.push(toCategory(item.subCategories[i]));
            }
        }
    }

    return temp;
}
