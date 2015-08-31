var layout = function(nav, body, bodyColor) {
  return m("body", {class: bodyColor}, [
    m("div", nav),
    m("div", body)
  ]);
};

var splashNav = function() {
  return [
    m(".row", [
      m(".large-3.columns", [
        m("a", {href: "/", config: m.route}, [
          m("h1", {id: "dash-logo"}, "Viduus")
        ]),
      ]),
      m(".large-9.columns", [
        m("ul.navbuttons.right.button-group", [
          m("li", [m("a.button[href='#']", "Tour")]),
          m("li", [m("a.button", {href: "#", id: "about"}, "About")]),
          m("li", [m("a.button[href='#']", "Documentation")]),
          m("li", [m("a.button", {href: "/upload-file", config: m.route}, "Dashboard")]),
        ])
      ])
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
              m("i.fi-upload-cloud"),
              m("label", "Upload")
            ]),
            m("a.item", {href: "/results", config: m.route}, [
              m("i.fi-graph-trend"),
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

var dashBody = function(ctrl) {
  return [
    m("div", {class: "dash-body white"},[
      m("h1", "Upload Please"),
      m("form", {
        action: "/upload",
        class: "dropzone",
        id: "my-awesome-dropzone",
      }),
      m("button[type=button]", {id: "selectorButton", onclick: Modal.module.bind(this, innerModal)}, "Click to show modal"),
      ctrl.modal({class: "modal-animation-8"}),
      m("script", {src: "js/dropzone.js"}),
    ]),
  ];
};

var resultsBody = function() {
  return [
    m("div", {class: "dash-body"},[
      m("h1", "Graph"),
      m("div", {class: "bargraph"}),
      m("script", {src: "js/bargraph.js"}),
    ]),
  ];
};

var homeBody = function() {
  return [
    m(".row", [
      m(".large-12.columns", [
        m("h1", {id: "slogan"}, "Machine Learning Insights. Easily."),
        m("div", {class: "scatter"}),
        m("h1", {id: "blurb"}, "Upload a CSV, and Viduus will find the best model for your data, clearly displayed so you can quickly pinpoint insights about your data."),
        m("script", {src: "js/scatter.js"}),
      ]),
      m("hr")
    ]),
    m(".row", [
      m("div", {class: "large-4 columns", id: "about-body"}, [
        m("img", {src: "http://www.terraskitchen.com/media/wysiwyg/ingredients/eggplant.jpg"}),
        m("h4", "This is a content section."),
        m("p", "Bacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo, chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong. Eiusmod swine spare ribs reprehenderit culpa. Boudin aliqua adipisicing rump corned beef.")
      ]),
      m(".large-4.columns", [
        m("img", {src: "http://www.terraskitchen.com/media/wysiwyg/ingredients/eggplant.jpg"}),
        m("h4", "This is a content section."),
        m("p", "Bacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo, chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong. Eiusmod swine spare ribs reprehenderit culpa. Boudin aliqua adipisicing rump corned beef.")
      ]),
      m(".large-4.columns", [
        m("img", {src: "http://www.terraskitchen.com/media/wysiwyg/ingredients/eggplant.jpg"}),
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
            m("p", "© Viduus Analytics")
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
    ]),
    m("script", {src: "js/scroll.js"}),
  ];
};

var mixinLayout = function(layout, nav, body, bodyColor) {
  return (function () {
    return layout(nav(), body(), bodyColor);
  }());
};

var root = {
  view: function() {
    return mixinLayout(layout, splashNav, homeBody);
  }
};

var uploadFile = {
  controller: function() {
    uploadedDataset.vm.init();
    this.modal = submodule(Modal);
  },
  view: function(ctrl) {
    return mixinLayout(layout, dashNav, dashBody.bind(null, ctrl), "white");
  }
};

var innerModal = {
  controller: function() {},
  view: function() {
    var tableName = uploadedDataset.vm.tableName();
    var colNames = uploadedDataset.vm.colNames();
    var targetQuestion = uploadedDataset.vm.targetQuestion();
    return [m("h1", tableName),
      m("p", targetQuestion ?
        "Which column would you like to predict as your target variable?": "Which columns would you like to use to predict the target?")
    ].concat(colNames.map(function(colName) {
      return m("button", {onclick: uploadedDataset.vm.recordVarTypes.bind(null, colName)}, colName);
    }));
  }
};


var results = {
  view: function() {
    return mixinLayout(layout, dashNav, resultsBody, "white");
  }
};

var uploadedDataset = {};

uploadedDataset.vm = (function() {
  var vm = {};
  vm.init = function() {
    vm.tableName = m.prop("");
    vm.colNames = m.prop([]);
    vm.targetQuestion = m.prop(true);
    vm.target = m.prop("");
    vm.predictors = m.prop([]);
    vm.recordVarTypes = function(colName) {
      var targetQuestion = vm.targetQuestion();
      if (targetQuestion) {
        vm.target(colName);
        vm.targetQuestion(false);
      } else {
        vm.predictors().push(colName);
      }
      console.log(this);
      console.log(JSON.stringify(vm));
    };
  };
  return vm;
}());

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
  var response = JSON.parse(file.xhr.response);
  console.log(response);
  var tableName = response.tableName;
  var colNames = response.colNames;
  uploadedDataset.vm.tableName(tableName);
  uploadedDataset.vm.colNames(colNames);
  $('#selectorButton').trigger('click');
  console.log(response);
}
