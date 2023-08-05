var gwNone = "0";
var gwAll = "1";
var gwSelected = "2";
Vue.component("section-giftwrapping", {
    template: "#section-giftwrapping-template",
    props: ['message'],
    data() {
        return {
            //giftWrapOptions: [{ name: '- Select -', value: '-1' }],
            giftWrapOptions: [],
            giftWrapOptionsLoaded: false,
            giftWrapTypes: [],
            giftWrapTypesLoaded: false,
            formModel: {
                imageSetting: "",
                type: gwNone,
                types: [],
                giftWrapType: 0
            },
            isGiftWrappingEditDisabled: !hasGiftWrappingEditPermission
        };
    },
    mounted() {
        var self = this;
        if (this.message !== undefined && this.message !== null) {
            this.formModel = this.message;
        }
        //axiosInstance()
        //    .get('ProductEditor/GetMasterData?type=24&did=' + domainid)
        //    .then(function (response) {
        //        var data = response.data.itemType;
        //        if (data != null) {
        //            self.giftWrapTypes = [];
        //            for (var i = 0; i < data.length; i++) {
        //                var giftWrapObj = new Object();
        //                giftWrapObj.name = data[i].name;
        //                giftWrapObj.value = data[i].value;
        //                self.giftWrapTypes.push(giftWrapObj);
        //            }
        //        }
        //        self.giftWrapTypesLoaded = true;
        //    });

        //axiosInstance()
        //    .get('ProductEditor/GetMasterData?type=8&did=' + domainid)
        //    .then(function (response) {
        //        var data = response.data.items;
        //        self.giftWrapOptions = [];
        //        if (data != null) {
        //            for (var i = 0; i < data.length; i++) {
        //                self.giftWrapOptions.push({ name: data[i].name, id: data[i].recordId, selected: false });
        //            }
        //        }
        //    });

        EventBus.$on("masterData.loaded", function (masterData) {
            var info = masterData;
            var data = info.giftWrappingItems;
            self.giftWrapOptions = [];
            if (data != null) {
                for (var i = 0; i < data.length; i++) {
                    self.giftWrapOptions.push({ name: data[i].name, id: data[i].recordId, selected: false });
                }
            }

            var giftWrapTypes = info.giftWrapTypes.itemType;
            if (giftWrapTypes != null) {
                self.giftWrapTypes = [];
                for (var i = 0; i < giftWrapTypes.length; i++) {
                    var giftWrapObj = new Object();
                    giftWrapObj.name = giftWrapTypes[i].name;
                    giftWrapObj.value = giftWrapTypes[i].value;
                    self.giftWrapTypes.push(giftWrapObj);
                }
            }
            self.giftWrapTypesLoaded = true;
        });

        EventBus.$on("product.loaded", function (product) {
            self.getgiftWrappingItems();
            var obj = product.giftWrap;
            if (!obj) {
                return;
            }
            else {
                if (obj.giftWrapSettings == 0) {
                    self.giftWrapOptionsLoaded = false;
                    self.formModel.type = gwNone;
                }
                else if (obj.giftWrapSettings == 1) {
                    self.giftWrapOptionsLoaded = false;
                    self.formModel.type = gwAll;
                    self.formModel.giftWrapType = obj.giftWrapTypes;
                }
                else {
                    self.formModel.type = gwSelected;
                    self.giftWrapOptionsLoaded = true;
                    self.formModel.giftWrapType = obj.giftWrapTypes;
                    var selectedGiftWraps = obj.selectedGiftWraps;
                    if (selectedGiftWraps != null) {
                        for (var i = 0; i < selectedGiftWraps.length; i++) {
                            var current = selectedGiftWraps[i];
                            for (var j = 0; j < self.giftWrapOptions.length; j++) {
                                var gwO = self.giftWrapOptions[j];
                                if (current.giftWrapId == gwO.id) {
                                    gwO.selected = current.isSelected;
                                }
                            }
                        }
                    }
                }
            }
        });
    },
computed: {
    itemsAvailable: function () {
        return this.formModel.type === gwSelected;
    },
    selectedDisabled: function () {
        return !this.formModel.types || !this.formModel.types.length;
    }
},
methods: {
    getModel: function () {
        return {};
    },
    getGiftWrapOptions: function () {
        var self = this;
        self.giftWrapOptionsLoaded = true;
    },
    getgiftWrappingItems: function () {
        var self = this; 
        EventBus.$on("masterData.loaded", function (masterData) {
            var info = masterData;
            var data = info.giftWrappingItems;
            self.giftWrapOptions = [];
            if (data != null) {
                for (var i = 0; i < data.length; i++) {
                    self.giftWrapOptions.push({ name: data[i].name, id: data[i].recordId, selected: false });
                }
            }
        });
    },
    validate: function () {
        var self = this;

        var valid = self.formModel.type.length > 0;

        if (valid == false) {
            self.errorMessages = [];
            if (self.formModel.giftWrapOption == "-1") {
                self.errorMessages.push("Enter Gift Wrap Option");
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
});