Vue.component("section-personalisation", {
    template: "#section-personalisation",
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