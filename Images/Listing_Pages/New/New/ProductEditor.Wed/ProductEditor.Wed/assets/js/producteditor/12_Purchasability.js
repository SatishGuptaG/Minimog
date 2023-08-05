var pUnavaiableOnline = "0";
var pAvaiableOnline = "1";
var pPreOrder = "2";
var pForwardOrder = "3";

Vue.component("section-purchasability", {
    template: "#section-purchasability-template",
    data() {
        return {
            productChannels: [],
            productId: '',
            formModel: {
                purchasabilityType: pAvaiableOnline,
                removePreOrderStatus: false,
                //showCallForPricingMessage: false,
                minPurchaseQty: "",
                maxPurchaseQty: "",
                sellableType: 1,
                itemPerCarton: 1,
                preorder: {
                    enabled: false,
                    shortMessage: "",
                    launchDate: "",
                    maxStock: "",
                    //currentStock: ""
                }
            },
            productModel: {
                sellPrice: 0.00,
                listPrice: 0.00
            },
            linkedPromotions: [],
            isSellabilityEditDisabled: !hasSellabilityEditPermission
        }
    },  
    props: ['message'],
    mounted() {
        var self = this;
        if (this.message != undefined && this.message != null) {
            this.formModel = this.message;
        } 
        
        EventBus.$on("product.loaded", function (product) {
            var info = product.purchasability;
            self.productId = product.id;
            //self.getProductChannel();
            if (info) {
                self.formModel.purchasabilityType = info.purchasabilityType;
                self.formModel.minPurchaseQty = info.minPurchaseQty;
                self.formModel.maxPurchaseQty = info.maxPurchaseQty;
                if (info.preorder != null) {
                    self.formModel.preorder.enabled = info.preorder.enabled;
                    self.formModel.preorder.shortMessage = info.preorder.shortMessage;
                    self.formModel.preorder.launchDate = (info.preorder.launchDate != null) ? info.preorder.launchDate.split('T')[0] : "";
                    self.formModel.preorder.maxStock = info.preorder.maxStock;
                    //self.formModel.preorder.currentStock = info.preorder.currentStock;
                    self.formModel.sellableType = info.sellableType;
                    self.formModel.itemPerCarton = info.itemPerCarton;
                }
            }
            if (decimalvalues == null || decimalvalues == undefined) {
                decimalvalues = 0;
            }
            self.productModel.sellPrice = parseFloat(product.defaultPricing.sellPrice).toFixed(decimalvalues);
            self.productModel.listPrice = parseFloat(product.defaultPricing.listPrice).toFixed(decimalvalues);
        });
    },
    methods: {
        getModel: function () {
            return {};
        }, getProductChannel: function () {
            var self = this;
            //get tags
            axiosInstance()
                .get('ProductEditor/GetProductChannels?productId=' + encodeURIComponent(self.productId))
                .then(function (response) {
                    if (response.data != null && response.data.result != null && response.data.result.length > 0) {
                        for (var i = 0; i < response.data.result.length; i++) {
                            self.productChannels.push(response.data.result[i]);
                        }
                        for (var i = 0; i < self.productChannels.length; i++) {
                            self.productChannels[i].icon = '/assets/images/channels/' + self.productChannels[i].icon;
                        }
                    }
                });
        },
        clearPreOrder: function () {
            var self = this;
            self.formModel.preorder.enabled = false;
            self.formModel.preorder.shortMessage = ""
            self.formModel.preorder.launchDate = "";
            self.formModel.preorder.maxStock = "";
            //self.formModel.preorder.currentStock = "";
        },
        emitPreOrders: function () {
            var self = this;
            EventBus.$emit("preOrder", self.formModel.purchasabilityType);
        },
        showLinkedPromotionsModel() {
            var self = this;

            //get tags
            axiosInstance()
                .get('ProductEditor/GetProductPromotions?productId=' + encodeURIComponent(self.productId))
                .then(function (response) {
                    var respPromoData = response.data;
                    var returnData = respPromoData;
                    if (self.productModel.listPrice > self.productModel.sellPrice) {
                        returnData = respPromoData.filter(x => !x.excludeMarkDownProducts)
                    }
                    if (self.productModel.listPrice == self.productModel.sellPrice) {
                        returnData = respPromoData.filter(x => !x.excludeFullPriceProducts)
                    }
                    self.linkedPromotions = returnData;
                    self.$modal.show('linkedPromotionsModel');
                });
        },
        hide() {
            var self = this;
            self.$modal.hide('linkedPromotionsModel');
        },
    }
});