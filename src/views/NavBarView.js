(function(window) {
  "use strict";

  var $ = window.Zepto,
      Backbone = window.Backbone,
      _ = window._;
  window.vthirsty = window.vthirsty || {};
  var console = window.console || {};
  console.log = console.log || function() {};

  window.vthirsty.NavBarView = Backbone.View.extend({
    className: "nav",
    events: {
      "click .hamburger": "fireMenuButton"
    },
    initialize: function() {
      // ...
    },
    render: function() {
      this.$el.html(window.JST["tpl/NavBar.hbs"]());
      return this;
    },
    fireMenuButton: function() {
      $(document).trigger("toggleMenu");
    }
  });

})(window);
