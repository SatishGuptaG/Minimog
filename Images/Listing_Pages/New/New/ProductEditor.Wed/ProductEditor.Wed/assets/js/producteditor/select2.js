Vue.component('select2', {
    props: ['options', 'value'],
    template: '#select2-template',
    mounted: function () {
        var vm = this
        $(this.$el)
            // init select2
            .select2({ data: this.options })
            .val(this.value)
            .trigger('change')
            // emit event on change.
            .on('change', function () {
                vm.$emit('input', $(this).val());
            })
    },
    watch: {
        value: function (value) {
            if ($(this.$el).val() != null) {
                if ([value].sort().join(",") !== [$(this.$el).val()].sort().join(","))
                    $(this.$el).val(value).trigger('change');
            }
        },
        options: function (options) {
            // update options
            $(this.$el).empty();
            $(this.$el).select2({ data: options })
        }
    },
    destroyed: function () {
        $(this.$el).off().select2('destroy')
    }
})