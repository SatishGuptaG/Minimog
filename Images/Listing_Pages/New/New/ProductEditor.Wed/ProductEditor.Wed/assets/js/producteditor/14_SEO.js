Vue.component("section-seo", {
    template: "#section-seo-template",
    data() {
        return {
            formModel: {
                seoName: "",
                url: "",
                updatedUrl:"",
                metaTitle: "",
                metaDescription: "",
                metaKeywords: "",
                canonical: "",
                hrefLang: ""
            },
            productId: '',
            productName: "",
            productStockCode: "",
            redirectUrl:false,
            frontEndURL: '',
            isSEOEditDisabled: !hasSEOEditPermission
            //editableAreaField: false,
            //previwAreaField: true
        };
    },
    props: ['message'],
    mounted() {
        var self = this;
        if (this.message != undefined && this.message != null) {
            this.formModel = this.message;
        }
        EventBus.$on("product.loaded", function (product) {
            self.productId = product.id;
            var seo = product.seo;
            if (product.basicInfo.isVisible == false) { 
                self.frontEndURL = domainURL + "preview/";
            } else {
                self.frontEndURL = domainURL;
            }
            if (seo) {
                self.formModel.seoName = seo.name;
                self.formModel.url = seo.url;
                self.formModel.updatedUrl = seo.url;
                self.formModel.metaTitle = seo.metaTitle;
                self.formModel.metaDescription = seo.metaDescription;
                self.formModel.metaKeywords = seo.metaKeywords;
                self.formModel.canonical = seo.canonical;
                self.formModel.hrefLang = seo.hrefLang;
            }
        });

        EventBus.$on("loadedproduct.name", function (name) {
            if (self.formModel.seoName == '') {
                self.formModel.seoName = name;
            }
            if (self.formModel.metaTitle == '') {
                self.formModel.metaTitle = name;
            } 
            self.productName = name;
            //self.createSlugUrl();
        });

        EventBus.$on("basicInfo.stockCode", function (stockCode) {
            self.productStockCode = stockCode;
            //self.createSlugUrl();
        });
    },
    methods: {
        getModel: function () {
        },
        createSlugUrl: function () {
            var self = this;
            var initString = "products/";
            var url = "";
            if (self.productName == "" && self.productStockCode != "") {
                url = initString + self.productStockCode;
            }
            if (self.productName != "" && self.productStockCode == "") {
                url = initString + self.productName;
            }
            
            if (self.productName != "" && self.productStockCode != ""){
                url = initString + self.productName + "-" + self.productStockCode;
            }
            url = self.checkStringValidation(url)
            self.formModel.url = url;
        },
        //showeditableArea() {
        //    var self = this;
        //    self.editableAreaField = true;  
        //    self.previwAreaField = false;  
        //},
        //hideeditableArea() {
        //    var self = this;
        //    self.editableAreaField = false;
        //    self.previwAreaField = true;
        //},
        checkStringValidation: function (str) {
            str = str.replace(',', '-');
            str = str.replace('.', '-');
            str = str.replace('+', 'and');
            str = str.replace('&', 'and');
            str = str.replace(/\\/g,'and');
            str = str.replace('{0}', '');
            str = str.replace('{1}', '');
            str = str.replace('{2}', '');
            str = str.replace('{3}', '');  
            str = str.replace(' ', '-');
            str = str.replace('--', '-');
            str = str.replace('///', '/');
            str = str.replace('//', '/');
            str = str.replace('--', '-');
            str = str.replace('-by-', '-');
            str = str.replace('-if-', '-');
            str = str.replace('-vs-', '-');
            str = str.replace('-and-', '-');
            str = str.replace('-to-', '-');
            str = str.replace('-for-', '-');
            return str;
        },
        seoSlugUpdateModel() {
            var self = this; 
            self.$modal.show('seoSlugUpdateModel');
        }, 
        hide() {
            var self = this; 
            //self.resetdata()
            self.$modal.hide('seoSlugUpdateModel');
        },
        beforeClose() {
            var self = this;
            //if (!successed) {
            //    self.setdata();
            //}
        }, 
        updateSlug: function () {
            var self = this;
            var productModel = {
                id: self.productId,
                basicInfo: {
                    stockCode: self.stockCode
                },
                SEO: {
                    name:  self.formModel.seoName,
                    url: self.formModel.url,
                    updatedUrl: self.formModel.updatedUrl,
                    metaTitle: self.formModel.metaTitle,
                    metaDescription: self.formModel.metaDescription,
                    metaKeywords: self.formModel.metaKeywords,
                    isRedirectedFor: self.formModel.isRedirectedFor,
                    canonical : self.formModel.canonical,
                    hrefLang : self.formModel.hrefLang
                }
            };

            axiosInstancePost()
                .post('ProductEditor/UpdateSlug', productModel, axiosConfig)
                .then(function (response) {
                    var data = response.data;
                    successed = true;
                    if (data.isValid) { 
                        Vue.toasted.show(data.message, { type: 'success', duration: 3000, dismissible: true });
                        window.location.reload();
                    }
                    else {
                        Vue.toasted.show(data.message + ' !!!', { type: 'error', duration: 3000, dismissible: true });
                    }
                })
                .catch(function (error) {
                    var errorMessage = error;
                });
        }
    }
})