(function(window) {
  "use strict";

  var $ = window.Zepto,
      Backbone = window.Backbone,
      _ = window._;
  window.vthirsty = window.vthirsty || {};
  var console = window.console || {};
  console.log = console.log || function() {};

  window.vthirsty.BeersCollection = Backbone.Collection.extend({
    filterNames: function(letters) {
      var pattern = new RegExp(letters,"i");
      return this.filter(function(beer) {
        return pattern.test(beer.get("company_name"));
      });
    },
    isVegan: function() {
      return this.where({"status": "Vegan Friendly"});
    }
  });

})(window);
