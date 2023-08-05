Vue.component("section-dynamic", {
    template: "#section-dynamic-template",
    data() {
        return {
            dynamicCollectionsLoaded: false,
            dynamicCollections: [],
            dynamicCollectionsSelected:[],
            pendingCollections: [],
            formModel: {
                autoShow: true,
                dynamicCollections: []  
            },
            isDynamicCollectionsEditDisabled: !hasDynamicCollectionsEditPermission
        };
    },
    props: ['message'],
    mounted() {
        if (this.message != undefined && this.message != null) {
            this.formModel = this.message;
        }

        const getBaseUrl = () => {
            return PimUri
        };

        const axiosInstance = axios.create({
            baseURL: getBaseUrl(),
            timeout: 30000
        });
        var self = this;

        EventBus.$on("product.loaded", function (product) {
            if (product.dynamicCollections) {
                self.pendingCollections.length = 0; 
                for (var i = 0; i < product.dynamicCollections.length; i++) {
                    self.dynamicCollectionsSelected.push(product.dynamicCollections[i].key);
                } 
                self.setupCollections();
            }
        });

        //axiosInstance
        //    .get('ProductEditor/GetMasterData?type=4&did=' + domainid) //Collections
        //    .then(function (response) {
        //        var data = response.data.items;
        //        if (data != null)
        //        {
        //            for (var i = 0; i < data.length; i++) {
        //                self.dynamicCollections.push({
        //                    name: data[i].name,
        //                    id: data[i].recordId,
        //                    checked: false,
        //                    display: true,
        //                    text: data[i].name,
        //                    value: data[i].recordId
        //                });
                         
        //            }
        //        }
        //        self.dynamicCollectionsLoaded = true;
        //        self.setupCollections();
        //    });

        EventBus.$on("masterData.loaded", function (masterData) {
            var info = masterData;
            var data = info.productCollection;
                if (data != null)
                {
                    for (var i = 0; i < data.length; i++) {
                        self.dynamicCollections.push({
                            name: data[i].name,
                            id: data[i].recordId,
                            checked: false,
                            display: true,
                            text: data[i].name,
                            value: data[i].recordId
                        });

                    }
                }
                self.dynamicCollectionsLoaded = true;
                self.setupCollections();
        });
    },
    methods: {
        setupCollections() {
            if (!this.dynamicCollectionsLoaded) {
                return;
            }
            for (var i = 0; i < this.pendingCollections.length; i++) {
                var current = this.pendingCollections[i];
                for (var j = 0; j < this.dynamicCollections.length; j++) {
                    if (this.dynamicCollections[j].id.toLowerCase() === current.key.toLowerCase()) {
                        this.dynamicCollections[j].checked = true;
                    }
                }
                this.add();
            }
        },
        toggle: function (collectionItem) {
            collectionItem.checked = !collectionItem.checked;
            this.add();
        }, 
        add: function () {
            for (var i = 0; i < this.dynamicCollections.length; i++) {
                if (this.dynamicCollections[i].checked) {
                    this.formModel.dynamicCollections.push({
                        id: this.dynamicCollections[i].id,
                        name: this.dynamicCollections[i].name
                    });
                    this.dynamicCollections[i].checked = false;
                    this.dynamicCollections[i].display = false;
                }
            }
        },
        removeDynamicCollection: function (id) {
            var index = this.formModel.dynamicCollections.indexOf(
                this.formModel.dynamicCollections.find(item => item.id == id)
            );
            this.formModel.dynamicCollections.splice(index, 1);

            var collectionItem = this.dynamicCollections.find(item => item.id == id);
            collectionItem.display = true;
        },

        addRelatedProduct: function (productId) {

            if (this.formModel.relatedProducts.find(item => item.id == productId) != null) {
                return;
            }

            var product = this.productSearchResults.find(item => item.id == productId);
            if (product != null) {

                this.formModel.relatedProducts.push(product);
            }
        },
        removeRelatedProduct: function (productId) {
            var index = this.formModel.relatedProducts.indexOf(
                this.formModel.relatedProducts.find(item => item.id == productId)
            );
            this.formModel.relatedProducts.splice(index, 1);
        },
        getModel: function () {
            var self = this;
            var selected = self.dynamicCollectionsSelected;
            
            return {};
        }
    }
})