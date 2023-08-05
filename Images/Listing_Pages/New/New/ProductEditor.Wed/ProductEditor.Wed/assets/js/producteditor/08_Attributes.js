var emptyChoice = {
    name: "Select value",
    value: "",
    recordId: ""
};

const axiosInstanceAttribute = function () {
    const getBaseUrl = () => {
        return PimUri;
    };
    const axiosObejct = axios.create({
        baseURL: getBaseUrl(),
        timeout: 50000
    });
    return axiosObejct;
};

Vue.component("section-attributes", {
    template: "#section-attributes-template",
    props: ['message'],
    data() {
        return {
            //customFields: [],
            formModel: {
                customFields: [],
                selectedType: emptyChoice,
                types: [],
                survey: [],
                customFieldData: null
            },
            selectedColorList: [],
            custumAttributeId: '',
            attributesGroup: [],
            distinctattributesGroup: [],
            allowUpdate: false,
            setName: "",
            loaded: false,
            useForVariantOnly: false,
            hasVariant: false,
            isAttributesEditDisabled: !hasAttributesEditPermission
        };
    },
    computed: {
        selectedType: function () {
            return this.formModel.selectedType;
        }
    },
    watch: {
        selectedType: function (newValue, oldValue) {
            var self = this;

            EventBus.$emit('attributes.parentChanged', [newValue.recordId]);
            self.custumAttributeId = newValue.recordId;
            self.setName = newValue.name;
            self.allowUpdate = true;
              
            EventBus.$on("attributeData.loaded", function (masterData) {
                var info = masterData;
                self.attributesGroup = info.customFieldMapping;

                var result = {}; 
                self.attributesGroup.forEach(item => {
                    if (!result[item['groupName']]) {
                        result[item['groupName']] = [];
                    }
                    result[item['groupName']].push(item);
                });
                self.distinctattributesGroup = result;  //groupBy(data, 'groupName');
            });
        }
    },
   
    mounted() {
        var self = this;
        var value = null;
        var valuesSet = false;

        if (this.message) {
            this.formModel = this.message;
        }

        //axiosInstanceAttribute()
        //    .get("ProductEditor/GetMasterData?type=6&did=" + domainid)
        //    .then(function (response) {
        //        var data = response.data.items;
        //        if (!self.formModel)
        //            self.formModel = {};
        //        if (!self.formModel.types)
        //            self.formModel.types = [];
        //        self.formModel.types.length = 0;
        //        if (data != null && data.length > 0) {
        //            for (var i = 0; i < data.length; i++) {
        //                self.formModel.types.push(data[i]);
        //            }
        //        }
        //        self.loaded = true;
        //        if (value && !valuesSet) {
        //            setValues();
        //        }
        //    });

        EventBus.$on("masterData.loaded", function (masterData) {
            var info = masterData;
            var data = info.attributeSet;
            if (!self.formModel)
                self.formModel = {};
            if (!self.formModel.types)
                self.formModel.types = [];
            self.formModel.types.length = 0;
            if (data != null && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    self.formModel.types.push(data[i]);
                }
            }
            self.loaded = true;
            if (value && !valuesSet) {
                setValues();
            }
        });
        EventBus.$on("product.loaded", function (product) {
            value = product.customAttributes;
            self.hasVariant = product.basicInfo.hasVariant;
            if (self.loaded) {
                setValues();
            }
        });
        var setValues = function () {
            var attrs = value;
            var guidZero = "00000000-0000-0000-0000-000000000000";
            if (attrs != null) {
                if (attrs.customAttributeSetId && attrs.customAttributeSetId && attrs.customAttributeSetId !== guidZero) {
                    for (var i = 0; i < self.formModel.types.length; i++) {

                        if (self.formModel.types[i].recordId && self.formModel.types[i].recordId.toLowerCase() === attrs.customAttributeSetId.toLowerCase()) {
                            self.formModel.selectedType = self.formModel.types[i];
                            self.setName = self.formModel.types[i].name;
                            break;
                        }

                    }
                }
                self.formModel.customFieldData = attrs.customFieldsWithValues;
                valuesSet = true;
            }
        };


        EventBus.$on("attributes.parentChanged", function (id) {
            self.loadSurvey(id);
        });

    },
    methods: {
        colorHref: function (id, index) {
            return "#" + id + index.toString();
        },
        groupBy: function (array, key){
            const result = {};
            array.forEach(item => {
                if (!result[item[key]]) {
                    result[item[key]] = [];
                }
                result[item[key]].push(item);
            });
            return result;
            },
        addCustomField: function () {
            this.formModel.customFields.push({
                name: "",
                value: ""
            });

            this.validate();
        },
        remove: function (index) {
            this.formModel.customFields.splice(index, 1);

            this.validate();
        },
        validate: function () {
            var self = this;

            var valid = true;
            for (var i = 0; i < self.formModel.customFields.length; i++) {
                if (self.formModel.customFields[i].name.length === 0 || self.formModel.customFields[i].value.length === 0) {
                    valid = false;
                }
                break;
            }

            if (valid) {
                this.$emit('validation-complete', true);
            } else {
                this.$emit('validation-complete', false);
            }
        },
        getModel: function () {
            var result = {
                FieldSet: {
                    key: "",
                    value: ""
                },
                CustomFieldsWithValues: []
            };
            if (this.formModel.selectedType) {
                result.customAttributeSetId = this.formModel.selectedType.recordId;
            }
            if (this.formModel.selectedType) {
                result.FieldSet.key = this.formModel.selectedType.recordId;
                result.FieldSet.value = this.formModel.selectedType.name;
            }

            if (this.formModel.survey) {
                for (var i = 0; i < this.formModel.survey.length; i++) {
                    var q = this.formModel.survey[i];
                    var obj = {
                        "key": q.name,
                        "value": ""
                    };
                    result.CustomFieldsWithValues.push(obj);
                    if (q.selected) {
                        if (Object.prototype.toString.call(q.selected) === '[object Array]') {
                            q.selected = q.selected[0];
                        }
                        obj.value = q.selected;
                    } else {
                        if (q.type.toLowerCase() === 'radiogroup' || q.type.toLowerCase() === 'yesno') {
                            obj.value = false;
                        }
                    }
                    if (q.choices) {
                        if (obj.value == "undefined" || obj.value == undefined || obj.value == null) {
                            obj.value = "";
                        }
                        if (obj.key != "global.colour") {
                            for (var j = 0; j < q.choices.length; j++) {
                                if (q.choices[j].selected) {
                                    obj.value = obj.value + ',' + q.choices[j].value;
                                }
                            }
                        }
                        obj.value = (obj.value[0] == ',') ? obj.value.substr(1) : obj.value;
                    }
                }
            }
            return result;
        },

        collapseNext: function (event) {
            var el = $(event.currentTarget);
            $(el).next().toggleClass("collapse");
        },

        removeColor: function (color) {
            var self = this;
            //Remove from survey list
            var colorObject = self.formModel.survey.filter(x => { if (x.type == "color") { return x; } });
            //var index = colorObject[0].selected.indexOf(
            //    colorObject[0].selected.find(item => item == color.value)
            //);
            //colorObject[0].selected.splice(index, 1);
            if (colorObject[0].selected == color.value) {
                colorObject[0].selected = null;
            }
            self.formModel.survey.filter(x => { if (x.type == "color") { x.selected = colorObject[0].selected } });
            //Remove from display list
            var index = self.selectedColorList.indexOf(
                self.selectedColorList.find(item => item.value == color.value)
            );
            self.selectedColorList.splice(index, 1);
        },

        selectColor: function (question, choice, event) {
            var self = this;
            question.selected = choice.value;
            self.selectedColorList = []
            var el = $(event.currentTarget);
            var panel = el.parent().parent().parent().parent();
            var prev = panel.prev();
            $(".selected-color", prev).css("background-color", choice.value);
            $(".color-widget-text", prev).html("Selected");
            //if (question.selected.length == 0) {
            //    self.selectedColorList.push({ value: choice.value, text: choice.text });
            //}
            //else {
            //    var count = 0;
            //    for (var i = 0; i < question.selected.length; i++) {
            //        var existingColor = question.selected[i];
            //        if (existingColor == choice.value) {
            //            count++;
            //        }
            //    }
            //    if (count == 0) {
            //        question.selected.push(choice.value);
            //        self.selectedColorList.push({ value: choice.value, text: choice.text });
            //    }
            //}
            self.selectedColorList.push({ value: choice.value, text: choice.text });
            //panel.toggleClass("collapse");
        },
        confirmUpdateAttributeSet() {
            var self = this;

            var attributeSetConfirmMessage = 'Do you really want to change attribute set?';
            if (self.hasVariant)
                attributeSetConfirmMessage = 'Same attribute set will get updated against variants as well. Do you really wish to update attribute set?';

            self.$modal.show('dialog', {
                title: 'Confirmation !',
                height: '100',
                text: attributeSetConfirmMessage,
                buttons: [
                    {
                        title: 'Ok',
                        class: 'btn btn-danger',
                        handler: () => {
                            self.allowUpdate = false;
                            self.$modal.hide('dialog')
                        }
                    },
                    {
                        title: 'Close'
                    }
                ]
            });
            //if (confirm("Do you really want to Update Attribute set?")) {
            //    self.allowUpdate = false;
            //}
            //else {
            //    return false;
            //}
        },
        emitVariationOptions() {
            var self = this;
            EventBus.$emit('customField.Variations', self.formModel.survey, self.custumAttributeId);
        },

        loadSurvey: function (id) {
            var self = this;
            if (!id) {
                return;
            }

            directAxios()
                .get("/MasterData/AllAtributeData?id=" + id)
                .then(function (response) {
                    if (response.data.pages && response.data.pages.length && response.data.pages[0].elements) {
                        //response.data.pages[0].elements.push(mockElement);
                    }
                    if (response.data &&
                        response.data.nonVariantAttribute.pages &&
                        response.data.nonVariantAttribute.pages.length &&
                        response.data.nonVariantAttribute.pages[0] &&
                        response.data.nonVariantAttribute.pages[0].elements &&
                        response.data.nonVariantAttribute.pages[0].elements.length) {

                        self.formModel.survey = response.data.nonVariantAttribute.pages[0].elements;

                        EventBus.$emit('attributeData.loaded', response.data);
                    } else {
                        self.formModel.survey = [];
                    }
                    //self.formModel.survey = self.formModel.survey.filter((item) => item.choices != null);
                    if (self.formModel.survey != []) {
                        self.formModel.survey.map((obj, index) => {
                            if (obj.choices != null) {
                                obj.choices.map((choice, index) => {
                                    choice.id = choice.value;
                                    return choice;
                                });
                                obj.selected = [];
                                return obj;
                            }
                        });
                    }
                    if (self.formModel.customFieldData) {
                        self.selectedColorList = [];
                        for (var i = 0; i < self.formModel.customFieldData.length; i++) {
                            var currentValue = self.formModel.customFieldData[i];
                            for (var j = 0; j < self.formModel.survey.length; j++) {
                                var currentSurvey = self.formModel.survey[j];
                                if (currentSurvey.name === currentValue.key) {
                                    if (currentSurvey.type === "color" || currentSurvey.type === "colour") {
                                        for (var k = 0; k < currentSurvey.choices.length; k++) {
                                            var col1 = currentSurvey.choices[k];
                                            var selectedColors = currentValue.value == null ? [] : currentValue.value.split(',');
                                                for (var x = 0; x < selectedColors.length; x++) {
                                                    if (col1.value.toLowerCase() === selectedColors[x].toLowerCase()) {
                                                        col1.selected = true;
                                                        currentSurvey.selected.push(col1.value);
                                                        self.selectedColorList.push({ value: col1.value, text: col1.text })
                                                        //break;
                                                    }
                                                    var colorFound = false;
                                                    if (col1.colors) {
                                                        for (var l = 0; l < col1.colors.length; l++) {
                                                            var col2 = col1.colors[l];
                                                            if (col2.value.toLowerCase() === selectedColors[x].toLowerCase()) {
                                                                col2.selected = true;
                                                                colorFound = true;
                                                                currentSurvey.selected.push(col2.value);
                                                                self.selectedColorList.push({ value: col2.value, text: col2.text })
                                                                //break;
                                                            }
                                                        }
                                                    }
                                                    if (colorFound) {
                                                        break;
                                                    }
                                                }
                                        }
                                    }
                                    if (currentSurvey.type === "checkbox" && currentSurvey.choices != null) {
                                        for (var m = 0; m < currentSurvey.choices.length; m++) {
                                            var choice = currentSurvey.choices[m];
                                            if (currentValue.value != null) {
                                                if (currentValue.value.indexOf(',') > -1) {
                                                    var array = currentValue.value.split(',');
                                                    for (a in array) {
                                                        if (choice.value === array[a]) {
                                                            choice.selected = true;
                                                        }
                                                    }
                                                }
                                                else {
                                                    if (choice.value === currentValue.value) {
                                                        choice.selected = true;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (currentSurvey.type === "dropdown" && currentValue.value != null) {
                                        if (currentValue.value != null) {
                                            currentSurvey.selected = currentValue.value.split(',');
                                        }
                                    }
                                    if (currentSurvey.type === "imagecollection" && currentValue.value != null) {
                                        if (currentValue.value != null) {
                                            currentSurvey.selected = currentValue.value;
                                        }
                                    }
                                    if (currentSurvey.type === "text") {
                                        currentSurvey.selected = currentValue.value;
                                    }
                                    if (currentSurvey.type === "html") {
                                        currentSurvey.selected = currentValue.value;
                                    }
                                    if (currentSurvey.type.toLowerCase() === 'radiogroup' || currentSurvey.type.toLowerCase() ==='yesno') {
                                        currentSurvey.selected = (currentValue.value != null && currentValue.value.toLowerCase() == 'true') ? true: false;
                                    }
                                }
                            }
                        }
                    }
                    self.selectedColorList = self.selectedColorList.splice(-1, 1);
                });
        }
    }
});