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

function btnChange(state, addClass, removeClass, id) {
    const myBtn = $$(id);
    myBtn.config.state = state;
    webix.html.addCss(myBtn.getNode(), "button_" + addClass);
    webix.html.removeCss(myBtn.getNode(), "button_" + removeClass);
    myBtn.blur();
    return myBtn.setValue(myBtn.config.states[myBtn.config.state]);
}

function sortData(key, dir, type) {
    return $$("table").sort(key, dir, type);
}

webix.protoUI({
    name: 'mybutton',
    $init(config) {
        config.value = config.states[config.state];
        this.$view.className += " button_off";
        this.attachEvent("onItemClick", () => {
            switch (this.config.state) {
                case 0:
                    btnChange(1, "sort_asc", "off", this.config.id);
                    break;
                case 1:
                    btnChange(2, "sort_desc", "sort_asc", this.config.id);
                    break;
                case 2:
                    btnChange(0, "off", "sort_desc", this.config.id);
                    break;
            }
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
                view: "mybutton",
                width: 270,
                states: { 0: "Off", 1: "Sort Asc", 2: "Sort Desc" },
                state: 0,
                on: {
                    "onItemClick"() {
                        switch (this.config.state) {
                            case 0:
                                sortData("#id#", "asc", "int");
                                break;
                            case 1:
                                sortData("#name#", "asc", "string");
                                break;
                            case 2:
                                sortData("#name#", "desc", "string");
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
    name: "myform",
    $init(config) {
        for (let i = 0; i < config.fields.length; i++) {
            const obj = {};
            obj.view = "text";
            obj.label = config.fields[i];
            obj.name = config.fields[i];
            config.rows.push(obj);
        };
        config.rows.push({cols: [
            {
                view: "button",
                value: "Cancel",
                click() {
                    $$(config.id).clear();
                    return false;
                }
            },
            {
                view: "button",
                value: "Save",
                css: "webix_primary",
                click() {
                    if($$(config.id).isDirty()) {
                        $$(config.id).clear();
                    }
                }
            },
        ]})
    }

}, webix.ui.form)

const secondTask = {
    rows: [
        {
            view: "myform",
            fields: ["Firstname","Lastname", "Address"],
            autowidth: true,
            rows: [],
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
