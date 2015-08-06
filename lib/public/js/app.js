var layout = function(nav, body) {
    return m("div", [
        m("div", nav),
        m("div", body)
    ]);
};

var menu = function() {
    return [
        m("div", [
            m("h1", "Nav bar"),
        ]),
    ];
};

var homeBody = function() {
    return [
        m("h1", "Index page"),
        m("form", {
            action: "/upload",
            class: "dropzone",
            id: "my-awesome-dropzone",
        })
    ];
};

var mixinLayout = function(layout, nav, body) {
    return (function () {
        return layout(nav(), body());
    }());
};

var root = {
    view: function() {
        return mixinLayout(layout, menu, homeBody);
    }
};

m.route.mode = "hash";
m.route(document.body, "/", {
    "/": root,
});

function dropSuccess(file) {
    console.log(JSON.parse(file.xhr.response));
}
