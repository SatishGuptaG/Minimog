var selectedCountry = "";
var defaultCountry = "";
var defaultSymbol = "";
Vue.component("section-pricingvariant", {
    template: "#section-pricingvariant-template",
    data() {
        return {
            advancedPricingDisplayed: false,
            taxClassList: [{ name: '- Select -', value: '-1' }],
            taxClassListLoaded: false,
            pricelists: [],
            formModel: {
                sellPrice: "",
                costPrice: "",
                listPrice: "",
                sellPriceExcVat: "",
                landingCost: "",
                taxClass: '-1',
                applySamePricing: false,
                priceListName: "",
                isProductLoaded: false,
                originCountry: '',
                isPricelistDynamic: false,
                sameAsMaster: false,
                sameAsMasterConfig: false,
                wholeSalePricing: false,
                wholeSalepriceListId: '',
                hasPriceEditPermission: false
            },
            errorMessages: [],
            priceListLoaded: false,
            defaultPricing: {},
            isMultiPricing: false,
            allpricelist: [],
            productId: '',
            editMode: false,
            currencyCode: 'gbp',
            currencyClass: 'mdi mdi-currency-'
        };
    },
    props: ['message'],
    async beforeCreate() {
        var self = this;
        //var originCountries = await axiosInstance()
        //    .get('ProductEditor/GetMasterData?type=34&did=' + domainid)
        //    .then(function (response) {
        //        return response.data.items;
        //    });
        //if (originCountries != null && originCountries.length > 0) {
        //    self.originCountiresList = [];
        //    for (var i = 0; i < originCountries.length; i++) {
        //        if (originCountries[i].symbol != null) {
        //            self.originCountiresList.push({ text: originCountries[i].name, id: originCountries[i].code }); 
        //            if (originCountries[i].name == 'United Kingdom') {
        //                defaultCountry = originCountries[i].code;
        //                defaultSymbol = originCountries[i].symbol;
        //                selectedCountry = originCountries[i].code;
        //            }
        //        }
        //    }
        //}
        //DefaultPriceList
        //if (typeof productId === 'undefined') {
        //   var dynamicPriceList = await axiosInstance()
        //        .get('ProductEditor/GetDefaultPriceList?did=' + domainid)
        //        .then(function (response) {
        //            if (response.data != null) {
        //                return response.data;
        //            }
        //        });
        //    if (dynamicPriceList != null) {
        //        self.defaultPricing = dynamicPriceList;
        //        if (self.defaultPricing.isPricelistDynamic) {
        //            //self.formModel.priceListLoaded = true;
        //            //self.formModel.priceListName = self.defaultPricing.pricelist.value;
        //            self.formModel.isPricelistDynamic = self.defaultPricing.isPricelistDynamic;
        //            self.advancedPricingDisplayed = (self.defaultPricing.isPricelistDynamic == true) ? true : false;
        //        }
        //    }
        //}
    },
    mounted() {
        var self = this;
        if (this.message != undefined && this.message != null) {
            this.formModel = this.message;
        }
        EventBus.$on("masterData.loaded", function (masterData) {
            var info = masterData;
            var data = info.taxClass;
            self.taxClassList = [{ name: '- Select -', value: '-1' }];
            if (data != null) {
                for (var i = 0; i < data.length; i++) {
                    self.taxClassList.push({ name: data[i].name, value: data[i].recordId });
                }
            }
            self.taxClassListLoaded = true;
            if (self.taxClassListLoaded) {
                var txClass = self.taxClassList.filter(function (el) {
                    if (el.name === "Default Tax Class") {
                        return el;
                    }
                })
                if (txClass.length > 0) {
                    self.formModel.taxClass = txClass[0].value;
                }
            }
        });

        EventBus.$on("product.loaded", function (product) {
            if (product != null) {
                self.productId = product.id;
            }
            if (!product.defaultPricing)
                return;
            if (product.pricelists != null) {
                self.pricelists = product.pricelists.filter(function (item) {
                    return item.isPricelistDynamic == false;
                });
                if (self.pricelists != null && self.pricelists.length > 1) {
                    self.isMultiPricing = true;
                }
            }
            if (decimalvalues == null || decimalvalues == undefined) {
                decimalvalues = 0;
            }
            self.preSelectedCountry = product.defaultPricing.originCountry;

            if (self.taxClassListLoaded == false) {
                self.gettaxClasses();
                self.taxClassListLoaded = true;
                self.formModel.isProductLoaded = true;
                self.formModel.priceListLoaded = (product.defaultPricing.pricelist != null) ? true : false;
                self.formModel.priceListName = (product.defaultPricing.pricelist != null) ? product.defaultPricing.pricelist.value : "";
                self.formModel.sellPrice = parseFloat(product.defaultPricing.sellPrice).toFixed(decimalvalues);
                self.formModel.costPrice = parseFloat(product.defaultPricing.costPrice).toFixed(decimalvalues);
                self.formModel.listPrice = parseFloat(product.defaultPricing.listPrice).toFixed(decimalvalues);
                self.formModel.sellPriceExcVat = parseFloat(product.defaultPricing.sellPriceExcVat).toFixed(decimalvalues);
                self.formModel.landingCost = product.defaultPricing.landingCost;
                self.formModel.sameAsMaster = product.defaultPricing.sameAsMaster;
                self.formModel.isPricelistDynamic = product.defaultPricing.isPricelistDynamic;
                self.formModel.wholeSalepriceListId = product.defaultPricing.wholeSalePriceList;
                self.formModel.originCountry = product.defaultPricing.originCountry;
                self.advancedPricingDisplayed = (product.defaultPricing.isPricelistDynamic == true) ? true : false;
                for (var i = 0; i < self.taxClassList.length; i++) {
                    var current = self.taxClassList[i];
                    if (current.value == product.defaultPricing.taxClass.key) {
                        self.formModel.taxClass = product.defaultPricing.taxClass.key;
                    }
                }
                //if (self.formModel.wholeSalepriceListId != null && self.formModel.wholeSalepriceListId != '00000000-0000-0000-0000-000000000000') {
                //    self.formModel.isPricelistDynamic = true;
                //}
                //updating self.formModel.isPricelistDynamic as Flase to removed disabled from Pricing fields (Temporary fix , needs to be done later)
                self.formModel.isPricelistDynamic = false;
            }
            else {
                self.formModel.isProductLoaded = true;
                self.formModel.priceListLoaded = (product.defaultPricing.pricelist != null) ? true : false;
                self.formModel.priceListName = (product.defaultPricing.pricelist != null) ? product.defaultPricing.pricelist.value : "";
                self.formModel.sellPrice = parseFloat(product.defaultPricing.sellPrice).toFixed(decimalvalues);
                self.formModel.costPrice = parseFloat(product.defaultPricing.costPrice).toFixed(decimalvalues);
                self.formModel.listPrice = parseFloat(product.defaultPricing.listPrice).toFixed(decimalvalues);
                self.formModel.sellPriceExcVat = parseFloat(product.defaultPricing.sellPriceExcVat).toFixed(decimalvalues);
                self.formModel.landingCost = product.defaultPricing.landingCost;
                self.formModel.isPricelistDynamic = product.defaultPricing.isPricelistDynamic;
                self.formModel.sameAsMaster = product.defaultPricing.sameAsMaster;
                self.formModel.originCountry = product.defaultPricing.originCountry;
                self.advancedPricingDisplayed = (product.defaultPricing.isPricelistDynamic == true) ? true : false;
                for (var i = 0; i < self.taxClassList.length; i++) {
                    var current = self.taxClassList[i];
                    if (current.value == product.defaultPricing.taxClass.key) {
                        self.formModel.taxClass = product.defaultPricing.taxClass.key;
                    }
                }
                //if (self.formModel.wholeSalepriceListId != null && self.formModel.wholeSalepriceListId != '00000000-0000-0000-0000-000000000000') {
                //    self.formModel.isPricelistDynamic = true;
                //}
                //updating self.formModel.isPricelistDynamic as Flase to removed disabled from Pricing fields (Temporary fix , needs to be done later)
                self.formModel.isPricelistDynamic = false;

            }
            self.currencyCode = product.defaultPricing.currencyCode.toLowerCase();
            self.currencyClass = self.currencyClass + self.currencyCode;
        });

        EventBus.$on('isLandingCostInserted', function (value) {
            self.formModel.isProductLoaded = value;
        });

        EventBus.$on('price.sameAsMasterConfig', function (sameAsMasterConfig) {
            self.formModel.sameAsMasterConfig = true;
            self.formModel.sameAsMaster == true;
        });
    },
    methods: { 
        showAllPiceList() {
            var self = this;
            self.allpricelist = self.pricelists;
            self.$modal.show('allPriceListModel');
        },
        hide() {
            var self = this;
            self.editMode = false;
            self.$modal.hide('allPriceListModel');
        },
        toggleAdvancedPricing: function () {
            this.advancedPricingDisplayed = !this.advancedPricingDisplayed;
        },
        applySamePricing: function (e) {
            if (e.currentTarget.checked) {
                var self = this;
                self.formModel.sellPrice = self.formModel.sellPrice;
                self.formModel.costPrice = self.formModel.sellPrice;
                self.formModel.listPrice = self.formModel.sellPrice;
                self.formModel.sellPriceExcVat = self.formModel.sellPrice;
            }
            else {
                self.formModel.sellPrice = 0;
                self.formModel.costPrice = 0;
                self.formModel.listPrice = 0;
                self.formModel.sellPriceExcVat = 0;
                self.formModel.landingCost = 0;
            }
        },
        validate: function () {
            var self = this;
            var valid = false;
            if (self.formModel.isPricelistDynamic == false) {
                valid = self.formModel.sellPrice != ""
                    && self.formModel.taxClass != "-1";
            }
            else {
                valid = self.formModel.taxClass != "-1";
            }

            if (valid == false) {
                self.errormessages = [];
                //error messages
                if (self.formModel.isPricelistDynamic == false) {
                    if (self.formModel.sellPrice == "") {
                        self.errormessages.push("Enter sell price");
                    }
                }
                if (self.formModel.taxClass == "-1") {
                    self.errormessages.push("Enter tax class");
                }
            }

            if (valid) {
                this.$emit('validation-complete', true);
            } else {
                this.$emit('validation-complete', false);
            }
        },
        emitSellPrice: function () {
            var self = this;
            EventBus.$emit("pricing.sellPrice", self.formModel.sellPrice);
        },
        getModel: function () {
            return {};
        }, gettaxClasses: function () {
            var self = this;
            EventBus.$on("masterData.loaded", function (masterData) {
                var info = masterData;
                var data = info.taxClass;
                self.taxClassList = [{ name: '- Select -', value: '-1' }];
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        self.taxClassList.push({ name: data[i].name, value: data[i].recordId });
                    }
                }
            });
        },
        showToaster: function (type) {
            var self = this;
            switch (type) {
                case "Sell Price":
                    if (self.formModel.sellPrice == "") {
                        Vue.toasted.show('Enter Sell Price', { type: 'error', duration: 3000, dismissible: true });
                    }
                    break;
                case "Tax Class":
                    if (self.formModel.taxClass == "-1") {
                        Vue.toasted.show('Enter Tax Class', { type: 'error', duration: 3000, dismissible: true });
                    }
                    break;
            }
        },
        showpricingArea: function () {
            var self = this;
        }, updatePricing: function () {
            var self = this;
            var productModel = {
                id: self.productId,
                pricelists: self.allpricelist
            };

            axiosInstancePost()
                .post('ProductEditor/UpdateProductPricelist', productModel, axiosConfig)
                .then(function (response) {
                    var data = response.data;
                    successed = true;
                    if (data.isValid) {
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
        }
    }
})