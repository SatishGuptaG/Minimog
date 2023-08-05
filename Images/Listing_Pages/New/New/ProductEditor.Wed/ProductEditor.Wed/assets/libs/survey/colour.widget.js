var widget = {
    name: "colour",
    title: "Colour",
    iconName: "",
    widgetIsLoaded: function () {
        return true;
    },
    isFit: function (question) {
        return question.getType() === 'colour';
    },
    activatedByChanged: function (activatedBy) {
        Survey.JsonObject.metaData.addClass("colour", [], null, "dropdown");
        Survey.JsonObject.metaData.addProperties("colour", [
            { name: "headers:textitems", default: [] }
        ]);
    },
    isDefaultRender: false,
    htmlTemplate: `<div>
            <div class="col-md-12" style="margin-botton: 10px;">
                <a class="btn btn-primary survey-color-toggler" href="#" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <span class="colour-widget-text">Select colour</span> <span class="selected-color"></span>
                </a>
                <div class="collapse" style="margin-top:10px;">
                    <div class="card card-body"></div>
                </div>
            </div>
        </div>`,
    afterRender: function (question, el) {
        const rnd = Math.ceil(Math.random() * 100000);
        const button = $(".survey-color-toggler", el);
        const id = `collapse${rnd}`;
        const panel = button.next();
        panel.prop("id", id);
        const container = $(`#${id} .card-body`);
        button.click((e) => {
            e.preventDefault();
            panel.toggleClass("collapse");
        });
        const choices = question.choices;
        let currentSub = null;
        for (let i = 0; i < choices.length; i++) {
            const choice = choices[i];
            const found = question.headers.filter(x => choice.value.toLocaleLowerCase().indexOf(x.toLocaleLowerCase()) > -1);
            if (found.length) {
                if (currentSub) {
                    container.append(currentSub);
                    currentSub = null;
                }
                const headerDiv = $(`<div class="color-widget-header" data-colour="${choice.value}" title="${choice.text}" style="background-color:${choice.value}"></div>`);
                headerDiv.click(() => {
                    question.value = headerDiv.data("colour");
                    $(".selected-color", button).css("background-color", question.value);
                    $(".colour-widget-text", button).text("Colour selected");
                    panel.addClass("collapse");
                });
                container.append(headerDiv);
            }
            else {
                if (!currentSub) {
                    currentSub = $(`<div class="color-widget-round-container"></div>`);
                }
                const choiceDiv = $(`<div class="color-widget-round" title="${choice.text}" data-colour="${choice.value}" style="background-color:${choice.value};"></div>`);
                choiceDiv.click(() => {
                    question.value = choiceDiv.data("colour");
                    $(".selected-color", button).css("background-color", question.value);
                    $(".colour-widget-text", button).text("Colour selected");
                    panel.addClass("collapse");
                });
                currentSub.append(choiceDiv);
            }
        }
        if (currentSub) {
            container.append(currentSub);
            currentSub = null;
        }
    },
    willUnmount: function (question, el) {
    }
};
Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");
//# sourceMappingURL=colour.widget.js.map