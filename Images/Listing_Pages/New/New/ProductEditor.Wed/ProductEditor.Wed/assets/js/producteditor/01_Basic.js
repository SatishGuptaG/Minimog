var treeData = [];
var categorySelectCount = 0;
var relatedProductsData = [];
var copyCategoryTreeList;
const axiosInstance = function () {
    const getBaseUrl = () => {
        return PimUri;
    }
    const axiosObejct = axios.create({
        baseURL: getBaseUrl(),
        timeout: 40000
    });
    return axiosObejct;
};

const directAxios = function () {
    const axiosObj = axios.create({
        baseURL: PimUri,
        timeout: 40000
    });
    return axiosObj;
};

Vue.component("section-basic", {
    template: "#section-basic-template",
    props: ['message'],
    data() {
        return {
            categories: null,
            subBrandMaster: [],
            //treeData: treeData,
            treeMode: 'multi',
            treeData: relatedProductsData,
            productTypes: [],
            genders: [],
            productFamilies:[],
            statuses: [],
            brands: [{ name: '- Select -', value: '00000000-0000-0000-0000-000000000000' }],
            subBrands: [{ name: '- Select -', value: '00000000-0000-0000-0000-000000000000' }],
            seasonsList: [{ name: '- Select -', value: '00000000-0000-0000-0000-000000000000' }],
            productTypeObject: { name: '- Select -', value: '-1' },
            genderObject: { itemText: '- Select -', itemValue: '' },
            productFamilyObject: { itemText: '- Select -', itemValue: '' },
            categoriesLoaded: false,
            categoriesLoadedforBundle: false,
            brandsLoaded: false,
            subBrandsLoaded: false,
            productFamilyLoaded:false,
            pendingBrand: null,
            pendingSubBrand: null,
            pendingCategories: null,
            categoryTreeList: [],
            selectedTariffCode: '',
            selectedTariff: '',
            changeLogList: [],
            changePriceLogList: [],
            lifecycleChangeLogList:[],
            logDataList: [],
            editStatus: false,
            checkforPublish: false,
            domainList: [],
            domainList1: [],
            hsnCodesList: [],
            selectedHSNCode: '',
            hSNCodeList: [],
            hsnquery: '',
            tagList: [],
            productTags: [],
            tagquery: '',
            productId: '',
            originCountiresList: [],
            preSelectedOriginCountry: "",
            originCountry: "",
            editHSNCode: false,
            formModel: {
                //isVisible: false,
                name: "",
                stockCode: "",
                defaultPrice: "",
                productType: "1",
                productStatus: "1",
                currentProductStatus: "1",
                brand: "00000000-0000-0000-0000-000000000000",
                subBrand: "00000000-0000-0000-0000-000000000000",
                gender: "",
                productFamily: "",
                productFamilyId: null,
                subStatusName:"",
                subStatusId: null,
                lifecycleId: "00000000-0000-0000-0000-000000000000",
                weight: "",
                categories: [],
                entity: "",
                selectedCategory: null,
                bundleProducts: [],
                bundleType: "0",
                sellIndependently: false,
                showWhenAllComponentinStock: false,
                displayInBasket: true,
                displayType: 0,
                priceType: 1,
                customfields: [],
                showcustomfields: false,
                productCode: "",
                dropId: "00000000-0000-0000-0000-000000000000",
                isForPDLC: false,
                extendedDescription: null
            },
            bundleComponent: [],
            productSearchResults: [],
            sumofAllComponentPrice: 0,
            customprice: 0,
            bundlePrice: 0,
            errorMessages: [],
            searchResultsLoaded: true,
            isStockCodeValid: false,
            isBundleType: "2",
            isProductLoaded: false,
            seasonsLoaded: false,
            seasons: [],
            tariffCodes: [],
            tariffCodesLoaded: false,
            logDataLoaded: false,
            categoryModified: false,
            changeLogfetchInProgress: false,
            sku: '',
            productBasicInfo: [],
            isNewProduct: false,
            searchby: 0,
            stockCodesList: [],
            selectedstockCode: '',
            stockquery: '',
            stockCodeList: [],
            expandedRowKeys: [1, 2, 10],
            selectedRowKeys: [],
            recursive: false,
            currencySymbol: "",
            isBasicInfoEditDisabled: !hasBasicInfoEditPermission,
            productLifecycleStep: {},
            productLifecycle: {},
            productChangeLogList:[],
            productChangeLog: "",
            StatusChangeLog: "",
        };
    }, async beforeCreate() {
        var self = this;
        //if (self.domainList == null || self.domainList == undefined || self.domainList.length == 0 && !prodLoad) {

        //    axiosInstance()
        //        .get('ProductEditor/GetDomains') //Domain Conditions
        //        .then(function (response) {
        //            self.domainList = response.data;
        //        });
        //}
        //Brands
        //var brands = await axiosInstance()
        //    .get('ProductEditor/GetMasterData?type=1&did=' + domainid)
        //    .then(function (response) {
        //        return response.data.items;
        //    });
        //if (brands != null && brands.length > 0) {
        //    for (var i = 0; i < brands.length; i++) {
        //        self.brands.push({ name: brands[i].name, value: brands[i].recordId });
        //    }
        //    if (self.brands.length > 0) {
        //        self.brandsLoaded = true;
        //        self.setupBrands();
        //    }
        //}

        //Seasons
        //var seasonList = await axiosInstance()
        //    .get('ProductEditor/GetSeasonsDropList?did=' + domainid) // domainid is added to support domain level caching
        //    .then(function (response) {
        //        return response.data;
        //    });
        //if (seasonList != null && seasonList.length > 0) {
        //    for (var i = 0; i < seasonList.length; i++) {
        //        self.seasons = seasonList;
        //        self.seasonsList.push({ name: seasonList[i].seasonCode + ' (' + seasonList[i].code + ')', value: seasonList[i].recordId });
        //    }
        //    self.seasonsLoaded = true;
        //}
        //originCountries
        //var originCountries = await axiosInstance()
        //    .get('ProductEditor/GetMasterData?type=34&did=' + domainid)
        //    .then(function (response) {
        //        return response.data.items;
        //    });
        //if (originCountries != null && originCountries.length > 0 && self.originCountiresList.length == 0) {
        //    self.originCountiresList.push({ text: "Select", id: '' });
        //    for (var i = 0; i < originCountries.length; i++) {
        //        self.originCountiresList.push({ text: originCountries[i].name, id: originCountries[i].code });
        //        if (originCountries[i].name == 'United Kingdom') {
        //            defaultCountry = originCountries[i].code;
        //            defaultSymbol = originCountries[i].symbol;
        //            selectedCountry = originCountries[i].code;
        //        }
        //    }
        //    if (self.preSelectedOriginCountry != null && self.preSelectedOriginCountry != "" && (self.formModel.originCountry == undefined || self.formModel.originCountry == null || self.formModel.originCountry == "")) {
        //        setTimeout(function () {
        //            self.formModel.originCountry = self.preSelectedOriginCountry;
        //        }, 1000);
        //    }
        //}
        //ItemTypes
        //var itemTypes = await axiosInstance()
        //    .get('ProductEditor/GetMasterData?type=21&did=' + domainid)
        //    .then(function (response) {
        //        return response.data.itemType;
        //    });
        //self.productTypes = [];
        //if (itemTypes.length > 0)
        //    self.productTypes = itemTypes;
        //self.productTypes.unshift(self.productTypeObject);
        //Status
        //var statuses = await axiosInstance()
        //    .get('ProductEditor/GetMasterData?type=36&did=' + domainid)
        //    .then(function (response) {
        //        return response.data.itemType;
        //    });
        //self.statuses = [];
        //if (statuses.length > 0)
        //    self.statuses = statuses;
        //Category
        //var categories = await axiosInstance()
        //    .get('ProductEditor/GetMasterData?type=3&did=' + domainid)
        //    .then(function (response) {
        //        var data = response.data.items;
        //        if (data != null) {
        //            return data
        //        }
        //    });
        //self.categoryTreeList = categories;
        //if (categories != null && categories.length > 0) {
        //    for (var i = 0; i < categories.length; i++) {
        //        var item = toCategory(categories[i]);
        //        treeData.push(item);
        //    }
        //    //self.setupCategories();
        //}
        //self.categoriesLoaded = true;

        //Commented for pageload Optimization
        //////Tarrif Codes
        ////var tCodes = await axiosInstance()
        ////    .get('ProductEditor/GetTariffCodes?did=' + domainid) // domainid is added to support domain level caching
        ////    .then(function (response) {
        ////        return response.data;
        ////    });
        ////if (tCodes != null && tCodes.length > 0) {
        ////    for (var i = 0; i < tCodes.length; i++) {
        ////        self.tariffCodes = tCodes;
        ////    }
        ////    self.tariffCodesLoaded = true;
        ////}

    },
    mounted() {
        if (this.message != null && this.message != undefined) {
            this.formModel = this.message;
        }
        var self = this;
        EventBus.$on("masterData.loaded", function (masterData) {
            var info = masterData;
            var brands = info.brands;
            self.subBrandMaster = info.subbrand;
            if (brands != null && brands.length > 0) {
                for (var i = 0; i < brands.length; i++) {
                    self.brands.push({ name: brands[i].name, value: brands[i].recordId });
                }
                if (self.brands.length > 0) {
                    self.brandsLoaded = true;
                    self.setupBrands();
                }
            }
            var categories = info.categories
            copyCategoryTreeList = info.categories
            self.categoryTreeList = categories;
            if (categories != null && categories.length > 0) {
                for (var i = 0; i < categories.length; i++) {
                    var item = toCategory(categories[i]);
                    treeData.push(item);
                }
                //self.setupCategories();
            }
            self.categoriesLoaded = true;
          
            var originCountries = info.countriesList;
            if (originCountries != null && originCountries.length > 0 && self.originCountiresList.length == 0) {
                self.originCountiresList.push({ text: "Select", id: '' });
                for (var i = 0; i < originCountries.length; i++) {
                    self.originCountiresList.push({ text: originCountries[i].name, id: originCountries[i].code });
                    if (originCountries[i].name == 'United Kingdom') {
                        defaultCountry = originCountries[i].code;
                        defaultSymbol = originCountries[i].symbol;
                        selectedCountry = originCountries[i].code;
                    }
                }
            }
            if (self.preSelectedOriginCountry != null && self.preSelectedOriginCountry != "" && (self.formModel.originCountry == undefined || self.formModel.originCountry == null || self.formModel.originCountry == "")) {
                setTimeout(function () {
                    self.formModel.originCountry = self.preSelectedOriginCountry;
                }, 1000);
            }

            var itemTypes = info.itemTypes.itemType;
            self.productTypes = [];
            if (itemTypes.length > 0)
                self.productTypes = itemTypes;
            self.productTypes.unshift(self.productTypeObject);

            self.genders = [];
            if (info.gender.length > 0)
                self.genders = info.gender;
            self.genders.unshift(self.genderObject);
            
            if (enableProductFamily) {
                self.productFamilies = [];
                if (info.productFamily.length > 0)
                    self.productFamilies = info.productFamily;
                self.productFamilies.unshift(self.productFamilyObject);
            }
            var statuses = info.productStatus.itemType;
            self.statuses = [];
            if (statuses.length > 0) {
                statuses = statuses.sort(function (a, b) { return a.value - b.value });
                self.statuses = statuses;
            }
                
            var seasonList = info.seasonsDropList;
            if (seasonList != null && seasonList.length > 0) {
                for (var i = 0; i < seasonList.length; i++) {
                    self.seasons = seasonList;
                    self.seasonsList.push({ name: seasonList[i].seasonCode + ' (' + seasonList[i].code + ')', value: seasonList[i].recordId });
                }
                self.seasonsLoaded = true;
            }
            if (self.domainList == null || self.domainList == undefined || self.domainList.length == 0 && !prodLoad) {
                self.domainList = info.domains;
            }
            if (info.customFields != null) {
                self.formModel.customfields = info.customFields;
                self.formModel.showcustomfields = true;
            }

        });
        if (typeof productId === 'undefined') {
            self.isNewProduct = true;
            self.getCountryList();
        }
        //axiosInstance()
        //    .get('ProductEditor/GetCustomFields?did=' + domainid)
        //    .then(function (response) {
        //        if (response != null) {
        //            self.formModel.customfields = response.data;
        //            self.formModel.showcustomfields = true;
        //        }
        //    });

        EventBus.$on("product.loaded", function (product) {
            setTimeout(function () {
                if (self.originCountiresList == null || self.originCountiresList.length == 0) {
                    self.getCountryList();
                }
            }, 1000);
            var defaultPricing = product.defaultPricing;
            self.currencySymbol = defaultPricing.currencySymbol;

            var info = product.basicInfo;
            self.productId = product.id;
            self.domainList = product.domains;
            self.domainList1 = JSON.parse(JSON.stringify(product.domains));
            self.productBasicInfo = product.basicInfo;
            self.isProductLoaded = true;
            self.formModel.name = info.name;
            //self.formModel.isVisible = info.isVisible
            self.formModel.stockCode = info.stockCode;
            self.formModel.extendedDescription = info.extendedDescription;
            self.formModel.productCode = info.productCode;
            self.sku = product.identifiers.sku;
            self.formModel.subStatusName = info.subStatusName;
            var guidZero = "00000000-0000-0000-0000-000000000000";
            if (info.brand && info.brand.key && info.brand.key !== guidZero) {
                self.pendingBrand = info.brand.key;
            }
            if (info.subbrand && info.subbrand.key && info.subbrand.key !== guidZero) {
                self.pendingSubBrand = info.subbrand.key;
            }
            self.formModel.productType = info.productType;
            self.formModel.gender = info.gender;
            if (enableProductFamily)
            {
                self.formModel.productFamily = product.basicInfo.productFamilyName == null ? '' : product.basicInfo.productFamilyName;
                self.formModel.productFamilyId = product.basicInfo.productFamilyId != null ? product.basicInfo.productFamilyId : null;
                if (self.formModel.productFamilyId != null)
                {
                    self.categoryTreeList = copyCategoryTreeList.filter(category => category.productFamilyId == self.formModel.productFamilyId);
                }
            }
              self.formModel.lifecycleId = product.productLifecycleStep != null ? product.productLifecycleStep.lifecycleId : null;
            if (enableProductFamily && self.formModel.productFamily!='') {
                self.productFamilyLoaded = true;
            }
            if (product.productLifecycleStep != null) {
                self.productLifecycleStep = product.productLifecycleStep

                self.productChangeLog = JSON.stringify(product);
            }
            //console.log(product.productWorkflow);
            //console.log(self.statuses);
            self.formModel.productStatus = info.status;
            self.formModel.productStatusValue = info.status;
            var fwdStatus = self.statuses.filter(function (element) {
                return parseInt(element.value) >= self.formModel.productStatus;
            });
            self.statuses = fwdStatus;
            self.formModel.dropId = info.dropId;
            self.formModel.isForPDLC = info.isForPDLC;
            self.selectedHSNCode = info.tariffCode;
            if (self.selectedHSNCode != undefined && self.selectedHSNCode != null && self.selectedHSNCode != '') {
                self.editHSNCode = false;
            } else {
                self.isNewProduct = true;
            }
            self.formModel.selectedCategory = (info.categories != null) ? [] : null;
            if (info.categories != null) {
                for (var i = 0; i < info.categories.length; i++) {
                    self.formModel.selectedCategory.push(info.categories[i].key);
                }
            }
            //self.pendingCategories = info.categories;
            //if (self.categoriesLoaded) {
            //    self.setupCategories();
            //}
            if (self.brandsLoaded) {
                self.setupBrands();
            }
            self.preSelectedOriginCountry = product.basicInfo.originCountry;
            self.formModel.originCountry = product.basicInfo.originCountry;
            self.formModel.customfields = product.custominfo;
            if (self.formModel.customfields != null) {
                self.formModel.showcustomfields = true;
            }
            self.getProductTags();
            var bundleinfo = product.bundleConfig;
            self.productId = product.id;
            if (bundleinfo != null) {
                self.formModel.bundleType = bundleinfo.bundleType;
                self.formModel.bundleName = bundleinfo.bundleName;
                self.formModel.stockcode = bundleinfo.bundleStockCode;
                self.formModel.extendedDescription = bundleinfo.extendedDescription;
                self.formModel.displayType = bundleinfo.bundleDisplayType;
                self.formModel.sellIndependently = bundleinfo.sellIndependently;
                self.formModel.isUniqueStockCode = bundleinfo.isUniqueStockCode;
                self.formModel.showWhenAllComponentinStock = bundleinfo.showWhenAllComponentinStock;
                self.formModel.priceType = bundleinfo.priceType;
                self.bundlePrice = bundleinfo.bundlePrice;
                self.bundleComponent = bundleinfo.components;
                self.isBundleType = bundleinfo.bundleType == 0 ? "0" : "1";
                self.formModel.displayInBasket = bundleinfo.displayInBasket;
            }
        });

    },
    methods: {       
        showAddproductmodel() {
            var self = this;
            self.$modal.show('addbundlemodelProducts');
        },
        hide() {
            var self = this;
            self.$modal.hide('addbundlemodelProducts');
        },

        beforeOpen() {
            var self = this;
            /*if (relatedProductsData.length == 0) {*/
            axiosInstance()
                .get('ProductEditor/GetMasterData?type=3&did=' + domainid) //Category
                .then(function (response) {
                    var data = response.data.items;
                    if (data != null) {
                        relatedProductsData = [];
                        for (var i = 0; i < data.length; i++) {
                            var item = toCategory(data[i]);
                            relatedProductsData.push(item);
                        }
                    }
                });
            self.categoriesLoadedforBundle = true;

            //}
            //else {
            //    EventBus.$on("masterData.loaded", function (masterData) {
            //        var info = masterData;

            //        var categories = info.categories
            //        self.categoryTreeList = categories;
            //        for (var i = 0; i < self.categoryTreeList.length; i++) {
            //            var item = toCategory(self.categoryTreeList[i]);
            //            relatedProductsData.push(item);
            //        }
            //        self.categoriesLoadedforBundle = true;
            //    }); 
            //}  
        },
        doProductSearch: function (categoryId) {
            this.searchResultsLoaded = false;
            var self = this;
            axiosInstance()
                .get('ProductEditor/GetMasterData?type=29&did=' + domainid + '&parentId=' + categoryId)
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
        setupBrands() {
            if (this.pendingBrand) {
                var brandId = this.pendingBrand;
                this.formModel.brand = brandId;
                this.getSubBrands();
            }
        },
        setupCategories() {
            if (this.pendingCategories) {
                var pending = this.pendingCategories;
                this.pendingCategories = null;
                var setupList = function (items, id) {
                    for (var i = 0; i < items.length; i++) {
                        var current = items[i];
                        if (current.id === id) {
                            current.checked = true;
                            return;
                        }
                    }
                    for (var j = 0; j < items.length; j++) {
                        if (items[j].children && items[j].children.length) {
                            setupList(items[j].children, id);
                        }
                    }
                };
                for (var i = 0; i < pending.length; i++) {
                    setupList(this.treeData, pending[i].key);
                }
            }
        },
        showToaster: function (type) {
            var self = this;
            switch (type) {
                case "Name":
                    if (self.formModel.name.length == 0) {
                        Vue.toasted.show('Enter Name', { type: 'error', duration: 3000, dismissible: true });
                    }
                    break;
                case "SKU":
                    if (self.formModel.stockCode.length == 0) {
                        Vue.toasted.show('Enter Stock Code', { type: 'error', duration: 3000, dismissible: true });
                    }
                    break;
                case "ItemType":
                    if (self.formModel.productType == "-1") {
                        Vue.toasted.show('Enter Item Type', { type: 'error', duration: 3000, dismissible: true });
                    }
                    break;
                case "Brand":
                    if (self.formModel.brand == "00000000-0000-0000-0000-000000000000") {
                        Vue.toasted.show('Enter Brand', { type: 'error', duration: 3000, dismissible: true });
                    }
                    break;
                case "ProductFamily":
                    if (self.formModel.productFamily == '') {
                        Vue.toasted.show('Enter Product Family', { type: 'error', duration: 3000, dismissible: true });
                    }
                    break;
            }
        },
        validate: function () {
            var self = this;
            var valid = self.formModel.name.length > 0
                && self.formModel.stockCode.length > 0
                && self.formModel.brand != "00000000-0000-0000-0000-000000000000"
                && self.formModel.productType != "-1"
                && self.formModel.productFamily != ''


            if (valid == false) {
                self.errorMessages = [];
                //error messages
                if (self.formModel.name.length <= 0) {
                    self.errorMessages.push("Enter Product Name");
                }
                if (self.formModel.stockCode.length <= 0) {
                    self.errorMessages.push("Enter Stock Code");
                }
                if (self.formModel.brand == "00000000-0000-0000-0000-000000000000") {
                    self.errorMessages.push("Enter Brand");
                }
                if (self.formModel.productType == "-1") {
                    self.errorMessages.push("Enter Item Type");
                }
                if (self.formModel.productFamily == '') {
                    self.errorMessages.push("Enter Product Family");
                }
            }
            if (valid) {
                self.errorMessages = [];
                this.$emit('validation-complete', true);
            } else {
                this.$emit('validation-complete', false);
            }
        },
        //makeFolder: function (item) {
        //    Vue.set(item, 'children', []);
        //    this.addItem(item);
        //},
        //addItem: function (item) {
        //    item.children.push({
        //        name: 'new stuff'
        //    });
        //},
        //updateTreeValues: function (event) {
        //    var self = this;
        //    for (var i = 0; i < this.$refs.treeItem_basic.length; i++) {
        //        var elem = this.$refs.treeItem_basic[i];
        //        if (elem.item.id == event) {
        //            this.formModel.categories = elem.getSelected();
        //        }
        //        var findChild = function (items) {
        //            for (var i = 0; i < items.length; i++) {
        //                var current = items[i];
        //                if (current.id === event) {
        //                    self.formModel.categories.push(current.id);
        //                    return;
        //                }
        //            }
        //            for (var j = 0; j < items.length; j++) {
        //                if (items[j].children && items[j].children.length > 0 ) {
        //                    findChild(items[j].children);
        //                }
        //            }
        //        };
        //        if (elem.item.children.length > 0)
        //        {
        //            findChild(elem.item.children);
        //        }
        //    }
        //},

        //addCategory: function () {
        //    var item = toCategory({
        //        name: "", id: randomId()
        //    });
        //    item.editActive = true;

        //    this.treeData.unshift(item);
        //},

        //cancelItem: function (event) {
        //    var item = this.treeData.find(item => item.id == event);
        //    var itemIndex = this.treeData.indexOf(item);
        //    this.treeData.splice(itemIndex, 1);
        //},        
        getProductFamily: function ()
        {
            var self = this;
            //alert('0');
            var productFamilies =self.productFamilies;
            var name = self.formModel.productFamily;
            if (name == '')
            {
                self.categoryTreeList = [];
                self.productFamilyLoaded = false;
            }
            else
            {                
                var selectedProductFamilyId = '';
                for (var i = 0; i < productFamilies.length; i++) {
                    if (productFamilies[i].itemValue == name) {
                        self.formModel.productFamilyId = productFamilies[i].id
                        self.categoryTreeList = copyCategoryTreeList.filter(category => category.productFamilyId == productFamilies[i].id);   
                        selectedProductFamilyId = productFamilies[i].id;
                        currentProductFamilyId = productFamilies[i].id;
                        CheckAndApplyLifecycleRules(); 
                        if (lifecycleApplied != null && lifecycleApplied != 'undefined') {
                            //self.productLifecycle = lifecycleApplied;
                            //self.productLifecycleStep = lifecycleApplied.steps;
                            self.productLifecycleStep = {};
                        }
                        else
                        {
                            //self.productLifecycle = null;
                            self.productLifecycleStep = {};
                        }
                    }
                }
                self.productFamilyLoaded = true;
            }

        },
        getSubBrands: function () {
            var self = this;
            var brandRecordId = self.formModel.brand;
            self.subBrands = [{ name: '- Select -', value: '00000000-0000-0000-0000-000000000000' }];

            if (self.subBrandMaster != null && self.subBrandMaster.length > 0) {
                var subbrand = self.subBrandMaster;
                if (subbrand != null && subbrand.length > 0) {
                    for (var i = 0; i < subbrand.length; i++) {
                        if (subbrand[i].parentId == brandRecordId) {
                            self.subBrands.push({ name: subbrand[i].name, value: subbrand[i].recordId });
                        }
                    }
                    self.subBrandsLoaded = true;
                    if (self.pendingSubBrand) {
                        self.formModel.subBrand = self.pendingSubBrand;
                        self.pendingSubBrand = null;
                    }
                }
            } else {

                EventBus.$on("masterData.loaded", function (masterData) {
                    var info = masterData;
                    var subbrand = info.subbrand;
                    if (subbrand != null && subbrand.length > 0) {
                        for (var i = 0; i < subbrand.length; i++) {
                            if (subbrand[i].parentId == brandRecordId) {
                                self.subBrands.push({ name: subbrand[i].name, value: subbrand[i].recordId });
                            }
                        }
                        self.subBrandsLoaded = true;
                        if (self.pendingSubBrand) {
                            self.formModel.subBrand = self.pendingSubBrand;
                            self.pendingSubBrand = null;
                        }
                    }
                });
            }
        },
        getModel: function () {
            return {
                name: this.formModel.name,
                stockCode: this.formModel.stockCode,
                productType: this.formModel.productType,
                gender: this.formModel.gender,
                status: this.formModel.productStatus,
                keywords: this.formModel.keywords,
                categories: this.formModel.selectedCategory,
                productFamilyId: this.formModel.productFamilyId,
                productFamilyName: this.formModel.productFamily,
                brand: {
                    key: this.formModel.brand
                },
                subBrand: {
                    key: this.formModel.subBrand
                },
                tariffCode: this.selectedHSNCode
            };
        },
        emitItemtype: async function () {
            var self = this;
            EventBus.$emit("basicInfo.productType", self.formModel.productType);
            EventBus.$emit("index.productType", self.formModel);
            setTimeout(function () {
                if (self.formModel.productType == "7") {
                    EventBus.$emit("basicInfo.stockCode", self.formModel.stockCode);
                    EventBus.$emit("bundleInfo.name", self.formModel.name);
                    if (self.isBundleType == 2) {
                        self.isBundleType = 0;
                    }
                }
            }, 3000);

            //productType 1 = Product
            //productType 7 = Bundle
            //productType 8 = DynamicBundle
            if (self.formModel.productType == "1" | self.formModel.productType == "7" | self.formModel.productType == "8") {
                $('#li_GiftWrap').show();
                $('#gift').show();
            }
            else {
                $('#li_GiftWrap').hide();
                $('#gift').hide();
            }
        },
        emitStockCode: function () {
            var self = this;
            EventBus.$emit("basicInfo.stockCode", self.formModel.stockCode);

        },
        emitProductName: function () {
            var self = this;
            EventBus.$emit("bundleInfo.name", self.formModel.name);
        },
        normalizer(node) {
            var self = this;
            var obj = {};
            var modified = {
                id: node.recordId,
                label: node.name,
                children: node.subCategories
            };
            self.checkEmptyObj(modified);
            return modified;
        },

        checkEmptyObj: function (data) {
            var self = this;
            $.each(data, function (key, value) {
                if ($.isPlainObject(value) || $.isArray(value)) {
                    self.checkEmptyObj(value);
                }
                if (value === "" || value === null || $.isEmptyObject(value)) {
                    delete data[key];
                }
            });
        },

        validateFields: function (type) {
            var self = this;
            var value = self.formModel.stockCode;
            if (value != "" && value != null) {
                axiosInstance()
                    .get('ProductEditor/ProductValidations?type=' + type + '&value=' + value) //Validate SKU
                    .then(function (response) {
                        var resp = response.data;
                        if (resp.isValid == false) {
                            self.isStockCodeValid = resp.isValid;
                            Vue.toasted.show('Stock Code already exists', { type: 'error', duration: 3000, dismissible: true });
                            let field = self.$validator._resolveField('Stock Code');
                            field.setFlags({ invalid: true });
                            self.errors.add({
                                field: 'Stock Code',
                                msg: 'Stock Code already exists',
                                rule: 'excluded:' + value + '',
                                id: field.id,
                                scope: field.scope
                            });
                            self.formModel.stockCode = "";
                        }
                        else {
                            self.isStockCodeValid = true;
                        }
                    })
                    .catch(function (error) {
                    });
            }
        },
        showConfigurationmodel() {
            var self = this;
            self.$modal.show('addmodelConfiguration');
        },
        hideConfiguration() {
            var self = this;
            self.$modal.hide('addmodelConfiguration');
        },
        bundleTypeSelection() {
            var self = this;
            if (self.productId != null && self.productId != "00000000-0000-0000-0000-000000000000") {
                return false;
            }
            if (self.formModel.bundleType == "0") {
                // self.bundleComponent = [];
                self.sumofAllComponentPrice = 0;
                self.formModel.priceType = 1;
                if (self.bundleComponent != null) {
                    for (var i = 0; i < self.bundleComponent.length; i++) {
                        self.bundleComponent[i].componentQty = 1;
                    }
                }
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
        getUpdatedTariffCode: function () {
            var self = this;
            var tariffCode = "";
            var selCategory = self.formModel.selectedCategory;
            if (self.categoriesLoaded == true && self.tariffCodesLoaded == true) {
                if (typeof (selCategory) != null || selCategory != "") {
                    if (typeof (selCategory) == 'undefined') {
                        self.selectedTariff = "";
                        return;
                    }
                    categorySelectCount = 0;
                    var count = 0;
                    self.categoryModified = true;
                    for (var i = 0; i < self.categoryTreeList.length; i++) {
                        var elem = self.categoryTreeList[i];
                        if (elem.recordId == selCategory) {
                            count++;
                            tariffCode = elem.tariffCode;
                        }
                        var findChild = function (items) {
                            for (var i = 0; i < items.length; i++) {
                                var current = items[i];
                                if (current.recordId === selCategory) {
                                    tariffCode = current.tariffCode;
                                    count++;
                                    return;
                                }
                            }
                            for (var j = 0; j < items.length; j++) {
                                if (items[j].children && items[j].children.length > 0) {
                                    findChild(items[j].children);
                                }
                            }
                        };
                        if (elem.subCategories != null && elem.subCategories.length > 0) {
                            findChild(elem.subCategories);
                        }
                    }
                    if (count > 0) {
                        self.selectedTariffCode = tariffCode;
                        self.setTariff();
                    }
                }
            }
        },
        setTariff: function () {
            var self = this;
            if (self.selectedTariffCode == null) {
                self.selectedTariff = "";
            }
            if (self.tariffCodesLoaded == true) {
                for (var i = 0; i < self.tariffCodes.length; i++) {
                    var tariff = self.tariffCodes[i];
                    if (tariff.itemValue == self.selectedTariffCode) {
                        self.selectedTariff = tariff.itemValue;
                    }
                }
            }
        },
        showlifecyclechangelog() {
            var self = this;
            self.productFormFilterModel = { recordId: self.productId };
            //self.productFormFilterModel.recordId = self.productId;
          
            if (self.productId != null && self.productId != "" && self.productId != "00000000-0000-0000-0000-000000000000") {
                axiosInstance()
                    .post('ProductEditor/GetProductLifecycleChangeLog', self.productFormFilterModel)
                    .then(function (response) {                       
                        //self.changeLogfetchInProgress = false;
                        self.lifecycleChangeLogList = response.data;
                    });
            }
        },        
        showlog() {
            var self = this;
            self.productFormFilterModel = { recordId: self.productId };
            //self.productFormFilterModel.recordId = self.productId;
            $('body').toggleClass('filter-bar-enabled');
            $('.filter-bar .nav-link').removeClass('active');
            $('.filter-bar .nav-link:eq(0)').addClass('active');
            self.changeLogfetchInProgress = true;
            if (self.productId != null && self.productId != "" && self.productId != "00000000-0000-0000-0000-000000000000") {
                axiosInstance()
                    .post('ProductEditor/GetProductChangeLog', self.productFormFilterModel)
                    .then(function (response) {
                        self.changeLogfetchInProgress = false;
                        self.changeLogList = response.data;
                        self.loadfilters = true;
                        self.showlogdata = true;

                        self.showPriceChangeLogs();
                        self.showlifecyclechangelog();
                    });
            }
            else {
                self.showlogdata = false;
            }
        },
        showPriceChangeLogs: function () {
            var self = this;
            axiosInstance()
                .post('ProductEditor/GetProductPriceChangeLog', self.productFormFilterModel)
                .then(function (response) {
                    self.changePriceLogList = response.data;
                    if (self.changePriceLogList.length > 0) {
                        if (decimalvalues == null || decimalvalues == undefined) {
                            decimalvalues = 0;
                        }
                        self.changePriceLogList.forEach(function (log, index) {
                            var pricingData = JSON.parse(log.pricing);
                            if (Array.isArray(pricingData))
                                log.SellPrice = parseFloat(pricingData[0].SellPrice).toFixed(decimalvalues);
                            else
                                log.SellPrice = parseFloat(pricingData.SellPrice).toFixed(decimalvalues);
                            log.CurrencySymbol = self.currencySymbol;
                            log.ChangeType = log.changeType;
                        });
                    }
                });
        },
        showLogModal: function (logData) {
            var self = this;
            self.logDataLoaded = true;
            self.logDataList = logData;
            if (logData.pricing != null) {
                self.logDataList.pricingDetails = JSON.parse(logData.pricing);
            }
            if (logData.attributes != null) {
                self.logDataList.attributesDetails = JSON.parse(logData.attributes);
            } else {
                self.logDataList.attributesDetails = null;
            }
            if (logData.images != null) {
                if (self.isValidJSONString(logData.images)) {
                    self.logDataList.images = JSON.parse(logData.images);

                    for (var i = 0; i < self.logDataList.images.length; i++) {
                        if (!(self.logDataList.images[0].Url.includes('http'))) {
                            self.logDataList.images[0].Url = imageFullUrl + self.logDataList.images[0].Url;
                        }
                    }
                } else if (logData.images.length>0) {
                    self.logDataList.images = logData.images; 
                    for (var i = 0; i < self.logDataList.images.length; i++) {
                        if (!(self.logDataList.images[0].Url.includes('http'))) {
                            self.logDataList.images[0].Url = imageFullUrl + self.logDataList.images[0].Url;
                        }
                    }
                }

                else {
                    self.logDataList.images = null;
                }
            } else {
                self.logDataList.images = null;
            }
            if (logData.comments != null && logData.changeType != 'BulkUpdateMultipleFields' && logData.changeType != 'BulkUpdateAnyField') {
                self.logDataList.comments = logData.comments;
            }
            self.logDataLoaded = true;
            if (self.logDataList.productJson != null && self.logDataList.productJson.SEO != null) {
                self.logDataList.url = self.logDataList.productJson.SEO.url;
            }
            if (logData.comments != null && (logData.changeType == 'BulkUpdateMultipleFields' || logData.changeType == 'BulkUpdateAnyField')) {
                if (self.isValidJSONString(logData.comments)) {
                    self.logDataList.comments = JSON.parse(logData.comments);
                }
            }

            self.$modal.show('showChangeLogsData');
        },
        hideLogModal: function () {
            var self = this;
            self.$modal.hide('showChangeLogsData');
        },
        showLifecycleLogModal: function (logData) {  
            var self = this;
            self.productChangeLogList = logData;
            self.$modal.show('showLifecycleLogsData');
        },
        hidelifecycleLogModal: function () {
            var self = this;
            self.$modal.hide('showLifecycleLogsData');
        },
        isValidJSONString: function (str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        },
        onCategorySelect: function () {
            var self = this;
            var selectedCategory = self.formModel.selectedCategory;
            if (typeof (selectedCategory) == 'undefined') {
                categorySelectCount++;
                if (categorySelectCount == 1) {
                    Vue.toasted.show('Select Category', { type: 'error', duration: 3000, dismissible: true });
                }
            }
        },
        openstatusUpdateModel: function () {
            var self = this;
            for (var i = 0; i < self.domainList.length; i++) {
                if (self.formModel.productStatus == 2 && self.domainList[i].isVisible == true) {
                    self.checkforPublish = true;             
                }
            }
            self.$modal.show('statusUpdateModel');
        }, calcelUpdateStatus() {
            var self = this;
            this.$validator.pause();
            self.formModel.productStatus = self.productBasicInfo.status;
            self.checkforPublish = false;
            for (var i = 0; i < self.domainList.length; i++) {
                self.domainList[i].isVisible = self.domainList1[i].isVisible;
            }
             self.$modal.hide('statusUpdateModel');
        }, beforeClose() {
            var self = this;
            this.$validator.pause();
            self.formModel.productStatus = self.productBasicInfo.status;
            self.checkforPublish = false;
            for (var i = 0; i < self.domainList.length; i++) {
              //  if (self.formModel.productStatus == false) {
                self.domainList[i].isVisible = self.domainList1[i].isVisible; 
               // }
            }
            //self.$modal.hide('statusUpdateModel');
        },
        updateStatus: function () {
            var self = this;
            if (self.checkforPublish == false) {
                for (var i = 0; i < self.domainList.length; i++) {
                    self.domainList[i].isVisible = false;
                }
            }
            if (self.formModel.subStatusName != "") {
                if (self.productLifecycleStep.toStatus) {
                    const filteredSteps = self.productLifecycleStep.toStatus.filter(x => x.statusName == self.formModel.subStatusName);
                    if (filteredSteps.length > 0) {
                        self.formModel.subStatusId = filteredSteps[0].statusId;
                    }
                }
                else {
                    self.formModel.subStatusId = self.formModel.productStatus;                    
                    var mainStatus = self.statuses.filter(x => x.value == self.formModel.productStatus)
                    if (mainStatus.length > 0) {
                        self.formModel.subStatusName = mainStatus[0].name;                    
                    }
                }
            }
            var productModel = {
                id: self.productId,
                basicInfo: {
                    stockCode: self.formModel.stockCode,
                    status: self.formModel.productStatus,
                    subStatusName: self.formModel.subStatusName,
                    subStatusId: self.formModel.subStatusId,
                    lifecycleId: self.formModel.lifecycleId
                },
                identifiers: {
                    SKU: self.sku
                }, domains: self.domainList,
                productLifecycleStep: self.productLifecycleStep,                
            };

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
                .post('ProductEditor/UpdateStatus', productModel, axiosConfig)
                .then(function (response) {
                    var data = response.data;
                    successed = true;
                    if (data.isValid) {
                        self.editStatus = false;
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
        }, getHSNCodesList: function (freetext) {
            var self = this;
            //get tags
            axiosInstance()
                .get('ProductEditor/GetHSNCodes?freetext=' + freetext)
                .then(function (response) {
                    self.hSNCodeList = response.data;
                });
        }, addHSNCodes: function (value) {
            var self = this;
            self.hsnquery = '';
            self.hSNCodeList = [];
            self.selectedHSNCode = value;
            self.editHSNCode = false;
            self.isNewProduct = false;
        }, getProductTags: function () {
            var self = this;
            //get tags
            axiosInstance()
                .get('ProductEditor/GetProductTags?productId=' + encodeURIComponent(self.productId))
                .then(function (response) {
                    if (response.data != null && response.data.result != null) {
                        for (var i = 0; i < response.data.result.length; i++) {
                            self.productTags.push(response.data.result[i].tag);
                        }
                    }
                });
        }, getTagsbyFreetext: function (freetext) {
            var self = this;
            //get tags
            axiosInstance()
                .get('ProductEditor/GetTagsbyFreetext?freetext=' + freetext)
                .then(function (response) {
                    if (self.tagquery != '') {
                        self.tagList = response.data.result;
                    }
                });
        }, addNewTags: function (tag) {
            var self = this;
            self.addTags(tag);
            self.tagquery = '';
            self.tagList = [];
        }, addTags: function (tag) {
            var self = this;
            self.tagquery = '';
            self.tagList = [];
            axiosInstance()
                .get('ProductEditor/AddProductTag?tag=' + tag + "&productId=" + encodeURIComponent(self.productId))
                .then(function (response) {
                    self.productTags.push(tag);
                });
        },
        removeTag(tag) {
            var self = this;
            var index = self.productTags.indexOf(
                self.productTags.find(item => item == tag)
            );
            axiosInstance()
                .get('ProductEditor/RemoveProductTag?tag=' + tag + "&stockCode=" + self.formModel.stockCode + "&productId=" + encodeURIComponent(self.productId))
                .then(function (response) {
                    self.productTags.splice(index, 1);
                });
        },
        getCountryList: async function () {
            var self = this;
            self.originCountiresList = [];
            EventBus.$on("masterData.loaded", function (masterData) {
                var info = masterData;
                var originCountries = info.countriesList;
                if (originCountries != null && originCountries.length > 0 && self.originCountiresList.length == 0) {
                    self.originCountiresList.push({ text: "Select", id: '' });
                    for (var i = 0; i < originCountries.length; i++) {
                        self.originCountiresList.push({ text: originCountries[i].name, id: originCountries[i].code });
                        if (originCountries[i].name == 'United Kingdom') {
                            defaultCountry = originCountries[i].code;
                            defaultSymbol = originCountries[i].symbol;
                            selectedCountry = originCountries[i].code;
                        }
                    }
                }
            });
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

            if (self.formModel.bundleProducts.find(item => item.recordId == value.recordId) != null) {
                return;
            }
            self.formModel.bundleProducts.push(product);
        }
    }
});

//var randomId = function () {
//    var id = Math.random().toString().substring(2, 25);
//    return "temp_" + id;
//};