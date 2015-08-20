var layout = function(nav, body) {
    return m("div", [
        m("div", nav),
        m("div", body)
    ]);
};

var splashNav = function() {
    return [
        m("div", [
            m("h1", "Splash Navbar"),
        ]),
    ];
};

var dashNav = function() {
    return [
        m(".off-canvas-wrap.move-right[data-offcanvas='']", [
            m(".inner-wrap", [
                m("aside.left-off-canvas-menu", [
                    m(".icon-bar.vertical.five-up", [
                        m("a.item", {href: "/", config: m.route}, [
                            m("h3", {id: "dash-logo"}, "Viduus")
                        ]),
                        m("a.item", {href: "/upload-file", config: m.route}, [
                            m("i.fi-upload"),
                            m("label", "Upload")
                        ]),
                        m("a.item", {href: "/results", config: m.route}, [
                            m("i.fi-results"),
                            m("label", "Results")
                        ]),
                        m("a.item", [
                            m("i.fi-wrench"),
                            m("label", "Settings")
                        ]),
                    ])
                ]),
            ]),
        ])];
};


var dashBody = function() {
    return [
        m("div", {class: "dash-body"},[
            m("h1", "Upload Please"),
            m("form", {
                action: "/upload",
                class: "dropzone",
                id: "my-awesome-dropzone",
            }),
            m("script", {src: "js/dropzone.js"}),
        ]),
    ];
};

var resultsBody = function() {
    return [
        m("div", {class: "dash-body"},[
            m("h1", "Graph Beauty"),
            m("div", {class: "graph1"}),
            m("script", {src: "js/graph1.js"}),
        ]),
    ];
};

var homeBody = function() {
    return [
        m(".row", [
            m(".large-3.columns", [
                m("h1", [m("img[src='http://placehold.it/400x100&text=Logo']")])
            ]),
            m(".large-9.columns", [
                m("ul.right.button-group", [
                    m("li", [m("a.button", {href: "/upload-file", config: m.route}, "Dashboard")]),
                    m("li", [m("a.button[href='#']", "Link 2")]),
                    m("li", [m("a.button[href='#']", "Link 3")]),
                    m("li", [m("a.button[href='#']", "Link 4")])
                ])
            ])
        ]),
        m(".row", [
            m(".large-12.columns", [
                m("[id='slider']", [
                    m("img[src='http://placehold.it/1000x400&text=[ img 1 ]']")
                ]),
                m("hr")
            ])
        ]),
        m(".row", [
            m(".large-4.columns", [
                m("img[src='http://placehold.it/400x300&text=[img]']"),
                m("h4", "This is a content section."),
                m("p", "Bacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo, chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong. Eiusmod swine spare ribs reprehenderit culpa. Boudin aliqua adipisicing rump corned beef.")
            ]),
            m(".large-4.columns", [
                m("img[src='http://placehold.it/400x300&text=[img]']"),
                m("h4", "This is a content section."),
                m("p", "Bacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo, chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong. Eiusmod swine spare ribs reprehenderit culpa. Boudin aliqua adipisicing rump corned beef.")
            ]),
            m(".large-4.columns", [
                m("img[src='http://placehold.it/400x300&text=[img]']"),
                m("h4", "This is a content section."),
                m("p", "Bacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo, chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong. Eiusmod swine spare ribs reprehenderit culpa. Boudin aliqua adipisicing rump corned beef.")
            ])
        ]),
        m(".row", [
            m(".large-12.columns", [
                m(".panel", [
                    m("h4", "Get in touch!"),
                    m(".row", [
                        m(".large-9.columns", [
                            m("p", "We'd love to hear from you, you attractive person you.")
                        ]),
                        m(".large-3.columns", [
                            m("a.radius.button.right[href='#']", "Contact Us")
                        ])
                    ])
                ])
            ])
        ]),
        m("footer.row", [
            m(".large-12.columns", [
                m("hr"),
                m(".row", [
                    m(".large-6.columns", [
                        m("p", "© Copyright no one at all. Go to town.")
                    ]),
                    m(".large-6.columns", [
                        m("ul.inline-list.right", [
                            m("li", [m("a[href='#']", "Link 1")]),
                            m("li", [m("a[href='#']", "Link 2")]),
                            m("li", [m("a[href='#']", "Link 3")]),
                            m("li", [m("a[href='#']", "Link 4")])
                        ])
                    ])
                ])
            ])
        ])
    ];
};

var mixinLayout = function(layout, nav, body) {
    return (function () {
        return layout(nav(), body());
    }());
};

var root = {
    view: function() {
        return mixinLayout(layout, splashNav, homeBody);
    }
};

var uploadFile = {
    view: function() {
        return mixinLayout(layout, dashNav, dashBody);
    }
};

var results = {
    view: function() {
        return mixinLayout(layout, dashNav, resultsBody);
    }
};

m.route.mode = "hash";
m.route(document.body, "/", {
    "/": root,
    "/upload-file": uploadFile,
    "/results": results,
});

function sideNav() {
    if ($(window).width() < 769) {
        $('.off-canvas-wrap').removeClass('move-right');
        $('.left-off-canvas-toggle').show();
    } else {
        $('.off-canvas-wrap').addClass('move-right');
        $('.left-off-canvas-toggle').hide();
    }
}

$(window).resize(function() {
    sideNav();
});

function dropSuccess(file) {
    var response = file.xhr.response;
    console.log(JSON.parse(response));
}
