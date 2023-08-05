
//var formulaCostPrice = "(advPurchCostExFac/advPurchExRate)";
//var formulaDutyableCost = "((advPurchCostExFac/advPurchExRate)+advPurchFreight)";
//var formulaDutyCharges = "(((advPurchCostExFac/advPurchExRate)+advPurchFreight)*advPurchDutyChargePercent)";
//var formulaInsurance = "((((advPurchCostExFac/advPurchExRate)+advPurchFreight)*advPurchInsurancePercent))"
//var formulaLC = "(((advPurchCostExFac/advPurchExRate)+advPurchFreight)+(((advPurchCostExFac/advPurchExRate)+advPurchFreight)*advPurchDutyChargePercent)+((((advPurchCostExFac/advPurchExRate)+advPurchFreight)*advPurchInsurancePercent))+advPurchCostQC1+advPurchCostQC2+advPurchCost1+advPurchCost2+advPurchDefectsProvision)";

var selectedSupplier = "";
var selectedTaxClass = "";
var defaultCountry = "";
var defaultSymbol = "";
var selectedCountry = "";
var advPurchDutyChargePercentBaseValue = 0;

Vue.component("section-advpurchasedata", {
    template: "#section-advpurchasedata-template",
    data() {
        return {
            formModel: {
                advPurchCostExFac: 0,
                advPurchExRate: 0,
                advPurchCostPrice: 0,
                advPurchFreight: 0,
                advPurchDutyableCost: 0,
                advPurchDutyCharges: 0,
                advPurchInsurance: 0,
                advPurchCostQC1: 0,
                advPurchCostQC2: 0,
                advPurchCost1: 0,
                advPurchCost2: 0,
                advPurchDefectsProvision: 0,
                advPurchLandingCostIncludingQC: 0,
                advPurchRRP: 0,
                advPurchMinimumOrderQuantity: 0,
                advPurchReorderLevel: 0,
                advPurchReorderQty: 0,
                advPurchLeadTime: 0,
                selectedCountry: "",
                selectedCurrency: "",
                selectedCurrSymbol: "",
                selectedSupplier: "00000000-0000-0000-0000-000000000000",
                advPurchDutyChargePercent: advPurchDutyChargePercentBaseValue,
                advPurchInsurancePercent: 0.001,
                advPurchCostPriceFormula: formulaCostPrice,
                advPurchDutyableCostFormula: formulaDutyableCost,
                advPurchDutyChargesFormula: formulaDutyCharges,
                advPurchLandingCostFormula: formulaLC,
                advPurchInsuranceFormula: formulaInsurance,
                advPurchWholesaleFormula: formulaWholesale,
                advPurchaseWholesaleValue: wholesaleValue,
                taxClass: '-1',
                sellPrice: 0
            },
            countiresList: [],
            countriesLoaded: false,
            supplierList: [{ text: "Select Supplier", id: '00000000-0000-0000-0000-000000000000' }],
            suppliersLoaded: false,
            preSelectedCountry: "",
            preSelectedCurrSymbol: "",
            preSelectedCurr: "",
            suppList: [],
            taxClassList: [{ name: '- Select -', value: '-1' }],
            taxClassListLoaded: false,
            editProductData: false,
            productTaxKey: ''
        }
    },
    props: ['message'],
    async beforeCreate() {
        var self = this;
        //countries list and currency
        //var countries = await axiosInstance()
        //    .get('ProductEditor/GetMasterData?type=34&did=' + domainid)
        //    .then(function (response) {
        //        return response.data.items;
        //    });
        //if (countries != null && countries.length > 0) {
        //    for (var i = 0; i < countries.length; i++) {
        //        if (countries[i].symbol != null) {
        //            self.countiresList.push({ text: countries[i].name, /*value: countries[i].recordId,*/ id: countries[i].code/*, currencyCode: countries[i].text, currencySymbol: countries[i].symbol */});
        //            if (countries[i].name == 'United Kingdom') {
        //                defaultCountry = countries[i].code;
        //                defaultSymbol = countries[i].symbol;
        //                selectedCountry = countries[i].code;
        //            }
        //        }
        //    }
        //    self.countriesLoaded = true;
        //    if (typeof productId === 'undefined') {
        //        self.formModel.selectedCountry = defaultCountry;
        //        self.formModel.selectedCurrency = self.preSelectedCurr;
        //        self.formModel.selectedCurrSymbol = defaultSymbol;
        //        self.getSuppliersByCountry(self.formModel.selectedCountry);
        //    }
        //    if (self.preSelectedCountry != "" && self.formModel.selectedCountry == "") {
        //        self.formModel.selectedCountry = self.preSelectedCountry;
        //    }
        //}
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
        //var taxList = await axiosInstance()
        //    .get('ProductEditor/GetMasterData?type=9&did=' + domainid) //ItemTypes
        //    .then(function (response) {
        //        return response.data.items;
        //    });
        //if (taxList != null && taxList.length > 0) {
        //    self.taxClassList = [{ name: '- Select -', value: '-1' }];
        //    for (var i = 0; i < taxList.length; i++) {
        //        self.taxClassList.push({ name: taxList[i].name, value: taxList[i].recordId });
        //    }
        //    self.taxClassListLoaded = true;
        //    if (selectedTaxClass != "") {
        //        self.formModel.taxClass = selectedTaxClass;
        //    } else {
        //        var txClass = self.taxClassList.filter(function (el) {
        //            if (el.name === "Default Tax Class") {
        //                return el;
        //            }
        //        })
        //        if (txClass.length > 0) {
        //            self.formModel.taxClass = txClass[0].value;
        //        }
        //    }
        //}

        //suppliers list
        //var suppliers = await axiosInstance()
        //    .get('ProductEditor/GetMasterData?type=35&did=' + domainid)
        //    .then(function (response) {
        //        return response.data.Result;
        //    });
        //if (suppliers != null && suppliers.length > 0) {
        //    for (var i = 0; i < suppliers.length; i++) {
        //        if (suppliers[i].Name != "") {
        //            self.supplierList.push({ text: suppliers[i].Name, id: suppliers[i].RecordId});
        //        }
        //    }
        //    self.suppliersLoaded = true;
        //}
    },
    watch: {
        question: function (newQuestion, oldQuestion) {
            this.answer = 'Waiting for you to stop typing...';
            this.debouncedGetAnswer();
        }
    },
    mounted() {
        var self = this;
        if (this.message != undefined && this.message != null) {
            this.formModel = this.message;
        }

        if (typeof productId === 'undefined') {
            self.getCountryList();
        }

        EventBus.$on("onCountryDropDownChange", (value) => {
            var self = this;
            self.getSuppliersByCountry(value);
            self.setCountryTax(value);
            self.setCostPriceValue();
            self.setDutyableCost();
            self.setInsurance();
            self.setLandingCost();
        });

        EventBus.$on("product.loaded", function (product) {
            var advPurchase = product.advancedPurchaseData;
            self.editProductData = true;
            setTimeout(function () {
                self.preSelectedCountry = advPurchase != null ? advPurchase.countryCode : self.formModel.selectedCountry;
                self.preSelectedCurrSymbol = advPurchase != null ? advPurchase.currencySymbol : self.formModel.selectedCurrency;
                self.preSelectedCurr = advPurchase != null ? advPurchase.currencyCode : self.formModel.selectedCurrSymbol;
                self.getCountryList();
            }, 500);
            if (advPurchase != null) {
                self.formModel.advPurchCostExFac = (advPurchase.costPriceExFactory != null) ? advPurchase.costPriceExFactory : 0;
                self.formModel.advPurchExRate = (advPurchase.exchangeRate != null) ? advPurchase.exchangeRate : 0;
                self.formModel.advPurchCostPrice = (advPurchase.costPrice != null) ? advPurchase.costPrice : 0;
                self.formModel.advPurchFreight = (advPurchase.freight != null) ? advPurchase.freight : 0;  
                self.formModel.advPurchDutyableCost = (advPurchase.dutyableCost != null) ? advPurchase.dutyableCost : 0; 
                self.formModel.advPurchDutyCharges = (advPurchase.dutyCharges != null) ? advPurchase.dutyCharges : 0; 
                self.formModel.advPurchInsurance = (advPurchase.insurance != null) ? advPurchase.insurance : 0;  
                self.formModel.advPurchCostQC1 = (advPurchase.costQC1 != null) ? advPurchase.costQC1 :0;
                self.formModel.advPurchCostQC2 = (advPurchase.costQC2 != null) ? advPurchase.costQC2 : 0;
                self.formModel.advPurchCost1 = (advPurchase.cost1 != null) ? advPurchase.cost1 : 0;  
                self.formModel.advPurchCost2 = (advPurchase.cost2 != null) ? advPurchase.cost2 : 0; 
                self.formModel.advPurchDefectsProvision = (advPurchase.defectsProvision != null) ? advPurchase.defectsProvision : 0;
                self.formModel.advPurchLandingCostIncludingQC = (advPurchase.landingCostIncludingQC != null) ? advPurchase.landingCostIncludingQC : 0;
                self.formModel.advPurchRRP = advPurchase.rrp;
                self.formModel.advPurchMinimumOrderQuantity = advPurchase.minimumOrderQuantity;
                self.formModel.advPurchReorderLevel = advPurchase.reorderLevel;
                self.formModel.advPurchReorderQty = advPurchase.reorderQty;
                self.formModel.advPurchLeadTime = advPurchase.leadTime;
                selectedCountry = advPurchase.countryCode;
                self.preSelectedCountry = (advPurchase.countryCode != null) ? advPurchase.countryCode : "";
                self.formModel.selectedCurrency = advPurchase.currencyCode;
                self.preSelectedCurr = (advPurchase.currencyCode != null) ? advPurchase.currencyCode : "";
                self.formModel.selectedCurrSymbol = advPurchase.currencySymbol;
                self.preSelectedCurrSymbol = (advPurchase.currencySymbol != null) ? advPurchase.currencySymbol : "";
                self.formModel.advPurchLandingCostFormula = (advPurchase.landingCostFormula == null) ? formulaLC : advPurchase.landingCostFormula;
                selectedSupplier = advPurchase.supplierId;
                self.formModel.selectedSupplier = advPurchase.supplierId;
                self.formModel.sellPrice = (advPurchase.sellPrice != null) ? advPurchase.sellPrice:0 ;
                selectedTaxClass = (advPurchase != null && advPurchase.taxClass != null) ? advPurchase.taxClass.key : null;
                self.formModel.taxClass = (advPurchase != null && advPurchase.taxClass != null) ? advPurchase.taxClass.key : null;
                self.formModel.selectedCountry = self.preSelectedCountry;
                setTimeout(function () {
                    calculateWholesalePrice();
                    self.setWholesalePrice();
                }, 2000);
            }
        });
    },
    methods: {
        getModel: function () {
            var self = this;
            return
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
        getCurrencyByCountry: function (event) {
            var self = this;
            var country = event.target.value;
            var countryList = this.countiresList;
            var result = this.countiresList.filter(obj => {
                return obj.countryCode === country
            });
            if (result.length > 0) {
                self.formModel.selectedCurrency = (result[0].currencyCode != null) ? result[0].currencyCode : "";
                self.formModel.selectedCurrSymbol = (result[0].currencySymbol != null) ? result[0].currencySymbol : "";
            }

        },
        calculateCostPrice: function () {
            var self = this;
            self.formModel.advPurchCostPrice = (self.formModel.advPurchCostExFac / (self.formModel.exchangeRate == 0 ? 1 : self.formModel.advPurchExRate)).toFixed(2);
            self.calculateDutyableCost();
        },
        calculateDutyableCost: function () {
            var self = this;
            self.formModel.advPurchDutyableCost = parseFloat(parseFloat(self.formModel.advPurchCostPrice) + parseFloat(self.formModel.advPurchFreight == "" ? 0 : self.formModel.advPurchFreight)).toFixed(2);
            self.calculateDutyCharges();
            self.calculateInsurance();
            self.calculateLandingCost();
        },
        calculateDutyCharges: function () {
            var self = this;
            setTimeout(function () {
                self.formModel.advPurchDutyCharges = ((self.formModel.advPurchDutyableCost) * (self.formModel.advPurchDutyChargePercent)).toFixed(2);
                self.calculateLandingCost();
            }, 1000); 
        },
        calculateInsurance: function () {
            var self = this;
            self.formModel.advPurchInsurance = ((self.formModel.advPurchDutyableCost) * (0.001)).toFixed(2);
            self.calculateLandingCost();
        },
        calculateLandingCost: function () {
            var self = this;

            if (self.formModel.advPurchDutyCharges == null || self.formModel.advPurchDutyCharges == 0 || self.formModel.advPurchDutyCharges == NaN) {
                self.calculateDutyCharges();
            }
            var calculatedValues = (parseFloat(self.formModel.advPurchDutyableCost) + parseFloat(self.formModel.advPurchDutyCharges) + parseFloat(self.formModel.advPurchInsurance));
            var costQC = (parseFloat(self.formModel.advPurchCostQC1 == "" ? 0 : self.formModel.advPurchCostQC1) + parseFloat(self.formModel.advPurchCostQC2 == "" ? 0 : self.formModel.advPurchCostQC2) + parseFloat(self.formModel.advPurchDefectsProvision == "" ? 0 : self.formModel.advPurchDefectsProvision));
            var cost = (parseFloat(self.formModel.advPurchCost1 == "" ? 0 : self.formModel.advPurchCost1) + parseFloat(self.formModel.advPurchCost2 == "" ? 0 : self.formModel.advPurchCost2));

            self.formModel.advPurchLandingCostIncludingQC = parseFloat(calculatedValues + costQC + cost).toFixed(2);
        },
        setCostPriceValue: function () {
            var self = this;
            self.formModel.advPurchCostPrice = advCostPrice.toFixed(2);
        },
        setDutyableCost: function () {
            var self = this;
            self.calculateDutyableCost();
            self.formModel.advPurchDutyableCost = advDutyableCost.toFixed(2);
        },
        setDutyCharges: function () {
            var self = this;
            self.formModel.advPurchDutyCharges = isNaN(advDutyCharges) ? 0 : advDutyCharges.toFixed(2);
        },
        setInsurance: function () {
            var self = this;
            self.formModel.advPurchInsurance = advInsurance.toFixed(2);
        },
        setCountryTax: function (selectedCountry) {
            var self = this;
            if (selectedCountry != '') {
                var zeroDutyCountryArr = zeroDutyCountries.split(",");
                if (zeroDutyCountryArr.indexOf(selectedCountry) === -1) {
                    self.formModel.advPurchDutyChargePercent = 0.12;
                } else {
                    self.formModel.advPurchDutyChargePercent = 0
                } 

                //non zero duty country with spacific duty charge
                var nonzeroDutyCountryArr = nonzeroDutyCountrieswithSpacificPrice.split(",");
                if (nonzeroDutyCountryArr.indexOf(selectedCountry) > -1) {
                    self.formModel.advPurchDutyChargePercent = 0.16;
                } 
            }
        },
        setLandingCost: function () {
            var self = this;
            advLandingCost = isNaN(advLandingCost) ? 0 : advLandingCost;
            if (advLandingCost != null && advLandingCost != 0) {
               // self.formModel.advPurchLandingCostIncludingQC = advLandingCost.toFixed(2);
            }
        },
        getSuppliersByCountry: function (code) {
            var self = this;
            var countryCode = code;
            selectedCountry = countryCode;
            calculateDutyCharges();
            //self.setDutyCharges();
            self.setLandingCost();
            self.supplierList = [{ text: "Select Supplier", id: '00000000-0000-0000-0000-000000000000' }];
            self.suppList = [];
            axiosInstance()
                .get('ProductEditor/GetMasterData?type=35&countryCode=' + countryCode + '&did=' + domainid)
                .then(function (response) {
                    var suppliers = response.data.result;
                    self.suppList = response.data.result;
                    if (suppliers != null && suppliers.length > 0) {
                        for (var i = 0; i < suppliers.length; i++) {
                            if (suppliers[i].Name != "") {
                                self.supplierList.push({ text: suppliers[i].name, id: suppliers[i].recordId });
                            }
                        }
                        self.suppliersLoaded = true;
                        if (selectedSupplier != null && selectedSupplier != "") {
                            setTimeout(function () {
                                self.formModel.selectedSupplier = selectedSupplier;
                            }, 500);
                        }
                        else {
                            self.formModel.selectedSupplier = '00000000-0000-0000-0000-000000000000';
                        }
                    }
                });
        },
        selectCurrencySymbol: function () {
            var self = this;
            var selectedSupplier = self.formModel.selectedSupplier;
            for (var i = 0; i < self.suppList.length; i++) {
                var currSupp = self.suppList[i];
                if (currSupp.RecordId == selectedSupplier) {
                    self.formModel.selectedCurrSymbol = currSupp.CurrencySymbol;
                    self.formModel.selectedCurrency = currSupp.CurrencyCode;
                }
            }

        },
        validate: function () {
            var self = this;

            var valid = self.formModel.taxclass != "-1";

            if (valid == false) {
                self.errormessages = [];
                //error messages
                if (self.formModel.taxclass == "-1") {
                    self.errormessages.push("enter tax class");
                }
            }

            if (valid) {
                this.$emit('validation-complete', true);
            } else {
                this.$emit('validation-complete', false);
            }
        },
        showToaster: function (type) {
            var self = this;
            switch (type) {
                case "Tax Class":
                    if (self.formModel.taxClass == "-1") {
                        Vue.toasted.show('Enter Tax Class', { type: 'error', duration: 3000, dismissible: true });
                    }
                    break;
            }
        },
        emitSellPrice: function () {
            var self = this;
            EventBus.$emit("advancedpurchase.sellprice", self.formModel.sellPrice);
        },
        setWholesalePrice: function () {
            var self = this;
            setTimeout(function () {
                if (advWholesalePrice > 0) {
                    self.formModel.sellPrice = advWholesalePrice.toFixed(2);
                }
            }, 1000);
            //EventBus.$on("advancedpurchase.sellprice", function (advWholesalePrice) {
            //    if (advWholesalePrice > 0) {
            //        self.formModel.sellPrice = advWholesalePrice.toFixed(2);
            //    }
            //}); 
        },
        getCountryList: async function () {
            var self = this;
            var countries = await axiosInstance()
                .get('ProductEditor/GetMasterData?type=34&did=' + domainid)
                .then(function (response) {
                    return response.data.items;
                });
            if (countries != null && countries.length > 0) {
                for (var i = 0; i < countries.length; i++) {
                    if (countries[i].symbol != null) {
                        self.countiresList.push({ text: countries[i].name, /*value: countries[i].recordId,*/ id: countries[i].code/*, currencyCode: countries[i].text, currencySymbol: countries[i].symbol */ });
                        if (countries[i].name == 'United Kingdom') {
                            defaultCountry = countries[i].code;
                            defaultSymbol = countries[i].symbol;
                            selectedCountry = countries[i].code;
                        } 
                    }
                }
                self.countriesLoaded = true;
                if (self.preSelectedCountry != null && self.preSelectedCountry != "") {
                    self.formModel.selectedCountry = self.preSelectedCountry;
                }
                else {
                    self.formModel.selectedCountry = defaultCountry;
                }
                self.formModel.selectedCurrSymbol = defaultSymbol;
                self.formModel.selectedCurrency = self.preSelectedCurr;
                self.getSuppliersByCountry(self.formModel.selectedCountry);
                self.setCountryTax(self.formModel.selectedCountry);
            }
        }
    }
})