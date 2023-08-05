Vue.component("section-bundles", {
    template: "#section-bundles",
    data() {

        return {

            relatedProducts: [],
            categoriesLoaded: false,
            searchResultsLoaded: true,
            productSearchResults: null,
            treeData: relatedProductsData,
            treeMode: 'single',
            formModel: {
                useBundle: false,
                objectType: "",
                useProductName: false,
                useMetaDescription: false,
                imageSetting: "thumbnail",
                priceType: 1,
                bundleName: '',
                bundleType: '0',
                isuniqueStockCode: false,
                stockcode: '',
                bundlestockcode: '',
                sellIndependently: true,
                showWhenAllComponentinStock: false,
                displayType: 0,
                saperated: 0,
                relatedProducts: [],
                selectedBundle: [],
                allbundles: []
            },
            products: [],
            selectedItems: [],
            bundleComponent: [],
            bundleList: [],
            bundledropdownList: [],
            productId: '',
            sumofAllComponentPrice: 0,
            customprice: 0,
            bundlePrice: 0,
            productItemType: 0,
            bundleListLoaded: false,
            selectedBundle: 0,
            showbundleList: false,
            pimUrl: "",
            isNewBundleCreated: false,
            isBundlesEditDisabled: !hasBundlesEditPermission
        };
    },
    props: ['message'],
    mounted() {
        if (this.message != undefined && this.message != null) {
            this.formModel = this.message;
        }

        var self = this;
        //axiosInstance()
        //    .get('ProductEditor/GetMasterData?type=32') //Bundles
        //    .then(function (response) {
        //        var data = response.data.items;
        //        self.allbundles = data;
        //        if (data != null) {
        //            for (var i = 0; i < data.length; i++) {
        //                self.bundledropdownList.push({ text: data[i].name, id: data[i].recordId });
        //            }
        //        }
        //        self.bundleListLoaded = true;
        //    });
        EventBus.$on("basicInfo.stockCode", function (stockCode) {
            if (stockCode != null && stockCode != "") {
                self.formModel.bundlestockcode = "BNDL-" + stockCode;
            }
        }),
        EventBus.$on("bundleInfo.name", function (name) {
            if (name != null && name != "") {
                self.formModel.bundleName = "Bundle " + name;
            }
        }) 
        EventBus.$on("product.loaded", function (product) {
            self.pimUrl = PimUri;
            var info = product.bundleConfig;
            var bundles = product.bundles;
            self.productItemType = product.basicInfo.productType;
            self.productId = product.id;
            if (info != null) {
                self.formModel.bundleType = info.bundleType;
                self.formModel.bundleName = info.bundleName;
                self.formModel.stockcode = info.bundleStockCode;
                self.formModel.displayType = info.bundleDisplayType;
                self.formModel.sellIndependently = info.sellIndependently;
                self.formModel.isUniqueStockCode = info.isUniqueStockCode;
                self.formModel.showWhenAllComponentinStock = info.showWhenAllComponentinStock;
                self.formModel.priceType = info.priceType;
                self.bundlePrice = info.bundlePrice;
                self.bundleComponent = info.components;
            }
            self.bundleList = bundles;
            if (self.bundleList != null && self.bundleList.length > 0){
                for (var i = 0; i < self.bundleList.length; i++) {
                    var currentobj = self.bundleList[i]
                    currentobj.bundleType = currentobj.bundleType == 1 ? "Complementary" : "BOM";
                }
            }
            if (self.formModel.priceType == 1) {
                self.customprice = self.bundlePrice;
            }
        });

        EventBus.$on("basicInfo.productType", function (productType) {
            self.productItemType = productType;
        })

    },
    methods: {
        getModel: function () {
            var self = this;
            var res = self.bundleList;

            return res;
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
                    console.log(self.productSearchResults);
                });
        },
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
        addRelatedItem() {
            var self = this;
            self.bundleComponent = [];
            for (var i = 0; i < self.formModel.relatedProducts.length; i++) {
                var obj = self.formModel.relatedProducts[i];
                obj.componentQty = 1;
                self.bundleComponent.push(obj);
            }

            self.formModel.relatedProducts = [];
            self.hide();
        },
        bundleTypeSelection() {
            var self = this;
            if (self.formModel.bundleType == 1) {
                //self.bundleComponent = [];
                self.sumofAllComponentPrice = 0;
                self.formModel.priceType = 1;
            }
        },
        addNewBundle() {
            var self = this;
            self.$modal.show('addProducts');
            
        },
        hide() {
            var self = this;
            self.$modal.hide('addProducts');
        },
        addproducts() {
            var self = this;
            var items = self.selectedItems;
            self.bundleComponent = [];
            for (var i = 0; i < self.selectedItems.length; i++) {
                var currentobj = self.selectedItems[i]
                var prod = self.products.find(item => item.stockCode == currentobj);
                self.bundleComponent.push(prod);
            }
            self.$modal.hide('addProducts');
            if (self.formModel.priceType) {
                self.calCulatebundleCost();
            }
        },
        loadBundles() {
            var self = this;
            axiosInstance()
                .get('ProductEditor/GetMasterData?type=32&did=' + domainid) //Bundles
                .then(function (response) {
                    var data = response.data.items;
                    self.allbundles = data;
                    if (data != null) {
                        for (var i = 0; i < data.length; i++) {
                            self.bundledropdownList.push({ text: data[i].name, id: data[i].recordId });
                        }
                    }
                    self.bundleListLoaded = true;
                }); 
            self.$modal.show('addProductinBundle');
        },
        hidepopup() {
            var self = this;
            self.$modal.hide('addProductinBundle');
        },
        removecomponent(component) {
            var self = this;
            var index = self.bundleList.indexOf(
                self.bundleList.find(item => item.stockCode == component.stockCode)
            );
            self.bundleList.splice(index, 1);
            self.calCulatebundleCost();
        },
        calCulatebundleCost() {
            var self = this;
            var totalPrice = 0;
            self.sumofAllComponentPrice = 0;
            var cost = self.bundleComponent.map(function (e) {
                totalPrice = totalPrice + (e.price * e.componentQty);
            });
            self.sumofAllComponentPrice = totalPrice;
            if (self.formModel.priceType == 0) {
                self.bundlePrice = self.sumofAllComponentPrice;
            } else {
                self.bundlePrice = self.customprice;
            }
        },
        removeRelatedProduct: function (productId) {
            var index = this.formModel.relatedProducts.indexOf(
                this.formModel.relatedProducts.find(item => item.id == productId)
            );
            this.formModel.relatedProducts.splice(index, 1);
        },
        addItemsinBundle() {
            var self = this;
            if (self.bundleList == null) {
                self.bundleList = [];
            }
            var bundletoAdd = self.allbundles.find(item => item.recordId == self.selectedBundle);
            var fields = bundletoAdd.name.split('(');
            var name = fields[0];
            var stockcodeString = fields[1];
            var fields2 = stockcodeString.split(')');
            var stockcode = fields2[0];
            var item = self.bundleList.find(item => item.bundleId == bundletoAdd.recordId);
            if (item == null) {
                self.bundleList.push({ bundleStockCode: stockcode, bundleName: name, bundleType: bundletoAdd.code, bundleId: bundletoAdd.recordId, bundleProductId: bundletoAdd.parentId });
            }
        },
        validate: function () {
            var self = this;
            var valid = self.formModel.bundleName.length > 0
                && self.formModel.bundlestockcode.length > 0


            if (valid == false) {
                self.errorMessages = [];
                //error messages
                if (self.formModel.bundleName.length <= 0) {
                    self.errorMessages.push("Enter Bundle Name");
                }
                if (self.formModel.bundlestockcode.length <= 0) {
                    self.errorMessages.push("Enter Stock Code");
                }
            }
            if (valid) {
                self.errorMessages = [];
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
                    self.addNewBundleProduct();
                }
            });
        },
        addNewBundleProduct() {
            var self = this;
            var name = self.formModel.bundleName;
            var stockCode = self.formModel.bundlestockcode;
            var bundletype = self.formModel.bundleType == 1 ? "Complementary" : "BOM";
            if (self.bundleList == null) {
                self.bundleList = [];
            }
            var bundleProductid = '';

            var productModel = {
                basicInfo: {
                    name: name,
                    stockCode: stockCode,
                    productType: 7,
                    isVisible: false
                },
                bundleConfig: {
                    BundleType: bundletype,
                    BundleName: name,
                    BundleStockCode: stockCode,
                    BundleDisplayType: self.formModel.displayType,
                    SellIndependently: self.formModel.sellIndependently,
                    IsUniqueStockCode: true,
                    ShowWhenAllComponentinStock: self.formModel.showWhenAllComponentinStock,
                    PriceType: self.formModel.priceType,
                    BundlePrice: self.customprice
                }
            };

            axiosInstancePost()
                .post('ProductEditor/UpsertBundleProduct', productModel, axiosConfig)
                .then(function (response) {
                    var data = response.data;
                    bundleProductid = data.bundleProductId;
                    self.bundleList.push({ bundleStockCode: stockCode, bundleName: name, bundleType: bundletype, bundleId: bundleProductid, bundleProductId: bundleProductid });
                    self.isNewBundleCreated = true;
                })
                .catch(function (error) {
                    var errorMessage = error;
                });

            self.$modal.hide('addProducts');
        }
    }
});