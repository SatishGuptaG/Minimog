function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
const axiosInstancePost = function () {
    const getBaseUrl = function () {
        return PimUri;
    };

    const axiosObject = axios.create({
        baseURL: getBaseUrl(),
        timeout: 30000
    });
    return axiosObject;
};
const axiosConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
};

const dateTimeFormat = "DD-MMM-YYYY HH:mm";

const EventBus = new Vue();

new Vue({
    el: '#app_main',
    data() {
        return {

            message: {
                sectionBasic: null,
                sectionDescription: null,
                sectionImages: null,
                sectionIdentifiers: null,
                sectionSupplier:null,
                sectionPricing: null,
                sectionInventory: null,
                sectionAttributes: null,
                sectionVariations: null,
                sectionDimensions: null,
                sectionBundles: null,
                sectionbundleConfig: null,
                sectionPersonalisation: null,
                sectionDomains: null,
                sectionAdvPurchaseData: null
            },
            validSections: [],

            postForm: {
                basic: {
                    cb_visibleOnStore: false
                }
            },

            editData: {
                sectionDescription: {
                    shortDescription: "test",
                    notes: "test",
                    description: "test"
                }
            },
            errorMessages: [],
            productId: '',
            isDomainVisible: false,
            isProductLoaded: false,
            isAdvancedFeatureEnabled: advPurchaseFeatureToggle,
            isBasicInfoEditEnabled: hasBasicInfoEditPermission,
            isDescriptionEditEnabled: hasDescriptionEditPermission,
            isProductIdentifierEditEnabled: hasProductIdentifierEditPermission,
            isImagesAndVideoEditEnabled: hasImagesAndVideoEditPermission,
            isDimensionsEditEnabled: hasDimensionsEditPermission,
            isAttributesEditEnabled: hasAttributesEditPermission,
            isSuppliersEditEnabled: hasSuppliersEditPermission,
            isPricingEditEnabled: hasPricingEditPermission,
            isInventoryAndFulfilmentEditEnabled: hasInventoryAndFulfilmentEditPermission,
            isVariationsEditEnabled: hasVariationsEditPermission,
            productType: false,
            itemTypeGiftWrapNo: false,
            isAddInProgress: false,
            defaultPricing: { isPricelistDynamic: true },
            sameAsMaster: false
        };
    },
    mounted() {
        var self = this;
        
        self.isDomainVisible = false;
        self.itemTypeGiftWrapNo = false;
        directAxios()
            .get('MasterData/GetMasterData?did=' + domainid)
            .then(function (response) {
                //Emit product to all templates
                EventBus.$emit('masterData.loaded', response.data);

            });
        EventBus.$on("index.productType", function (data) {
            self.productType = data.productType == "7" ? true : false;
        });
    },
    computed: {
        sectionClass: function () {
            var self = this;
            return function (name) {
                var result = self.sectionValidationResult(name);
                return {
                    'active': result == 1,    //active active-fill
                    'active-fill-not': result == 2
                };
            };
        }
    },
    methods: {
        sectionValidationResult: function (sectionName) {
            var validationEntry = this.validSections.find(item => item.name == sectionName);
            if (validationEntry == null) {
                return 0; //na
            }
            //1: passed 2 : failed
            return validationEntry.result ? 1 : 2;

        },
        updateValidation: function (sectionName, validationResult) {

            var self = this;
            var validationEntry = self.validSections.find(item => item.name == sectionName);
            if (validationEntry != null) {
                self.validSections.splice(self.validSections.indexOf(validationEntry), 1);
            }

            self.validSections.push({
                name: sectionName,
                result: validationResult
            });
        },
        validateAndPost: function () {
            var self = this; 
            var validationArray = this.$children.map(function (child) {
                return child.$validator.validateAll().then(result => {
                    if (!result) {
                        this.errorMessages = this.errors.items.map(e => e.msg);
                        //$(".show-loader").removeClass("disabled-loader");
                    }
                });
            });

            window.Promise.all(validationArray).then((v) => {
                this.doPost();
            }).catch(() => {
                //alert(this.errors.items.map(e => e.msg));
                this.errors.items.map(e => Vue.toasted.show(e.msg, { type: 'error', duration: 4000, dismissible: true }));
                $(".show-loader").removeClass("disabled-loader");
            });
            //Reset validator this.$validator.reset();

            //Check required sections for highlighting the 
            self.$refs.sectionBasic.validate();
            if (advPurchaseFeatureToggle == false && self.isPricingEditEnabled) {
                self.$refs.sectionPricing.validate();
            }
            //for (let [key, value] of Object.entries(self.$refs)) {
            //    if (typeof (value.validate) != 'undefined') {
            //        value.validate()
            //    }
            //}

        },
        doPost: function () {
            $(".show-loader").addClass("disabled-loader");
            var sections = this.$refs;
            var self = this;
            var desc = (self.isDescriptionEditEnabled) ? sections.sectionDescription.getModel() : [];
            var customAttrs = (self.isAttributesEditEnabled) ? sections.sectionAttributes.getModel() : [];
            var variations = (self.isVariationsEditEnabled) ? sections.sectionVariations.getModel() : [];
            var bundles = (self.productType == false && sections.sectionBundles != undefined && sections.sectionBundles != null) ? sections.sectionBundles.getModel() : [];
            var media = (self.isImagesAndVideoEditEnabled) ? sections.sectionImages.getModel() : [];
            var domainsList = (self.isDomainVisible == true) ? sections.sectionDomains.getModel() : [];
            var basicInfoCategoryList = [];
            //basicInfoCategoryList.push({ key: sections.sectionBasic.formModel.selectedCategory });
            for (var i = 0; i < sections.sectionBasic.formModel.selectedCategory.length; i++) {
                for (var j = 0; j < sections.sectionBasic.categoryTreeList.length; j++) {
                    if (sections.sectionBasic.formModel.selectedCategory[i].toString() == sections.sectionBasic.categoryTreeList[j].recordId.toString()) {
                        var categoryIID = sections.sectionBasic.categoryTreeList[j].iid;
                        basicInfoCategoryList.push({ key: sections.sectionBasic.formModel.selectedCategory[i], value: categoryIID });
                    } else {
                        var subcategories = sections.sectionBasic.categoryTreeList[j].subCategories;
                        if (subcategories != null) {
                            for (var k = 0; k < subcategories.length; k++) {
                                if (sections.sectionBasic.formModel.selectedCategory[i].toString() == subcategories[k].recordId.toString()) {
                                    var categoryIIDvalue = subcategories[k].iid;
                                    basicInfoCategoryList.push({ key: sections.sectionBasic.formModel.selectedCategory[i], value: categoryIIDvalue });
                                }
                                else {
                                    var subcategories2 = subcategories[k].subCategories;
                                    if (subcategories2 != null) {
                                        for (var l = 0; l < subcategories2.length; l++) {
                                            if (sections.sectionBasic.formModel.selectedCategory[i].toString() == subcategories2[l].recordId.toString()) {
                                                var categoryIIDvalue2 = subcategories2[l].iid;
                                                basicInfoCategoryList.push({ key: sections.sectionBasic.formModel.selectedCategory[i], value: categoryIIDvalue2 });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //var bundleCon = (self.productType == true) ? sections.sectionbundleConfig.getModel() : [];
            var productModel = {
                id: self.productId,
                basicInfo: {
                    name: sections.sectionBasic.formModel.name,
                    stockCode: sections.sectionBasic.formModel.stockCode,
                    productType: sections.sectionBasic.formModel.productType,
                    gender: sections.sectionBasic.formModel.gender,
                    productFamilyId: sections.sectionBasic.formModel.productFamilyId,
                    productFamilyName: sections.sectionBasic.formModel.productFamily,
                    keywords: sections.sectionBasic.formModel.keywords,
                    categories: basicInfoCategoryList,
                    brand: {
                        key: sections.sectionBasic.formModel.brand
                    },
                    subBrand: {
                        key: sections.sectionBasic.formModel.subBrand
                    },
                    isVisible: sections.sectionBasic.formModel.isVisible,
                    description: (self.isDescriptionEditEnabled) ? desc.description : null, // not reading
                    shortDescription: (self.isDescriptionEditEnabled) ? desc.shortDescription : null, // not reading
                    notes: (self.isDescriptionEditEnabled) ? desc.notes : null, // not reading
                    productCode: sections.sectionBasic.formModel.productCode,
                    dropId: sections.sectionBasic.formModel.dropId,
                    isForPDLC: sections.sectionBasic.formModel.isForPDLC,
                    tariffCode: (self.isSuppliersEditEnabled) ? sections.sectionSupplier.selectedHSNCode : null,
                    originCountry: (self.isSuppliersEditEnabled) ? sections.sectionSupplier.formModel.originCountry : null,
                    supplierId: (self.isSuppliersEditEnabled) ? sections.sectionSupplier.formModel.selectedSuppliers : null
                },
                identifiers: (self.isProductIdentifierEditEnabled) ? {
                    sku: sections.sectionIdentifiers.formModel.sku,
                    mpn: sections.sectionIdentifiers.formModel.mpn,
                    upcean: sections.sectionIdentifiers.formModel.upc,
                    gtn: sections.sectionIdentifiers.formModel.gtn,
                    barcode: sections.sectionIdentifiers.formModel.barCode
                } : { sku: sections.sectionBasic.formModel.stockCode },
                custominfo: sections.sectionBasic.formModel.customfields,
                media: media,
                defaultPricing: (self.isAdvancedFeatureEnabled == false && self.isPricingEditEnabled == true) ? {
                    sellPrice: sections.sectionPricing.formModel.sellPrice,
                    sellPriceExcVat: sections.sectionPricing.formModel.sellPriceExcVat,
                    listPrice: sections.sectionPricing.formModel.listPrice,
                    costPrice: sections.sectionPricing.formModel.costPrice,
                    landingCost: sections.sectionPricing.formModel.landingCost,
                    currencySymbol: "£",
                    currencyCode: "GBP",
                    taxClass: {
                        key: sections.sectionPricing.formModel.taxClass
                    }
                } : null,
                customAttributes: customAttrs,
                variants: variations,
                bundles: bundles,
                inventory: (self.isInventoryAndFulfilmentEditEnabled) ? [{
                    sellWithoutInventory: !sections.sectionInventory.formModel.trackInventory,
                    stockOnHand: sections.sectionInventory.formModel.currentStock,
                    fulfilFromWarehouse: sections.sectionInventory.formModel.fulfilFromWarehouse,
                    fulfilFromStore: sections.sectionInventory.formModel.fulfilFromStore,
                    fulfilFromSupplier: sections.sectionInventory.formModel.fulfilFromSupplier,
                    fulfilFromWarehouseDays: (sections.sectionInventory.formModel.fulfilFromWarehouse == true) ? sections.sectionInventory.formModel.fulfilFromWarehouseDays : 0,
                    fulfilFromSupplierDays: (sections.sectionInventory.formModel.fulfilFromSupplier == true) ? sections.sectionInventory.formModel.fulfilFromSupplierDays : 0,
                    fulfilFromStoreDays: (sections.sectionInventory.formModel.fulfilFromStore == true) ? sections.sectionInventory.formModel.fulfilFromStoreDays : 0
                }] : [],
                dimensions:  {
                    uom: (self.isDimensionsEditEnabled) ? sections.sectionDimensions.formModel.uom : null,
                    weight: {
                        key: "kg",
                        value: (self.isDimensionsEditEnabled) ? sections.sectionDimensions.formModel.weight : 0
                    },
                    height: {
                        key: "cm",
                        value: (self.isDimensionsEditEnabled) ? sections.sectionDimensions.formModel.height : 0
                    },
                    length: {
                        key: "cm",
                        value: (self.isDimensionsEditEnabled) ? sections.sectionDimensions.formModel.depth : 0
                    },
                    width: {
                        key: "cm",
                        value: (self.isDimensionsEditEnabled) ? sections.sectionDimensions.formModel.width : 0
                    }
                },
                bundleConfig: {
                    BundleType: sections.sectionBasic.formModel.bundleType,
                    BundleName: sections.sectionBasic.formModel.bundleName,
                    BundleStockCode: sections.sectionBasic.formModel.stockcode,
                    BundleDisplayType: sections.sectionBasic.formModel.displayType,
                    SellIndependently: sections.sectionBasic.formModel.sellIndependently,
                    IsUniqueStockCode: true,
                    ShowWhenAllComponentinStock: sections.sectionBasic.formModel.showWhenAllComponentinStock,
                    displayInBasket: sections.sectionBasic.formModel.displayInBasket,
                    PriceType: sections.sectionBasic.formModel.priceType,
                    BundlePrice: sections.sectionBasic.bundlePrice,
                    Components: sections.sectionBasic.bundleComponent
                },
                domains: domainsList,
                advancedPurchaseData: (self.isAdvancedFeatureEnabled == true && self.isPricingEditEnabled == true) ? {
                    isAdvancedPurchaseFeatureEnabled: self.isAdvancedFeatureEnabled,
                    costPriceExFactory: sections.sectionAdvPurchaseData.formModel.advPurchCostExFac,
                    exchangeRate: sections.sectionAdvPurchaseData.formModel.advPurchExRate,
                    costPrice: sections.sectionAdvPurchaseData.formModel.advPurchCostPrice,
                    freight: sections.sectionAdvPurchaseData.formModel.advPurchFreight,
                    dutyableCost: sections.sectionAdvPurchaseData.formModel.advPurchDutyableCost,
                    dutyCharges: sections.sectionAdvPurchaseData.formModel.advPurchDutyCharges,
                    insurance: sections.sectionAdvPurchaseData.formModel.advPurchInsurance,
                    costQC1: sections.sectionAdvPurchaseData.formModel.advPurchCostQC1,
                    costQC2: sections.sectionAdvPurchaseData.formModel.advPurchCostQC2,
                    cost1: sections.sectionAdvPurchaseData.formModel.advPurchCost1,
                    cost2: sections.sectionAdvPurchaseData.formModel.advPurchCost2,
                    defectsProvision: sections.sectionAdvPurchaseData.formModel.advPurchDefectsProvision,
                    LandingCostIncludingQC: sections.sectionAdvPurchaseData.formModel.advPurchLandingCostIncludingQC,
                    rrp: sections.sectionAdvPurchaseData.formModel.advPurchRRP,
                    minimumOrderQuantity: sections.sectionAdvPurchaseData.formModel.advPurchMinimumOrderQuantity,
                    reorderLevel: sections.sectionAdvPurchaseData.formModel.advPurchReorderLevel,
                    reorderQty: sections.sectionAdvPurchaseData.formModel.advPurchReorderQty,
                    leadTime: sections.sectionAdvPurchaseData.formModel.advPurchLeadTime,
                    countryCode: sections.sectionAdvPurchaseData.formModel.selectedCountry,
                    currencyCode: sections.sectionAdvPurchaseData.formModel.selectedCurrency,
                    currencySymbol: sections.sectionAdvPurchaseData.formModel.selectedCurrSymbol,
                    landingCostFormula: sections.sectionAdvPurchaseData.formModel.advPurchLandingCostFormula,
                    supplierId: sections.sectionAdvPurchaseData.formModel.selectedSupplier,
                    sellPrice: sections.sectionAdvPurchaseData.formModel.sellPrice,
                    taxClass: {
                        key: sections.sectionAdvPurchaseData.formModel.taxClass
                    }
                } : null
            };

            //console.log(JSON.stringify(productModel));
            console.log(productModel);

            if (productModel != null) {
                if (self.isAddInProgress == false) {
                    self.isAddInProgress == true;
                    //Add New Product
                    axiosInstancePost()
                        .post('ProductEditor/UpsertProduct', productModel, axiosConfig)
                        .then(function (response) {
                            var data = response.data;
                            self.isAddInProgress == false;

                            if (data.isValid) {
                                //var url = PimUri + '?id=' + data.recordId;
                                self.productId = data.recordId;
                                document.title = productModel.basicInfo.stockCode + ' - ' + productModel.basicInfo.name;
                                document.getElementById("activeProductName").innerHTML = productModel.basicInfo.name + ' (' + productModel.basicInfo.stockCode + ')';
                                //window.location = url;
                                //history.pushState({}, "Product Saved", url)
                                EventBus.$emit('isLandingCostInserted', true);
                                Vue.toasted.show('Saved Successfully !!!', { type: 'success', duration: 3000, dismissible: true });
                                $(".show-loader").removeClass("disabled-loader");
                                window.location.href = PimUri + 'ProductEditor/EditProduct?id=' + self.productId

                            }
                            else {
                                Vue.toasted.show(data.message + ' !!!', { type: 'error', duration: 3000, dismissible: true });
                                $(".show-loader").removeClass("disabled-loader");
                            }
                        })
                        .catch(function (error) {
                            var errorMessage = error;
                            Vue.toasted.show('Please Validate all the Changes !!!', { type: 'error', duration: 3000, dismissible: true });
                            $(".show-loader").removeClass("disabled-loader");
                        });
                }
            }
        }
    }
})
Vue.config.devtools = true;