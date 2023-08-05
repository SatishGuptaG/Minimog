const axiosInstancePost = function () {
    const getBaseUrl = function () {
        return BaseUrl;
    };

    const axiosObject = axios.create({
        baseURL: getBaseUrl(),
        timeout: 30000
    });
    return axiosObject;
};
const axiosConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
};
const dateTimeFormat = "DD-MMM-YYYY HH:mm";
const axiosInstance = function () {
    const getBaseUrl = () => {
        return BaseUrl;
    }
    const axiosObejct = axios.create({
        baseURL: getBaseUrl(),
        timeout: 40000
    });
    return axiosObejct;
};

const router = new VueRouter({
    mode: 'history',
    routes: []
})

new Vue({
    el: '#product_lookup_main',
    router: router,
    data() {
        return {
            inventoryLocation: [],
            inventoryPositionDetail: [],
            inventoryLogDetail: [],
        };
    },
    async beforeCreate() {
    },
    mounted() {
    },
    methods: {
        showProductInventoryModal() {
            var self = this;
            self.$modal.show('productInventoryModal');
        },
        hideProductInventoryModal() {
            var self = this;
            self.$modal.hide('productInventoryModal');
        },
        getInventoryByLocation: function (stockCode, deliveryCenterId, inventoryType) {
            var self = this;
            self.inventoryModel = {};
            self.inventoryModel = { stockCode: stockCode, deliveryCenterId: deliveryCenterId, inventoryType: inventoryType };

            axiosInstancePost()
                .post('ProductLookup/GetInventoryByLocation', self.inventoryModel, axiosConfig)
                .then(function (response) {
                    self.showProductInventoryModal();
                    self.inventoryLocation = response.data;
                });
        },
        showInventoryPositionModel() {
            var self = this;
            self.$modal.show('inventoryPositionModel');
        },
        hideInventoryPositionModel() {
            var self = this;
            self.$modal.hide('inventoryPositionModel');
        },
        getInventoryPositionDetail: function (deliveryCenterCode,sku,colorName,size,inventoryTypeId) {
            var self = this;
            self.inventoryPositionModel = {};
            self.inventoryPositionModel  = { deliveryCenterCode: deliveryCenterCode, sku: sku, colorName: colorName, size: size, inventoryTypeId: inventoryTypeId }
            axiosInstancePost()
                .post('ProductLookup/GetInventoryPositionDetail', self.inventoryPositionModel, axiosConfig)
                .then(function (response) {
                    self.showInventoryPositionModel();
                    self.inventoryPositionDetail = response.data;
                });
        },
        showInventoryLogModel() {
            var self = this;
            self.$modal.show('inventoryLogModel');
        },
        hideInventoryLogModel() {
            var self = this;
            self.$modal.hide('inventoryLogModel');
        },
        getInventoryLogDetail: function (sku, colorName, size, inventoryTypeId, transType) {
            var self = this;
            self.inventoryLogModel = {};
            self.inventoryLogModel = {sku: sku, colorName: colorName, size: size, inventoryTypeId: inventoryTypeId, transType: transType }
            axiosInstancePost()
                .post('ProductLookup/GetInventoryLogDetail', self.inventoryLogModel, axiosConfig)
                .then(function (response) {
                    self.showInventoryLogModel();
                    $.each(response.data, function (key, value) {
                        value.created = moment.utc(value.created).format(dateTimeFormat);;
                    });
                    self.inventoryLogDetail = response.data;
                });
        }

    }
})
Vue.config.devtools = true;