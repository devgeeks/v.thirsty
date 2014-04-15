(function(window) {
  "use strict";

  var $ = window.Zepto,
      Backbone = window.Backbone,
      _ = window._;
  window.vthirsty = window.vthirsty || {};
  var console = window.console || {};
  console.log = console.log || function() {};

  window.vthirsty.ListViewItem = Backbone.View.extend({
    tagName: 'li',
    events: {},
    initialize: function() {
      _.bindAll(this, "render");
    },
    render: function() {
      this.$el.html(
        window.JST["tpl/BeersListItem.hbs"](this.model.toJSON())
      );
      switch(this.model.get("status").toLowerCase()) {
        case "vegan friendly":
          this.el.className = "green";
          break;
        case "has some vegan options":
          this.el.className = "yellow";
          break;
        case "not vegan friendly":
          this.el.className = "red";
          break;
      }
      return this;
    }
  });

})(window);
