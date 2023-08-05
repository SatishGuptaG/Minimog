var selectedSuppliers = "";
var defaultCountry = "";
var defaultSymbol = "";
Vue.component("section-supplier", {
    template: "#section-supplier-template",
    props: ['message'],
    data() {
        return {
            formModel: {
                originCountry: "",
                selectedSuppliers: "00000000-0000-0000-0000-000000000000",
            },
            editHSNCode: false,
            hSNCodeList: [],
            hsnquery: '',
            selectedHSNCode: '',
            isNewProduct: false,
            productId: '',
            originCountiresList: [],
            preSelectedOriginCountry: "",
            originCountry: "",
            countriesLoaded: false,
            supplierList: [{ text: "Select Supplier", id: '00000000-0000-0000-0000-000000000000' }],
            suppList: [],
            suppliersLoaded: false,
            isSuppliersEditDisabled: !hasSuppliersEditPermission
        };
    }, async beforeCreate() {
        var self = this;
    }, mounted() {
        if (this.message != null && this.message != undefined) {
            this.formModel = this.message;
        }
        var self = this;

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
            if (self.preSelectedOriginCountry != null && self.preSelectedOriginCountry != "" && (self.formModel.originCountry == undefined || self.formModel.originCountry == null || self.formModel.originCountry == "")) {
                setTimeout(function () {
                    self.formModel.originCountry = self.preSelectedOriginCountry;
                }, 1000);
            }
        });
        if (typeof productId === 'undefined') {
            self.isNewProduct = true;
            self.getCountryList();
        }
        EventBus.$on("onCountryDropDownChange", (value) => {
            var self = this;
            self.getSuppliersByCountry(value);
        });
        EventBus.$on("product.loaded", function (product) {
            setTimeout(function () {
                if (self.originCountiresList == null || self.originCountiresList.length == 0) {
                    self.getCountryList();
                }
            }, 1000);
            var info = product.basicInfo;
            self.productId = product.id;

            self.preSelectedOriginCountry = info.originCountry;
            var code = self.preSelectedOriginCountry;
            self.formModel.originCountry = info.originCountry;
            
            selectedSuppliers = info.supplierId;
            self.formModel.selectedSuppliers = info.supplierId;

            self.selectedHSNCode = info.tariffCode;
            if (self.selectedHSNCode != undefined && self.selectedHSNCode != null && self.selectedHSNCode != '') {
                self.editHSNCode = false;
            } else {
                self.isNewProduct = true;
            }
            setTimeout(function () {
                self.getSuppliersByCountry(code);
            }, 2000);
        });
    }, methods: {
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
        },
        getModel: function () {
            return {};
        },
        getSuppliersByCountry: function (code) {
            var self = this;
            var countryCode = code;
            selectedCountry = countryCode;
            self.supplierList = [{ text: "Select Supplier", id: '00000000-0000-0000-0000-000000000000' }];
            self.suppList = [];
            axiosInstance()
                .get('ProductEditor/GetSupplierLists?countryCode=' + countryCode)
                .then(function (response) {
                    var suppliers = response.data;
                    self.suppList = response.data;
                    if (suppliers != null && suppliers.length > 0) {
                        for (var i = 0; i < suppliers.length; i++) {
                            if (suppliers[i].Name != "") {
                                self.supplierList.push({ text: suppliers[i].name, id: suppliers[i].supplierId });
                            }
                        }

                        self.suppliersLoaded = true;
                        if (selectedSuppliers != null && selectedSuppliers != "") {
                            setTimeout(function () {
                                self.formModel.selectedSuppliers = selectedSuppliers;
                            }, 500);
                        }
                        else {
                            self.formModel.selectedSuppliers = '00000000-0000-0000-0000-000000000000';
                        }
                    }
                });
        },
        getHSNCodesList: function (freetext) {
            var self = this;
            //get tags
            axiosInstance()
                .get('ProductEditor/GetHSNCodes?freetext=' + freetext)
                .then(function (response) {
                    self.hSNCodeList = response.data;
                });
        },
        addHSNCodes: function (value) {
            var self = this;
            self.hsnquery = '';
            self.hSNCodeList = [];
            self.selectedHSNCode = value;
            self.editHSNCode = false;
            self.isNewProduct = false;
        },
    }
})