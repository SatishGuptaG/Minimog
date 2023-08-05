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
                sectionDescription: null,
                sectionImages: null,
                sectionIdentifiers: null,
                sectionVariantPricing: null,
                //sectionVariationslevel2: null,
                sectionDimensions: null,
                sectionBundles: null,
                sectionbundleConfig: null,
                sectionAdvPurchaseDatareadonly: null,
                sectionVariantAttributes: null
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
            //isPricingViewEnabled: hasPriceViewPermission,
            isBasicInfoEditEnabled: hasBasicInfoEditPermission,
            isDescriptionEditEnabled: hasDescriptionEditPermission,
            isProductIdentifierEditEnabled: hasProductIdentifierEditPermission,
            isImagesAndVideoEditEnabled: hasImagesAndVideoEditPermission,
            isAttributesEditEnabled: hasAttributesEditPermission,
            isPricingEditEnabled: hasPricingEditPermission,
            productType: false,
            isAddInProgress: false,
            defaultPricing: { isPricelistDynamic: true },
            sameAsMaster: true,
            sameAsMasterConfig: true,
            masterProductId: "",
            masterProductStockCode: "",
            productVariantGroupCode: ""
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
                    //Set the title of the page with stock code and name of product 
                    document.title = product.basicInfo.stockCode + ' - ' + product.basicInfo.name;
                    document.getElementById("activeProductName").innerHTML = product.basicInfo.name + ' (' + product.basicInfo.stockCode + ')';
                    document.getElementById("activeSku").innerHTML = product.basicInfo.stockCode;
                    document.getElementById("activeSkuMobile").innerHTML = product.basicInfo.stockCode;
                    //if (product.basicInfo.productVariantGroupCode != null && product.basicInfo.productVariantGroupCode != "") {
                    //    document.getElementById("activeSku").innerHTML = product.basicInfo.productVariantGroupCode;
                    //    document.getElementById("activeSkuMobile").innerHTML = product.basicInfo.productVariantGroupCode;
                    //}
                    //if (product.basicInfo.isVisible == false) {

                    //    document.getElementById("activeProductUrl").href = domainURL + "preview/" + product.seo.url;
                    //} else {
                    //    document.getElementById("activeProductUrl").href = domainURL + product.seo.url;
                    //}

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
                    document.getElementById("productVariantGroupCode").innerHTML = product.basicInfo.productVariantGroupCode;
                    var masterProductLink = document.getElementById('masterProductLink');
                    masterProductLink.href = "/ProductEditor/EditProduct?id=" + self.masterProductId;
                    var productVariantGroupCodeLink = document.getElementById('productVariantGroupCodeLink');
                    productVariantGroupCodeLink.href = "/ProductEditor/VariantProduct?id=" + self.productId;

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
            if (advPurchaseFeatureToggle == false && hasPriceViewPermission == true) {
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
            var desc = (self.isDescriptionEditEnabled) ? sections.sectionDescription.getModel() : [];
            var customAttrs = (self.isAttributesEditEnabled) ? sections.sectionVariantAttributes.getModel() : [];
            var media = (self.isImagesAndVideoEditEnabled) ? sections.sectionImages.getModel() : [];
            var productModel = {
                id: self.productId,
                basicInfo: {
                    name: sections.sectionVariantbasicinfo.formModel.name,
                    colorCode: sections.sectionVariantbasicinfo.formModel.colorCode,
                    colorName: sections.sectionVariantbasicinfo.formModel.colorName,
                    description: (self.isDescriptionEditEnabled) ? desc.description : null, // not reading
                    shortDescription: (self.isDescriptionEditEnabled) ? desc.shortDescription : null, // not reading
                    notes: (self.isDescriptionEditEnabled) ? desc.notes : null, // not reading
                    stockCode: sections.sectionVariantbasicinfo.stockCode,
                    status: sections.sectionVariantbasicinfo.formModel.productStatus,
                    extendedDescription: sections.sectionVariantbasicinfo.formModel.extendedDescription
                },
                identifiers: (self.isProductIdentifierEditEnabled) ? {
                    sku: sections.sectionIdentifiers.formModel.sku,
                    mpn: sections.sectionIdentifiers.formModel.mpn,
                    upcean: sections.sectionIdentifiers.formModel.upc,
                    gtn: sections.sectionIdentifiers.formModel.gtn
                } : null,
                //custominfo: sections.sectionBasic.formModel.customfields,
                media: media,
                defaultPricing: (self.isAdvancedFeatureEnabled == false && self.isPricingEditEnabled == true) ? {
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
                customAttributes: customAttrs
            };

            //console.log(JSON.stringify(productModel));
            //console.log(productModel);

            if (productModel != null) {
                if (self.isAddInProgress == false) {
                    self.isAddInProgress == true;
                    //Add New Product
                    axiosInstancePost()
                        .post('ProductEditor/UpdateVariantLevel2ProductsInfo', productModel, axiosConfig)
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
                                window.location.href = PimUri + 'ProductEditor/VariantProductLevel2?id=' + self.productId

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