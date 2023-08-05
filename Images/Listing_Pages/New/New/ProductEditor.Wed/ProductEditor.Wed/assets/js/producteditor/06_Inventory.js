Vue.component("section-inventory", {
    template: "#section-inventory-template",
    data() {
        return {
            formModel: {
                trackInventory: false,
                currentStock: 0,
                enableBackorder: false,
                maxQtyAllowed: "",
                warehouseName: "",
                allocatedQty: "",
                lastUpdated: "",
                fulfilFromWarehouse: true,
                fulfilFromStore: false,
                fulfilFromSupplier: false,
                fulfilFromWarehouseDays: 0,
                fulfilFromSupplierDays: 0,
                fulfilFromStoreDays: 0
            },
            newInventory: true,
            disableTrackInventory: false,
            isInventoryAndFulfilmentEditDisabled: !hasInventoryAndFulfilmentEditPermission
        };
    },
    props: ['message'],
    mounted() {
        if (this.message != undefined && this.message != null) {
            this.formModel = this.message;
        }
        var self = this;
        EventBus.$on("basicInfo.productType", function (productType) { 
            if (productType == 2) {
                self.disableTrackInventory = true;
                self.formModel.trackInventory = false;
            } else { 
                self.disableTrackInventory = false;
                self.formModel.trackInventory = true;
            }
        })

        EventBus.$on("product.loaded", function (product) {
            var inventoryList = product.inventory;
            if (inventoryList && inventoryList.length) {
                var inventory = inventoryList[0];
                self.newInventory = false;
                self.formModel.currentStock = inventory.stockOnHand;
                self.formModel.warehouseName = inventory.warehouseName;
                self.formModel.allocatedQty = inventory.stockAllocated;
                self.formModel.calculatedOnHandQty = (inventory.stockOnHand - inventory.stockAllocated);
                var lastUpdated = moment.utc(inventory.lastUpdated).format(dateTimeFormat);
                self.formModel.lastUpdated = (lastUpdated != null) ? lastUpdated : "";
                self.formModel.trackInventory = true;
                self.formModel.fulfilFromWarehouse = inventory.fulfilFromWarehouse;
                self.formModel.fulfilFromStore = inventory.fulfilFromStore;
                self.formModel.fulfilFromSupplier = inventory.fulfilFromSupplier;
                self.formModel.fulfilFromWarehouseDays = (inventory.fulfilFromWarehouseDays != null) ? inventory.fulfilFromWarehouseDays : 0;
                self.formModel.fulfilFromSupplierDays = (inventory.fulfilFromSupplierDays != null) ? inventory.fulfilFromSupplierDays : 0;
                self.formModel.fulfilFromStoreDays = (inventory.fulfilFromStoreDays != null) ? inventory.fulfilFromStoreDays : 0;
            }
        });
    },
    methods: {
        getModel: function () {
            return {};
        },
        emitCurrentStock: function () {
            var self = this;
            EventBus.$emit("inventory.currentStock", self.formModel.currentStock);
        },
        showToaster: function (type) {
            var self = this;
            switch (type) {
                case "FulfilFromWarehouse":
                    if (self.formModel.fulfilFromWarehouseDays == '') {
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
                ((self.formModel.fulfilFromWarehouse == true && Number(self.formModel.fulfilFromWarehouseDays) < 0) ? false : true )
                && ((self.formModel.fulfilFromSupplier == true && Number(self.formModel.fulfilFromSupplierDays) < 0) ? false : true )
                && ((self.formModel.fulfilFromStore == true && Number(self.formModel.fulfilFromStoreDays) < 0) ? false : true)

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
        },
        openInventoryProperties: function () {
            var self = this;
            if (self.formModel.trackInventory) {
                self.formModel.fulfilFromWarehouse = true;
            }
        }
    }
})