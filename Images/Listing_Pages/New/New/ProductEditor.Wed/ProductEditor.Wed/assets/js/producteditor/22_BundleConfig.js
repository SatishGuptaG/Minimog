var treeData = [];

Vue.component("section-bundleconfig", {
    template: "#section-bundleConfig-template",
    props: ['message'],
    data() {
        return {
            categories: null,
            //treeData: treeData,
            treeMode: 'multi',
            treeData: relatedProductsData,
            categoriesLoadedforBundle: false,
            pendingCategories: null,
            searchResultsLoaded: true,
            categoryTreeList: [],
            formModel: {
                bundleProducts: [],
                bundleType: "0",
                sellIndependently: true,
                showWhenAllComponentinStock: false,
                displayType: 0,
                priceType: 1,
                bundleName: "",
                bundlestockcode: "",
                disableBundleType: "Enabled"
            },
            productId:"00000000-0000-0000-0000-000000000000",
            bundleComponent: [],
            productSearchResults: [],
            sumofAllComponentPrice: 0,
            customprice: 0,
            bundlePrice: 0,
            errorMessages: []
        };
    },
    mounted() {
        if (this.message != null && this.message != undefined) {
            this.formModel = this.message;
        }
        var self = this;
       
            //EventBus.$on("index.productType", function (data) {
            //    self.formModel.bundlestockcode = data.stockCode;
            //    self.formModel.bundleName = data.name;
            //});

        EventBus.$on("bundleInfo.bundle", function (product) {
            var guidZero = "00000000-0000-0000-0000-000000000000";
            var bundleinfo = product.bundleConfig;
            self.productId = product.id;
            if (self.productId != null && self.productId != guidZero) {
                self.formModel.disableBundleType = "Disabled";
            }
            if (bundleinfo !== null) {
                self.formModel.bundleType = bundleinfo.bundleType;
                self.formModel.bundleName = bundleinfo.bundleName;
                self.formModel.stockcode = bundleinfo.bundleStockCode;
                self.formModel.displayType = bundleinfo.bundleDisplayType;
                self.formModel.sellIndependently = bundleinfo.sellIndependently;
                self.formModel.isUniqueStockCode = bundleinfo.isUniqueStockCode;
                self.formModel.showWhenAllComponentinStock = bundleinfo.showWhenAllComponentinStock;
                self.formModel.priceType = bundleinfo.priceType;
                self.bundlePrice = bundleinfo.bundlePrice;
                self.bundleComponent = bundleinfo.components;
            }
            if (self.formModel.priceType === 1) {
                self.customprice = self.bundlePrice;
            }
            
        }),
        EventBus.$on("basicInfo.stockCode", function (stockCode) {
            self.formModel.bundlestockcode = stockCode;
        }),
        EventBus.$on("bundleInfo.name", function (name) {
            self.formModel.bundleName = name;
        })
    },
    methods: {
        showAddproductmodel() {
            var self = this;
            self.$modal.show('addmodelProducts');
        },
        hide() {
            var self = this;
            self.$modal.hide('addmodelProducts');
        },
        showConfigurationmodel() {
            var self = this;
            self.$modal.show('addmodelConfiguration');
        },
        hideConfiguration() {
            var self = this;
            self.$modal.hide('addmodelConfiguration');
        },
        showConfig() {
            var self = this;
            self.show('showConfig');
        },
        hideConfig() {
            var self = this;
            self.hide('showConfig');
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
                    self.categoriesLoadedforBundle = true;
                });
        },
        doProductSearch: function (categoryId) {
            this.searchResultsLoaded = false;
            var self = this;
            axiosInstance()
                .get('ProductEditor/GetMasterData?type=29&did=' + domainid+'&parentId=' + categoryId)
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
        addbundleProduct: function (productId) {
            var self = this;

            if (self.formModel.bundleProducts.find(item => item.id == productId) != null) {
                return;
            }

            var product = self.productSearchResults.find(item => item.recordId == productId);
            if (product != null) {

                self.formModel.bundleProducts.push(product);
            }
        },
        addbundleItem() {
            var self = this;
            if (self.bundleComponent == null) {
                self.bundleComponent = [];
            }
            for (var i = 0; i < self.formModel.bundleProducts.length; i++) {
                var obj = self.formModel.bundleProducts[i];
                obj.componentQty = 1;
                self.bundleComponent.push(obj);
            }

            self.formModel.bundleProducts = [];
            self.hide();
        },
        bundleTypeSelection() {
            var self = this;
            if (self.productId != null && self.productId != "00000000-0000-0000-0000-000000000000") {
                return false;
            }
            if (self.formModel.bundleType == "1") {
                // self.bundleComponent = [];
                self.sumofAllComponentPrice = 0;
                self.formModel.priceType = 1;
                for (var i = 0; i < self.bundleComponent.length; i++) {
                    self.bundleComponent[i].componentQty = 1;
                }
            }
        },
        removecomponent(component) {
            var self = this;
            var index = self.bundleComponent.indexOf(
                self.bundleComponent.find(item => item.stockCode == component.stockCode)
            );
            self.bundleComponent.splice(index, 1);
        },
        removeRelatedProduct: function (productId) {
            var index = this.formModel.bundleProducts.indexOf(
                this.formModel.bundleProducts.find(item => item.id == productId)
            );
            this.formModel.bundleProducts.splice(index, 1);
        },

        getModel: function () {
            var self = this;
            return {
                BundleType: self.formModel.bundleType,
                BundleName: self.formModel.bundleName,
                BundleStockCode: self.formModel.stockcode,
                BundleDisplayType: self.formModel.displayType,
                SellIndependently: self.formModel.sellIndependently,
                IsUniqueStockCode: true,
                ShowWhenAllComponentinStock: self.formModel.showWhenAllComponentinStock,
                PriceType: self.formModel.priceType,
                BundlePrice: self.bundlePrice,
                Components: self.bundleComponent
            };
        }
    }
});
