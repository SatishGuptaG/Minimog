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
    el: '#season_product_main',
    router: router,
    data() {
        return {
            formModel: {

                pageSize: 40,
                currentPage: 1,
                files: [],
                rawFiles : []
            },
            productList: [],
            page: 1,
            totalRecords: 0,
            statusMappingModel: {},
            statusId: '',
            subStatusId: '',
            stockCode: '',
            note: '',
            selectedStockCode: '',
            selectedProductId: '',
            allowedExtensions: [],
            genericNote: '',
            lineLevelNotesEnabled: false,
            productWiseList: [],
            statusMappingList: [],
            bulkUpdate: false,
            imageUploadInProgress : false
        };
    },
    async beforeCreate() {
    },
    mounted() {
        var self = this;
        self.page = this.$route.query.currentPage;
    },
    methods: {
        clickCallback: function (pageNum) {
            var self = this;
            self.page = pageNum;
            var route = this.$route.query;
            if (route.stockCode != undefined) {
                location.href = '/SeasonProduct?seasonId=' + route.seasonId + '&dropId=' + route.dropId + '&statusId=' + route.statusId + '&subStatusId=' + route.subStatusId + '&currentPage=' + self.page + '&stockCode=' + route.stockCode;
            }
            else {
                location.href = '/SeasonProduct?seasonId=' + route.seasonId + '&dropId=' + route.dropId + '&statusId=' + route.statusId + '&subStatusId=' + route.subStatusId + '&currentPage=' + self.page;
            }
        },
        initData: function (recordId, itemType) {
            var self = this;
            self.formModel = {};
            self.formModel.recordId = recordId;
            self.formModel.itemType = itemType;
        },
        upsertProductMapping: function (prodId, subStatId, nextStageId, statCode, subStatCode,frmStatusId, sendEmail) {
            var self = this;
            var route = this.$route.query;
            self.statusMappingModel = {};
            self.statusMappingModel = {
                seasonId: route.seasonId, dropId: route.dropId, productId: prodId, statusId: nextStageId, subStatusId: subStatId, statusCode: statCode, subStatusCode: subStatCode,
                fromStatusId: frmStatusId, sendEmailOnUpdate: sendEmail
            };
            axiosInstancePost()
                .post('SeasonProduct/UpsertProductStatusMapping', self.statusMappingModel, axiosConfig)
                .then(function (response) {
                    if (response.data.isValid) {
                        location.href = '/SeasonProduct?seasonId=' + route.seasonId + '&dropId=' + route.dropId + '&statusId=' + nextStageId + '&subStatusId=' + subStatId + '&currentPage=' + 1;
                    }
                });
        },
        upsertMultipleProductMapping: function (subStatId, nextStageId, statCode, subStatCode, listing, subStatus, frmStatusId, sendEmail) {
            var self = this;
            var checkBeforePost = true;
            var route = this.$route.query;
            var productList = JSON.parse(listing);
            var subStatusObj = JSON.parse(subStatus);
            var message = "select atleast one item";
            var checkedCbs = document.querySelectorAll('#seasonproducts input[type="checkbox"]:checked');
            var ids = [];
            for (var i = 0; i < checkedCbs.length; i++) ids.push(checkedCbs[i].value);
            var filteredList = productList.filter(function (value) {
                if (ids.includes(value.recordId)) {
                    return value;
                }
            });
            for (var i = 0; i < filteredList.length; i++) {
                var obj = filteredList[i];
                if (subStatusObj.noteRequired && subStatusObj.attachmentsRequired) {
                    if (obj.noteAdded == false && obj.attachmentUploaded == false) {
                        message = "add note and attachment";
                        checkBeforePost = false;
                    }
                    else if (obj.noteAdded == false){
                        message = "add note";
                        checkBeforePost = false;
                    }
                    else if (obj.attachmentUploaded == false) {
                        message = "add attachment";
                        checkBeforePost = false;
                    }
                }
                else if (subStatusObj.noteRequired && subStatusObj.externalStepRequired) {
                    if (obj.noteAdded == false && obj.externalStepDone == false) {
                        message = "add note and review margin";
                        checkBeforePost = false;
                    }
                    else if (obj.noteAdded == false) {
                        message = "add note";
                        checkBeforePost = false;
                    }
                    else if (obj.externalStepDone == false) {
                        message = "review margin";
                        checkBeforePost = false;
                    }
                }
                else if (subStatusObj.noteRequired) {
                    if (obj.noteAdded == false) {
                        message = "add note";
                        checkBeforePost = false;
                    }
                }
                else if (subStatusObj.attachmentsRequired) {
                    if (obj.noteAdded == false) {
                        message = "attachment";
                        checkBeforePost = false;
                    }
                }
                else if (subStatusObj.externalStepRequired) {
                    if (obj.externalStepDone == false) {
                        message = "review margin";
                        checkBeforePost = false;
                    }
                }
            }
            if (checkBeforePost && checkedCbs.length > 0) {
                var stringList = ids.join(',');
                self.statusMappingModel = {};
                self.statusMappingModel = {
                    seasonId: route.seasonId, dropId: route.dropId, productId: stringList, statusId: nextStageId, subStatusId: subStatId, statusCode: statCode, subStatusCode: subStatCode,
                    fromStatusId: frmStatusId, sendEmailOnUpdate: sendEmail
                };
                axiosInstancePost()
                    .post('SeasonProduct/UpsertProductStatusMapping', self.statusMappingModel, axiosConfig)
                    .then(function (response) {
                        if (response.data.isValid) {
                            location.href = '/SeasonProduct?seasonId=' + route.seasonId + '&dropId=' + route.dropId + '&statusId=' + nextStageId + '&subStatusId=' + subStatId + '&currentPage=' + 1;
                        }
                    });
            }
            else {
                Vue.toasted.show('Please ' + message+' !!!', { type: 'error', duration: 2000, dismissible: true });
            }

        },
        toggleAllCheckBoxes: function () {
            var checkVal = $('#mainCheckBox1').is(":checked")
            var chks = document.querySelectorAll("#seasonproducts input[type='checkbox']");
            var result = Array.prototype.every.call(chks, function (c) {
                if (checkVal) {
                    c.checked = true;
                }
                else {
                    c.checked = false;
                }
                return c;
            });
        },
        setStatus: function (statusId) {
            var self = this;
            self.statusId = statusId;
        },
        filterProducts: function () {
            var self = this;
            var route = this.$route.query;
            location.href = '/SeasonProduct?seasonId=' + route.seasonId + '&dropId=' + route.dropId + '&statusId=' + route.statusId + '&subStatusId=' + route.subStatusId + '&currentPage=' + self.page + '&stockCode=' + self.stockCode;

        },
        clearFilter: function () {
            var self = this;
            var route = this.$route.query;
            location.href = '/SeasonProduct?seasonId=' + route.seasonId + '&dropId=' + route.dropId + '&statusId=' + route.statusId + '&subStatusId=' + route.subStatusId + '&currentPage=' + self.page;
        },
        addInformationModel: function (stockCode, recordId, noteAdded, note, attachmentAdded, attachments, allowedExt) {
            var self = this;
            self.selectedStockCode = '';
            self.selectedProductId = '';
            self.allowedExtensions = allowedExt.split(',');
            self.selectedStockCode = '( ' + stockCode + ' )';
            self.selectedProductId = recordId;
            if (noteAdded == "True") {
                self.note = note;
            }
            else {
                self.note = '';
            }
            if (attachmentAdded == "True" && attachments.length > '') {
                self.formModel.files = JSON.parse(attachments);
                for (var i = 0; i < self.formModel.files.length; i++) {
                    var obj = self.formModel.files[i];
                    var typeCheck = obj.name.substring(obj.name.lastIndexOf(".") + 1);
                    obj.type = typeCheck;
                }
            }
            else {
                self.formModel.files = [];
            }
            self.$modal.show('addProdInformationModel');
        },
        hide: function () {
            var self = this;
            self.$modal.hide('addProdInformationModel');
        },
        updateInformationModel: function () {
            var self = this;
            var route = this.$route.query;
            self.statusMappingModel = {};
            var files = self.formModel.files.filter(function (obj) {
                return obj.name;
            });
            files = (files.length == 0) ? null : files;
            self.note = (self.note != null && self.note.length > 0) ? self.note : null;
            self.statusMappingModel = { productId: self.selectedProductId, statusId: route.statusId, subStatusId: route.subStatusId, note: self.note, attachments: files };
            axiosInstancePost()
                .post('SeasonProduct/UpdateProductInformation', self.statusMappingModel, axiosConfig)
                .then(function (response) {
                    if (response.data.isValid) {
                        self.$modal.hide('addProdInformationModel');
                        Vue.toasted.show(response.data.message, { type: 'success', duration: 2000, dismissible: true });
                        location.href = '/SeasonProduct?seasonId=' + route.seasonId + '&dropId=' + route.dropId + '&statusId=' + route.statusId + '&subStatusId=' + route.subStatusId + ((route.currentPage != undefined) ? '&currentPage=' + route.currentPage : '') + ((route.stockCode != undefined) ? '&stockCode=' + route.stockCode : '');
                    }
                });
        },
        updateInformationPopup: function (stockCode, recordId, noteAdded, note, attachmentAdded, attachments) {
            var self = this;
            if (noteAdded) {
                self.note = note;
            }
            else {
                self.note = '';
            }

            self.addInformationModel(stockCode, recordId);
        },
        onFileSelected: function (event) {
            var route = this.$route.query;
            var files = event.target.files;
            if (!files.length || this.formModel.files.length >= 10) {
                return;
            } else {
                var self = this;
                for (let i = 0; i < files.length; i++) {
                    let current = files[i];
                    this.fileIdCounter++;
                    var currentFileType = Vue.filter('fileType')(current.type, 'type');
                    //if (self.allowedExtensions.includes(currentFileType)) {
                    //}
                    //else {
                    //    Vue.toasted.show('Invalid file !!!', { type: 'error', duration: 2000, dismissible: true });
                    //}
                    let fileEntry = {
                        id: this.fileIdCounter,
                        file: current,
                        previewUrl: window.URL.createObjectURL(files[i]),
                        data: null,
                        altText: "",
                        isDefault: "",
                        isActive: true,
                        name: current.name,
                        type: Vue.filter('fileType')(current.type, 'type'),
                        productId: self.selectedProductId
                    };

                    var reader = new FileReader();
                    let f = current;
                    reader.onload = (function (theFile) {
                        return function (e) {
                            fileEntry.data = e.target.result;
                            var base64 = base64ArrayBuffer(fileEntry.data);
                            var model = {
                                "Name": current.name,
                                "Data": base64
                            };
                            self.imageUploadInProgress = true;
                            axiosInstancePost()
                                .post("/SeasonProduct/UploadFile", model, axiosConfig)
                                .then(function (response) {
                                    self.imageUploadInProgress = false;
                                    if (response.data.message == "Success") {
                                        fileEntry.name = response.data.name;
                                        fileEntry.link = response.data.id;
                                        Vue.toasted.show("Uploaded successfully !!!", { type: 'success', duration: 2000, dismissible: true });
                                        self.formModel.files.push(fileEntry);
                                        self.formModel.rawFiles.push(fileEntry);
                                    }
                                })
                                .catch(function (error) {
                                });

                        };
                    })(f);
                    reader.readAsArrayBuffer(f);
                }
            }
        },
        remove: function (file) {
            var self = this;
            var fileModel = {
                name: file.name,
                url: file.url
            }
            self.imageUploadInProgress = true;
            axiosInstancePost()
                .post("/SeasonProduct/RemoveFile", fileModel, axiosConfig)
                .then(function (response) {
                    self.imageUploadInProgress = false;
                    if (response.data.message === "Success") {
                        Vue.toasted.show('File deleted !!!', { type: 'error', duration: 2000, dismissible: true });
                        var index = self.formModel.files.indexOf(
                            self.formModel.files.find(item => item.name === file.name)
                        );
                        self.formModel.files.splice(index, 1);
                    }
                });
        },
        confirmationModalShow: function (value) {
            var self = this;
            var text = "";
            self.$modal.show('dialog', {
                title: 'Confirmation !',
                height: '100',
                text: 'Are you sure you want to delete this file ?',
                buttons: [
                    {
                        title: 'Ok',
                        class: 'btn btn-danger',
                        handler: () => {
                            self.remove(value);
                            self.$modal.hide('dialog')
                        }
                    },
                    {
                        title: 'Close'
                    }
                ]
            })
        },
        openBatchEditor: function () {
            var self = this;
            var route = this.$route.query;
            var productFilterModel = {
                seasonId: route.seasonId,
                dropId: route.dropId,
                statusId: route.statusId,
                subStatusId: route.subStatId,
                currentPage: self.page
            };
            axiosInstancePost()
                .post('SeasonProduct/BatchStatusEditor', productFilterModel, axiosConfig)
                .then(function (response) {
                });
        },
        postBatchUpdate: function (event) {
            var checkedCbs = document.querySelectorAll('#seasonproducts input[type="checkbox"]:checked');
            var ids = [];
            for (var i = 0; i < checkedCbs.length; i++) ids.push(checkedCbs[i].value);
            var stringList = ids.join(',');
            $("#selectedProductBU").val(stringList);
            if (stringList.length == 0) {
                event.preventDefault();
                Vue.toasted.show('Please select a record to update!!!', { type: 'error', duration: 2000, dismissible: true });
            }
        },
        cancelBatchUpdate: function () {
            var self = this;
            var route = this.$route.query;
            location.href = '/SeasonProduct?seasonId=' + route.seasonId + '&dropId=' + route.dropId + '&statusId=' + route.statusId + '&subStatusId=' + route.subStatusId;

        },
        saveProductWiseData: function () {
            var self = this;
            var route = this.$route.query;
            var files = self.formModel.files.filter(function (obj) {
                if (obj.productId == self.selectedProductId) {
                    return obj;
                }
            });
            files = (files.length == 0) ? null : files;
            if (self.lineLevelNotesEnabled) {
                self.note = (self.note != null && self.note.length > 0) ? self.note : null;
            }
            else {
                self.note = (self.genericNote != null && self.genericNote.length > 0) ? self.genericNote : null;
            }
            self.statusMappingModel = { productId: self.selectedProductId, statusId: route.statusId, subStatusId: route.subStatusId, note: self.note, attachments: files };
            for (var i = 0; i < self.productWiseList.length; i++) {
                var current = self.productWiseList[i];
                if (current.productId == self.selectedProductId) {
                    self.productWiseList.splice(i, 1);
                    break;
                }
            }
            self.productWiseList.push(self.statusMappingModel);
            self.$modal.hide('addProdInformationModel');
        },
        updateBulkData: function (productsList,subStatusData) {
            var self = this;
            var route = this.$route.query;
            if (productsList.length > '') {
                products = JSON.parse(productsList);
            }
            var subStatus = "";
            if (subStatusData != null && subStatusData.length > '') {
                subStatus = JSON.parse(subStatusData)
            }
            if (subStatus.noteRequired) {
                if (self.lineLevelNotesEnabled == false) {
                    self.genericNote = (self.genericNote != null && self.genericNote.length > 0) ? self.genericNote : null;
                    if (self.productWiseList.length > 0) {
                        for (var i = 0; i < self.productWiseList.length; i++) {
                            var currObj = self.productWiseList[i];
                            currObj.note = self.genericNote;
                        }
                    }
                }
            }
            if (self.productWiseList.length == 0 || self.productWiseList.length < products.length) {
                if (subStatus.noteRequired && self.lineLevelNotesEnabled == false) {
                    for (var i = 0; i < products.length; i++) {
                        var current = products[i];
                        var obj = self.productWiseList.filter(function (item) {
                            if (item.productId == current.recordId) {
                                return item;
                            }
                        });
                        if (obj.length == 0) {
                            self.statusMappingModel = { productId: current.recordId, statusId: route.statusId, subStatusId: route.subStatusId, note: self.genericNote, attachments: [] };
                            self.productWiseList.push(self.statusMappingModel);
                        }
                    }
                }
            }
            if (self.productWiseList.length > 0) {
                axiosInstancePost()
                    .post('SeasonProduct/UpdateBulkProductInformation', self.productWiseList, axiosConfig)
                    .then(function (response) {
                        if (response.data.isValid) {
                            Vue.toasted.show(response.data.message, { type: 'success', duration: 2000, dismissible: true });
                            location.href = '/SeasonProduct?seasonId=' + route.seasonId + '&dropId=' + route.dropId + '&statusId=' + route.statusId + '&subStatusId=' + route.subStatusId;
                        }
                    });
            }
        },
        addBulkInformationModel: function (stockCode, recordId, noteAdded, note, attachmentAdded, attachments, allowedExt) {
            var self = this;
            self.selectedStockCode = '';
            self.selectedProductId = '';
            self.allowedExtensions = allowedExt.split(',');
            self.selectedStockCode = '( ' + stockCode + ' )';
            self.selectedProductId = recordId;
            self.formModel.files = self.formModel.rawFiles;
            self.bulkUpdate = true;
            if (noteAdded == "True") {
                self.note = note;
            }
            else {
                if (self.productWiseList.length > 0) {
                    var obj = self.productWiseList.filter(function (item) { if (item.productId == self.selectedProductId) { return item.note } });
                    if (obj.length > 0) {
                        self.note = obj[0].note;
                    }
                    else {
                        self.note = '';
                    }
                }
                else {
                    self.note = '';
                }
            }
            if (attachmentAdded == "True" && attachments.length > '') {
                self.formModel.files = JSON.parse(attachments);
                for (var i = 0; i < self.formModel.files.length; i++) {
                    var obj = self.formModel.files[i];
                    var typeCheck = obj.name.substring(obj.name.lastIndexOf(".") + 1);
                    obj.type = typeCheck;
                }
            }
            else {
                self.formModel.files = self.formModel.files.filter(function (value) {
                    if (value.productId == self.selectedProductId) {
                        return value;
                    }
                });
            }
            self.$modal.show('addProdInformationModel');
        },
        postReviewMargin: function () {
            var checkedCbs = document.querySelectorAll('#seasonproducts input[type="checkbox"]:checked');
            var ids = [];
            for (var i = 0; i < checkedCbs.length; i++) ids.push(checkedCbs[i].value);
            var stringList = ids.join(',');
            $("#selectedProdReviewMargin").val(stringList);
            if (stringList.length == 0) {
                event.preventDefault();
                Vue.toasted.show('Please select a record to update!!!', { type: 'error', duration: 2000, dismissible: true });
            }
        }
    }
})

Vue.filter('fileType', function (type, className) {
    return fileType(className,type)
});

Vue.config.devtools = true;