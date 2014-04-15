(function(window) {
  "use strict";

  var $ = window.Zepto,
      Backbone = window.Backbone,
      _ = window._;
  window.vthirsty = window.vthirsty || {};
  var console = window.console || {};
  console.log = console.log || function() {};

  window.vthirsty.AppView = Backbone.View.extend({
    el: "#container",
    initialize: function() {
    },
    render: function() {
      this.navBarView = new window.vthirsty.NavBarView();
      this.$el.prepend(this.navBarView.render().el);
      var _this = this;
      $(document).on("toggleMenu", function(event) {
        _this.toggleMenu();
      });
      return this;
    },
    toggleMenu: function(event) {
      this.$el.toggleClass("open");
    }
  });

})(window);
