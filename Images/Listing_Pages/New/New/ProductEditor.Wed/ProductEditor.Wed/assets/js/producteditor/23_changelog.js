var prodLoad = false;
Vue.component("section-changelog", {
    template: "#section-changelog-template",
    data() {
        return {
            productId: '',
            changeLogList: [],
            showlogdata: false,
            loadfilters: false,
            productFormFilterModel: {
                userEmail: '',
                fromdate: '',
                toDate: ''
            },
            datePickerFormat: 'yyyy-MM-dd',
            default: new Date().toISOString().slice(0, 10),
            logListLoaded: false,
            logDataList: {}
        };
    },
    props: ['message'],
    mounted() {
        var self = this;
        if (this.message != undefined && this.message != null) {
            this.formModel = this.message;
        }

        EventBus.$on("product.loaded", function (product) {
            var prodLoad = true;
            self.productId = product.id;

        });
    },
    methods: {
        showlog() {
            var self = this;
            self.productFormFilterModel.recordId = self.productId;

            if (self.productId != null && self.productId != "" && self.productId != "00000000-0000-0000-0000-000000000000") {
                axiosInstance()
                    .post('ProductEditor/GetProductChangeLog', self.productFormFilterModel)
                    .then(function (response) {
                        self.changeLogList = response.data;
                        self.loadfilters = true;
                        self.showlogdata = true;
                    });
            }
            else {
                self.showlogdata = false;
            }
        },
        showLogModal: function (logData) {
            var self = this;
            self.logDataList = logData;
            if (logData.pricing != null) {
                self.logDataList.pricingDetails = JSON.parse(logData.pricing);
            }
            if (logData.attributes != null) {
                self.logDataList.attributesDetails = JSON.parse(logData.attributes);
            }
            self.logListLoaded = true;
            self.$modal.show('showChangeLogs');
        },
        hideLogModal: function () {
            var self = this;
            self.$modal.hide('showChangeLogs');
        }
    }
});