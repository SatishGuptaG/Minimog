var selectedPricing = 0;
var inventory = 0;
var mainstockCode = '';
function VariantOption(val, txt, key) {
    this.value = val || "";
    this.text = txt || "";
    this.key = key || "";
}

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
Vue.component("section-variations", {
    template: "#section-variations-template",
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
            defaultProductId: '',
            isVariationsEditDisabled: !hasVariationsEditPermission
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

            var categories = info.categories
            self.categoryTreeList = categories;
            for (var i = 0; i < self.categoryTreeList.length; i++) {
                var item = toCategory(self.categoryTreeList[i]);
                relatedProductsData.push(item);
            }
            self.categoriesLoadedforBundle = true;
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
        }),
            EventBus.$on("product.loaded", function (product) {
                self.pimUrl = PimUri;
                mainstockCode = product.basicInfo.stockCode;
                self.formModel.hasVariant = product.basicInfo.hasVariant;
                self.formModel.masterStockcode = product.basicInfo.stockCode;
                self.formModel.selections = product.variants;
                self.previousVariantInfo = product.variants;
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

                if (product.variants != null) {
                    var config = (product.variants[0] != null) ? product.variants[0].variantConfig : {};
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
                if (product.variants != null) {
                    for (var i = 0; i < product.variants.length; i++) {
                        var current = product.variants[i];
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

        //EventBus.$on('customField.Variations', function (surveyObject,id) {
        //    if (!id) {
        //        self.formModel.selections.length = 0;
        //        self.calculateOptions();
        //    } else {
        //        self.loadData(id, surveyObject);
        //    }
        //});
    },
    methods: {
        colorHref: function (id, index) {
            return "#" + id + index.toString();
        },
        showAddproductmodel() {
            var self = this;
            self.$modal.show('addmodelProducts');
        },
        hide() {
            var self = this;
            self.$modal.hide('addmodelProducts');
        },
        showVariantConfigSettingmodel() {
            var self = this;
            self.formModel.hasVariant = true;
            self.allowCreatevariant = true;
            self.$modal.show('variantConfigSetting');
        },
        hideVariantConfigSettingmodel() {
            var self = this;
            if (self.variantsDisplayAttributes != null) {
                self.formModel.selectedAttributeCodes = '';
                for (var i = 0; i < self.variantsDisplayAttributes.length; i++) {
                    if (self.variantsDisplayAttributes[i].checked == true) {
                        self.formModel.selectedAttributeCodes = self.formModel.selectedAttributeCodes + ',' + self.variantsDisplayAttributes[i].name;
                    }
                }
                var myString = self.formModel.selectedAttributeCodes.split(',');
                if (myString[0] == '') {
                    self.formModel.selectedAttributeCodes = self.formModel.selectedAttributeCodes.substring(1);
                }
            }

            self.$modal.hide('variantConfigSetting');
        },
        closeVariationOptionsBlock() {
            var self = this;
            self.formModel.addVariant = false;
            self.isVariantCreated = true;
            self.formModel.hasVariant = true;
        },
        confirmationModalShow(value, text) {
            var self = this;
            self.$modal.show('dialog', {
                title: 'Confirmation !',
                text: 'Are you sure you want to remove this ' + text + ' ?',
                buttons: [
                    {
                        title: 'Yes',
                        class: 'btn btn-danger',
                        handler: () => {
                            self.removeVariantCombination(value);
                            self.$modal.hide('dialog')
                        }
                    },
                    {
                        title: 'No'
                    }
                ]
            })
        },

        removeVariantCombination(config) {
            var self = this;
            var index = self.formModel.combinations.indexOf(
                self.formModel.combinations.find(item => item.combinations == config.combinations)
            );
            self.formModel.combinations.splice(index, 1);
        },
        beforeOpen() {
            var self = this;
            if (self.categoryTreeList.length > 0) {
                for (var i = 0; i < self.categoryTreeList.length; i++) {
                    var item = toCategory(self.categoryTreeList[i]);
                    relatedProductsData.push(item);
                }
                self.categoriesLoadedforBundle = true;
            }
            else {

                EventBus.$on("masterData.loaded", function (masterData) {
                    var info = masterData;
                    var data = info.categories;
                    if (data != null) {
                        for (var i = 0; i < data.length; i++) {
                            var item = toCategory(data[i]);
                            relatedProductsData.push(item);
                        }
                    }
                    self.categoriesLoadedforBundle = true;
                });
            }
        },
        doProductSearch: function (categoryId) {
            this.searchResultsLoaded = false;
            var self = this;
            axiosInstance()
                .get('ProductEditor/GetMasterData?type=29&parentId=' + categoryId)
                .then(function (response) {
                    self.productSearchResults = [];
                    var products = response.data.items;
                    if (products != null && products.length > 0) {
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
                });
        },
        addtempvariantProduct: function (productId) {
            var self = this;
            if (self.formModel.tempvariantProducts.find(item => item.id == productId) != null) {
                return;
            }
            var product = self.productSearchResults.find(item => item.recordId == productId);
            if (product != null) {
                self.formModel.tempvariantProducts.push(product);
            }
        },
        addvariantProduct() {
            var self = this;
            self.selectedSurveyObject = [];
            if (self.productVariantsSaved == null) {
                self.productVariantsSaved = [];
            }
            for (var i = 0; i < self.formModel.tempvariantProducts.length; i++) {
                var current = self.formModel.tempvariantProducts[i];

                var obj = {
                    variantProductId: current.recordId,
                    variantProductStockCode: current.stockCode,
                    variantProductName: current.fullName,
                    isDefault: false,
                    relation: "Child",
                    productVariantGroupCode: ""
                };
                var selectedObj = self.productVariantsSaved.filter(function (object) {
                    if (object.variantProductId == current.recordId) {
                        return object;
                    }
                });
                if (selectedObj == null || (selectedObj != null && selectedObj.length == 0)) {
                    self.productVariantsSaved.push(obj);
                }
            }
            self.groupedproductVariantsSaved = self.productVariantsSaved.reduce((r, a) => {
                r[a.productVariantGroupCode] = [...r[a.productVariantGroupCode] || [], a];
                return r;
            }, {});

            var surveyObject = self.formModel.survey;
            for (var j = 0; j < surveyObject.length; j++) {
                var currSelectedObj = surveyObject[j];
                if (currSelectedObj.selected.length > 0) {
                    self.selectedSurveyObject.push(currSelectedObj);
                }
            }
            self.hide();
        },
        removeRelatedProduct: function (productId) {
            var index = this.formModel.tempvariantProducts.indexOf(
                this.formModel.tempvariantProducts.find(item => item.id == productId)
            );
            this.formModel.tempvariantProducts.splice(index, 1);
        },
        getModel: function () {
            var res = [];
            var self = this;
            if (this.formModel.combinations.length > 0) {
                for (var i = 0; i < this.formModel.combinations.length; i++) {
                    var comb = this.formModel.combinations[i];
                    if (!comb.selected)
                        continue;
                    var obj = {
                        "CustomFields": [],
                        "VariantProduct": {
                            "StockCount": comb.stockCount,
                            "Price": comb.sellingPrice,
                            "StockCode": comb.stockCode.trim().replace(" ", ""),
                            "BarCode": comb.barcode,
                            "ProductCode": comb.productCode
                        },
                        "VariantConfig": {
                            "CreateManualStockCode": self.createManualStockCode,
                            "IndependentProductUrl": self.formModel.independentProductUrl,
                            "DisplayInProductWidget": self.formModel.displayInProductWidget,
                            "DisplayInProductDetail": self.formModel.displayInProductDetail,
                            "ListType": self.formModel.listType,
                            "VariantInputTypes": self.formModel.variantIndputType,
                            "SelectedAttributeCodes": self.formModel.selectedAttributeCodes
                        }
                    };
                    for (var j = 0; j < comb.combinations.length; j++) {
                        var curr = comb.combinations[j];
                        obj.CustomFields.push({
                            "Label": curr.text,
                            "Value": curr.value,
                            "Key": curr.key
                        });
                    }
                    res.push(obj);
                }
            } else if (self.formModel.tempvariantProducts.length > 0) {
                var custfd = [];
                for (var n = 0; n < self.selectedSurveyObject.length; n++) {
                    var currobj = self.selectedSurveyObject[n];
                    custfd.push({
                        "Label": currobj.title,
                        "Value": currobj.selected[0],
                        "Key": currobj.name
                    });
                }
                for (var m = 0; m < self.formModel.tempvariantProducts.length; m++) {
                    var objexistintg = {
                        "CustomFields": custfd,
                        "VariantProduct": {
                            "StockCount": null,
                            "Price": null,
                            "StockCode": self.formModel.tempvariantProducts[m].stockCode.trim().replace(" ", ""),
                            "BarCode": null,
                            "ProductCode": null
                        },
                        "VariantConfig": {
                            "CreateManualStockCode": self.createManualStockCode,
                            "IndependentProductUrl": self.formModel.independentProductUrl,
                            "DisplayInProductWidget": self.formModel.displayInProductWidget,
                            "DisplayInProductDetail": self.formModel.displayInProductDetail,
                            "ListType": self.formModel.listType,
                            "VariantInputTypes": self.formModel.variantIndputType,
                            "SelectedAttributeCodes": self.formModel.selectedAttributeCodes
                        }

                    };

                    res.push(objexistintg);
                }
            }
            if (res == null || res.length == 0) {
                if (self.previousVariantInfo) {
                    for (var k = 0; k < self.previousVariantInfo.length; k++) {
                        self.previousVariantInfo[k].variantConfig.listType = self.formModel.listType;
                        self.previousVariantInfo[k].variantConfig.independentProductUrl = self.formModel.independentProductUrl;
                        self.previousVariantInfo[k].variantConfig.displayInProductWidget = self.formModel.displayInProductWidget;
                        self.previousVariantInfo[k].variantConfig.displayInProductDetail = self.formModel.displayInProductDetail;
                        self.previousVariantInfo[k].variantConfig.variantInputTypes = self.formModel.variantIndputType;
                        self.previousVariantInfo[k].variantConfig.selectedAttributeCodes = self.formModel.selectedAttributeCodes;
                        self.previousVariantInfo[k].variantProduct = {};
                        self.previousVariantInfo[k].customFields = {};
                    }
                }
                res = self.previousVariantInfo;
            }
            return res;
        },
        itemsContains: function (colourtext) {
            var self = this;
            if (self.searchtext.length > 2) { 
                var selectedObj = [];
                if (self.formModel.survey != null) {
                    for (var i = 0; i < self.formModel.survey.length; i++) {
                        if (self.formModel.survey[i] != null && self.formModel.survey[i] != undefined && self.formModel.survey[i].type == "color" && self.formModel.survey[i].choices != null && self.formModel.survey[i].choices != undefined && self.formModel.survey[i].choices.length>0) {
                            for (var j = 0; j < self.formModel.survey[i].choices.length; j++) {
                                if (self.formModel.survey[i].choices[j] != null && self.formModel.survey[i].choices[j].colors != null && self.formModel.survey[i].choices[j].colors != null && self.formModel.survey[i].choices[j].colors != undefined && self.formModel.survey[i].choices[j].colors.length > 0) {
                                    selectedObj = self.formModel.survey[i].choices[j].colors.filter(function (object) {
                                        if (object.text.toUpperCase().indexOf(self.searchtext.toUpperCase()) > -1) {
                                            return object;
                                        }
                                    });
                                    if (selectedObj != null && selectedObj.length > 0) {
                                        self.formModel.survey[i].choices[j].isHidden = false;
                                    } else {
                                        self.formModel.survey[i].choices[j].isHidden = true;
                                    }
                                } else {
                                    self.formModel.survey[i].choices[j].isHidden = true;
                                }
                            }
                        };
                    }
                } 
                return colourtext.toUpperCase().indexOf(self.searchtext.toUpperCase()) > -1
            } else {
                return true;
            }
        },
        emithasVariant: function () {
            var self = this;
            EventBus.$emit("basicInfo.hasVariant", self.formModel.hasVariant);
        },

        addSection: function () {
            if (this.formModel.variant.length === 0)
                return;
            var opt = new VariantOption();
            this.formModel.selections.push({
                variant: this.formModel.variants[0],
                options: [opt]
            });
            this.calculateOptions();
        },

        deleteSection: function (el) {
            for (var i = this.formModel.selections.length - 1; i >= 0; i--) {
                if (this.formModel.selections[i] === el) {
                    this.formModel.selections.splice(i, 1);
                    break;
                }
            }
            this.calculateOptions();
        },

        addOption: function (el) {
            el.options.push(new VariantOption());
            this.calculateOptions();
        },

        deleteOption: function (item, option) {
            for (var i = item.options.length - 1; i >= 0; i--) {
                if (item.options[i] === option) {
                    item.options.splice(i, 1);
                    break;
                }
            }
            this.calculateOptions();
        },

        calculateOptions: function () {
            this.formModel.combinations.length = 0;
            var permutations = this.fillOptions([[]], 0);
            for (var i = 0; i < permutations.length; i++) {
                this.formModel.combinations.push(new VariantCombination(permutations[i]));
            }
        },
        // arr of arrs
        fillOptions: function (arr, i) {
            var permutations = [];
            for (var j = 0; j < arr.length; j++) {
                var subArr = arr[j];
                var current = this.formModel.selections[i];
                if (!current)
                    break;
                for (var k = 0; k < current.options.length; k++) {
                    var copy = subArr.slice();
                    copy.push(current.options[k]);
                    permutations.push(copy);
                }
            }
            if (i < this.formModel.selections.length - 1) {
                permutations = this.fillOptions(permutations, i + 1);
            }
            return permutations;
        },

        selectByOption: function (opt) {
            for (var i = 0; i < this.formModel.combinations.length; i++) {
                if (this.formModel.combinations[i].containsOption(opt)) {
                    this.formModel.combinations[i].selected = true;
                }
            }
        },

        loadData: function (id, surveyObject) {
            var self = this;
            var data = [];
            if (self.variantOptions.pages != null && self.variantOptions.pages != undefined) {
                for (var i = 0; i < self.variantOptions.pages.length; i++) {
                    if (self.variantOptions.pages[i].elements) {
                        for (var j = 0; j < self.variantOptions.pages[i].elements.length; j++) {
                            var element = self.variantOptions.pages[i].elements[j];
                            if (typeof element.choices === "string") {
                                element.choices = JSON.parse(element.choices);
                            }
                            if (element.type === 'radiogroup') {
                                element.choices = [{ value: "Yes", text: "Yes" }, { value: "No", text: "No" }]
                            }
                            if (!element.choices || element.choices.length === 0)
                                continue;
                            var variant = {
                                isRequired: element.isRequired,
                                title: element.title,
                                name: element.name,
                                type: element.type,
                                options: []
                            };
                            if (element.choices) {
                                for (var k = 0; k < element.choices.length; k++) {
                                    var c = element.choices[k];

                                    if (element.type != 'color') {
                                        variant.options.push(new VariantOption(c.value, c.text, element.name));
                                    }
                                    if (c.colors != undefined) {
                                        if (c.colors.length != 0) {
                                            for (var l = 0; l < c.colors.length; l++) {
                                                var x = c.colors[l];
                                                variant.options.push(new VariantOption(x.value, x.text, element.name));
                                            }
                                        }
                                    }
                                }
                            }
                            data.push(variant);
                        }
                    }
                }
            }
            self.formModel.selections = [];
            self.formModel.selections.length = 0;
            self.formModel.selections.push.apply(self.formModel.selections, data);
            self.selectionList = self.formModel.selections;
            var selList = [];
            //self.calculateOptions();
            if (self.createVariation) {
                for (var i = 0; i < self.formModel.selections.length; i++) {
                    var currVariantObj = self.formModel.selections[i];
                    for (var j = 0; j < surveyObject.length; j++) {
                        var currSelectedObj = surveyObject[j];
                        if (currVariantObj.type == 'color' && currVariantObj.type == currSelectedObj.type && currVariantObj.name == currSelectedObj.name && currVariantObj.title == currSelectedObj.title) {
                            if (currSelectedObj.selected.length > 0) {
                                var selected = currSelectedObj.selected;
                                currVariantObj.options = currVariantObj.options.filter(function (item) {
                                    var selectedObj = selected.filter(function (obj) {
                                        if (obj.value == item.value && obj.text == item.text) {
                                            return obj;
                                        }
                                    });
                                    if (selectedObj != null && selectedObj.length > 0) {
                                        return selectedObj;
                                    }
                                })
                                selList.push(currVariantObj);
                            }
                        }
                        else if (currVariantObj.type == currSelectedObj.type && currVariantObj.name == currSelectedObj.name && currVariantObj.title == currSelectedObj.title) {
                            if (currSelectedObj.selected.length > 0) {
                                var selected = currSelectedObj.selected;
                                currVariantObj.options = currVariantObj.options.filter(function (item) {
                                    var colorValue = item.value;
                                    if (selected.includes(colorValue)) {
                                        return item;
                                    }
                                })
                                selList.push(currVariantObj);
                            }
                        }
                    }
                }
                self.formModel.selections = selList;
                self.calculateOptions();
            }
        },

        collapseNext: function (event) {
            var el = $(event.currentTarget);
            $(el).next().toggleClass("collapse");
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

        createVariationOptions: function () {
            var self = this;
            self.createVariation = true;
            self.hidePreviousVariants = false;
            self.selectedSurveyObject = self.formModel.survey;
            self.loadData(self.custumAttributeId, self.selectedSurveyObject);
        },

        selectColor: function (question, choice, event) {
            var self = this;
            //question.selected = choice.value;
            var el = $(event.currentTarget);
            var panel = el.parent().parent().parent().parent();
            var prev = panel.prev();
            $(".selected-color", prev).css("background-color", choice.value);
            $(".color-widget-text", prev).html("Selected");
            if (question.selected.length == 0) {
                question.selected.push(choice);
                self.selectedVariantColorList.push({ value: choice.value, text: choice.text });
            }
            else {
                var count = 0;
                for (var i = 0; i < question.selected.length; i++) {
                    var existingColor = question.selected[i];
                    if (existingColor == choice) {
                        count++;
                    }
                }
                if (count == 0) {
                    question.selected.push(choice);
                    self.selectedVariantColorList.push({ value: choice.value, text: choice.text });
                }
            }
            var result = self.selectedVariantColorList.reduce((unique, o) => {
                if (!unique.some(obj => obj.value === o.value && obj.text == o.text)) {
                    unique.push(o);
                }
                return unique;
            }, []);
            self.selectedVariantColorList = result;
            self.createVariationOptions();
        },

        removeColor: function (color) {
            var self = this;
            //Remove from survey list
            var colorObject = self.formModel.survey.filter(x => { if (x.type == "color") { return x; } });
            var index = colorObject[0].selected.indexOf(
                colorObject[0].selected.find(item => item.value == color.value)
            );
            colorObject[0].selected.splice(index, 1);
            self.formModel.survey.filter(x => { if (x.type == "color") { x.selected = colorObject[0].selected } });
            //Remove from display list
            var index1 = self.selectedVariantColorList.indexOf(
                self.selectedVariantColorList.find(item => item.value == color.value && item.text == color.text)
            );
            self.selectedVariantColorList.splice(index1, 1);

            self.createVariationOptions();
        },

        modifyVariations: function () {
            var self = this;
            if (self.formModel.hasVariant == false) {
                self.formModel.addVariant = false;
                self.hidePreviousVariants = false;
            }
        },

        changeVariationTable: function () {
            var self = this;
            self.isVariantCreated = false;
            if (self.formModel.addVariant == false) {
                self.hidePreviousVariants = false;

                if (self.formModel.survey.length > 0) {
                    for (var i = 0; i < self.formModel.survey.length; i++) {
                        var current = self.formModel.survey[i];
                        current.selected = [];
                    }
                    self.selectedVariantColorList = [];
                    self.formModel.combinations = [];
                }
            }
        },

        selectedInputTypes: function () {
            var self = this;
            var concatInputType = '';
            for (var i = 0; i < self.variantsDisplayAttributes.length; i++) {
                var current = self.variantsDisplayAttributes[i];
                if (current.inputtype == undefined) {
                    current.inputtype = HorizontalList;
                }
                concatInputType += "," + current.inputtype + ":" + current.name;
            }
            concatInputType = concatInputType.substring(1);
            self.formModel.variantIndputType = concatInputType;
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

        }, getStockCodesList: function (freetext) {
            var self = this;
            //get tags
            axiosInstance()
                .get('ProductEditor/GetProductsbyStockcode?freetext=' + freetext)
                .then(function (response) {
                    self.stockCodeList = response.data;
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

            if (self.formModel.tempvariantProducts.find(item => item.recordId == value.recordId) != null) {
                return;
            }

            self.formModel.tempvariantProducts.push(product);
        },
        confirmationRemovedVariantModalShow(prod) {
            var self = this;
            self.$modal.show('dialog', {
                title: 'Confirmation !',
                height: '100',
                text: 'Are you sure you want to delete this ' + prod.variantProductStockCode + ' from variation ?',
                buttons: [
                    {
                        title: 'Ok',
                        class: 'btn btn-danger',
                        handler: () => {
                            self.removeVariation(prod.variantProductId);
                            self.$modal.hide('dialog')
                        }
                    },
                    {
                        title: 'Close'
                    }
                ]
            })
        },
        removeVariation: function (variantProductId) {
            var self = this;
            var index = self.productVariantsSaved.indexOf(
                self.productVariantsSaved.find(item => item.variantProductId == variantProductId)
            );
            this.productVariantsSaved.splice(index, 1);
            self.groupedproductVariantsSaved = self.productVariantsSaved.reduce((r, a) => {
                r[a.productVariantGroupCode] = [...r[a.productVariantGroupCode] || [], a];
                return r;
            }, {});
            axiosInstancePost()
                .delete("/ProductEditor/RemoveVariation/?childProductId=" + encodeURIComponent(variantProductId) + "&defaultProductId=" + encodeURIComponent(self.defaultProductId), axiosConfig)
                .then(function (response) {
                    var msg = "'Variation removed failed!";
                    var isValid = false;
                    if (response != null && response.data) {
                        if (response.data.isValid) {
                            isValid = true;
                            window.location.reload();
                        }
                        msg = response.data.message;
                    }
                    if (isValid) {
                        Vue.toasted.show(msg, { type: 'success', duration: 3000, dismissible: true });
                    }
                    else {
                        Vue.toasted.show(msg + ' !!!', { type: 'error', duration: 3000, dismissible: true });
                    }
                });
        }
    }
});
