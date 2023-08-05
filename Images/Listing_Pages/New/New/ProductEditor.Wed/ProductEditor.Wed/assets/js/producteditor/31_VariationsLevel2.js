function VariantCombination(combinations) {
    this.combinations = combinations;
    this.selected = true;
    this.stockCount = inventory;
    this.sellingPrice = selectedPricing;
    this.barcode = "";
    this.productCode = "";
    this.stockCode = "";
    var randomNum = Math.floor(100 + Math.random() * 900);
    this.containsOption = function (opt) {
        var index = this.combinations.indexOf(
            this.combinations.find(item => item == opt)
        );
        if (index > -1) {
            return true;
        }
        //for (var i = 0; i < this.combinations.length; i++) {
        //    if (this.combinations[i] === opt)
        //        return true;
        //}
        return false;
    };
    var sku = mainstockCode.trim();
    for (var i = 0; i < this.combinations.length; i++) {
        var attrvalue = '';
        attrvalue = this.combinations[i].text;
        attrvalue = attrvalue.split(' ').join('-');
        sku = sku + '-' + attrvalue;
    }
    if (sku.length > 24) {
        for (var i = 0; i < this.combinations.length; i++) {
            var attrvalue = '';
            attrvalue = this.combinations[i].text;
            attrvalue = attrvalue.split(' ').join('-');
            if (i == this.combinations.length - 1) {
                sku = sku.substring(0, 18);
                sku = sku + randomNum;
            }
            sku = sku + '-' + attrvalue;
            sku = sku.split('--').join('-');
        }
        this.stockCode = sku.toUpperCase();
    } else {
        this.stockCode = sku.toUpperCase();
    }
    if (this.stockCode != null) {
        this.stockCode = this.stockCode.trim().replace(" ", "");
    }
    this.productCode = mainstockCode.trim();
    // this.barcode = this.stockCode;
}

