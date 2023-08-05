Vue.component("section-description", {
    template: "#section-description-template",
    data() {
        return {
            formModel: {
                shortDescription: "",
                notes: "",
                description: ""
            },
            isDescriptionEditDisabled: !hasDescriptionEditPermission,
        };
    },
    props: ['message'],
    mounted() {
        var self = this; 
        if (this.message != undefined && this.message != null) {
            this.formModel = this.message;
        }

        function run(product) {
            var info = product.basicInfo;
            if (typeof CKEDITOR === "undefined") {
                setTimeout(() => run(product), 500);
                return;
            }
            if (info != null)
            {
                if (CKEDITOR.instances != undefined) {
                    var short = (info.shortDescription != null) ? info.shortDescription : "";
                    if (CKEDITOR.instances.editor1 != undefined) {
                        CKEDITOR.instances.editor1.setData(short);
                    }
                    var description = (info.description != null) ? info.description : "";
                    if (CKEDITOR.instances.editor2 != undefined) {
                        CKEDITOR.instances.editor2.setData(description);
                    }
                    self.formModel.notes = (info.notes != null) ? info.notes : ""; 
                }
            }
        }

        EventBus.$on("product.loaded", function (product) {
            run(product);
        });
    },
    methods: {
        getModel: function () { 
            var self = this; 
            var shortDescription = CKEDITOR.instances.editor1.getData();
            var description = CKEDITOR.instances.editor2.getData();
            var notes = self.formModel.notes;
            return {
                shortDescription: shortDescription,
                description: description,
                notes: notes
            };
        }
    }
})