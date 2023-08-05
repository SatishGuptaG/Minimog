
Vue.component("section-completeness", {
    template: "#section-completeness-template",
    props: ['message'],
    data() {
        return { 
            formModel: { 
            },
            productId: '',
            completenessList: [],
            completenessFields: [],
            coreCompletenessFields: [],
            customCompletenessFields: [],
            completedCompletenessFields: [],
            seledtedKey: '',
            seledtedAttributeLastUpdated: ''
        };
    }, 
   
    mounted() {
        var self = this; 
         
        EventBus.$on("product.loaded", function (product) {
            self.productId = product.id;
            if (product.completeness != null) {
                //self.completenessList = product.completeness.completeness;
                self.completenessList = [];
                if (product.completeness != null && product.completeness.completeness != null) {
                    for (var n = 0; n < product.completeness.completeness.length; n++) { 
                        var valueswithFilesInfo = product.completeness.completeness[n].value.split('~');
                        self.completenessList.push({
                            "key": product.completeness.completeness[n].key,
                            "value": valueswithFilesInfo[0],
                            "lastUpdated": valueswithFilesInfo[1]
                        });
                    }
                }
            }
        }); 
         
    },
    methods: {
        showcompletednessmodel() {
            var self = this;
            self.completenessFields = [];
            if (self.completenessList != null) {
                self.$modal.show('app_loader');
                axiosInstance()
                    .get('ProductEditor/GetProductCompletenessDetail?CompletenessAttribute=' + self.seledtedKey + '&ProductId=' + self.productId)
                    .then(function (response) {
                        var result = JSON.parse(response.data);
                        self.completenessFields = JSON.parse(result.CompletenessJson); 
                        //for (var i = 0; i < self.completenessList.length; i++) {
                        //    if (self.completenessList[i].key == self.seledtedKey) {
                        //        self.completenessFields = self.completenessList[i].fields;
                        //    }
                        //} 
                        self.completenessFields = self.completenessFields.sort(function (a, b) {
                            var x = a["IsCore"]; var y = b["IsCore"];
                            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                        });
                        self.completenessFields = self.completenessFields.sort(function (a, b) {
                            var x = a["FieldName"]; var y = b["FieldName"];
                            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                        });

                        self.customCompletenessFields = self.completenessFields.filter(x => { if (x.IsCore == false) { return x; } });

                        self.coreCompletenessFields = self.completenessFields.filter(x => { if (x.IsCore == true) { return x; } });

                        self.completedCompletenessFields = self.completenessFields.filter(x => { if (x.IsCompleted == true) { return x; } });
                        self.$modal.hide('app_loader');
                        self.$modal.show('completenessModel'); 
                    });
            }
        },
        hide() {
            var self = this;
            self.completenessFields = [];
            self.$modal.hide('completenessModel');
        },
        getModel: function () {
            var result = {
                FieldSet: {
                    key: "",
                    value: ""
                } 
            }; 
            return result;
        } 
    }
});