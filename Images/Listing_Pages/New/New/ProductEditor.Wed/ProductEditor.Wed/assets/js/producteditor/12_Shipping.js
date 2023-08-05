
Vue.component("section-shipping", {
    template: "#section-shipping-template",
    props: ['message'],
    data() {
        return {
            shippingMethods: [],
            shippingMethodTypesLoaded: false,
            formModel: {
                //shippingMethods: [
                //    { name: "Standard", id: "1", selected: false },
                //    { name: "Express", id: "2", selected: false },
                //    { name: "Pickup", id: "3", selected: false }
                //],
                isFreeShipping: false,
                packageWidth: "",
                packageHeight: "",
                packageDepth: "",
                packageWeight: "",
                additionalShippingFees: "",
                deliveryNotes: ""
            }
        };
    },
    //beforeMount() {
    //    var self = this;
    //    axiosInstance()
    //        .get('ProductEditor/GetMasterData?type=23') //Shipping Method Types
    //        .then(function (response) {
    //            var data = response.data.itemType;
    //            self.shippingMethods = [];
    //            if (data != null) {
    //                for (var i = 0; i < data.length; i++) {
    //                    self.shippingMethods.push({ name: data[i].name, id: data[i].value, selected: false });
    //                }
    //            }
    //            self.shippingMethodTypesLoaded = true;
    //        });
    //},
    mounted() {
        var self = this;
        if (this.message !== undefined && this.message !== null) {
            this.formModel = this.message;
        }
        axiosInstance()
            .get('ProductEditor/GetMasterData?type=23&did=' + domainid) //Shipping Method Types
            .then(function (response) {
                var data = response.data.itemType;
                self.shippingMethods = [];
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        self.shippingMethods.push({ name: data[i].name, id: data[i].value, selected: true });
                    }
                }
                self.shippingMethodTypesLoaded = true;
            });

        EventBus.$on("product.loaded", function (product) {
            var shippingInfo = product.shippingInfo;
            self.formModel.packageWidth = shippingInfo.packageDimensions.widthCm;
            self.formModel.packageHeight = shippingInfo.packageDimensions.heightCm;
            self.formModel.packageDepth = shippingInfo.packageDimensions.depthCm;
            self.formModel.packageWeight = shippingInfo.packageDimensions.weightKg;
            self.formModel.additionalShippingFees = shippingInfo.additionalShippingFees;
            self.formModel.isFreeShipping = shippingInfo.isFreeShipping;
            axiosInstance()
                .get('ProductEditor/GetMasterData?type=23&did=' + domainid) //Shipping Method Types
                .then(function (response) {
                    var data = response.data.itemType;
                    self.shippingMethods = [];
                    if (data != null) {
                        for (var i = 0; i < data.length; i++) {
                            self.shippingMethods.push({ name: data[i].name, id: data[i].value, selected: false });
                        }
                    }
                    self.shippingMethodTypesLoaded = true;
                    if (shippingInfo.shippingTypes != null && shippingInfo.shippingTypes.length > 0) {
                        for (var i = 0; i < shippingInfo.shippingTypes.length; i++) {
                            var current = shippingInfo.shippingTypes[i];
                            for (var j = 0; j < self.shippingMethods.length; j++) {
                                var sm = self.shippingMethods[j];
                                if (sm.id == current.shippingMethodTypeId) {
                                    self.shippingMethods[j].selected = current.isSelected;
                                    //console.log(self.shippingMethods[j]);
                                }
                            }

                        }
                    }
                    run(product);
                });
            function run(product) {
                var info = product.shippingInfo;
                if (typeof CKEDITOR === "undefined") {
                    setTimeout(() => run(product), 500);
                    return;
                }

                CKEDITOR.instances.editor4.setData(info.deliveryNote);
            }
        });
    },
    methods: {
        getModel: function () {
            var deliveryNotes = CKEDITOR.instances.editor4.getData();
            return {
                deliveryNotes: deliveryNotes
            };
        },
        validate: function () {
            var self = this;
            var valid = self.formModel.packageWidth > 0
                && self.formModel.packageHeight > 0
                && self.formModel.packageDepth > 0
                && self.formModel.packageWeight > 0

            if (valid == false) {
                self.errormessages = [];
                //error messages
                if (self.formModel.packagewidth <= 0) {
                    self.errormessages.push("Enter Package Width");
                }
                if (self.formModel.packageheight <= 0) {
                    self.errormessages.push("Enter Package Height");
                }
                if (self.formModel.packagedepth <= 0) {
                    self.errormessages.push("Enter Package Depth");
                }
                if (self.formModel.packageweight <= 0) {
                    self.errormessages.push("Enter Package Weight");
                }
            }
            if (valid) {
                self.errormessages = [];
                this.$emit('validation-complete', true);
            } else {
                this.$emit('validation-complete', false);
            }
        }
    }
});