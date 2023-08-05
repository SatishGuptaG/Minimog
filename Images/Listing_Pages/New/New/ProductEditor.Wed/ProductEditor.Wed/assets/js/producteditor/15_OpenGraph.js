Vue.component("section-graph", {
    template: "#section-graph-template",
    data() {
        return {
            formModel: {
                objectType: "",
                useProductName: false,
                useMetaDescription: false,
                imageSetting: "thumbnail"
            }
        }
    },
    props: ['message'],
    mounted() {
        if (this.message != undefined && this.message != null) {
            this.formModel = this.message;
        }
    },
    methods: {
    }
})