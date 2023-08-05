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
                sectionVariantbasicinfo: null,
                sectionVariationslevel2: null,
                sectionDescription: null,
                sectionImages: null,
                sectionIdentifiers: null,
                sectionVariantPricing: null,
                sectionCompleteness: null,
                sectionInventory: null,
                sectionDimensions: null,
                sectionBundles: null,
                sectionbundleConfig: null,
                sectionPersonalisation: null,
                sectionPurchasability: null,
                sectionDomainsvariants: null,
                sectionAdvPurchaseDatareadonly: null,
                sectionVariantAttributes: null,
                sectionChannels: null,
                productChangeLog: ""
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
            stockCode: '',
            productName: '',
            productVariantGroupCode: '',
            isDomainVisible: false,
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
            isAddInProgress: false,
            defaultPricing: { isPricelistDynamic: true },
            sameAsMaster: true,
            sameAsMasterConfig: true,
            sizeLevelEdit: false,
            showVariantSection: false,
            masterProductId: "",
            masterProductStockCode: ""
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
        var result = [getParameterByName("id", window.location.href)];
        if (result[0]) {
            self.productId = result[0];
            self.isAdvancedFeatureEnabled = advPurchaseFeatureToggle;
            self.isPricingViewEnabled = hasPricingEditPermission;
            self.isDomainVisible = domainEnabled;
            directAxios()
                .get("/ProductEditor/GetVariantProductDetail/" + result[0])
                .then(function (response) {
                    var product = response.data;

                    self.productChangeLog = JSON.stringify(product);

                    if (enableSizeLevelEdit)
                        self.sizeLevelEdit = product.basicInfo.sizeLevelEdit;

                    //Set the title of the page with stock code and name of product 
                    document.title = product.basicInfo.stockCode + ' - ' + product.basicInfo.name;
                    if (!self.sizeLevelEdit)
                        document.getElementById("activeProductName").innerHTML = product.basicInfo.name + ' (' + product.basicInfo.stockCode + ')';
                    else
                        document.getElementById("activeProductName").innerHTML = product.basicInfo.productVariantGroupCode;
                    
                    document.getElementById("activeSku").innerHTML = product.basicInfo.stockCode;
                    document.getElementById("activeSkuMobile").innerHTML = product.basicInfo.stockCode;
                    if (product.basicInfo.productVariantGroupCode != null && product.basicInfo.productVariantGroupCode != "") {
                        document.getElementById("activeSku").innerHTML = product.basicInfo.productVariantGroupCode;
                        document.getElementById("activeSkuMobile").innerHTML = product.basicInfo.productVariantGroupCode;
                    }
                    //if (product.basicInfo.isVisible == false) {

                    //    document.getElementById("activeProductUrl").href = domainURL + "preview/" + product.seo.url;
                    //} else {
                    //    document.getElementById("activeProductUrl").href = domainURL + product.seo.url;
                    //}

                    
                    self.showVariantSection = self.sizeLevelEdit;

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

                    document.getElementById("masterProductStockCode").innerHTML = self.masterProductStockCode;
                    var masterProductLink = document.getElementById('masterProductLink');
                    masterProductLink.href = "/ProductEditor/EditProduct?id=" + self.masterProductId;
                    
                    //Emit product to all templates
                    EventBus.$emit('product.loaded', product);

                    //Emit product to all templates
                    EventBus.$emit('price.sameAsMasterConfig', self.sameAsMasterConfig);

                });
        }
        else {
            self.isDomainVisible = domainEnabled;
        }
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
            //self.$refs.sectionBasic.validate();
            if (!self.sizeLevelEdit && !advPurchaseFeatureToggle && hasPricingViewPermission) { 
                self.$refs.sectionVariantPricing.validate();
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
            if (!self.sizeLevelEdit) {
                var desc = (self.isDescriptionEditEnabled) ? sections.sectionDescription.getModel() : [];
                var customAttrs = (self.isAttributesEditEnabled) ? sections.sectionVariantAttributes.getModel() : [];
                var media = (self.isImagesAndVideoEditEnabled) ? sections.sectionImages.getModel() : [];
            }
            var domainsList = (self.isDomainVisible == true && self.isDomainsEditEnabled) ? sections.sectionDomainsvariants.getModel() : [];
            var domainListByOrg = (self.isDomainVisible == true && self.isDomainsEditEnabled) ? sections.sectionDomainsvariants.domainListByOrg : [];
            // var priceinfo = sections.sectionbundleConfig.getModel() : [];
            var relaProducts = (self.isRelatedProductsEditEnabled) ? sections.sectionRelated.getModel() : [];
            debugger;

            var productModel = {
                id: self.productId,
                basicInfo: (!self.sizeLevelEdit) ? {
                    name: sections.sectionVariantbasicinfo.formModel.name,
                    colorCode: sections.sectionVariantbasicinfo.formModel.colorCode,
                    colorName: sections.sectionVariantbasicinfo.formModel.colorName,
                    description: (self.isDescriptionEditEnabled) ? desc.description : null, // not reading
                    shortDescription: (self.isDescriptionEditEnabled) ? desc.shortDescription : null, // not reading
                    notes: (self.isDescriptionEditEnabled) ? desc.notes : null, // not reading
                    stockCode: sections.sectionVariantbasicinfo.stockCode,
                    status: sections.sectionVariantbasicinfo.formModel.productStatus,
                    subStatusName: sections.sectionVariantbasicinfo.formModel.subStatusName,
                    extendedDescription: sections.sectionVariantbasicinfo.formModel.extendedDescription
                } : null,
                productLifecycleStep: sections.sectionVariantbasicinfo.productLifecycleStep,
                identifiers: (!self.sizeLevelEdit && self.isProductIdentifierEditEnabled) ? {
                    sku: sections.sectionIdentifiers.formModel.sku,
                    mpn: sections.sectionIdentifiers.formModel.mpn,
                    upcean: sections.sectionIdentifiers.formModel.upc,
                    gtn: sections.sectionIdentifiers.formModel.gtn
                } : null,
                custominfo: sections.sectionVariantbasicinfo.formModel.customfields,                
                media: (!self.sizeLevelEdit) ? media : null,
                defaultPricing: (!self.sizeLevelEdit && self.isAdvancedFeatureEnabled == false && self.isPricingEditEnabled == true) ? {
                    sellPrice: sections.sectionVariantPricing.formModel.sellPrice,
                    sellPriceExcVat: sections.sectionVariantPricing.formModel.sellPriceExcVat,
                    listPrice: sections.sectionVariantPricing.formModel.listPrice,
                    costPrice: sections.sectionVariantPricing.formModel.costPrice,
                    landingCost: sections.sectionVariantPricing.formModel.landingCost,
                    currencySymbol: "£",
                    currencyCode: "GBP",
                    originCountry: sections.sectionVariantPricing.formModel.originCountry,
                    sameAsMaster: sections.sectionVariantPricing.formModel.sameAsMaster,
                    taxClass: {
                        key: sections.sectionVariantPricing.formModel.taxClass
                    }
                } : null,
                customAttributes: (!self.sizeLevelEdit) ? customAttrs : null,
                //bundles: bundles,
                relatedProducts: relaProducts,
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
                purchasability: (self.isSellabilityEditEnabled) ? {
                    purchasabilityType: sections.sectionPurchasability.formModel.purchasabilityType,
                    preorder: {
                        enabled: false,
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
                domains: domainListByOrg,
                productVariantDomain: domainsList,
                SEO: (self.isSEOEditEnabled) ? {
                    name: sections.sectionSeo.formModel.seoName,
                    url: sections.sectionSeo.formModel.url,
                    metaTitle: sections.sectionSeo.formModel.metaTitle,
                    metaDescription: sections.sectionSeo.formModel.metaDescription,
                    metaKeywords: sections.sectionSeo.formModel.metaKeywords,
                    canonical: sections.sectionSeo.formModel.canonical,
                    hrefLang: sections.sectionSeo.formModel.hrefLang
                } : null
            };

            //console.log(JSON.stringify(productModel));
            //console.log(productModel);

            if (productModel != null) {
                if (self.isAddInProgress == false) {
                    self.isAddInProgress == true;

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

                    //Add New Product
                    axiosInstancePost()
                        .post('ProductEditor/UpdateVariantProductsInfo', productModel, axiosConfig)
                        .then(function (response) {
                            var data = response.data;
                            self.isAddInProgress == false;

                            if (data.isValid) {
                                //var url = PimUri + '?id=' + data.recordId;
                                self.productId = data.recordId;
                                //document.title = productModel.basicInfo.stockCode + ' - ' + productModel.basicInfo.name;
                                //document.getElementById("activeProductName").innerHTML = productModel.basicInfo.name + ' (' + productModel.basicInfo.stockCode + ')';
                                //window.location = url;
                                //history.pushState({}, "Product Saved", url)
                                EventBus.$emit('isLandingCostInserted', true);
                                Vue.toasted.show('Saved Successfully !!!', { type: 'success', duration: 3000, dismissible: true });
                                $(".show-loader").removeClass("disabled-loader");
                                window.location.href = PimUri + 'ProductEditor/VariantProduct?id=' + self.productId

                            }
                            else {

                                Vue.toasted.show(data.message + ' !!!', { type: 'error', duration: 3000, dismissible: true });
                                $(".show-loader").removeClass("disabled-loader"); $(".show-loader").removeClass("disabled-loader");
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