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
const dateFormat = "DD-MMM-YYYY";

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
                sectionPricing: null,
                sectionSupplier:null,
                sectionInventory: null,
                sectionAttributes: null,
                sectionCompleteness: null,
                sectionVariations: null,
                sectionDynamic: null,
                sectionRelated: null,
                sectionDimensions: null,
                sectionShipping: null,
                sectionPurchasability: null,
                sectionSeo: null,
                sectionGraph: null,
                sectionGiftwrapping: null,
                sectionBundles: null,
                sectionbundleConfig: null,
                sectionPersonalisation: null,
                sectionDomains: null,
                sectionAdvPurchaseDatareadonly: null,
                sectionFulfilment: null,
                sectionChannels: null,
                productChangeLog : ""
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
            productId: productId,
            isDomainVisible: domainEnabled,
            isProductLoaded: false,
            isAdvancedFeatureEnabled: advPurchaseFeatureToggle,
            //isPricingViewEnabled: hasPriceViewPermission,
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
            isDynamicCollectionsEditEnabled: hasDynamicCollectionsEditPermission,
            isRelatedProductsEditEnabled: hasRelatedProductsEditPermission,
            isBundlesEditEnabled: hasBundlesEditPermission,
            isSellabilityEditEnabled: hasSellabilityEditPermission,
            isSEOEditEnabled: hasSEOEditPermission,
            isGiftWrappingEditEnabled: hasGiftWrappingEditPermission,
            isChannelsEditEnabled: hasChannelsEditPermission,
            isDomainsEditEnabled: hasDomainsEditPermission,
            productType: false,
            isUpdateInProgress: false,
            sameAsMaster: false
        };
    },
    mounted() {
        var self = this;
        directAxios()
            .get('MasterData/GetMasterData?did=' + domainid)
            .then(function (response) {
                //Emit product to all templates
                EventBus.$emit('masterData.loaded', response.data);

            });

        if (productId != '') {
            var idRegex = /(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}/g;
            var result = [getParameterByName("id", window.location.href)];
            if (result[0]) {
                self.productId = result[0];
                self.isDomainVisible = domainEnabled;
                self.isProductLoaded = true;
                self.isAdvancedFeatureEnabled = advPurchaseFeatureToggle;
                self.isPricingViewEnabled = hasPricingEditPermission;
                directAxios()
                    .get("/ProductEditor/ProductDetail/" + result[0])
                    .then(function (response) {
                        var product = response.data;

                        self.productChangeLog = JSON.stringify(product);

                        //Set the title of the page with stock code and name of product 
                        document.title = product.basicInfo.stockCode + ' - ' + product.basicInfo.name;
                        document.getElementById("activeProductName").innerHTML = product.basicInfo.name + ' (' + product.basicInfo.stockCode + ')';
                        document.getElementById("activeSku").innerHTML = product.basicInfo.stockCode;
                        document.getElementById("activeSkuMobile").innerHTML = product.basicInfo.stockCode;
                        if (product.basicInfo.isVisible == false) {

                            document.getElementById("activeProductUrl").href = domainURL + "preview/" + product.seo.url;
                        } else {
                            document.getElementById("activeProductUrl").href = domainURL + product.seo.url;
                        }
                        self.productType = product.basicInfo.productType == "7" ? true : false;

                        //productType 1 = Product
                        //productType 7 = Bundle
                        //productType 8 = DynamicBundle
                        if (product.basicInfo.productType == "1" | product.basicInfo.productType == "7" | product.basicInfo.productType == "8") {
                            $('#li_GiftWrap').show();
                            $('#gift').show();
                        }
                        else {
                            $('#li_GiftWrap').hide();
                            $('#gift').hide();
                        }


                        //Emit product to all templates
                        EventBus.$emit('product.loaded', product);



                        //Emit product name to SEO
                        EventBus.$emit('loadedproduct.name', product.basicInfo.name);

                        setTimeout(function () {
                            if (self.productType == true) {
                                EventBus.$emit("bundleInfo.bundle", product);
                            }
                        }, 2000);
                    });
            }
            else {
                self.isDomainVisible = domainEnabled;
            }
        }

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
                    }
                });
            });

            window.Promise.all(validationArray).then((v) => {
                this.doPost();
            }).catch(() => {
                //alert(this.errors.items.map(e => e.msg));
                this.errors.items.map(e => Vue.toasted.show(e.msg, { type: 'error', duration: 4000, dismissible: true }));
            });

            //Reset validator this.$validator.reset();
            //Check required sections for highlighting the 
            self.$refs.sectionBasic.validate();
            if (advPurchaseFeatureToggle == false && hasPriceViewPermission==true) {
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
            var a = [];
            var dynCollectionObject = [];
            if (self.isDynamicCollectionsEditEnabled) {
                for (var i = 0; i < sections.sectionDynamic.dynamicCollectionsSelected.length; i++) {
                    dynCollectionObject.push({ key: sections.sectionDynamic.dynamicCollectionsSelected[i], value: '' })
                }
            }
            var desc = (self.isDescriptionEditEnabled) ? sections.sectionDescription.getModel() : [];
            //var deliveryNotesObj = sections.sectionShipping.getModel();
            var customAttrs = (self.isAttributesEditEnabled) ? sections.sectionAttributes.getModel() : [];
            var variations = (self.isVariationsEditEnabled) ? sections.sectionVariations.getModel() : [];
            var bundles = (self.productType == false && sections.sectionBundles != undefined && sections.sectionBundles != null) ? sections.sectionBundles.getModel() : [];
            var media = (self.isImagesAndVideoEditEnabled) ? sections.sectionImages.getModel() : [];
            //console.log(media);
            var domainsList = (self.isDomainVisible == true && self.isDomainsEditEnabled) ? sections.sectionDomains.getModel() : [];
            var relaProducts = (self.isRelatedProductsEditEnabled) ? sections.sectionRelated.getModel() : [];
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
                    status: sections.sectionBasic.formModel.productStatus,
                    subStatusId: sections.sectionBasic.formModel.subStatusId,
                    subStatusName: sections.sectionBasic.formModel.subStatusName,
                    status: sections.sectionBasic.formModel.productStatus,
                    categories: basicInfoCategoryList,
                    brand: {
                        key: sections.sectionBasic.formModel.brand
                    },
                    subBrand: {
                        key: sections.sectionBasic.formModel.subBrand
                    },
                    //isVisible: sections.sectionBasic.formModel.isVisible,
                    description: (self.isDescriptionEditEnabled) ? desc.description : null, // not reading
                    shortDescription: (self.isDescriptionEditEnabled) ? desc.shortDescription : null, // not reading
                    notes: (self.isDescriptionEditEnabled) ? desc.notes : null, // not reading
                    productCode: sections.sectionBasic.formModel.productCode,
                    dropId: sections.sectionBasic.formModel.dropId,
                    isForPDLC: sections.sectionBasic.formModel.isForPDLC,
                    tariffCode: (self.isSuppliersEditEnabled) ? sections.sectionSupplier.selectedHSNCode : null,
                    originCountry: (self.isSuppliersEditEnabled) ? sections.sectionSupplier.formModel.originCountry : null,
                    supplierId: (self.isSuppliersEditEnabled) ? sections.sectionSupplier.formModel.selectedSuppliers : null,
                    extendedDescription: sections.sectionBasic.formModel.extendedDescription
                },
                productLifecycleStep: sections.sectionBasic.productLifecycleStep,
                identifiers: (self.isProductIdentifierEditEnabled) ? {
                    sku: sections.sectionIdentifiers.formModel.sku,
                    mpn: sections.sectionIdentifiers.formModel.mpn,
                    upcean: sections.sectionIdentifiers.formModel.upc,
                    gtn: sections.sectionIdentifiers.formModel.gtn,
                    barcode: sections.sectionIdentifiers.formModel.barCode
                } : { sku: sections.sectionBasic.formModel.stockCode },
                custominfo: sections.sectionBasic.formModel.customfields,
                media: media,
                defaultPricing: (self.isAdvancedFeatureEnabled == false && self.isPricingViewEnabled == true && self.sameAsMaster == false) ? {
                    sellPrice: sections.sectionPricing.formModel.sellPrice,
                    sellPriceExcVat: sections.sectionPricing.formModel.sellPriceExcVat,
                    listPrice: sections.sectionPricing.formModel.listPrice,
                    costPrice: sections.sectionPricing.formModel.costPrice,
                    landingCost: sections.sectionPricing.formModel.landingCost,
                    currencySymbol: "£",
                    currencyCode: "GBP",
                    taxClass: {
                        key: sections.sectionPricing.formModel.taxClass
                    },
                    isPricelistDynamic: sections.sectionPricing.formModel.isPricelistDynamic
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
                dynamicCollections: dynCollectionObject,
                relatedProducts: [],
                dimensions: {
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
                //shippingInfo: {
                //    deliveryNote: deliveryNotesObj.deliveryNotes,
                //    isFreeShipping: sections.sectionShipping.formModel.isFreeShipping,
                //    shippingTypes: sections.sectionShipping.shippingMethods.map(x => {
                //        return {
                //            shippingMethodType: x.name,
                //            isSelected: x.selected,
                //            shippingMethodTypeId: x.id
                //        };
                //    }),
                //    packageDimensions: {
                //        widthCm: sections.sectionShipping.formModel.packageWidth,
                //        heightCm: sections.sectionShipping.formModel.packageHeight,
                //        depthCm: sections.sectionShipping.formModel.packageDepth,
                //        weightKg: sections.sectionShipping.formModel.packageWeight
                //    },
                //    additionalShippingFees: sections.sectionShipping.formModel.additionalShippingFees,
                //},
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
                giftWrap: (self.isGiftWrappingEditEnabled) ? {
                    giftWrapTypes: (sections.sectionGiftwrapping.formModel.type != 0) ? sections.sectionGiftwrapping.formModel.giftWrapType : 0,
                    giftWrapSettings: sections.sectionGiftwrapping.formModel.type,
                    selectedGiftWraps: (sections.sectionGiftwrapping.formModel.type == 2) ? sections.sectionGiftwrapping.giftWrapOptions.map(x => {
                        return {
                            giftWrap: x.name,
                            isSelected: x.selected,
                            giftWrapId: x.id
                        };
                    }) : null
                } : null,
                SEO: (self.isSEOEditEnabled) ? {
                    name: sections.sectionSeo.formModel.seoName,
                    url: sections.sectionSeo.formModel.url,
                    metaTitle: sections.sectionSeo.formModel.metaTitle,
                    metaDescription: sections.sectionSeo.formModel.metaDescription,
                    metaKeywords: sections.sectionSeo.formModel.metaKeywords,
                    canonical: sections.sectionSeo.formModel.canonical,
                    hrefLang: sections.sectionSeo.formModel.hrefLang
                } : null,
                purchasability: (self.isSellabilityEditEnabled) ? {
                    purchasabilityType: sections.sectionPurchasability.formModel.purchasabilityType,
                    preorder: {
                        enabled: (sections.sectionPurchasability.formModel.purchasabilityType == 2) ? true : false,
                        shortMessage: sections.sectionPurchasability.formModel.preorder.shortMessage,
                        launchDate: sections.sectionPurchasability.formModel.preorder.launchDate,
                        maxStock: sections.sectionPurchasability.formModel.preorder.maxStock,
                        currentStock: sections.sectionPurchasability.formModel.preorder.currentStock,
                    },
                    minPurchaseQty: sections.sectionPurchasability.formModel.minPurchaseQty,
                    maxPurchaseQty: sections.sectionPurchasability.formModel.maxPurchaseQty,
                    sellableType: sections.sectionPurchasability.formModel.sellableType,
                    itemPerCarton: sections.sectionPurchasability.formModel.itemPerCarton,
                } : null,
                domains: domainsList,
                relatedProducts: relaProducts,
                advancedPurchaseData: (self.isAdvancedFeatureEnabled == true) ? {
                    //isAdvancedPurchaseFeatureEnabled: self.isAdvancedFeatureEnabled,
                    //costPriceExFactory: sections.sectionAdvPurchaseDatareadonly.formModel.advPurchCostExFac,
                    //exchangeRate: sections.sectionAdvPurchaseDatareadonly.formModel.advPurchExRate,
                    //costPrice: sections.sectionAdvPurchaseDatareadonly.formModel.advPurchCostPrice,
                    //freight: sections.sectionAdvPurchaseDatareadonly.formModel.advPurchFreight,
                    //dutyableCost: sections.sectionAdvPurchaseDatareadonly.formModel.advPurchDutyableCost,
                    //dutyCharges: sections.sectionAdvPurchaseDatareadonly.formModel.advPurchDutyCharges,
                    //insurance: sections.sectionAdvPurchaseDatareadonly.formModel.advPurchInsurance,
                    //costQC1: sections.sectionAdvPurchaseDatareadonly.formModel.advPurchCostQC1,
                    //costQC2: sections.sectionAdvPurchaseDatareadonly.formModel.advPurchCostQC2,
                    //cost1: sections.sectionAdvPurchaseDatareadonly.formModel.advPurchCost1,
                    //cost2: sections.sectionAdvPurchaseDatareadonly.formModel.advPurchCost2,
                    //defectsProvision: sections.sectionAdvPurchaseDatareadonly.formModel.advPurchDefectsProvision,
                    //LandingCostIncludingQC: sections.sectionAdvPurchaseDatareadonly.formModel.advPurchLandingCostIncludingQC,
                    //rrp: sections.sectionAdvPurchaseDatareadonly.formModel.advPurchRRP,
                    //minimumOrderQuantity: sections.sectionAdvPurchaseDatareadonly.formModel.advPurchMinimumOrderQuantity,
                    //reorderLevel: sections.sectionAdvPurchaseDatareadonly.formModel.advPurchReorderLevel,
                    //reorderQty: sections.sectionAdvPurchaseDatareadonly.formModel.advPurchReorderQty,
                    //leadTime: sections.sectionAdvPurchaseDatareadonly.formModel.advPurchLeadTime,
                    //countryCode: sections.sectionAdvPurchaseDatareadonly.formModel.selectedCountry,
                    //currencyCode: sections.sectionAdvPurchaseDatareadonly.formModel.selectedCurrency,
                    //currencySymbol: sections.sectionAdvPurchaseDatareadonly.formModel.selectedCurrSymbol,
                    //landingCostFormula: sections.sectionAdvPurchaseDatareadonly.formModel.advPurchLandingCostFormula,
                    //supplierId: sections.sectionAdvPurchaseDatareadonly.formModel.selectedSupplier,
                    //sellPrice: sections.sectionAdvPurchaseDatareadonly.formModel.sellPrice,
                    //taxClass: {
                    //    key: sections.sectionAdvPurchaseDatareadonly.formModel.taxClass
                    //} 
                } : null
                //fulfilment: {
                //    fulfilFromWarehouse: sections.sectionFulfilment.formModel.fulfilFromWarehouse,
                //    fulfilFromStore: sections.sectionFulfilment.formModel.fulfilFromStore,
                //    fulfilFromSupplier: sections.sectionFulfilment.formModel.fulfilFromSupplier,
                //    fulfilFromWarehouseDays: (sections.sectionFulfilment.formModel.fulfilFromWarehouse == true) ? sections.sectionFulfilment.formModel.fulfilFromWarehouseDays : 0,
                //    fulfilFromSupplierDays: (sections.sectionFulfilment.formModel.fulfilFromSupplier == true) ? sections.sectionFulfilment.formModel.fulfilFromSupplierDays : 0,
                //    fulfilFromStoreDays: (sections.sectionFulfilment.formModel.fulfilFromStore == true) ? sections.sectionFulfilment.formModel.fulfilFromStoreDays : 0
                //}
            };

            if (productModel != null) {
              
                if (self.isUpdateInProgress == false) {
                    self.isUpdateInProgress = true;

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
                        .post('ProductEditor/UpsertProduct', productModel, axiosConfig)
                        .then(function (response) {
                            var data = response.data;
                            self.isUpdateInProgress = false;
                            if (data.isValid) {
                                $(".show-loader").removeClass("disabled-loader");
                                //var url = PimUri + 'ProductEditor/EditProduct?id=' + data.recordId;
                                self.productId = data.recordId;
                                document.title = productModel.basicInfo.stockCode + ' - ' + productModel.basicInfo.name;
                                document.getElementById("activeProductName").innerHTML = productModel.basicInfo.name + ' (' + productModel.basicInfo.stockCode + ')';
                                //window.location = url;
                                //history.pushState({}, "Product Updated", url)
                                EventBus.$emit('isLandingCostInserted', true);
                                Vue.toasted.show(data.message, { type: 'success', duration: 3000, dismissible: true });
                                setTimeout(function () {
                                    window.location.reload();
                                }, 4000);
                            }
                            else {
                                $(".show-loader").removeClass("disabled-loader");
                                Vue.toasted.show(data.message + ' !!!', { type: 'error', duration: 3000, dismissible: true });
                                self.isUpdateInProgress = false;
                            }

                        })
                        .catch(function (error) {
                            var errorMessage = error;
                            $(".show-loader").removeClass("disabled-loader");
                            Vue.toasted.show('Please Validate all the Changes !!!', { type: 'error', duration: 3000, dismissible: true });
                            self.isUpdateInProgress = false;
                        });
                }
            }
        }
    }
})
Vue.config.devtools = true;