var selectionList = [];
Vue.component("section-variationslevel2", {
    template: "#section-variationslevel2-template",
    props: ['message'],
    data() {
        return {
            categories: null,
            //treeData: treeData,
            treeMode: 'multi',
            treeData: relatedProductsData,
            categoryTreeList: [],
            searchtext: '',
            formModel: {
                variants: [],
                selections: [],
                masterStockcode: '',
                combinations: [],
                hasVariant: true,
                survey: [],
                tempvariantProducts: [],
                customFieldData: null,
                listType: "1",
                independentProductUrl: false,
                displayInProductWidget: false,
                displayInProductDetail: false,
                addVariant: false,
                selectedAttributeCodes: '',
                variantIndputType: ''
            },
            categoriesLoaded: false,
            categoriesLoadedforBundle: false,
            createManualStockCode: true,
            selectedSurveyObject: [],
            productVariantsSaved: [],
            groupedproductVariantsSaved: [],
            selectedVariantColorList: [],
            custumAttributeId: '',
            selectionList: [],
            createVariation: false,
            previousVariantInfo: [],
            productSearchResults: [],
            pimUrl: "",
            displayInSearchList: [],
            displayInSearchListLoaded: false,
            hidePreviousVariants: false,
            selectedPricing: "",
            searchResultsLoaded: true,
            allowCreatevariant: false,
            isVariantCreated: true,
            customId: '00000000-0000-0000-0000-000000000000',
            variantListType: 'HorizontalList',
            variantsDisplayAttributes: [],
            radioYesNoChoices: [
                "Yes",
                "No"
            ],
            searchby: 0,
            columnCount: 0,
            stockCodesList: [],
            selectedstockCode: '',
            stockquery: '',
            stockCodeList: [],
            variantOptions: [],
            defaultProductId: ''
        };
    },
    mounted() {
        var self = this;
        var loaded = false;
        if (this.message) {
            this.formModel = this.message;
        }
        self.allowCreatevariant = true;

        //axiosInstance()
        //    .get('ProductEditor/GetMasterData?type=33&did=' + domainid) //DisplayInSearch
        //    .then(function (result) {
        //        var data = result.data.itemType;
        //        self.displayInSearchList = data;
        //        self.displayInSearchListLoaded = true;
        //    });
        EventBus.$on("masterData.loaded", function (masterData) {
            var info = masterData;
            var data = info.displayInSearch.itemType;
            self.displayInSearchList = data;
            self.displayInSearchListLoaded = true;
        });

        EventBus.$on("attributes.parentChanged", function (id) {
            if (id != null && id != "00000000-0000-0000-0000-000000000000") {
                self.allowCreatevariant = true;
                self.custumAttributeId = id;
                self.loadSurvey(id);
            }
            else {
                self.allowCreatevariant = true;
                self.loadSurvey(self.custumAttributeId);
            }
        });

        EventBus.$on("advancedpurchase.sellprice", function (sellPrice) {
            selectedPricing = sellPrice;
        });

        EventBus.$on("pricing.sellPrice", function (sellPrice) {
            selectedPricing = sellPrice;
        });

        EventBus.$on("inventory.currentStock", function (currentStock) {
            inventory = currentStock;
        });

        EventBus.$on("createVariationOptions", () => {
            this.createVariationOptions();
        });
        EventBus.$on("basicInfo.stockCode", async function (stockCode) {
            mainstockCode = stockCode;
            var self = this;
            if (self != null && self.createVariationOptions != undefined) {
                this.createVariationOptions();
            }
        });
        EventBus.$on("product.loaded", function (product) {
            self.pimUrl = PimUri;
            var productVariantGroupCode = "";
            mainstockCode = product.basicInfo.stockCode;
            for (var i = 0; i < product.variants.length; i++) {
                if (product.variants[i].variantProduct.stockCode == mainstockCode) {
                    productVariantGroupCode = product.variants[i].variantProduct.productVariantGroupCode;
                }
            }
            var productVariantGroupCodeList = [];

            for (var i = 0; i < product.variants.length; i++) {
                var prd = product.variants[i];
                if (prd.variantProduct.productVariantGroupCode == productVariantGroupCode) {
                    productVariantGroupCodeList.push(prd);
                }
            }
            self.formModel.hasVariant = product.basicInfo.hasVariant;
            self.formModel.masterStockcode = product.basicInfo.stockCode;
            self.formModel.selections = productVariantGroupCodeList;//product.variants;
            self.previousVariantInfo = productVariantGroupCodeList;//product.variants;
            self.selectedVariantColorList = [];
            self.defaultProductId = product.id;
            if (product.defaultPricing != null) {
                if (product.defaultPricing.sellPrice != null) {
                    selectedPricing = product.defaultPricing.sellPrice;
                }
            }
            if (product.inventory != null && product.inventory.length > 0) {
                if (product.inventory[0] != null) {
                    inventory = product.inventory[0].stockOnHand;
                }
            }
            var stockCode = product.basicInfo.stockCode;
            var customSetId = product.customAttributes.customAttributeSetId;
            self.custumAttributeId = product.customAttributes.customAttributeSetId;


            if (productVariantGroupCodeList != null) {
                var config = (productVariantGroupCodeList[0] != null) ? productVariantGroupCodeList[0].variantConfig : {};
                if (config != null) {
                    self.formModel.listType = config.listType;
                    self.formModel.independentProductUrl = config.independentProductUrl;
                    self.formModel.displayInProductWidget = config.displayInProductWidget;
                    self.formModel.displayInProductDetail = config.displayInProductDetail;
                    self.formModel.selectedAttributeCodes = config.selectedAttributeCodes;
                    self.formModel.variantIndputType = config.variantInputTypes;
                }
                allowCreatevariant = true;
            }
            //if (customSetId != null) {
            //    self.loadSurvey(customSetId);
            //}
            if (productVariantGroupCodeList != null) {
                for (var i = 0; i < productVariantGroupCodeList.length; i++) {
                    var current = productVariantGroupCodeList[i];
                    if (current.variantProduct != null) {
                        var obj = {
                            variantProductId: current.variantProduct.id,
                            variantProductStockCode: current.variantProduct.stockCode,
                            variantProductProductCode: current.variantProduct.productCode,
                            variantProductBarCode: current.variantProduct.barCode,
                            variantProductName: current.variantProduct.name,
                            variantProductStockCount: current.variantProduct.stockCount,
                            variantProductURL: current.variantProduct.pdpUrl,
                            variantProductimageUrl: current.variantProduct.imageUrl != null && current.variantProduct.imageUrl.length > 0 ? current.variantProduct.imageUrl + "?h=30" : "",
                            variantProductIsActive: current.variantProduct.isActive,
                            variantProductIsVisible: current.variantProduct.isVisible,
                            variantProductColor: current.variantProduct.color,
                            variantProductCurr: current.variantProduct.currency,
                            productVariantGroupCode: current.variantProduct.productVariantGroupCode,
                            customFields: current.customFields,
                            isDefault: current.variantProduct.isDefault,
                            relation: (current.variantProduct.isDefault == true) ? "Master" : "Child"
                        };
                        self.productVariantsSaved.push(obj);
                    }
                }
                self.productVariantsSaved = self.productVariantsSaved.filter(function (item) {
                    if (item.isDefault != true) {
                        return item;
                    }
                });

                //check color customFields value is null then set 'NA'
                for (var i = 0; i < self.productVariantsSaved.length; i++) {
                    for (var j = 0; j < self.productVariantsSaved[i].customFields.length; j++) {
                        if (self.productVariantsSaved[i].customFields[j].value == null && self.productVariantsSaved[i].customFields[j].key == 'global.colour') {
                            self.productVariantsSaved[i].customFields[j].value = 'NA';
                        }
                    }
                }

                self.groupedproductVariantsSaved = self.productVariantsSaved.reduce((r, a) => {
                    r[a.productVariantGroupCode] = [...r[a.productVariantGroupCode] || [], a];
                    return r;
                }, {});
                self.columnCount = (self.productVariantsSaved != null && self.productVariantsSaved.length > 0) ? self.productVariantsSaved[0].customFields.length + 8 : 0;
                //self.productVariantsSaved = self.productVariantsSaved.filter(function (item) {
                //    if (item.relation != "Master") {
                //        return item;
                //    }
                //});
            }

        });
    },
    methods: {
        beforeOpen() {
            
        },
        loadSurvey: function (id) {
            var self = this;
            if (!id || id == "00000000-0000-0000-0000-000000000000") {
                return;
            }
            EventBus.$on("attributeData.loaded", function (masterData) {
                var info = masterData;
                var response = info.variantAttribute;
                self.variantOptions = info.variantAttribute;
                if (response &&
                    response.pages &&
                    response.pages.length &&
                    response.pages[0] &&
                    response.pages[0].elements &&
                    response.pages[0].elements.length) {

                    self.formModel.survey = response.pages[0].elements;

                    //Removed text type from variation
                    self.formModel.survey = self.formModel.survey.filter((item) => (item.type == "dropdown" && item.choices != null) || (item.type == "text" && item.choices != null) || (item.type == "color" && item.choices != null) || item.type == "radiogroup");

                } else {
                    self.formModel.survey = [];
                }
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

                if (self.formModel.survey != null) {
                    self.variantsDisplayAttributes = [];
                    for (var surv = 0; surv < self.formModel.survey.length; surv++) {

                        if (self.formModel.selectedAttributeCodes != null && self.formModel.selectedAttributeCodes != '') {
                            var selectedcodes = self.formModel.selectedAttributeCodes.split(',');

                            var selectedObj = selectedcodes.filter(function (object) {
                                if (object == self.formModel.survey[surv].name) {
                                    return object;
                                }
                            });
                            if (selectedObj != null && selectedObj != undefined && selectedObj != "") {
                                self.formModel.survey[surv].checked = true;
                            } else {
                                self.formModel.survey[surv].checked = false;
                            }

                            //for (var z = 0; z < selectedcodes.length; z++) {
                            //        if (selectedcodes[z] == self.formModel.survey[surv].name) {
                            //            self.formModel.survey[surv].checked = true;
                            //        } else {
                            //            self.formModel.survey[surv].checked = false;
                            //        }
                            //    }
                        } else {
                            self.formModel.survey[surv].checked = false;
                        }
                        self.variantsDisplayAttributes.push(self.formModel.survey[surv]);
                    }
                    if (self.formModel.variantIndputType != null && self.formModel.variantIndputType != undefined) {
                        self.showSelectedvariantIndputType();
                    }
                }
            });
        },
        showSelectedvariantIndputType: function () {
            var self = this;
            var selectedvariantIndputType = self.formModel.variantIndputType.split(',');

            for (var surv = 0; surv < self.variantsDisplayAttributes.length; surv++) {

                var selectedObj = selectedvariantIndputType.filter(function (object) {
                    if (object.split(':')[1] == self.variantsDisplayAttributes[surv].name) {
                        return object;
                    }
                });
                if (selectedObj != null && selectedObj != undefined && selectedObj != "") {
                    self.variantsDisplayAttributes[surv].inputtype = selectedObj[0].split(':')[0];
                } else {
                    self.variantsDisplayAttributes[surv].inputtype = '';
                }
                //for (var z = 0; z < selectedvariantIndputType.length; z++) {
                //    if (selectedvariantIndputType[z].split(':')[1] == self.variantsDisplayAttributes[surv].name) {
                //        self.variantsDisplayAttributes[surv].inputtype = selectedvariantIndputType[z].split(':')[0];
                //    } else {
                //        self.variantsDisplayAttributes[surv].inputtype = '';
                //    }
                //}
            }
            var result = self.variantsDisplayAttributes.reduce((unique, o) => {
                if (!unique.some(obj => obj.name === o.name)) {
                    unique.push(o);
                }
                return unique;
            }, []);
            self.variantsDisplayAttributes = result;

        }
    }
});
