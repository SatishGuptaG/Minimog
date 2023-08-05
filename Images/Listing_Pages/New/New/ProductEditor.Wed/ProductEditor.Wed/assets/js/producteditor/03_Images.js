//import draggable from "vuedraggable";
function base64ArrayBuffer(arrayBuffer) {
    var base64 = '';
    var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

    var bytes = new Uint8Array(arrayBuffer);
    var byteLength = bytes.byteLength;
    var byteRemainder = byteLength % 3;
    var mainLength = byteLength - byteRemainder;

    var a, b, c, d;
    var chunk;

    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
        // Combine the three bytes into a single integer
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

        // Use bitmasks to extract 6-bit segments from the triplet
        a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
        c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
        d = chunk & 63;              // 63       = 2^6 - 1

        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
    }

    // Deal with the remaining bytes and padding
    if (byteRemainder === 1) {
        chunk = bytes[mainLength];

        a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

        // Set the 4 least significant bits to zero
        b = (chunk & 3) << 4 // 3   = 2^2 - 1

        base64 += encodings[a] + encodings[b] + '==';
    } else if (byteRemainder === 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

        a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

        // Set the 2 least significant bits to zero
        c = (chunk & 15) << 2; // 15    = 2^4 - 1

        base64 += encodings[a] + encodings[b] + encodings[c] + '=';
    }

    return base64;
}
Vue.component("section-images", {
    template: "#section-images-template",
    data() {
        return {
            newVideoLink: "",
            formModel: {
                duplicatefiles: [],
                duplicateotherfiles: [],
                files: [],
                otherfiles: [],
                videos: []
            },
            fileIdCounter: 0,
            myArray: [],
            displayOrders: [],
            displayOrdersLoaded: false,
            count: 1,
            productId: "",
            stockCode: "",
            sku: "",
            imageUploadInProgress: false,
            pdfUploadInProgress: false,
            imageCounter: 1,
            pdfCounter: 1,
            tagquery: '',
            tagList: [],
            imageTags: [],
            description: '',
            isImagesAndVideoEditDisabled: !hasImagesAndVideoEditPermission,
        };
    },
    props: ['message'],
    mounted() {
        var self = this;
        if (this.message != undefined && this.message != null) {
            this.formModel = this.message;
        }

        //$('tbody').sortable();

        //var uploadFile = $('#uploadFile');

        //uploadFile.ondragover = uploadFile.ondragenter = function(evt) {
        //    evt.preventDefault();
        //};

        //uploadFile.ondrop = function (evt) {

        //    console.log(evt);

        //};
        var loaded = false;
        EventBus.$on("product.loaded", function (product) {
            self.productId = product.id;
            self.stockCode = product.basicInfo.stockCode;
            self.sku = product.identifiers.sku;
            if (product.media != null) {
                var media = product.media;
                if ((media.files == null && media.videos == null)) {
                    return;
                }
                if (media.files != null) {
                    var images = [];
                    images = media.files.filter(function (item) {
                        return item.mediaType==0;
                    });
                    self.imageCounter = images.length;
                    if (images != null) {
                        for (var i = 0; i < images.length; i++) {
                            images[i].url = images[i].url.replace("//products", "/products");
                            var tags = images[i].tags;
                            var tagArray = [];
                            if (tags) {
                                tagArray = images[i].tags.split(',');
                            }
                            self.formModel.files.push({
                                fileId: images[i].recordId,
                                name: images[i].name,
                                previewUrl: images[i].url + "?h=60",
                                data: null,
                                file: images[i],
                                altText: images[i].altText,
                                isDefault: images[i].isDefault,
                                isActive: images[i].isActive,
                                isInternal: images[i].isInternal,
                                url: images[i].previewUrl,
                                isMultiple: images[i].isMultiple,
                                displayOrder: images[i].displayOrder,
                                tags: images[i].tags,
                                tagquery: '',
                                tagList: [],
                                imageTags: tagArray
                            });
                        }
                    }
                    var pdfs = [];
                    pdfs = media.files.filter(function (item) {
                        return item.mediaType == 2;
                    });
                    self.pdfCounter = pdfs.length;
                    if (pdfs != null) {
                        for (var i = 0; i < pdfs.length; i++) {
                            pdfs[i].url = pdfs[i].url.replace("//products", "/products");
                            var pdftags = pdfs[i].tags;
                            var pdftagArray = [];
                            if (pdftags) {
                                pdftagArray = pdfs[i].tags.split(',');
                            }
                            self.formModel.otherfiles.push({
                                fileId: pdfs[i].recordId,
                                name: pdfs[i].name,
                                isActive: pdfs[i].isActive,
                                url: pdfs[i].url,
                                isActive: pdfs[i].isActive,
                                isInternal: pdfs[i].isInternal,
                                mediaType: pdfs[i].mediaType,
                                altText: pdfs[i].altText,
                                displayOrder: pdfs[i].displayOrder,
                                tags: pdfs[i].tags,
                                tagquery: '',
                                tagList: [],
                                pdfTags: pdftagArray
                            });
                        }
                    }
                }
                if (media.videos != null) {
                    var videos = media.videos;
                    if (videos != null) {
                        for (var i = 0; i < videos.length; i++) {
                            self.formModel.videos.push({
                                url: videos[i].url,
                                isDefault: videos[i].isDefault,
                                displayOrder: videos[i].displayOrder
                            });
                        }
                        self.formModel.videos.sort(function (a, b) {
                            return a.displayOrder - b.displayOrder || a.url.localeCompare(b.url);
                        });

                        for (var i = 0; i < self.formModel.videos.length; i++) {
                            if (self.formModel.videos[i].url.indexOf("http") > -1) {

                            } else {
                                self.formModel.videos[i].url = 'https://www.youtube.com/embed/' + self.formModel.videos[i].url;
                            }
                        }
                        for (var i = 1; i <= self.formModel.videos.length; i++) {
                            self.displayOrders.push({ name: i, value: i });
                        }
                        self.displayOrdersLoaded = true;
                        self.count = self.formModel.videos.length + 1;
                    }
                }
            }
        });
    },
    methods: {
        addVideo: function () {
            var self = this;
            var isDefault = false;
            if (this.formModel.videos.length > 0) {
                self.count = this.formModel.videos.length + 1;
            }
            var regExp = /[a-zA-Z]/g;
            this.newVideoLink = this.newVideoLink.replace(/^\s+|\s+$/g, '');

            if (this.newVideoLink.length > 0) {

                if (this.formModel.videos.length == 0) {
                    isDefault = true;
                }
                if (this.newVideoLink.indexOf("http") > -1) {
                    var code = this.newVideoLink.substring(this.newVideoLink.lastIndexOf("/") + 1, this.newVideoLink.length);
                    if (this.newVideoLink.indexOf("youtube") > -1) {
                        this.newVideoLink = 'https://www.youtube.com/embed/' + code;
                    } else if (this.newVideoLink.indexOf("vimeo") > -1) {
                        this.newVideoLink = 'https://player.vimeo.com/video/' + code;
                    }

                } else {
                    if (regExp.test(this.newVideoLink)) {
                        this.newVideoLink = 'https://www.youtube.com/embed/' + this.newVideoLink;
                    } else {
                        this.newVideoLink = 'https://player.vimeo.com/video/' + this.newVideoLink;
                    }
                }
                this.formModel.videos.push({
                    url: this.newVideoLink,
                    description: this.description,
                    previewUrl: "",
                    displayOrder: self.count,
                    isDefault: isDefault
                });
                this.newVideoLink = "";
                self.displayOrders.push({ name: self.count, value: self.count });
                self.count = self.count + 1;
            }
            self.displayOrdersLoaded = true;
        },
        removeVideo: function (video) {
            var index = this.formModel.videos.indexOf(
                this.formModel.videos.find(item => item.url === video.url && item.displayOrder == video.displayOrder)
            );

            this.formModel.videos.splice(index, 1);
            var self = this;
            self.displayOrders = [];
            self.count = self.formModel.videos.length;
            for (var i = 1; i <= self.formModel.videos.length; i++) {
                self.formModel.videos[i - 1].displayOrder = i;
                self.displayOrders.push({ name: i, value: i });
            }
        },
        remove: function (filename, mediaType) {
            var self = this;
            self.imageUploadInProgress = true;
            axiosInstancePost()
                .delete("/ProductEditor/RemoveImage/?name=" + encodeURIComponent(filename.url) + "&isMultiple=" + filename.isMultiple + "&productId=" + encodeURIComponent(self.productId) + "&stockCode=" + encodeURIComponent(self.stockCode) + "&sku=" + encodeURIComponent(self.sku) + "&fileId=" + filename.fileId, axiosConfig)
                .then(function (response) {
                    self.imageUploadInProgress = false;
                    if (response.data.isValid || response.data.message =="Success") {
                        if (mediaType == 3) {
                            var index = self.formModel.otherfiles.indexOf(
                                self.formModel.otherfiles.find(item => item.name === filename.name && item.id === filename.id)
                            );
                            self.formModel.otherfiles.splice(index, 1);
                            for (let i = 0; i < self.formModel.otherfiles.length; i++) {
                                self.formModel.otherfiles[i].displayOrder = i + 1;
                            }
                        }
                        else if (mediaType == 2) {
                            self.removeVideo(filename);
                        }
                        else {
                            var index = self.formModel.files.indexOf(
                                self.formModel.files.find(item => item.name === filename.name && item.id === filename.id)
                            );
                            self.formModel.files.splice(index, 1);
                            for (let i = 0; i < self.formModel.files.length; i++) {
                                self.formModel.files[i].displayOrder = i + 1;
                            }
                        }
                    }
                });


        },
        onFileSelected: function (event) {
            var isMedia = event.type == 'click';
            var files = [];
            if (!isMedia) {
                files = event.target.files;
            } else {
                var tempFiles = $("#uploadedFile").val();
                files = JSON.parse(tempFiles);
            }
            var self = this;
            var checkDefault = 0;
            self.formModel.duplicatefiles = [];
            var imageName = "";
            var filetype = 0;
           //Checking Browse file is pdf or png,jpg...
            for (let i = 0; i < files.length; i++) {
                if (files[i].type == 'application/pdf') {
                    filetype = 2;
                }
                else {
                    filetype = 0;
                }
            }
            if (filetype == 0) {
                if (!files.length || this.formModel.files.length >= 10) {
                    return;
                } else {
                    var imageCounter = this.formModel.files.length;

                    for (let i = 0; i < this.formModel.files.length; i++) {
                        if (imageCounter < this.formModel.files[i].displayOrder) {
                            imageCounter = this.formModel.files[i].displayOrder;
                        }
                        if (!isMedia) {
                            for (let i = 0; i < files.length; i++) {
                                let current = files[i];
                                if (this.formModel.files[i] != null && this.formModel.files[i] != undefined) {
                                    if (this.formModel.files[i].name.toLowerCase() == current.name.toLowerCase()) {
                                        files[i].name = "1-" + files[i].name;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else {
                if (!files.length || this.formModel.otherfiles.length >= 10) {
                    return;
                } else {
                    var imageCounter = this.formModel.otherfiles.length;
                    for (let i = 0; i < this.formModel.otherfiles.length; i++) {
                        if (imageCounter < this.formModel.otherfiles[i].displayOrder) {
                            imageCounter = this.formModel.otherfiles[i].displayOrder;
                        }
                        if (!isMedia) {
                            for (let i = 0; i < files.length; i++) {
                                let current = files[i];
                                if (this.formModel.otherfiles[i] != null && this.formModel.otherfiles[i] != undefined) {
                                    if (this.formModel.otherfiles[i].name.toLowerCase() == current.name.toLowerCase()) {
                                        files[i].name = "1-" + files[i].name;
                                    }
                                }
                            }
                        }
                    }
                }
            }           
            if (imageCounter == 0) {
                imageCounter = 1;
            } else {
                imageCounter++;
            }
            for (let i = 0; i < files.length; i++) {
                let current = files[i];
                if (isMedia) {
                    current.type = "temp";
                }

                this.fileIdCounter++;
                let fileEntry = {
                    id: this.fileIdCounter,
                    file: current,
                    //previewUrl: window.URL.createObjectURL(files[i]),
                    // url: current.path, 
                    data: null,
                    altText: "",
                    isInternal: true,
                    //isDefault: "",
                    isActive: true,
                    isMultiple: false,
                    displayOrder: imageCounter,
                    tags: '',
                    tagquery: '',
                    tagList: [],
                    imageTags: []
                };
                if (isMedia) {
                    fileEntry.previewUrl = current.path;
                    fileEntry.url = current.path;
                    fileEntry.name = '';
                } else {
                    fileEntry.previewUrl = window.URL.createObjectURL(files[i]);
                }
                //if (self.formModel.files.length == 0 && files.length == 1) {
                //   fileEntry.isDefault = true;
                //}
                if (fileEntry.file.type == 'temp' || fileEntry.file.type == 'image/jpeg' || fileEntry.file.type == 'image/png' || fileEntry.file.type == 'image/jpg' || fileEntry.file.type == 'image/gif') {
                    fileEntry.mediaType = 0;
                }
                else {
                    fileEntry.mediaType = 2;
                }
                var reader = new FileReader();
                let f = current;
                if (isMedia) {
                    if (fileEntry.mediaType == 2) {
                        self.formModel.otherfiles.push(fileEntry);
                    } else {
                        self.formModel.files.push(fileEntry);
                    }
                } else {
                    reader.onload = (function (theFile) {
                        return function (e) {
                            fileEntry.data = e.target.result;
                            var base64 = base64ArrayBuffer(fileEntry.data);
                            var imageModel = {
                                "Name": current.name,
                                "Data": base64
                            };
                            self.imageUploadInProgress = true;
                            axiosInstancePost()
                                .post("/ProductEditor/UploadImage", imageModel, axiosConfig)
                                .then(function (response) {
                                    self.imageUploadInProgress = false;
                                    if (response.data.message == "Success") {
                                        if (response.data.id.includes('pdf')) {
                                            fileEntry.name = response.data.name;
                                            fileEntry.url = response.data.id;
                                            fileEntry.previewUrl = "/assets/images/pdf.png";
                                            fileEntry.isActive = true;
                                            fileEntry.displayOrder = imageCounter;
                                            fileEntry.isInternal = false;
                                            fileEntry.tags = '';
                                            fileEntry.tagquery = '';
                                            fileEntry.tagList = [];                         
                                            if (fileEntry.mediaType == 2) {
                                                fileEntry.pdfTags = [];
                                                self.formModel.otherfiles.push(fileEntry);
                                            } else {
                                                fileEntry.imageTags = [];
                                            self.formModel.files.push(fileEntry);
                                            }
                                        }
                                        else {
                                            fileEntry.name = response.data.name;
                                            fileEntry.url = response.data.id;
                                            fileEntry.isActive = true;
                                            fileEntry.displayOrder = imageCounter;
                                            fileEntry.isInternal = false;
                                            fileEntry.tags = '';
                                            fileEntry.tagquery = '';
                                            fileEntry.tagList = [];
                                            fileEntry.imageTags = [];

                                            //if (fileEntry.mediaType == 2) {
                                            //    self.formModel.otherfiles.push(fileEntry);
                                            //} else {
                                            self.formModel.files.push(fileEntry);
                                            //}

                                        }


                                        imageCounter++;
                                    }
                                    else {
                                        if (response.data.message == "File with the same name already exists") {
                                            fileEntry.name = response.data.name;
                                            fileEntry.url = response.data.id;
                                            fileEntry.isActive = true;
                                            fileEntry.isMultiple = true;
                                            fileEntry.displayOrder = imageCounter;
                                            fileEntry.isInternal = false,
                                                fileEntry.tags = '';
                                            fileEntry.tagquery = '';
                                            fileEntry.tagList = [];
                                            fileEntry.imageTags = [];
                                            self.formModel.duplicatefiles.push(fileEntry);

                                            imageCounter++;
                                        }
                                        else if (response.data.message == "Error") {
                                            Vue.toasted.show("Unsupported file type, kindly upload jpeg, jpg, png, gif, webp extension file.", { type: 'error', duration: 3000, dismissible: true });
                                        }
                                        else {
                                            Vue.toasted.show(response.data.message, { type: 'error', duration: 3000, dismissible: true });
                                        }
                                    }

                                    //if (self.formModel.files.length > 0) {
                                    //    for (var k = 0; k < self.formModel.files.length; k++) {
                                    //        var obj = self.formModel.files[k];
                                    //        if (obj.isDefault) {
                                    //            checkDefault++;
                                    //        }
                                    //    }
                                    //    if (checkDefault == 0) {
                                    //         self.formModel.files[0].isDefault = true;
                                    //    }
                                    //}
                                    if (self.formModel.duplicatefiles != null && self.formModel.duplicatefiles.length > 0 && i == files.length - 1) {

                                        for (let k = 0; k < self.formModel.duplicatefiles.length; k++) {
                                            imageName = self.formModel.duplicatefiles[k].name + ', ' + imageName;
                                        }
                                        imageName = imageName + " already exists.";
                                        Vue.toasted.show(imageName, { type: 'error', duration: 5000, dismissible: true });

                                    }

                                })
                                .catch(function (error) {

                                });
                        };
                    })(f);
                    reader.readAsArrayBuffer(f);
                }



            }
            this.formModel.files.sort(function (a, b) {
                return a.displayOrder - b.displayOrder;
            });
                   
       },

    selectedRadioValue: function (child, files, type) {
        for (var i = 0; i < files.length; i++) {
            var current = files[i];
            if (type == 0) {
                if (current.fileId == child.fileId) {
                    child.isDefault = true;
                }
                else {
                    current.isDefault = false;
                }
            }
            else {
                if (current.url == child.url) {
                    child.isDefault = true;
                }
                else {
                    current.isDefault = false;
                }
            }

        }
    },
    confirmationModalShow(value, mediaType) {
        var self = this;
        var text = "";
        if (mediaType == 1) {
            text = "Image"
        } else if (mediaType == 2){
            text = "Video"
        } else if (mediaType == 3) {
            text = "PDF"
        }
        self.$modal.show('dialog', {
            title: 'Confirmation !',
            height: '100',
            text: 'Are you sure you want to delete this ' + text + ' ?',
            buttons: [
                {
                    title: 'Ok',
                    class: 'btn btn-danger',
                    handler: () => {

                        if (mediaType == 1) {
                            self.remove(value, mediaType);
                        } else if (mediaType == 2) {
                            self.remove(value, mediaType);
                        } else if (mediaType == 3) {
                            self.remove(value, mediaType);
                        }

                        self.$modal.hide('dialog')
                    }
                },
                {
                    title: 'Close'
                }
            ]
        })
    },
    getModel: function () {
        var obj = {
            "Files": [],
            "Videos": []
        };
        for (var i = 0; i < this.formModel.files.length; i++) {
            const currImage = this.formModel.files[i];
            if (currImage.mediaType == null || currImage.mediaType == undefined) {
                currImage.mediaType = 0;
            }
            const img = {
                Name: currImage.name,
                //IsDefault: currImage.isDefault,
                AltText: currImage.altText,
                Url: currImage.url,
                IsActive: currImage.isActive,
                IsInternal: currImage.isInternal,
                DisplayOrder: currImage.displayOrder,
                MediaType: currImage.mediaType,
                Tags: currImage.imageTags.toString()
            };
            obj.Files.push(img);
        }
        for (var i = 0; i < this.formModel.videos.length; i++) {
            const currVideo = this.formModel.videos[i];
            const vid = {
                Url: currVideo.url,
                IsDefault: currVideo.isDefault,
                description: currVideo.description,
                DisplayOrder: currVideo.displayOrder
            };
            obj.Videos.push(vid);
        }

        for (var i = 0; i < this.formModel.otherfiles.length; i++) {
            const currfile = this.formModel.otherfiles[i];
            if (currfile.mediaType == null || currfile.mediaType == undefined) {
                currfile.mediaType = 2;
            }
            const otherfile = {
                Name: currfile.name,
                //IsDefault: currImage.isDefault,
                AltText: currfile.altText,
                Url: currfile.url,
                IsActive: currfile.isActive,
                IsInternal: currfile.isInternal,
                DisplayOrder: currfile.displayOrder,
                MediaType: currfile.mediaType,
                Tags: currfile.pdfTags.toString()
            };
            obj.Files.push(otherfile);
        }
        return obj;
    }, getTagsbyFreetext: function (freetext, index, scope, name) {
        var self = this;
        //get tags
        axiosInstance()
            .get('ProductEditor/GetTagsbyFreetext?freetext=' + freetext + '&scope=' + scope)
            .then(function (response) {
                if (name == 'image') {
                    if (self.formModel.files[index].tagquery != '') {
                        self.formModel.files[index].tagList = response.data.result;
                    }
                } if (name == 'pdf') {
                    if (self.formModel.otherfiles[index].tagquery != '') {
                        self.formModel.otherfiles[index].tagList = response.data.result;
                    }
                }
            });
    }, addNewTags: function (tag, index, name) {
        var self = this;
        self.addTags(tag, index, name);
        if (name == 'image') {
            self.formModel.files[index].tagquery = '';
            self.formModel.files[index].tagList = [];
        }
        if (name == 'pdf') {
            self.formModel.otherfiles[index].tagquery = '';
            self.formModel.otherfiles[index].tagList = [];
        }
    }, addTags: function (tag, index, name) {
        var self = this;
        var data = {}
        if (name == 'image') {
            self.formModel.files[index].tagquery = '';
            self.formModel.files[index].tagList = [];
            data = { tag: tag, ProductId: encodeURIComponent(self.productId), imageId: self.formModel.files[index].fileId };

        }
        if (name == 'pdf') {
            self.formModel.otherfiles[index].tagquery = '';
            self.formModel.otherfiles[index].tagList = [];
            data = { tag: tag, ProductId: encodeURIComponent(self.productId), imageId: self.formModel.otherfiles[index].fileId };
        }

        axiosInstance()
            .post('ProductEditor/AddImageTag', data)
            .then(function (response) {
                if (name == 'image') {
                    self.formModel.files[index].imageTags.push(tag);
                }
                if (name == 'pdf') {
                    self.formModel.otherfiles[index].pdfTags.push(tag);
                }
            });
    },
    removeTag(tag, tagIndex, name) {
        var self = this;
        var data = {};
        var index;
        if (name == 'image') {
            index = self.formModel.files[tagIndex].imageTags.indexOf(
                self.formModel.files[tagIndex].imageTags.find(item => item == tag)
            );
            data = { tag: tag, ProductId: encodeURIComponent(self.productId), imageId: self.formModel.files[tagIndex].fileId };
        }
        if (name == 'pdf') {
            index = self.formModel.otherfiles[tagIndex].pdfTags.indexOf(
                self.formModel.otherfiles[tagIndex].pdfTags.find(item => item == tag)
            );
            data = { tag: tag, ProductId: encodeURIComponent(self.productId), imageId: self.formModel.otherfiles[tagIndex].fileId };
        }
        axiosInstance()
            .post('ProductEditor/RemoveImageTag', data)
            .then(function (response) {
                if (name == 'image') {
                    self.formModel.files[tagIndex].imageTags.splice(index, 1);
                }
                if (name == 'pdf') {
                    self.formModel.otherfiles[tagIndex].pdfTags.splice(index, 1);
                }
            });
    }
}
})
