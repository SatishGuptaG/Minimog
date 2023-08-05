Vue.component("section-dimentions", {
    template: "#section-dimentions-template",
    data() {
        return {
            uomList: [],
            preSelecteduom:"",
            uom: "",
            formModel: {
                weight: "",
                width: "",
                height: "",
                depth: "",
                uom: "" 
            },
            isDimensionsEditDisabled: !hasDimensionsEditPermission
        };
    },
    props: ['message'],
    mounted() {
        var self = this;
        if (this.message != undefined && this.message != null) {
            this.formModel = this.message;
        }
        EventBus.$on("masterData.loaded", function (masterData) {
            var info = masterData; 
            var uomlists = info.uomList;
            if (uomlists != null && uomlists.length > 0 && self.uomList.length == 0) {
                self.uomList.push({ text: "Select", id: '' });
                for (var i = 0; i < uomlists.length; i++) {
                    self.uomList.push({ text: uomlists[i].name, id: uomlists[i].code });
                }
            }
            if (self.preSelecteduom != null && self.preSelecteduom != "" && (self.formModel.uom == undefined || self.formModel.uom == null || self.formModel.uom == "")) {
                setTimeout(function () {
                    self.formModel.uom = self.preSelecteduom;
                }, 1000);
            }    
        });

        EventBus.$on("product.loaded", function (product) {
            var dimensions = product.dimensions;
            self.formModel.uom = dimensions.uom;
            if (dimensions.weight && isValidNumber(dimensions.weight.value)) {
                self.formModel.weight = dimensions.weight.value.toFixed(2);
            }

            if (dimensions.height && isValidNumber(dimensions.height.value)) {
                self.formModel.height = dimensions.height.value.toFixed(2);
            }

            if (dimensions.length && isValidNumber(dimensions.length.value)) {
                self.formModel.depth = dimensions.length.value.toFixed(2);
            }

            if (dimensions.width && isValidNumber(dimensions.width.value)) {
                self.formModel.width = dimensions.width.value.toFixed(2);
            }
        });
    },
    methods: {
        getModel: function () {
            return {};
        }
    }
})