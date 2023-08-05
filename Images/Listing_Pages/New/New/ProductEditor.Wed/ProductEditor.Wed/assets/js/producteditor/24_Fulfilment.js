Vue.component("section-fulfilment", {
    template: "#section-fulfilment-template",
    data() {
        return {
            formModel: {
                fulfilFromWarehouse: false,
                fulfilFromStore: false,
                fulfilFromSupplier: false,
                fulfilFromWarehouseDays: 0,
                fulfilFromSupplierDays: 0,
                fulfilFromStoreDays: 0
            }
        };
    },
    props: ['message'],
    mounted() {
        var self = this;
        if (this.message != undefined && this.message != null) {
            this.formModel = this.message;
        }
        EventBus.$on("product.loaded", function (product) {
            if (!product.fulfilment)
                return;
            var fulfilmentObj = product.fulfilment;
            self.formModel.fulfilFromWarehouse = fulfilmentObj.fulfilFromWarehouse;
            self.formModel.fulfilFromStore = fulfilmentObj.fulfilFromStore;
            self.formModel.fulfilFromSupplier = fulfilmentObj.fulfilFromSupplier;
            self.formModel.fulfilFromWarehouseDays = (fulfilmentObj.fulfilFromWarehouseDays != null) ? fulfilmentObj.fulfilFromWarehouseDays : 0;
            self.formModel.fulfilFromSupplierDays = (fulfilmentObj.fulfilFromSupplierDays != null) ? fulfilmentObj.fulfilFromSupplierDays : 0;
            self.formModel.fulfilFromStoreDays = (fulfilmentObj.fulfilFromStoreDays != null) ? fulfilmentObj.fulfilFromStoreDays : 0;
        });
    },
    methods: {
        getModel: function () {
            return;
        },
        showToaster: function (type) {
            var self = this;
            switch (type) {
                case "FulfilFromWarehouse":
                    if ( self.formModel.fulfilFromWarehouseDays == '') {
                        Vue.toasted.show('Enter fulfilment from warehouse days', { type: 'error', duration: 3000, dismissible: true });
                    }
                    break;
                case "FulfilFromSupplier":
                    if (self.formModel.fulfilFromSupplierDays == '') {
                        Vue.toasted.show('Enter fulfilment from supplier days', { type: 'error', duration: 3000, dismissible: true });
                    }
                    break;
                case "FulfilFromStore":
                    if (self.formModel.fulfilFromStoreDays == '') {
                        Vue.toasted.show('Enter fulfilment from instore days', { type: 'error', duration: 3000, dismissible: true });
                    }
                    break;
            }
        },
        validate: function () {
            var self = this;
            var valid =
                (self.formModel.fulfilFromWarehouse == true && self.formModel.fulfilFromWarehouseDays != "") ? true : false
                    && (self.formModel.fulfilFromSupplier == true && self.formModel.fulfilFromSupplierDays != "") ? true : false
                        && (self.formModel.fulfilFromStore == true && self.formModel.fulfilFromStoreDays != "") ? true : false

            if (valid == false) {
                self.errorMessages = [];
                //error messages
                if (self.formModel.fulfilFromWarehouseDays == "") {
                    self.errorMessages.push("Enter fulfilment from warehouse days");
                }
                if (self.formModel.fulfilFromSupplierDays == "") {
                    self.errorMessages.push("Enter fulfilment from supplier days");
                }
                if (self.formModel.fulfilFromStoreDays == "") {
                    self.errorMessages.push("Enter fulfilment from instore days");
                }
            }
            if (valid) {
                self.errorMessages = [];
                this.$emit('validation-complete', true);
            } else {
                this.$emit('validation-complete', false);
            }
        }
    }
})