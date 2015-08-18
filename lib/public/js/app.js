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
                m("a.left-off-canvas-toggle[href='#']", [m("i.fi-list")]),
                m("aside.left-off-canvas-menu", [
                    m(".icon-bar.vertical.five-up", [
                        m("a.item", [
                            m("i.fi-home"),
                            m("label", "Home")
                        ]),
                        m("a.item", [
                            m("i.fi-home"),
                            m("label", "Bookmark")
                        ]),
                        m("a.item", [
                            m("i.fi-home"),
                            m("label", "Info")
                        ]),
                        m("a.item", [
                            m("i.fi-home"),
                            m("label", "Mail")
                        ]),
                        m("a.item", [
                            m("i.fi-home"),
                            m("label", "Like")
                        ])
                    ])
                ]),
                m("a.exit-off-canvas")
            ]),
            "\n\n"
        ])];
}


var dashBody = function() {
    return [
        m("h1", "Index page"),
        m("form", {
            action: "/upload",
            class: "dropzone",
            id: "my-awesome-dropzone",
        })
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
                    m("li", [m("a.button[href='#']", "Link 1")]),
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

var dashboard = {
    view: function() {
        return mixinLayout(layout, dashNav, dashBody);
    }
};

m.route.mode = "hash";
m.route(document.body, "/", {
    "/": root,
    "/dashboard": dashboard,
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
    console.log(JSON.parse(file.xhr.response));
}
