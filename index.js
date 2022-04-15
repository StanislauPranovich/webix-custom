const data = [
    { "id": 1, "name": "Alan Smith", "age": 57, "country": "USA" },
    { "id": 2, "name": "Nina Brown", "age": 32, "country": "Germany" },
    { "id": 3, "name": "Kevin Sallivan", "age": 21, "country": "Canada" },
    { "id": 4, "name": "Sergey Petrov", "age": 24, "country": "Russia" },
    { "id": 5, "name": "Mina Leen", "age": 40, "country": "China" },
    { "id": 6, "name": "Sam White", "age": 26, "country": "USA" },
    { "id": 7, "name": "Peter Olsten", "age": 40, "country": "France" },
    { "id": 8, "name": "Lina Rein", "age": 30, "country": "Germany" },
    { "id": 9, "name": "Many Cute", "age": 22, "country": "Canada" },
    { "id": 10, "name": "Andrew Wein", "age": 27, "country": "Italy" },
    { "id": 11, "name": "Paolo Sanders", "age": 40, "country": "Spain" },
    { "id": 12, "name": "Tanya Krieg", "age": 28, "country": "Germany" }
]

function sortDataInTable(key, dir, type) {
    return $$("table").sort(key, dir, type);
}

webix.protoUI({
    name: 'buttonStates',
    changeBtnState(state, addClass, removeClass) {
        this.config.state = state;
        webix.html.addCss(this.$view, `button_${addClass}`);
        webix.html.removeCss(this.$view, `button_${removeClass}`);
        this.setValue(this.config.states[this.config.state]);
    },
    $init(config) {
        config.value = config.states[config.state];
        this.$view.className += " button_off";
        this.attachEvent("onItemClick", () => {
            switch (this.config.state) {
                case 0:
                    this.changeBtnState(1, "sort_asc", "off");
                    break;
                case 1:
                    this.changeBtnState(2, "sort_desc", "sort_asc");
                    break;
                case 2:
                    this.changeBtnState(0, "off", "sort_desc");
                    break;
            }
            this.callEvent("onStateChange", [this.config.state]);
        })
    }
}, webix.ui.button)

const tabs = {
    view: "tabbar",
    multiview: true,
    options: [
        { id: "first_task", value: "First task" },
        { id: "second_task", value: "Second task" },
    ]
}

const firstTask = {
    rows: [
        {
            cols: [{
                view: "label",
                label: "Sort list",
                autowidth: true
            },
            {
                view: "buttonStates",
                width: 270,
                states: { 0: "Off", 1: "Sort Asc", 2: "Sort Desc" },
                state: 0,
                on: {
                    onStateChange(state) {
                        switch (state) {
                            case 0:
                                sortDataInTable("#id#", "asc", "int");
                                break;
                            case 1:
                                sortDataInTable("#name#", "asc", "string");
                                break;
                            case 2:
                                sortDataInTable("#name#", "desc", "string");
                                break;
                        }
                    }
                }
            },
            ],
            margin: 50,
            padding: 10
        },
        {
            view: "datatable",
            id: "table",
            columns: [
                { id: "name", header: "Name", width: 150 },
                { id: "age", header: "Age" },
                { id: "country", header: "Country", fillspace: true },
            ],
            data: data
        }
    ],
    id: "first_task",
}

webix.protoUI({
    name: "generateFormFields",
    cancelAction() {
        this.clear();
        return false;
    },
    saveAction() {
        if (this.isDirty()) {
            console.log(this.getValues())
            this.clear();
        }
    },
    $init(config) {
        config.rows = [];
        if (config.fields) {
            for (let i = 0; i < config.fields.length; i++) {
                config.rows.push({
                    view: "text",
                    label: config.fields[i],
                    name: config.fields[i]
                });
            };
            config.rows.push({
                cols: [
                    {
                        view: "button",
                        value: "Cancel",
                        click: () => config.cancelAction ? config.cancelAction.call(this) : this.cancelAction()
                    },
                    {
                        view: "button",
                        value: "Save",
                        css: "webix_primary",
                        click: () => config.saveAction ? config.saveAction.call(this) : this.saveAction()
                    },
                ]
            })
        } else {
            webix.message("Create a key 'fields' in the form!")
        }
    }

}, webix.ui.form)

const secondTask = {
    rows: [
        {
            view: "generateFormFields",
            // fields: ["Firstname", "Lastname", "Address"],
        },
    ],
    id: "second_task"
}

webix.ui({
    rows: [
        tabs,
        {
            cells: [
                firstTask,
                secondTask
            ]
        }
    ]
})
