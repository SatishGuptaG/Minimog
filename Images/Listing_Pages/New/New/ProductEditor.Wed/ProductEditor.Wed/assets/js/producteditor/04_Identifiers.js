Vue.component("section-identifiers", {
    template: "#section-identifiers-template",
    data() {
        return {
            formModel: {
                sku: "",
                mpn: "",
                upc: "",
                gtn: "",
                barCode: ""
            },
            barCodePreview: "",
            isProductIdentifierEditDisabled: !hasProductIdentifierEditPermission,
            productSerialNos: [],
            currencySymbol: ""
        }
    },
    props: ['message'],
    mounted() {
        var self = this;
        if (this.message != undefined && this.message != null) {
            this.formModel = this.message;
        }
        EventBus.$on("basicInfo.stockCode", async function (stockCode) {
            var oldStockCode = self.formModel.sku;
            self.formModel.sku = stockCode;
            self.formModel.barCode = stockCode;
            await self.deleteBarCode(oldStockCode);
            await self.getBarCode(stockCode);
        }),
            EventBus.$on("product.loaded", async function (product) {
                self.productId = product.id
                var ids = product.identifiers;
                self.formModel.sku = ids.sku;
                self.formModel.mpn = ids.mpn;
                self.formModel.upc = ids.upcean;
                self.formModel.gtn = ids.gtn;
                self.formModel.barCode = ids.barcode == null ? ids.sku : ids.barcode;
                self.barCodePreview = ids.barCodeUrl;
                var code = (ids.barcode == null || ids.barcode == "") ? ids.sku : ids.barcode;
                if (self.barCodePreview == null) {
                    await self.getBarCode(code);
                }
                self.currencySymbol = product.defaultPricing.currencySymbol;
            });
    },
    methods: {
        getModel: function () {
            return {};
        },
        getBarCode: async function (stockCode) {
            var self = this;
            var imageModel = {
                "Name": stockCode
            };
            if (stockCode != null || stockCode != '') {
                await axiosInstancePost()
                    .post("/ProductEditor/UploadBarCode", imageModel, axiosConfig)
                    .then(function (response) {
                        self.barCodePreview = response.data.previewUrl;
                    });
            }
        },
        deleteBarCode: async function (stockCode) {
            var imageModel = {
                "Name": stockCode
            };
            await axiosInstancePost()
                .post("/ProductEditor/RemoveBarCode", imageModel, axiosConfig)
                .then(function (response) {
                    var response = response.data.message;
                });
        },
        showProductSerialNo: function () {
            var self = this;
            axiosInstance()
                .get('ProductEditor/GetProductSerialNo?productId=' + self.productId)
                .then(function (response) {
                    self.productSerialNos = (response.data != null) ? response.data : [];
                    for (var i = 0; i < self.productSerialNos.length; i++) {
                        self.productSerialNos[i].mfgDate = moment.utc(self.productSerialNos[i].mfgDate).format(dateFormat);
                        self.productSerialNos[i].expiryDate = moment.utc(self.productSerialNos[i].expiryDate).format(dateFormat);
                    }
                    self.$modal.show('viewProductSerialNo');
                });

        },
        hideProductSerialNoModel() {
            var self = this;
            self.$modal.hide('viewProductSerialNo');
        }
    }
})